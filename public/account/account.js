
// Exemple d'utilisation : appeler cette fonction avec l'ID utilisateur et le chemin de la page
const userId = sessionStorage.getItem('userId'); // Assurez-vous que l'ID utilisateur est stocké
if (!userId) {
    console.error('User ID not found in sessionStorage.');
} else {
    console.log('User ID found:', userId);
}