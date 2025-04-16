// Sélectionner le bouton menu et la barre de navigation
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

// Ajouter un événement au clic sur le bouton hamburger pour afficher/masquer le menu
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('show-menu');
});


document.addEventListener("DOMContentLoaded", () => {
    loadAffection();
    updateAffectionUI();
});

const statusMessage = document.getElementById("status-message");
const affectionLevel = document.getElementById("affection-level");
const fox = document.getElementById("fox");

const isLoggedIn = true; // ou false selon l'état réel
const userId = "utilisateur123"; // identifiant unique, par ex. récupéré au login


let affection = 0;  // affinité de départ

function loadAffection() {
    if (isLoggedIn) {
        const saved = localStorage.getItem(`affection_${userId}`);
        affection = saved ? parseInt(saved) : 0;
    } else {
        affection = 0; // visiteur : jamais sauvegardé
    }
}

// si l'utilisateur est connecté
function saveAffection() {
    if (isLoggedIn) {
        localStorage.setItem(`affection_${userId}`, affection);
    }
}

// update de l'affinité
updateAffectionUI();
    function updateAffectionUI() {
        affectionLevel.innerText = `Niveau d'affection : ${affection}`;

        // Changer l'image du renard en fonction du niveau d'affection
        /*
        if (affection >= 11) {
            fox.src = "fox-happy-flower.png"; // Renard avec une fleur
        } else if (affection >= 6) {
            fox.src = "fox-happy.png"; // Renard content
        } else {
            fox.src = "fox.jpeg"; // Renard neutre
        }
            */
        

        const heartThresholds = [20, 40, 60, 80, 100]; // Par exemple, si affection max = 25
        for (let i = 0; i < 5; i++) {
            const heart = document.getElementById(`heart${i + 1}`);
            const wasFull = heart.src.includes("../img/heart_full.png");
            const shouldBeFull = affection >= heartThresholds[i];
    
            if (shouldBeFull && !wasFull) {
                heart.src = "../img/heart_full.png";
                heart.classList.add("heart-pop");
                setTimeout(() => heart.classList.remove("heart-pop"), 300);
            } else if (!shouldBeFull) {
                heart.src = "../img/heart_empty.png";
            }
        }
    }

    function increaseAffection() {
        affection++;
        saveAffection(); //  sauvegarde si connecté
        updateAffectionUI();
    }

    function feedFox() {
        fox.src = "fox-manger.png";
        statusMessage.innerText = "Tu as donné une pomme à ton renard ! Il est content !";
        increaseAffection();
    }

    function petFox() {
        fox.src = "fox-caresse.png";
        statusMessage.innerText = "Tu as caressé ton renard. Il ferme les yeux de bonheur !";
        increaseAffection();
    }

    function playWithFox() {
        fox.src = "fox-jouer.png";
        statusMessage.innerText = "Tu as lancé une balle à ton renard ! Il court après en remuant la queue.";
        increaseAffection();
    }

    function resetAffection() {
        fox.src = "fox.png";
        affection = 0;
        saveAffection();
        updateAffectionUI();
    }
    