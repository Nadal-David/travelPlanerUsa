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
      name: 'Hollywood Historic Hotel',
      address: '5162 Melrose Avenue, Los Angeles',
      dates: '20/09/2026 au 24/09/2026',
      nights: '4 nuits',
      breakfast: false,
      mealPlan: 'Chambre seulement',
      roomType: 'Double room king bed - de luxe',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hollywood+Historic+Hotel+5162+Melrose+Avenue+Los+Angeles'
    },
    itinerary: [
      { time: 'Après l’atterrissage', label: 'Récupérer la voiture à l’agence Dollar à LAX' },
      { time: 'Juste après', label: 'Passer à l’hôtel Hollywood Historic Hotel pour déposer les bagages / check-in' },
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
        { label: 'Hollywood Historic Hotel', lat: 34.0834, lng: -118.3283 },
        { label: 'Venice Canals', lat: 33.9856, lng: -118.4722 },
        { label: 'Venice Beach', lat: 33.9850, lng: -118.4695 },
        { label: 'Muscle Beach', lat: 33.9855, lng: -118.4737 },
        { label: 'Santa Monica Pier', lat: 34.0094, lng: -118.4973 }
      ],
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Los+Angeles+International+Airport&destination=Santa+Monica+Pier&travelmode=driving&waypoints=Hollywood+Historic+Hotel%7CVenice+Canals%7CVenice+Beach%7CMuscle+Beach'
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
    highlights: ['Hollywood', 'Beverly Hills', 'Rodeo Drive', 'Fin de journée à la plage'],
    links: [
      {
        label: 'Nos conseils pour visiter Hollywood, quartier le plus célèbre de LA',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/hollywood.php'
      },
      {
        label: 'Visiter Beverly Hills et Rodeo Drive, les quartiers chics de LA',
        url: 'https://www.roadtrippin.fr/californie/los-angeles/beverly-hills.php'
      }
    ]
  },
  {
    date: '22/09/2026',
    title: 'Jour 3',
    route: 'Los Angeles',
    highlights: ['Universal Studios']
  },
  {
    date: '23/09/2026',
    title: 'Jour 4',
    route: 'Los Angeles',
    highlights: ['Universal Studios']
  },
  {
    date: '24/09/2026',
    title: 'Jour 5',
    route: 'Los Angeles → Laughlin NV',
    hotel: 'Tropicana Laughlin - A Caesars Rewards Destination'
  },
  {
    date: '25/09/2026',
    title: 'Jour 6',
    route: 'Laughlin NV → Grand Canyon AZ',
    hotel: 'Holiday Inn Resort The Squire at Grand Canyon by IHG'
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
