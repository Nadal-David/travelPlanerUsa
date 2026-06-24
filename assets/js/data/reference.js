// Shared trip information that is not tied to a single day.
Object.assign(window.TravelPlannerData, {
  "overviewTrip": {
    "title": "Itinéraire global",
    "subtitle": "Les grandes étapes du roadtrip aux États-Unis, dans l’ordre du voyage.",
    "directionsUrl": "https://www.google.com/maps/dir/?api=1&origin=Los+Angeles&destination=San+Francisco&travelmode=driving&waypoints=Laughlin+NV%7CGrand+Canyon+AZ%7CMonument+Valley+UT%7CPage+AZ%7CBryce+Canyon+National+Park+UT%7CLas+Vegas%7CVisalia%7CYosemite+National+Park%7CSan+Francisco",
    "stops": [
      {
        "label": "Los Angeles, CA",
        "lat": 34.0522,
        "lng": -118.2437,
        "days": "J1 à J4"
      },
      {
        "label": "Laughlin, NV",
        "lat": 35.1678,
        "lng": -114.573,
        "days": "J5"
      },
      {
        "label": "Grand Canyon, AZ",
        "lat": 36.0544,
        "lng": -112.1401,
        "days": "J6 à J8"
      },
      {
        "label": "Monument Valley, UT",
        "lat": 36.9989,
        "lng": -110.0984,
        "days": "J8"
      },
      {
        "label": "Page / Lake Powell, AZ",
        "lat": 36.9147,
        "lng": -111.4558,
        "days": "J9"
      },
      {
        "label": "Bryce Canyon, UT",
        "lat": 37.593,
        "lng": -112.1871,
        "days": "J10"
      },
      {
        "label": "Las Vegas, NV",
        "lat": 36.1699,
        "lng": -115.1398,
        "days": "J11 à J13"
      },
      {
        "label": "Visalia, CA",
        "lat": 36.3302,
        "lng": -119.2921,
        "days": "J13 à J15"
      },
      {
        "label": "Yosemite, CA",
        "lat": 37.8651,
        "lng": -119.5383,
        "days": "J15 à J17"
      },
      {
        "label": "San Francisco, CA",
        "lat": 37.7749,
        "lng": -122.4194,
        "days": "J18 à J19"
      }
    ]
  },
  "estaInfo": {
    "title": "ESTA",
    "mainLink": "https://esta.cbp.dhs.gov/",
    "bullets": [
      "Coût officiel : 40,27 $ par personne",
      "Validité : 2 ans (ou jusqu'à expiration du passeport si elle survient avant)",
      "Autorise plusieurs voyages pendant sa durée de validité",
      "Faire la demande au moins 72 h avant le départ, même si la réponse arrive souvent plus vite"
    ]
  },
  "parkPassInfo": {
    "title": "Pass parcs nationaux",
    "name": "America the Beautiful Pass (250 $)",
    "buyLink": "https://www.recreation.gov/",
    "infoLink": "https://www.nps.gov/planyourvisit/passes.htm",
    "bullets": [
      "1 seul pass pour nous deux dans la même voiture.",
      "Permet d’accéder aux principaux parcs nationaux du voyage : Bryce Canyon, Grand Canyon, Yosemite et Sequoia.",
      "Évite de payer les frais d’entrée de chaque parc ainsi que la surtaxe appliquée aux visiteurs non-résidents.",
      "Rapidement rentabilisé dès les premiers parcs visités.",
      "Ne couvre pas Antelope Canyon ni Monument Valley, qui disposent de leurs propres billets d’entrée."
    ],
    "tableRows": [
      {
        "label": "Bryce Canyon (sans pass)",
        "cost": "~235 $"
      },
      {
        "label": "Grand Canyon (sans pass)",
        "cost": "~235 $"
      },
      {
        "label": "Yosemite (sans pass)",
        "cost": "~235 $"
      },
      {
        "label": "Sequoia (sans pass)",
        "cost": "~235 $"
      },
      {
        "label": "Total sans pass",
        "cost": "~940 $",
        "strong": true
      },
      {
        "label": "America the Beautiful Pass",
        "cost": "250 $"
      },
      {
        "label": "Économie estimée",
        "cost": "~690 $",
        "strong": true
      }
    ],
    "sources": [
      {
        "label": "Pass America the Beautiful : explications, fonctionnement, conseils",
        "url": "https://www.nps.gov/planyourvisit/passes.htm"
      },
      {
        "label": "Les parcs des États-Unis - Explications, fonctionnement, conseils",
        "url": "https://www.recreation.gov/"
      }
    ]
  },
  "esimInfo": {
    "title": "eSIM USA",
    "name": "Ubigi - le meilleur compromis pour 3 semaines",
    "mainLink": "https://www.ubigi.com/",
    "buyLink": "https://www.ubigi.com/",
    "bullets": [
      "Ubigi est le choix le plus simple si vous voulez un bon équilibre entre prix, fiabilite et couverture sur 3 semaines.",
      "Ubigi affiche des plans USA a partir de 2,90 $ pour 500 Mo pendant 1 jour  (25 Go / 30 jours : 32 $).",
      "Pour un vrai plan 30 Go, la reference simple a retenir est Saily Ultra a 59,99 $ / mois.",
      "Si vous consommez peu ou moyen: un petit plan 10 Go / 30 jours suffit souvent avec Google Maps, messages et reseaux.",
      "Si vous streamez beaucoup ou voulez ne pas compter: Holafly reste l'option la plus confortable avec data illimitee.",
      "Nomad peut etre interessant si vous cherchez le budget et Airalo reste une valeur sure pour la simplicite."
    ],
    "tableRows": [
      {
        "label": "Saily Ultra",
        "cost": "30 Go / mois - 59,99 $"
      },
      {
        "label": "Ubigi USA",
        "cost": "A partir de 2,90 $ (500 Mo / 1 jour) (25 Go / 30 jours : 32 $)"
      },
      {
        "label": "Airalo",
        "cost": "20 Go / 30 jours - 42 $"
      },
      {
        "label": "Nomad",
        "cost": "North America - tarif variable"
      },
      {
        "label": "Recommandation pour 3 semaines",
        "cost": "Ubigi",
        "strong": true
      }
    ],
    "notes": [
      "Prendre une eSIM data-only suffit pour le roadtrip.",
      "Verifier que le telephone est bien compatible eSIM avant achat.",
      "Installer avant le depart, activer une fois aux USA."
    ],
    "sources": [
      {
        "label": "Best eSIMs for USA in 2025 - TechRadar",
        "url": "https://www.techradar.com/pro/best-esims-for-usa-in-year"
      },
      {
        "label": "Ubigi - plans et couverture USA",
        "url": "https://www.ubigi.com/en/country/esim-united-states"
      },
      {
        "label": "Airalo - eSIM USA",
        "url": "https://www.airalo.com/united-states-esim"
      }
    ]
  },
  "nationalParks": [
    {
      "name": "Grand Canyon",
      "state": "AZ",
      "note": "South Rim, couchers de soleil et points de vue majeurs"
    },
    {
      "name": "Monument Valley",
      "state": "UT",
      "note": "Route panoramique et paysages iconiques"
    },
    {
      "name": "Bryce Canyon",
      "state": "UT",
      "note": "Amphithéâtres et hoodoos"
    },
    {
      "name": "Yosemite",
      "state": "CA",
      "note": "Vallée, granite et belvédères"
    }
  ],
  "prepTodo": [
    {
      "id": "esta",
      "label": "Acheter ESTA",
      "linkLabel": "ESTA",
      "linkTab": "esta",
      "checked": false
    },
    {
      "id": "parks-pass",
      "label": "Acheter pass parc nationaux",
      "linkLabel": "Parcs",
      "linkTab": "parks",
      "checked": false
    },
    {
      "id": "air-france-checkin",
      "label": "Préparer le check-in du vol Air France",
      "checked": false
    },
    {
      "id": "universal-entry",
      "label": "Voir avec l’agence pour les entrées universal studio",
      "checked": false
    },
    {
      "id": "passport-numbers",
      "label": "Transmettre les numéros de passeport à l’agence",
      "checked": false
    }
  ],
  "travelTodo": {
    "David": [
      {
        "id": "d-passport",
        "label": "Passeport",
        "checked": false
      },
      {
        "id": "d-attestation",
        "label": "Papier d’attestation passeport",
        "checked": false
      },
      {
        "id": "d-permit",
        "label": "Permis de conduire",
        "checked": false
      },
      {
        "id": "d-intl",
        "label": "Permis de conduire international",
        "checked": false
      },
      {
        "id": "d-identity",
        "label": "Carte d'identité",
        "checked": false
      },
      {
        "id": "d-esta",
        "label": "ESTA",
        "checked": false
      },
      {
        "id": "d-esim",
        "label": "Acheter eSIM",
        "checked": false
      }
    ],
    "Emeline": [
      {
        "id": "e-passport",
        "label": "Passeport",
        "checked": false
      },
      {
        "id": "e-attestation",
        "label": "Papier d’attestation passeport",
        "checked": false
      },
      {
        "id": "e-permit",
        "label": "Permis de conduire",
        "checked": false
      },
      {
        "id": "e-intl",
        "label": "Permis de conduire international",
        "checked": false
      },
      {
        "id": "e-identity",
        "label": "Carte d'identité",
        "checked": false
      },
      {
        "id": "e-esta",
        "label": "ESTA",
        "checked": false
      },
      {
        "id": "e-esim",
        "label": "Acheter eSIM",
        "checked": false
      }
    ],
    "David et Emeline": {
      "sections": [
        {
          "title": "Valise",
          "items": [
            {
              "id": "both-bag",
              "label": "1 valise chacun 23kg max",
              "checked": false
            },
            {
              "id": "swimwear",
              "label": "Maillots et affaires de plage",
              "checked": false
            },
            {
              "id": "tupperware",
              "label": "Tupperware",
              "checked": false
            },
            {
              "id": "power-adapter",
              "label": "Adaptateur secteur",
              "checked": false
            },
            {
              "id": "both-umbrella",
              "label": "Parapluie",
              "checked": false
            }
          ]
        },
        {
          "title": "Cartes et pass",
          "items": [
            {
              "id": "both-visa",
              "label": "Carte Visa première",
              "checked": false
            },
            {
              "id": "both-pass",
              "label": "America the Beautiful Pass",
              "checked": false
            }
          ]
        }
      ]
    }
  }
});
