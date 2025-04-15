document.addEventListener("DOMContentLoaded", function () {
    const regions = document.querySelectorAll(".map__image a");
    const regionLinks = document.querySelectorAll(".map__list a");
    let activeRegion = null;
    
    // Création de la boîte d'infos
    const infoBox = document.querySelector("#chat-bubble");


    // Dictionnaire des descriptions par région
    const regionDescriptions = {
        "Chubu": "Située entre Tokyo et Kyoto, Chūbu combine montagnes, plaines et littoral, et abrite des industries de pointe, ainsi que le célèbre Mont Fuji.",
        "Chugoku": "Située à l’ouest de Honshū, Chūgoku est une région contrastée entre zones industrielles (comme Hiroshima) et campagnes montagneuses, connue pour son patrimoine historique et ses paysages côtiers",
        "Hokkaido": "La région la plus au nord du Japon, Hokkaidō est connue pour ses vastes espaces naturels, ses stations de ski, et sa production agricole.",
        "Kanto": "Région autour de Tokyo, cœur économique et culturel du Japon, Kantō est la plus densément peuplée et un centre majeur de la technologie et des affaires.",
        "Kansai": "Cette région historique est le berceau de nombreuses traditions japonaises, avec des villes emblématiques comme Kyoto, Osaka et Nara, et un riche patrimoine culturel.",
        "Kyushu": "L'île méridionale du Japon, Kyushu est un centre d'industrialisation, avec une riche histoire culturelle et des sites naturels comme les volcans et les onsens.",
        "Okinawa": "Un archipel subtropical au sud, Okinawa possède une culture unique, influencée par son histoire indépendante et son rôle stratégique dans la Seconde Guerre mondiale.",
        "Shikoku": "La plus petite des îles principales du Japon, Shikoku est célèbre pour ses temples bouddhistes, son pèlerinage spirituel et ses paysages montagneux et côtiers.",
        "Tohoku": "Située au nord de Honshu, Tohoku est une région montagneuse et agricole, réputée pour ses paysages naturels, son histoire, et ses festivals traditionnels."       
    };

    
    // Dictionnaire des descriptions par ville
    const cityDescriptions = {
        "Nara":"",
        "Osaka":"Osaka est connue pour sa cuisine de rue, son château et son ambiance dynamique.",
        "Hiroshima":"Hiroshima est une ville symbole de paix avec le Mémorial de la Paix et l'île de Miyajima à proximité.",
        "Nagasaki":"",
        "Tokyo":"Tokyo est la capitale du Japon, un centre économique et culturel majeur avec une vie urbaine trépidante.",
        "Kyoto":"Kyoto est célèbre pour ses temples, ses jardins et son héritage culturel préservé.",
        "Sapporo":"",
        "Kobe":"",
        "Fukuoka":"Fukuoka est une ville portuaire dynamique avec une scène culinaire réputée et de nombreux festivals.",
        "Fukushima":"",
        "Kumamoto":"",
        "Yokohama":"",
        "Kawasaki":"",
        "Nagano":"",
        "Kanazawa":"",
        "Hakodate":"",
        "Asahikawa":""
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
            const detailsLink = `<br><a href="details.html?region=${encodeURIComponent(regionName)}" target="_blank">Cliquez ici pour en apprendre plus</a>`;
            infoBox.innerHTML = `<strong>${regionName}</strong><br>${description}${detailsLink}`;
            infoBox.style.display = "grid";
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
                    const detailsLink = `<br><a href="details.html?region=${encodeURIComponent(regionName)}" target="_blank">Cliquez ici pour en savoir plus</a>`;
                    infoBox.innerHTML = `<strong>${regionName}</strong><br>${description}${detailsLink}`;
                    infoBox.style.display = "grid";
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
            infoBox.style.display = "grid";
        });
    });
});
