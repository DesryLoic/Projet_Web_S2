// Sélectionner le bouton menu et la barre de navigation
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

// Ajouter un événement au clic sur le bouton hamburger pour afficher/masquer le menu
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('show-menu');
});

const events = [
    {
        date: "12000 ou 11000 av. J.-C.",
        title: "L’époque Jomon",
        image: "../img/frise/jomon.jpg",
        info:"Les premières traces de poterie et de peuples humains sont trouvées près de Nagasaki. "
    },
    {
        date: "188-248",
        title: "Himiko reine du Yamatai",
        image: "../img/frise/reine_himiko.jpg",
        info:"Himiko chef du Yamatai (un des royaumes du pays des Wa) unifie une trentaine de chefferie (pays). Il est dit qu’elle possède des pouvoirs semblables à ceux d’une prêtresse chamane. Elle entretient des relations étroites avec les Wei en Chine."
    },
    {
        date: "VIème siècle",
        title: "Le bouddhisme, nouvelle religion officielle ?",
        image: "../img/frise/bouddhisme.png",
        info:"Sous la dynastie des Han au Ier siècle de notre ère, le bouddhisme se répand en Chine. Toutefois dans la seconde moitié du VIème siècle, contrairement aux rois coréens qui adoptent le bouddhisme comme religion officielle, le roi Kinmei de la monarchie de Yamato refuse de l’adopter afin de ne pas attirer les foudres des divinités locales."
    },
    {
        date: "646",
        title: "La grande réforme Taika",
        image: "../img/frise/reforme_taika.jpg",
        info:"Au lendemain du coup d’état de 646, la reine Kogyoku abdique en faveur du prince Kotoku (645-654). S’en suivirent de nombreuses réformes fondamentales dont la création des institutions de cour qui perdureront jusqu’au réformes de Meiji au XIXème siècle. Une réforme du calendrier est promulguée instaurant le système des ères. La structure administrative de L’Etat est également réformée : les terres privées sous la tutelle des grandes familles aristocratiques et de la famille royale sont déclarées publiques."
    },
    {
        date: "712",
        title: "Le Kojiki ou l'histoire des mythes impériaux japonais",
        image: "../img/frise/amaterasu.jpg",
        info:"Les chroniques impériales reflétaient la puissance de l’Etat et avaient pour objectif de légitimer la monarchie impériale. Publié en 712, le Kojiki décrit les mythes et l’histoire du pays depuis la conception du monde jusqu’à la régence de Shôtoku Taishi. Il évoque la création du ciel et de la terre, de l’archipel, des dieux et des hommes ainsi que l’apparition de la déesse du Soleil et de ses descendants pour gouverner le pays."
    },
    {
        date: "1260-1281",
        title: "Invasions mongoles",
        image: "../img/frise/invasions_mongoles.jpg",
        info:"Vers les années 1260, les mongols envisagent sérieusement l’invasion du japon. En 1274, les mongols réunissent une flotte de 20000 hommes et attaquent les côtes des îles de Tsushima puis d’Iki. Ils utilisent des bombes explosives qui effraient les chevaux des samouraïs. Pendant la nuit, une tempête s’abat et détruit plus de 200 embarcations et les survivants ne sont pas en état de combattre. Les mongols quittent les îles japonaises mais attendent une opportunité pour y retourner. <br>En 1281, les mongoles sont de retour. Cette fois-ci ce sont 140000 hommes prêts à combattre qui débarquent sur le sol japonais. Toutefois, les fortifications japonaises sur les pages empêchent la cavalerie mongole d’avancer. De plus, une autre tempête s’abat sur la région et dévaste de nouveau la flotte mongole qui bat en retraite. Les survivants sont sabrés par les samouraïs, sans pitié."
    },
    {
        date: "1350",
        title: "L'essor de la piraterie Wako",
        image: "../img/frise/wako.png",
        info:"Les Wako sont des pirates principalement issus des îles occidentales de Kyushu et des îles situées au large comme Tsushima ou Iki. <br> La piraterie connaît un essor en 1350 en raison de l’instabilité politique de la région. Les conditions de vie rendues difficiles poussent les gens à saborder les navires marchands et à revendre les prisonniers en tant qu’esclaves. "
    },
    {
        date: "XVe siècle",
        title: "L'ikebana ou l'art floral",
        image: "../img/frise/ikebana.jpg",
        info:"A partir du XVème siècle, l’ikebana devient une mode incontournable. A Kyoto naît l’école Ikenobô, centre de l’art ikebana au XVIème siècle."
    },
    {
        date: "XVIe siècle",
        title: "Les premiers européens sur l'archipel nippon",
        image: "../img/frise/portugais.png",
        info:"Au XVIe siècle, les premiers européens débarquent en Asie sur les îles japonaises. Ce sont majoritairement des Portugais venus commercer mais il sont aussi accompagnés de missionnaires jésuites, comme François Xavier, venus répandre la foi chrétienne. Plus tard au XVIIe siècle, les Anglais et les Hollandais feront également la découverte du Japon."
    },
    {
        date: "1560-1582",
        title: "Oda Nobunaga, le premier unificateur du Japon",
        image: "../img/frise/oda_nobunaga.jpg",
        info:"Après avoir vaincu en 1560 Imagawa Yoshimoto, Oda Nobunaga, un seigneur installé dans l'Owari (non loin de l'actuel Nagoya) parvient à entrer à Kyoto en 1568. <br>En 1573, il entre en conflit avec le Shogun en titre, Ashikaga Yoshiaki, qu’il expulse mettant ainsi un terme au shogunat Ashikaga. Cette date marque la fin des temps médiévaux au Japon. <br>Nobunaga est le premier daimyo à avoir utilisé l'idée de constituer des corps d'arquebusiers. Il est aussi l'un des premiers à utiliser l'artillerie, ce qui oblige les seigneurs à renforcer les défenses de leur château. Il se fait bâtir à Azuchi, non loin du lac Biwa, un château particulièrement imposant surmonté d'un donjon au pied duquel il installe ses guerriers. <br>Il finit par décéder brutalement en 1582 lors de la guerre contre les Mori qui contrôlent l'ouest de l'île principale de Honshū."
    },
    {
        date: "1612-1635",
        title: "Le Sakoku ou l’Interdiction de la mer",
        image: "../img/frise/sakoku.png",
        info:"Dans les années 1612-1614, la politique japonaise d'ouverture aux étrangers change du tout au tout : la liberté de résidence dans l'archipel est remise en cause. <br> En 1616, les restrictions se durcissent et en 1635 est décrété l'interdiction aux japonais de se rendre à l'étranger et ceux qui résident outre-mer n'ont plus le droit de rentrer. L'année suivante les Portugais se voient interdits d'aborder l'archipel en dehors de l’ilôt de Dejima construit dans la rade de nagasaki. <br>En 1639, Les Portugais sont définitivement expulsés du Japon. Le commerce avec les Pays-Bas, le seul autorisé avec les Européens, fait également l'objet de sévères réglementations."
    },
    {
        date: "1837",
        title: "La révolte d’Oshio Heihachiro",
        image: "../img/frise/oshio_heihachiro.jpg",
        info:"En 1837, la famine s'abat sur Osaka. Un lettré fils de samouraï et fonctionnaire du Shogun, Oshio Heihachiro, prend alors la tête d'une insurrection populaire. <br> Il appelle à la révolte et critique le système shogunal. La révolte a pour objet le remplacement des hommes corrompus comme les fonctionnaires du Shogun fermant les yeux sur des abus de marchand. Il réclame aussi l'organisation de distributions gratuites de nourriture dans la ville. Oshio fait incendié des maisons de fonctionnaires corrompus provoquant de nombreux incendies dans toute la ville. <br>Cependant, la police rétablit la situation et Oshio s'enfuit puis se suicide. Ses partisans furent capturés et torturés avant d’être exécutés."
    },
    {
        date: "Août 1945 ",
        title: "Bombardements américains sur Hiroshima et Nagasaki",
        image: "../img/frise/bombardements.jpg",
        info: "Le 6 août 1945, une bombe atomique à l'uranium est larguée sur Hiroshima. Le 9 août, c'est cette fois-ci Nagasaki, ville située plus au sud, qui est rayée de la carte par l'explosion d'une autre bombe fabriquée cette fois avec du plutonium."
        },
    {
        date: "25 juin 1950",
        title: "Guerre de Corée",
        image: "../img/frise/guerre_coree.png",
        info:"La guerre éclate le 25 juin 1950. Les communistes du Nord s'emparent de Séoul deux jours plus tard et occupent presque toute la péninsule dès la fin juillet. Les Américains débarquent alors dans le centre de la péninsule et reprennent Séoul en septembre. Ils franchissent le 38e parallèle et porte la guerre dans le nord. La situation se stabilise sur le plan militaire autour du 38e parallèle permettant l'ouverture de négociations en juillet 1951.<br> Les conséquences sont considérables pour le Japon. Les Américains accordent le droit aux japonais de se réarmer et l'économie japonaise connaît un renouveau grâce à la guerre américaine en Corée. Les américains passent en effet des commandes à l'industrie japonaise dans le secteur du textile et de l'industrie automobile. La guerre de Corée joue en quelque sorte au Japon le rôle du plan Marshall en Europe. Cette guerre pousse également le gouvernement américain à signer un traité de paix avec le Japon ainsi qu'un traité de sécurité militaire."
    }
];

let currentIndex = 0;

function updateTimeline() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";

    events.forEach((event, i) => {
        const eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.innerHTML = `<strong>${event.date}</strong><br>${event.title}<div class="dot"></div>`;
        if (i === currentIndex) {
            eventElement.classList.add("active");
            setTimeout(() => {
                eventElement.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                });
            }, 10); // petit délai pour garantir que le DOM est prêt
        }
        timeline.appendChild(eventElement);
    });

    // Affichage détaillé
    const display = document.getElementById("event-display");
    const { date, title, info, image } = events[currentIndex];
    display.querySelector("#event-title").innerText = `${date}`;
    display.querySelector("#event-description").innerText = title;
    display.querySelector("#event-info").innerHTML = info;
    display.querySelector("#event-image").src = image;
}

function prevEvent() {
    currentIndex = (currentIndex - 1 + events.length) % events.length;
    updateTimeline();
}

function nextEvent() {
    currentIndex = (currentIndex + 1) % events.length;
    updateTimeline();
}

window.onload = updateTimeline;
