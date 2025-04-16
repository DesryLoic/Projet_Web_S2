// Sélectionner le bouton menu et la barre de navigation
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

// Ajouter un événement au clic sur le bouton hamburger pour afficher/masquer le menu
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('show-menu');
});

let carousels = [
    { index: 0, slides: [], dots: [] },
    { index: 0, slides: [], dots: [] }
];

function initializeCarousels() {
    for (let i = 0; i < carousels.length; i++) {
        carousels[i].slides = document.querySelectorAll(`#carousel${i + 1} .carousel-image`);
        carousels[i].dots = document.querySelectorAll(`#dots${i + 1} .dot`);
        updateCarousel(i);
    }
}

function updateCarousel(carouselIndex) {
    const offset = -carousels[carouselIndex].index * 100;
    document.querySelector(`#carousel${carouselIndex + 1} .carousel`).style.transform = `translateX(${offset}%)`;
    carousels[carouselIndex].dots.forEach(dot => dot.classList.remove("active"));
    carousels[carouselIndex].dots[carousels[carouselIndex].index].classList.add("active");
}

function nextSlide(carouselIndex) {
    carousels[carouselIndex].index = (carousels[carouselIndex].index + 1) % carousels[carouselIndex].slides.length;
    updateCarousel(carouselIndex);
}

function prevSlide(carouselIndex) {
    carousels[carouselIndex].index = (carousels[carouselIndex].index - 1 + carousels[carouselIndex].slides.length) % carousels[carouselIndex].slides.length;
    updateCarousel(carouselIndex);
}

function goToSlide(index, carouselIndex) {
    carousels[carouselIndex].index = index;
    updateCarousel(carouselIndex);
}

setInterval(() => nextSlide(0), 8000); // Défilement automatique du premier carrousel toutes les 8 secondes
setInterval(() => nextSlide(1), 8000); // Défilement automatique du deuxième carrousel toutes les 8 secondes

initializeCarousels();

