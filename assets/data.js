const tripDays = [
  {
    date: '20/09/2026',
    title: 'Jour 1',
    route: 'Toulouse → Los Angeles',
    flights: {
      title: 'Vol aller',
      connection: '2h45',
      duration: '15h50',
      segments: [
        {
          number: 'AF 7421',
          from: 'Toulouse (TLS)',
          to: 'Paris Charles de Gaulle (CDG)',
          depart: '06:05',
          arrive: '07:35'
        },
        {
          number: 'AF 22',
          from: 'Paris Charles de Gaulle (CDG)',
          to: 'Los Angeles (LAX)',
          depart: '10:20',
          arrive: '12:55'
        }
      ]
    },
    car: {
      label: 'Récupération voiture',
      time: '20/09/2026 14:00',
      place: 'Los Angeles Intl Airport',
      agency: 'Dollar',
      model: 'Kia K5 ou similaire'
      },
      hotel: {
        name: 'Hollywood Melrose Hotel',
        address: '5162 Melrose Ave, Los Angeles, CA 90038, États-Unis',
        dates: '20/09/2026 au 24/09/2026',
        nights: '4 nuits',
        breakfast: false,
        mealPlan: 'Chambre seulement',
      roomType: 'Double room king bed - de luxe',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038',
        reception: 'Réception à confirmer avant le départ'
      },
      itinerary: [
        { time: 'Après l’atterrissage', label: 'Récupérer la voiture à l’agence Dollar à LAX' },
        { time: 'Courses', label: 'Faire les courses au Walmart Neighborhood Market avant de passer à l’hôtel' },
        { time: 'Juste après', label: 'Passer à l’hôtel Hollywood Melrose Hotel pour déposer les bagages / check-in' },
        { time: 'Début d’après-midi', label: 'Venice Canals pour la première balade calme' },
        { time: 'Milieu d’après-midi', label: 'Venice Beach et Muscle Beach' },
        { time: 'Fin de journée', label: 'Santa Monica Beach puis Santa Monica Pier au coucher du soleil' }
      ],
    map: {
      title: 'Jour 1 - Los Angeles',
      center: { lat: 34.0, lng: -118.46 },
        zoom: 12,
         stops: [
           { label: 'LAX / Dollar', lat: 33.9416, lng: -118.4085 },
           {
             label: 'Walmart Neighborhood Market',
             lat: 33.9001875,
             lng: -118.3623568,
             mapsUrl: 'https://www.google.com/maps/place/Walmart+Neighborhood+Market/@33.9227447,-118.4374839,17794m/data=!3m1!1e3!4m6!3m5!1s0x80c2b43be0dbb991:0x4500547e27e08cfd!8m2!3d33.9001875!4d-118.3623568!16s%2Fg%2F1q5bpnwhq?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D'
           },
           {
             label: 'Hollywood Melrose Hotel',
             lat: 34.0834396,
             lng: -118.3137125,
             mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038'
           },
           { label: 'Venice Canals', lat: 33.9856, lng: -118.4722 },
           { label: 'Venice Beach', lat: 33.9850, lng: -118.4695 },
           { label: 'Muscle Beach', lat: 33.9855, lng: -118.4737, mapsUrl: 'https://www.google.com/maps/place/Muscle+Beach+Venice+Gym/@33.9854719,-118.4733791,278m/data=!3m1!1e3!4m6!3m5!1s0x80c2bbde9825e3c9:0xb6b7e4082eb28e0e!8m2!3d33.9853693!4d-118.4725161!16s%2Fg%2F11rvhnp2xh?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D' },
           { label: 'Santa Monica Pier', lat: 34.0094, lng: -118.4973 }
         ],
         directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Los+Angeles+International+Airport&destination=Santa+Monica+Pier&travelmode=driving&waypoints=Walmart+Neighborhood+Market%7CHollywood+Melrose+Hotel%7CVenice+Canals%7CVenice+Beach%7CMuscle+Beach'
      },
    highlights: [
      'Venice Canals',
      'Venice Beach',
      'Muscle Beach',
      'Santa Monica Beach',
      'Santa Monica Pier'
    ],
    links: [
      {
        label: 'Visiter Los Angeles : notre guide complet sur les lieux incontournables',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/los-angeles.php'
      },
      {
        label: 'Notre guide pour visiter les plages et rues de Santa Monica et Venice',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/santa-monica-venice.php'
      }
    ]
  },
  {
    date: '21/09/2026',
    title: 'Jour 2',
    route: 'Los Angeles',
    highlights: [
      'Hollywood Boulevard',
      'Walk of Fame',
      'Beverly Hills',
      'Rodeo Drive',
      'Sunset Boulevard',
      'Third Street Promenade'
    ],
      itinerary: [
        { time: 'Matin', label: 'Départ depuis le Hollywood Melrose Hotel' },
        { time: 'Matinée Hollywood', label: 'Hollywood Boulevard et Walk of Fame' },
        { time: 'Début d’après-midi', label: 'Beverly Hills puis Rodeo Drive et Sunset Boulevard' },
        { time: 'Soirée', label: 'Direction Third Street Promenade pour la fin de journée' }
      ],
    map: {
      title: 'Jour 2 - Hollywood, Beverly Hills & plage',
      center: { lat: 34.08, lng: -118.36 },
        zoom: 12,
        stops: [
          {
            label: 'Hollywood Melrose Hotel',
            lat: 34.0834396,
            lng: -118.3137125,
            mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038'
          },
          { label: 'Hollywood Boulevard', lat: 34.1016, lng: -118.3389 },
          { label: 'Walk of Fame', lat: 34.1019, lng: -118.3396 },
          { label: 'Beverly Hills', lat: 34.0736, lng: -118.4004, mapsUrl: 'https://www.google.com/maps/place/Beverly+Hills,+Californie,+%C3%89tats-Unis/@34.0688506,-118.4030033,1867m/data=!3m1!1e3!4m11!3m10!1s0x80c2bc04d6d147ab:0xd6c7c379fd081ed1!5m4!1s2026-09-20!2i4!4m1!1i2!8m2!3d34.0730715!4d-118.4016265!16zL20vMGswNDk?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D' },
        { label: 'Rodeo Drive', lat: 34.0675, lng: -118.4016 },
        { label: 'Sunset Boulevard', lat: 34.0900, lng: -118.3849 },
        { label: 'Third Street Promenade', lat: 34.0156, lng: -118.4960, mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Third+Street+Promenade+Santa+Monica' }
      ],
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038&destination=Third+Street+Promenade+Santa+Monica&travelmode=driving&waypoints=Hollywood+Boulevard%7CWalk+of+Fame%7CBeverly+Hills%7CRodeo+Drive%7CSunset+Boulevard'
      },
    links: [
      {
        label: 'Nos conseils pour visiter Hollywood, quartier le plus célèbre de LA',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/hollywood.php'
      },
      {
        label: 'Visiter Beverly Hills et Rodeo Drive, les quartiers chics de LA',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/beverly-hills.php'
      },
      {
        label: 'En complément: plage de Santa Monica et Venice',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/santa-monica-venice.php'
      }
    ]
  },  {
    date: '22/09/2026',
    title: 'Jour 3',
    route: 'Los Angeles',
    highlights: ['Universal Studios'],
    itinerary: [
      { time: 'Matin', label: 'Départ depuis le Hollywood Melrose Hotel' },
      { time: 'Journée', label: 'Universal Studios Hollywood' }
    ],
    transport: {
      title: 'Accès sans voiture',
      summary: 'Hollywood Melrose Hotel → Universal Studios Hollywood',
      duration: 'environ 45 min',
      driveDuration: 'environ 16 min',
      hours: 'Ouverture: ~9h / Fermeture: ~18h (à vérifier selon le jour)',
      outbound: [
        'Marche jusqu’à Melrose & Wilton (Westbound)',
        'Bus Hollywood/Wilshire Northbound jusqu’à Hollywood Blvd & Argyle Ave (Eastbound)',
        'Marche jusqu’à Hollywood / Vine',
        'Métro B Line jusqu’à Universal City/Studio City',
        'Marche finale vers l’entrée du parc'
      ],
      inbound: [
        'Marche depuis l’entrée du parc jusqu’à Universal City/Studio City',
        'Métro B Line retour vers Hollywood / Vine',
        'Marche jusqu’à Hollywood Blvd & Argyle Ave',
        'Bus Hollywood/Wilshire Southbound puis retour à l’hôtel à pied'
      ],
      parking: 'Parking général du parc autour de 25 $.',
      link: {
        label: 'Universal Studios Hollywood - accès & conseils',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/universal-studios.php'
      }
    },
    map: {
      title: 'Jour 3 - Hôtel vers Universal Studios',
      center: { lat: 34.138, lng: -118.356 },
      zoom: 13,
      stops: [
        {
          label: 'Hollywood Melrose Hotel',
          lat: 34.0834396,
          lng: -118.3137125,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038'
        },
        {
          label: 'Universal Studios Hollywood',
          lat: 34.1381,
          lng: -118.3534,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Universal+Studios+Hollywood'
        }
      ],
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038&destination=Universal+Studios+Hollywood&travelmode=transit'
    },
    links: [
      {
        label: 'Universal Studios Hollywood - site officiel',
        url: 'https://www.universalstudioshollywood.com/'
      }
    ]
  },
  {
    date: '23/09/2026',
    title: 'Jour 4',
    route: 'Los Angeles',
    highlights: ['Universal Studios'],
    itinerary: [
      { time: 'Matin', label: 'Départ depuis le Hollywood Melrose Hotel' },
      { time: 'Journée', label: 'Universal Studios Hollywood' }
    ],
    transport: {
      title: 'Accès sans voiture',
      summary: 'Hollywood Melrose Hotel → Universal Studios Hollywood',
      duration: 'environ 45 min',
      driveDuration: 'environ 16 min',
      hours: 'Ouverture: ~9h / Fermeture: ~18h (à vérifier selon le jour)',
      outbound: [
        'Marche jusqu’à Melrose & Wilton (Westbound)',
        'Bus Hollywood/Wilshire Northbound jusqu’à Hollywood Blvd & Argyle Ave (Eastbound)',
        'Marche jusqu’à Hollywood / Vine',
        'Métro B Line jusqu’à Universal City/Studio City',
        'Marche finale vers l’entrée du parc'
      ],
      inbound: [
        'Marche depuis l’entrée du parc jusqu’à Universal City/Studio City',
        'Métro B Line retour vers Hollywood / Vine',
        'Marche jusqu’à Hollywood Blvd & Argyle Ave',
        'Bus Hollywood/Wilshire Southbound puis retour à l’hôtel à pied'
      ],
      parking: 'Parking général du parc autour de 25 $.',
      link: {
        label: 'Universal Studios Hollywood - accès & conseils',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/universal-studios.php'
      }
    },
    map: {
      title: 'Jour 4 - Hôtel vers Universal Studios',
      center: { lat: 34.138, lng: -118.356 },
      zoom: 13,
      stops: [
        {
          label: 'Hollywood Melrose Hotel',
          lat: 34.0834396,
          lng: -118.3137125,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038'
        },
        {
          label: 'Universal Studios Hollywood',
          lat: 34.1381,
          lng: -118.3534,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Universal+Studios+Hollywood'
        }
      ],
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038&destination=Universal+Studios+Hollywood&travelmode=transit'
    },
    links: [
      {
        label: 'Universal Studios Hollywood - site officiel',
        url: 'https://www.universalstudioshollywood.com/'
      }
    ]
  },
  {
    date: '24/09/2026',
    title: 'Jour 5',
    route: 'Los Angeles → Laughlin NV',
    transport: {
      title: 'Trajet routier',
      summary: 'Hollywood Melrose Hotel → Tropicana Laughlin',
      driveDuration: 'environ 4h30 · 430 km',
      outbound: [
        'Départ du Hollywood Melrose Hotel',
        'Route vers Laughlin en voiture',
        'Arrivée et check-in au Tropicana Laughlin'
      ]
    },
    itinerary: [
      { time: 'Matin', label: 'Départ du Hollywood Melrose Hotel' },
      { time: 'Route', label: 'Trajet en voiture vers Laughlin' },
      { time: 'Arrivée', label: 'Check-in au Tropicana Laughlin - A Caesars Rewards Destination' },
      { time: 'Après-midi', label: 'Piscine à l’hôtel (fermeture à 20h)' }
    ],
    highlights: ['Piscine à l’hôtel'],
    hotel: {
      name: 'Tropicana Laughlin - A Caesars Rewards Destination',
      address: '2121 Casino Drive, Laughlin, NV, États-Unis',
      dates: '24/09/2026 au 25/09/2026',
      nights: '1 nuit',
      breakfast: false,
      mealPlan: 'Chambre seulement / No meals',
      roomType: 'Double room king bed - de luxe',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tropicana+Laughlin+Caesars+Rewards+Destination+2121+Casino+Drive+Laughlin+NV',
      reception: 'Réception ouverte 24h/24'
    },
    map: {
      title: 'Jour 5 - Los Angeles vers Laughlin',
      center: { lat: 34.5, lng: -115.0 },
      zoom: 6,
      stops: [
        {
          label: 'Hollywood Melrose Hotel',
          lat: 34.0834396,
          lng: -118.3137125,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038'
        },
        {
          label: 'Tropicana Laughlin',
          lat: 35.1679,
          lng: -114.5767,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tropicana+Laughlin+Caesars+Rewards+Destination+2121+Casino+Drive+Laughlin+NV'
        }
      ],
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038&destination=Tropicana+Laughlin+Caesars+Rewards+Destination+2121+Casino+Drive+Laughlin+NV&travelmode=driving'
    }
  },
  {
    date: '25/09/2026',
    title: 'Jour 6',
    route: 'Laughlin NV → Grand Canyon AZ',
    transport: {
      title: 'Trajet routier',
      summary: 'Tropicana Laughlin → Holiday Inn Resort The Squire at Grand Canyon',
      driveDuration: 'prévoir environ 4h30 avec pause · 320 km',
      outbound: [
        'Départ du Tropicana Laughlin vers 8h-9h',
        'Route vers Tusayan et le Grand Canyon',
        'Arrivée au Holiday Inn Resort The Squire at Grand Canyon'
      ]
    },
    itinerary: [
      { time: 'Vers 8h', label: 'Départ du Tropicana Laughlin pour garder assez de marge dans l’après-midi' },
      { time: 'Route', label: 'Trajet vers Tusayan · prévoir environ 4h30 avec une pause' },
      { time: 'À l’arrivée', label: 'Mather Point puis Yavapai Point pour les premiers panoramas sur le Grand Canyon' },
      { time: 'Milieu d’après-midi', label: 'Arrivée à l’hôtel, dépôt des bagages et baignade · demander l’accès à la piscine si la chambre n’est pas encore prête' },
      { time: 'Avant 17h', label: 'Courses au Tusayan General Store pour préparer le pique-nique' },
      { time: 'Fin d’après-midi → coucher du soleil', label: 'Route panoramique vers Navajo Point, puis pique-nique face au canyon et au Colorado' }
    ],
    info: [
      {
        text: 'Coucher du soleil le 25/09/2026 à 18h20, heure locale. Arriver à Navajo Point vers 17h30-17h45.',
        sourceLabel: 'National Park Service',
        sourceUrl: 'https://www.nps.gov/grca/planyourvisit/sunrise_set_moon.htm'
      },
      'Prendre une veste : les températures baissent rapidement après le coucher du soleil.'
    ],
    highlights: [
      'Mather Point',
      'Yavapai Point',
      'Navajo Point au coucher du soleil',
      'Piscine à l’hôtel'
    ],
    hotel: {
      name: 'Holiday Inn Resort The Squire at Grand Canyon by IHG',
      address: '74 Highway 64, Tusayan, AZ 86023, États-Unis',
      dates: '25/09/2026 au 27/09/2026',
      nights: '2 nuits',
      breakfast: false,
      mealPlan: 'Chambre seulement',
      roomType: 'Room STANDARD',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Holiday+Inn+Resort+The+Squire+at+Grand+Canyon+74+Highway+64+Tusayan+AZ+86023',
      reception: 'Réception ouverte 24h/24 · check-in à partir de 16h · check-out avant 11h'
    },
    map: {
      title: 'Jour 6 - Laughlin vers Grand Canyon',
      center: { lat: 35.55, lng: -113.35 },
      zoom: 7,
      stops: [
        {
          label: 'Tropicana Laughlin',
          lat: 35.1679,
          lng: -114.5767,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tropicana+Laughlin+Caesars+Rewards+Destination+2121+Casino+Drive+Laughlin+NV'
        },
        {
          label: 'Mather Point',
          lat: 36.0613,
          lng: -112.1071,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mather+Point+Grand+Canyon'
        },
        {
          label: 'Yavapai Point',
          lat: 36.066,
          lng: -112.117,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yavapai+Point+Grand+Canyon'
        },
        {
          label: 'Holiday Inn Resort The Squire at Grand Canyon',
          lat: 35.9693408,
          lng: -112.1291202,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Holiday+Inn+Resort+The+Squire+at+Grand+Canyon+74+Highway+64+Tusayan+AZ+86023'
        },
        {
          label: 'Tusayan General Store',
          lat: 35.9755187,
          lng: -112.1247,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tusayan+General+Store+577+AZ-64+Tusayan+AZ+86023'
        },
        {
          label: 'Navajo Point',
          lat: 36.03851,
          lng: -111.83738,
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Navajo+Point+Grand+Canyon'
        }
      ],
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Tropicana+Laughlin+2121+Casino+Drive+Laughlin+NV&destination=Navajo+Point+Grand+Canyon&travelmode=driving&waypoints=Mather+Point+Grand+Canyon%7CYavapai+Point+Grand+Canyon%7CHoliday+Inn+Resort+The+Squire+at+Grand+Canyon%7CTusayan+General+Store+577+AZ-64'
    },
    links: [
      {
        label: 'Guide complet de Grand Canyon National Park',
        url: 'https://www.roadtrippin.fr/arizona/grand-canyon/grand-canyon.php'
      },
      {
        label: 'Points de vue et randonnées de Grand Canyon South Rim',
        url: 'https://www.roadtrippin.fr/arizona/grand-canyon/grand-canyon-south-rim.php'
      }
    ]
  },
  {
    date: '26/09/2026',
    title: 'Jour 7',
    route: 'Grand Canyon AZ'
  },
  {
    date: '27/09/2026',
    title: 'Jour 8',
    route: 'Grand Canyon AZ → Monument Valley UT',
    hotel: 'Desert Rose Inn & Cabins'
  },
  {
    date: '28/09/2026',
    title: 'Jour 9',
    route: 'Monument Valley UT → Lake Powell, UT',
    visit: {
      title: 'Antelope Canyon',
      provider: "Ken's Tours Lower Antelope Canyon",
      time: '15h00',
      checkin: 'Présence à la billetterie avant 14h30',
      address: 'Indian Rte 222, Page, AZ 86040, USA',
      details: 'Entrée dans le Lower Antelope Canyon et visite guidée Navajo'
    },
    highlights: ['Antelope Canyon via GetYourGuide']
  },
  {
    date: '29/09/2026',
    title: 'Jour 10',
    route: 'Lake Powell, UT → Bryce Canyon National Park UT'
  },
  {
    date: '30/09/2026',
    title: 'Jour 11',
    route: 'Bryce Canyon National Park UT → Las Vegas'
  },
  {
    date: '01/10/2026',
    title: 'Jour 12',
    route: 'Las Vegas',
    hotel: 'Excalibur Hotel & Casino'
  },
  {
    date: '02/10/2026',
    title: 'Jour 13',
    route: 'Las Vegas → Visalia',
    hotel: 'La Quinta Inn & Suites by Wyndham Visalia/Sequoia Gateway'
  },
  {
    date: '03/10/2026',
    title: 'Jour 14',
    route: 'Visalia'
  },
  {
    date: '04/10/2026',
    title: 'Jour 15',
    route: 'Visalia → Yosemite National Park, CA',
    hotel: 'Yosemite Lakes Yurts, 31191 Hardin Flat Road 5, Harden Flat CA 95321'
  },
  {
    date: '05/10/2026',
    title: 'Jour 16',
    route: 'Yosemite National Park, CA'
  },
  {
    date: '06/10/2026',
    title: 'Jour 17',
    route: 'Yosemite National Park, CA → San Francisco'
  },
  {
    date: '07/10/2026',
    title: 'Jour 18',
    route: 'San Francisco',
    hotel: 'Hotel Spero, Vignette Collection by IHG'
  },
  {
    date: '08/10/2026',
    title: 'Jour 19',
    route: 'San Francisco → Toulouse',
    flights: {
      title: 'Vol retour',
      connection: 'XXX',
      segments: [
        {
          number: 'XXX',
          from: 'San Francisco (SFO)',
          to: 'Paris (XXX)',
          depart: 'XXX',
          arrive: 'XXX'
        },
        {
          number: 'XXX',
          from: 'Paris (XXX)',
          to: 'Toulouse (TLS)',
          depart: 'XXX',
          arrive: 'XXX'
        }
      ]
    },
    car: {
      label: 'Dépôt voiture',
      time: '08/10/2026 18:00',
      place: 'San Francisco Intl Airport',
      agency: 'Dollar',
      model: 'Kia K5 ou similaire'
    }
  }
];

const overviewTrip = {
  title: 'Itinéraire global',
  subtitle: 'Les grandes étapes du roadtrip aux États-Unis, dans l’ordre du voyage.',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Los+Angeles&destination=San+Francisco&travelmode=driving&waypoints=Laughlin+NV%7CGrand+Canyon+AZ%7CMonument+Valley+UT%7CPage+AZ%7CBryce+Canyon+National+Park+UT%7CLas+Vegas%7CVisalia%7CYosemite+National+Park%7CSan+Francisco',
  stops: [
    { label: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, days: 'J1 à J4' },
    { label: 'Laughlin, NV', lat: 35.1678, lng: -114.5730, days: 'J5' },
    { label: 'Grand Canyon, AZ', lat: 36.0544, lng: -112.1401, days: 'J6 à J8' },
    { label: 'Monument Valley, UT', lat: 36.9989, lng: -110.0984, days: 'J8' },
    { label: 'Page / Lake Powell, AZ', lat: 36.9147, lng: -111.4558, days: 'J9' },
    { label: 'Bryce Canyon, UT', lat: 37.5930, lng: -112.1871, days: 'J10' },
    { label: 'Las Vegas, NV', lat: 36.1699, lng: -115.1398, days: 'J11 à J13' },
    { label: 'Visalia, CA', lat: 36.3302, lng: -119.2921, days: 'J13 à J15' },
    { label: 'Yosemite, CA', lat: 37.8651, lng: -119.5383, days: 'J15 à J17' },
    { label: 'San Francisco, CA', lat: 37.7749, lng: -122.4194, days: 'J18 à J19' }
  ]
};

const estaInfo = {
  title: 'ESTA',
  mainLink: 'https://esta.cbp.dhs.gov/',
  bullets: [
    'Coût officiel : 40,27 $ par personne',
    "Validité : 2 ans (ou jusqu'à expiration du passeport si elle survient avant)",
    'Autorise plusieurs voyages pendant sa durée de validité',
    'Faire la demande au moins 72 h avant le départ, même si la réponse arrive souvent plus vite'
  ]
};

const parkPassInfo = {
  title: 'Pass parcs nationaux',
  name: 'America the Beautiful Pass (250 $)',
  buyLink: 'https://www.recreation.gov/',
  infoLink: 'https://www.nps.gov/planyourvisit/passes.htm',
  bullets: [
    '1 seul pass pour nous deux dans la même voiture.',
    'Permet d’accéder aux principaux parcs nationaux du voyage : Bryce Canyon, Grand Canyon, Yosemite et Sequoia.',
    'Évite de payer les frais d’entrée de chaque parc ainsi que la surtaxe appliquée aux visiteurs non-résidents.',
    'Rapidement rentabilisé dès les premiers parcs visités.',
    'Ne couvre pas Antelope Canyon ni Monument Valley, qui disposent de leurs propres billets d’entrée.'
  ],
  tableRows: [
    { label: 'Bryce Canyon (sans pass)', cost: '~235 $' },
    { label: 'Grand Canyon (sans pass)', cost: '~235 $' },
    { label: 'Yosemite (sans pass)', cost: '~235 $' },
    { label: 'Sequoia (sans pass)', cost: '~235 $' },
    { label: 'Total sans pass', cost: '~940 $', strong: true },
    { label: 'America the Beautiful Pass', cost: '250 $' },
    { label: 'Économie estimée', cost: '~690 $', strong: true }
  ],
  sources: [
    {
      label: 'Pass America the Beautiful : explications, fonctionnement, conseils',
      url: 'https://www.nps.gov/planyourvisit/passes.htm'
    },
    {
      label: 'Les parcs des États-Unis - Explications, fonctionnement, conseils',
      url: 'https://www.recreation.gov/'
    }
  ]
};

const esimInfo = {
  title: 'eSIM USA',
  name: 'Ubigi - le meilleur compromis pour 3 semaines',
  mainLink: 'https://www.ubigi.com/',
  buyLink: 'https://www.ubigi.com/',
  bullets: [
    'Ubigi est le choix le plus simple si vous voulez un bon équilibre entre prix, fiabilite et couverture sur 3 semaines.',
    'Ubigi affiche des plans USA a partir de 2,90 $ pour 500 Mo pendant 1 jour  (25 Go / 30 jours : 32 $).',
    'Pour un vrai plan 30 Go, la reference simple a retenir est Saily Ultra a 59,99 $ / mois.',
    "Si vous consommez peu ou moyen: un petit plan 10 Go / 30 jours suffit souvent avec Google Maps, messages et reseaux.",
    "Si vous streamez beaucoup ou voulez ne pas compter: Holafly reste l'option la plus confortable avec data illimitee.",
    'Nomad peut etre interessant si vous cherchez le budget et Airalo reste une valeur sure pour la simplicite.'
  ],
  tableRows: [
    { label: 'Saily Ultra', cost: '30 Go / mois - 59,99 $' },
    { label: 'Ubigi USA', cost: 'A partir de 2,90 $ (500 Mo / 1 jour) (25 Go / 30 jours : 32 $)' },
    { label: 'Airalo', cost: '20 Go / 30 jours - 42 $' },
    { label: 'Nomad', cost: 'North America - tarif variable' },
    { label: 'Recommandation pour 3 semaines', cost: 'Ubigi' , strong: true}
  ],
  notes: [
    'Prendre une eSIM data-only suffit pour le roadtrip.',
    'Verifier que le telephone est bien compatible eSIM avant achat.',
    'Installer avant le depart, activer une fois aux USA.'
  ],
  sources: [
    {
      label: 'Best eSIMs for USA in 2025 - TechRadar',
      url: 'https://www.techradar.com/pro/best-esims-for-usa-in-year'
    },
    {
      label: 'Ubigi - plans et couverture USA',
      url: 'https://www.ubigi.com/en/country/esim-united-states'
    },
    {
      label: 'Airalo - eSIM USA',
      url: 'https://www.airalo.com/united-states-esim'
    }
  ]
};

const nationalParks = [
  { name: 'Grand Canyon', state: 'AZ', note: 'South Rim, couchers de soleil et points de vue majeurs' },
  { name: 'Monument Valley', state: 'UT', note: 'Route panoramique et paysages iconiques' },
  { name: 'Bryce Canyon', state: 'UT', note: 'Amphithéâtres et hoodoos' },
  { name: 'Yosemite', state: 'CA', note: 'Vallée, granite et belvédères' }
];

const prepTodo = [
  { id: 'esta', label: 'Acheter ESTA', linkLabel: 'ESTA', linkTab: 'esta', checked: false },
  { id: 'parks-pass', label: 'Acheter pass parc nationaux', linkLabel: 'Parcs', linkTab: 'parks', checked: false },
  { id: 'air-france-checkin', label: 'Préparer le check-in du vol Air France', checked: false },
  { id: 'universal-entry', label: 'Voir avec l’agence pour les entrées universal studio', checked: false },
  { id: 'passport-numbers', label: 'Transmettre les numéros de passeport à l’agence', checked: false }
];

const travelTodo = {
  David: [
    { id: 'd-passport', label: 'Passeport', checked: false },
    { id: 'd-attestation', label: "Papier d’attestation passeport", checked: false },
    { id: 'd-permit', label: 'Permis de conduire', checked: false },
    { id: 'd-intl', label: 'Permis de conduire international', checked: false },
    { id: 'd-identity', label: "Carte d'identité", checked: false },
    { id: 'd-esta', label: 'ESTA', checked: false },
    { id: 'd-esim', label: 'Acheter eSIM', checked: false }
  ],
  Emeline: [
    { id: 'e-passport', label: 'Passeport', checked: false },
    { id: 'e-attestation', label: "Papier d’attestation passeport", checked: false },
    { id: 'e-permit', label: 'Permis de conduire', checked: false },
    { id: 'e-intl', label: 'Permis de conduire international', checked: false },
    { id: 'e-identity', label: "Carte d'identité", checked: false },
    { id: 'e-esta', label: 'ESTA', checked: false },
    { id: 'e-esim', label: 'Acheter eSIM', checked: false }
  ],
  'David et Emeline': {
    sections: [
      {
        title: 'Valise',
        items: [
          { id: 'both-bag', label: '1 valise chacun 23kg max', checked: false },
          { id: 'swimwear', label: 'Maillots et affaires de plage', checked: false },
          { id: 'tupperware', label: 'Tupperware', checked: false },
          { id: 'power-adapter', label: 'Adaptateur secteur', checked: false },
          { id: 'both-umbrella', label: 'Parapluie', checked: false }
        ]
      },
      {
        title: 'Cartes et pass',
        items: [
          { id: 'both-visa', label: 'Carte Visa première', checked: false },
          { id: 'both-pass', label: 'America the Beautiful Pass', checked: false }
        ]
      }
    ]
  }
};
