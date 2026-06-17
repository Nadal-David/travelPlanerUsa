const tripDays = [
  {
    date: '20/09/2026',
    title: 'Jour 1',
    route: 'Toulouse → Los Angeles',
    flights: {
      title: 'Vol aller',
      connection: 'XXX',
      segments: [
        {
          number: 'XXX',
          from: 'Toulouse (TLS)',
          to: 'Paris (XXX)',
          depart: 'XXX',
          arrive: 'XXX'
        },
        {
          number: 'XXX',
          from: 'Paris (XXX)',
          to: 'Los Angeles (LAX)',
          depart: 'XXX',
          arrive: 'XXX'
        }
      ]
    },
    car: {
      label: 'Récupération voiture',
      time: 'XXX',
      place: "Agence Dollar à l'aéroport"
    },
    hotel: 'À définir',
    highlights: [
      'Santa Monica Beach',
      'Santa Monica Pier',
      'Muscle Beach',
      'Venice Beach',
      'Venice Canals'
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
      time: 'XXX',
      place: "Agence Dollar à l'aéroport"
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

const nationalParks = [
  { name: 'Grand Canyon', state: 'AZ', note: 'South Rim, couchers de soleil et points de vue majeurs' },
  { name: 'Monument Valley', state: 'UT', note: 'Route panoramique et paysages iconiques' },
  { name: 'Bryce Canyon', state: 'UT', note: 'Amphithéâtres et hoodoos' },
  { name: 'Yosemite', state: 'CA', note: 'Vallée, granite et belvédères' }
];

const prepTodo = [
  { id: 'esta', label: 'Acheter ESTA', linkLabel: 'ESTA', linkTab: 'esta', checked: false },
  { id: 'parks-pass', label: 'Acheter pass parc nationaux', linkLabel: 'Parcs', linkTab: 'parks', checked: false },
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
    { id: 'd-esta', label: 'ESTA', checked: false }
  ],
  Emeline: [
    { id: 'e-passport', label: 'Passeport', checked: false },
    { id: 'e-attestation', label: "Papier d’attestation passeport", checked: false },
    { id: 'e-permit', label: 'Permis de conduire', checked: false },
    { id: 'e-intl', label: 'Permis de conduire international', checked: false },
    { id: 'e-identity', label: "Carte d'identité", checked: false },
    { id: 'e-esta', label: 'ESTA', checked: false }
  ],
  'David et Emeline': [
    { id: 'both-visa', label: 'Carte Visa première', checked: false },
    { id: 'both-pass', label: 'America the Beautiful Pass', checked: false },
    { id: 'both-bag', label: '1 valise chacun 23kg max', checked: false },
    { id: 'both-umbrella', label: 'Parapluie', checked: false }
  ]
};
