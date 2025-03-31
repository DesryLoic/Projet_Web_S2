document.addEventListener("DOMContentLoaded", function () {
    const regions = document.querySelectorAll(".map__image a");
    const regionLinks = document.querySelectorAll(".map__list a");
    let activeRegion = null;
    
    // Création de la boîte d'infos
    const infoBox = document.createElement("div");
    infoBox.id = "kitsune-info";
    infoBox.style.position = "fixed";
    infoBox.style.fontSize = "10px";
    infoBox.style.bottom = "20px";
    infoBox.style.right = "20px";
    infoBox.style.background = "white";
    infoBox.style.padding = "10px";
    infoBox.style.border = "2px solid black";
    infoBox.style.display = "none";
    document.body.appendChild(infoBox);
    // Dictionnaire des descriptions par région
    const regionDescriptions = {
        "Hokkaido": "Hokkaido est la région la plus septentrionale du Japon, célèbre pour ses paysages enneigés et sa faune sauvage.",
        "Tohoku": "Tohoku est une région montagneuse, connue pour ses sources chaudes et ses festivals traditionnels.",
        "Kanto": "Kanto abrite Tokyo, la capitale du Japon, ainsi que Yokohama et d'autres grandes villes.",
        "Chubu": "Chubu est une région variée, avec les Alpes japonaises et la ville historique de Nagoya.",
        "Kansai": "Kansai est le cœur culturel du Japon avec Kyoto, Osaka et Nara, riches en histoire.",
        "Chugoku": "Chugoku est connue pour Hiroshima et le sanctuaire de Miyajima.",
        "Shikoku": "Shikoku est célèbre pour son pèlerinage des 88 temples et ses paysages côtiers.",
        "Kyushu": "Kyushu offre une nature luxuriante, des sources chaudes et la ville historique de Nagasaki.",
        "Okinawa": "Okinawa est un paradis tropical avec des plages magnifiques et une culture unique."
    };
    // Dictionnaire des descriptions par ville
    const cityDescriptions = {
        "Tokyo": "Tokyo est la capitale du Japon, un centre économique et culturel majeur avec une vie urbaine trépidante.",
        "Kyoto": "Kyoto est célèbre pour ses temples, ses jardins et son héritage culturel préservé.",
        "Osaka": "Osaka est connue pour sa cuisine de rue, son château et son ambiance dynamique.",
        "Hiroshima": "Hiroshima est une ville symbole de paix avec le Mémorial de la Paix et l'île de Miyajima à proximité.",
        "Fukuoka": "Fukuoka est une ville portuaire dynamique avec une scène culinaire réputée et de nombreux festivals."
    };
    
    regions.forEach(region => {
        const path = region.querySelector("path");
        const regionName = region.getAttribute("xlink:title");
        
        region.addEventListener("mouseenter", () => {
            if (region !== activeRegion) {
                path.style.fill = "#d4331e"; // Couleur au survol
            }
            const tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");
            tooltip.innerText = regionName;
            tooltip.style.position = "absolute";
            tooltip.style.background = "white";
            tooltip.style.border = "1px solid black";
            tooltip.style.padding = "5px";
            tooltip.style.fontSize = "12px";
            const map = document.querySelector(".map__image"); // Sélectionne la carte
            const mapRect = map.getBoundingClientRect(); // Position de la carte
            tooltip.style.left = `${mapRect.left + 10}px`; // Position à gauche de la carte
            tooltip.style.top = `${mapRect.top + 10}px`; // Position en haut de la carte       
            tooltip.id = "region-tooltip";
            document.body.appendChild(tooltip);
        });

        region.addEventListener("mouseleave", () => {
            if (region !== activeRegion) {
                path.style.fill = "#e89680"; // Revenir à la couleur de base
            }
            const tooltip = document.getElementById("region-tooltip");
            if (tooltip) tooltip.remove();
        });

        region.addEventListener("click", () => {
            if (activeRegion) {
                activeRegion.querySelector("path").style.fill = "#e89680";
            }
            activeRegion = region;
            path.style.fill = "#b42b18"; // Couleur active après clic
            
            const description = regionDescriptions[regionName] || "Pas d'informations disponibles.";
            infoBox.innerHTML = `<strong>${regionName}</strong><br>${description}`;
            infoBox.style.display = "block";
        });
        
        regionLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Empêche le lien de rediriger
                const regionName = this.textContent.trim(); // Récupère directement le texte du lien (nom de la région)
        
                const region = [...regions].find(r => r.getAttribute("xlink:title") === regionName);
                
                if (region) {
                    if (activeRegion) {
                        activeRegion.querySelector("path").style.fill = "#e89680"; // Réinitialisation de la couleur
                    }
                    activeRegion = region;
                    const path = region.querySelector("path");
                    path.style.fill = "#b42b18"; // Couleur après clic
        
                    const description = regionDescriptions[regionName] || "Pas d'informations disponibles.";
                    infoBox.innerHTML = `<strong>${regionName}</strong><br>${description}`;
                    infoBox.style.display = "block";
                }
            });
        });
    });
    // Ajout des interactions pour les torii (villes)
    const toriiIcons = document.querySelectorAll(".torii");

    toriiIcons.forEach(torii => {
        const cityName = torii.getAttribute("data-city");

        torii.addEventListener("mouseenter", () => {
            const tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");
            tooltip.innerText = cityName;
            tooltip.style.position = "absolute";
            tooltip.style.background = "white";
            tooltip.style.border = "1px solid black";
            tooltip.style.padding = "5px";
            tooltip.style.fontSize = "12px";
            const map = document.querySelector(".map__image"); // Sélectionne la carte
            const mapRect = map.getBoundingClientRect(); // Position de la carte
            const toriiRect = torii.getBoundingClientRect(); // Position du Torii

            tooltip.style.left = `${mapRect.left + 10}px`; // Position à gauche de la carte
            tooltip.style.top = `${mapRect.top + 10}px`; // Position en haut de la carte       
            tooltip.id = "city-tooltip";
            document.body.appendChild(tooltip);
        });

        torii.addEventListener("mouseleave", () => {
            const tooltip = document.getElementById("city-tooltip");
            if (tooltip) tooltip.remove();
        });

        torii.addEventListener("click", () => {
            if (activeRegion) {
                activeRegion.querySelector("path").style.fill = "#e89680";
            }
            activeRegion = null;
            const description = cityDescriptions[cityName] || "Pas d'informations disponibles.";
            infoBox.innerHTML = `<strong>${cityName}</strong><br>${description}`;
            infoBox.style.display = "block";
        });
    });
});
