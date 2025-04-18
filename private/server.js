const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware session et bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware pour sauvegarder les pages visitées (pages HTML, routes principales sans extension, et /Code/html/*, AVEC paramètres)
app.use((req, res, next) => {
    const userId = req.session.userId;
    const url = req.originalUrl;
    const path = req.path;

    // Exclure la page d'accueil ("/" et "/Code/accueil.html")
    const isAccueil = path === '/' || path === '/Code/accueil.html';

    // On log si :
    // - la page finit par .html
    // - ou une route principale sans extension (ex: /Code/map)
    // - ou une route qui commence par /Code/html/
    // - ce n'est pas la page d'accueil
    const isHtmlOrMainRoute =
        req.method === 'GET' && (
            path.endsWith('.html') ||
            (
                path.startsWith('/Code/') &&
                !path.split('/').pop().includes('.') // pas d'extension
            ) ||
            path.startsWith('/Code/html/')
        ) && !isAccueil;

    if (
        userId &&
        isHtmlOrMainRoute &&
        !path.startsWith('/account') &&
        !path.startsWith('/logout')
    ) {
        db.get('SELECT visited_pages FROM accounts WHERE user_id = ?', [userId], (err, row) => {
            if (err) return next();
            let visitedPages = [];
            if (row && row.visited_pages) {
                try {
                    visitedPages = JSON.parse(row.visited_pages);
                } catch (e) {}
            }
            if (!visitedPages.length || visitedPages[visitedPages.length - 1] !== url) {
                visitedPages.push(url);
                if (visitedPages.length > 5) visitedPages = visitedPages.slice(-5);
                db.run(
                    'UPDATE accounts SET visited_pages = ? WHERE user_id = ?',
                    [JSON.stringify(visitedPages), userId]
                );
            }
            next();
        });
    } else {
        next();
    }
});

// Static doit venir après le tracking pour que le middleware soit appelé AVANT le static
app.use(express.static(path.join(__dirname, '../public')));

// SQLite setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create tables if not exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);
});

// ROUTES

// Page d'accueil = login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/account/login.html'));
});

// Page register
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/account/register.html'));
});

// POST register
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email et mot de passe requis.');
    }
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(400).send('Cet email est déjà utilisé.');
            }
            return res.status(500).send('Erreur lors de la création du compte.');
        }
        const userId = this.lastID;
        // Ajout d'une entrée dans la table accounts pour ce user
        db.run('INSERT INTO accounts (user_id, visited_pages) VALUES (?, ?)', [userId, '[]'], (err) => {
            if (err) {
                return res.status(500).send('Erreur lors de la création du compte (accounts).');
            }
            req.session.userId = userId;
            res.redirect('/account/account_passed.html');
        });
    });
});

// POST login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email et mot de passe requis.');
    }
    db.get('SELECT id FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) return res.status(500).send('Erreur lors de la connexion.');
        if (!row) return res.status(401).send('Identifiants invalides.');
        req.session.userId = row.id;
        res.redirect('/account/account_passed.html');
    });
});

// ROUTE POUR VÉRIFIER LA SESSION
app.get('/me', (req, res) => {
    if (req.session.userId) {
        res.json({ connected: true });
    } else {
        res.json({ connected: false });
    }
});

// Page après login/register
app.get('/account/account_passed.html', (req, res) => {
    if (!req.session.userId) return res.redirect('/');
    res.sendFile(path.join(__dirname, '../public/account/account_passed.html'));
});

// Route pour récupérer les pages visitées
app.get('/account/visited', (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ visitedPages: [] });
    db.get('SELECT visited_pages FROM accounts WHERE user_id = ?', [userId], (err, row) => {
        if (err) return res.status(500).json({ visitedPages: [] });
        let visitedPages = [];
        if (row && row.visited_pages) {
            try {
                visitedPages = JSON.parse(row.visited_pages);
            } catch (e) {}
        }
        res.json({ visitedPages });
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
