// Sélectionner le bouton menu et la barre de navigation
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

// Ajouter un événement au clic sur le bouton hamburger pour afficher/masquer le menu
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('show-menu');
});

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
        "Nara":"Ancienne capitale impériale, Nara charme par ses temples millénaires, ses grands bouddhas et ses célèbres cerfs en liberté dans le parc de Nara. C’est un lieu paisible chargé d’histoire",
        "Osaka":"Vibrante et conviviale, Osaka séduit par sa gastronomie de rue, son château emblématique et ses quartiers animés comme Dotonbori. Elle est également l'hôte de l'exposition universelle de 2025",
        "Hiroshima":"Connue pour sa résilience, Hiroshima allie mémoire et espoir avec le Parc du Mémorial de la Paix, tout en offrant une culture vivante.",
        "Nagasaki":"Ville portuaire au riche passé cosmopolite, Nagasaki fascine par son histoire ouverte sur le monde, ses églises chrétiennes, son parc de la paix et ses paysages volcaniques.",
        "Tokyo":"Capitale dynamique et tentaculaire, Tokyo mêle gratte-ciels futuristes, temples anciens, culture pop et quartiers contrastés, de Shibuya à Asakusa. C’est une immersion totale dans le Japon contemporain.",
        "Kyoto":"Ancienne capitale impériale, Kyoto est le cœur spirituel du Japon avec ses milliers de temples, ses jardins zen, ses geishas et ses ruelles préservées du vieux Japon.",
        "Sapporo":"Capitale d’Hokkaidō, Sapporo est réputée pour son festival de neige, sa bière, sa cuisine régionale et ses vastes espaces naturels accessibles en toute saison.",
        "Kobe":"Élégante et ouverte sur la mer, Kobe est célèbre pour son bœuf de renommée mondiale, son architecture mêlant styles occidentaux et japonais, et sa douceur de vivre en bord de montagne.",
        "Fukuoka":"Porte d’entrée vers l’Asie continentale, Fukuoka combine plages urbaines, street food savoureuse (notamment les yatai) et une ambiance détendue et accueillante.",
        "Fukushima":"Au-delà de la catastrophe de 2011, Fukushima offre des sources chaudes réputées, des paysages bucoliques, des traditions vivaces et une volonté de renouveau.",
        "Kumamoto":"Dominée par son impressionnant château, Kumamoto est une ville d’histoire et de nature, proche du spectaculaire mont Aso, l’un des plus grands volcans actifs du Japon.",
        "Yokohama":"Ville portuaire moderne aux portes de Tokyo, Yokohama allie front de mer élégant, quartiers internationaux, musées originaux et l’un des plus grands Chinatown du pays.",
        "Kawasaki":"Entre Tokyo et Yokohama, Kawasaki est dynamique, industrielle et culturelle, avec des temples surprenants, des festivals exubérants et une scène artistique en plein essor.",
        "Nagano":"Entourée de montagnes, Nagano attire pour son temple Zenko-ji, ses sports d’hiver et sa proximité avec les singes des neiges des sources chaudes de Jigokudani.",
        "Kanazawa":"Entourée de montagnes, Nagano attire pour son temple Zenko-ji, ses sports d’hiver et sa proximité avec les singes des neiges des sources chaudes de Jigokudani.",
        "Hakodate":"Ville portuaire du sud d’Hokkaidō, Hakodate charme avec sa colline panoramique, ses bâtiments occidentalisés et son marché aux fruits de mer très réputé.",
        "Asahikawa":"Située au centre d’Hokkaidō, Asahikawa est appréciée pour son zoo renommé, sa proximité avec les montagnes Daisetsuzan et son excellent ramen local."
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
            tooltip.style.position = "fixed";
            tooltip.style.background = "white";
            tooltip.style.border = "1px solid black";
            tooltip.style.padding = "5px";
            tooltip.style.fontSize = "12px";
            const map = document.querySelector(".map__image"); // Sélectionne la carte
            const mapRect = map.getBoundingClientRect(); // Position de la carte
            region.addEventListener("mousemove", (e) => {
                const tooltip = document.getElementById("region-tooltip");
                if (tooltip) {
                    tooltip.style.left = `${e.clientX + 10}px`;
                    tooltip.style.top = `${e.clientY + 10}px`;
                }
            });
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
            tooltip.style.position = "fixed";
            tooltip.style.background = "white";
            tooltip.style.border = "1px solid black";
            tooltip.style.padding = "5px";
            tooltip.style.fontSize = "12px";
            const map = document.querySelector(".map__image"); // Sélectionne la carte
            const mapRect = map.getBoundingClientRect(); // Position de la carte
            const toriiRect = torii.getBoundingClientRect(); // Position du Torii
            torii.addEventListener("mousemove", (e) => {
                const tooltip = document.getElementById("city-tooltip");
                if (tooltip) {
                    tooltip.style.left = `${e.clientX + 10}px`;
                    tooltip.style.top = `${e.clientY + 10}px`;
                } 
            });
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
