// Day 1 - 20/09/2026. This file can be edited independently.
window.TravelPlannerData.days.push({
  "date": "20/09/2026",
  "title": "Jour 1",
  "route": "Toulouse → Los Angeles",
  "flights": {
    "title": "Vol aller",
    "connection": "2h45",
    "duration": "15h50",
    "segments": [
      {
        "number": "AF 7421",
        "from": "Toulouse (TLS)",
        "to": "Paris Charles de Gaulle (CDG)",
        "depart": "06:05",
        "arrive": "07:35"
      },
      {
        "number": "AF 22",
        "from": "Paris Charles de Gaulle (CDG)",
        "to": "Los Angeles (LAX)",
        "depart": "10:20",
        "arrive": "12:55"
      }
    ]
  },
  "car": {
    "label": "Récupération voiture",
    "time": "20/09/2026 14:00",
    "place": "Los Angeles Intl Airport",
    "agency": "Dollar",
    "model": "Kia K5 ou similaire"
  },
  "hotel": {
    "name": "Hollywood Melrose Hotel",
    "address": "5162 Melrose Ave, Los Angeles, CA 90038, États-Unis",
    "dates": "20/09/2026 au 24/09/2026",
    "nights": "4 nuits",
    "breakfast": false,
    "mealPlan": "Chambre seulement",
    "roomType": "Double room king bed - de luxe",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038",
    "reception": "Réception à confirmer avant le départ"
  },
  "itinerary": [
    {
      "time": "Après l’atterrissage",
      "label": "Récupérer la voiture à l’agence Dollar à LAX"
    },
    {
      "time": "Courses",
      "label": "Faire les courses au Walmart Neighborhood Market avant de passer à l’hôtel"
    },
    {
      "time": "Juste après",
      "label": "Passer à l’hôtel Hollywood Melrose Hotel pour déposer les bagages / check-in"
    },
    {
      "time": "Début d’après-midi",
      "label": "Venice Canals pour la première balade calme"
    },
    {
      "time": "Milieu d’après-midi",
      "label": "Venice Beach et Muscle Beach"
    },
    {
      "time": "Fin de journée",
      "label": "Santa Monica Beach puis Santa Monica Pier au coucher du soleil"
    }
  ],
  "map": {
    "title": "Jour 1 - Los Angeles",
    "center": {
      "lat": 34,
      "lng": -118.46
    },
    "zoom": 12,
    "stops": [
      {
        "label": "LAX / Dollar",
        "lat": 33.9416,
        "lng": -118.4085
      },
      {
        "label": "Walmart Neighborhood Market",
        "lat": 33.9001875,
        "lng": -118.3623568,
        "mapsUrl": "https://www.google.com/maps/place/Walmart+Neighborhood+Market/@33.9227447,-118.4374839,17794m/data=!3m1!1e3!4m6!3m5!1s0x80c2b43be0dbb991:0x4500547e27e08cfd!8m2!3d33.9001875!4d-118.3623568!16s%2Fg%2F1q5bpnwhq?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
      },
      {
        "label": "Hollywood Melrose Hotel",
        "lat": 34.0834396,
        "lng": -118.3137125,
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Hollywood+Melrose+Hotel+5162+Melrose+Ave+Los+Angeles+CA+90038"
      },
      {
        "label": "Venice Canals",
        "lat": 33.9856,
        "lng": -118.4722
      },
      {
        "label": "Venice Beach",
        "lat": 33.985,
        "lng": -118.4695
      },
      {
        "label": "Muscle Beach",
        "lat": 33.9855,
        "lng": -118.4737,
        "mapsUrl": "https://www.google.com/maps/place/Muscle+Beach+Venice+Gym/@33.9854719,-118.4733791,278m/data=!3m1!1e3!4m6!3m5!1s0x80c2bbde9825e3c9:0xb6b7e4082eb28e0e!8m2!3d33.9853693!4d-118.4725161!16s%2Fg%2F11rvhnp2xh?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
      },
      {
        "label": "Santa Monica Pier",
        "lat": 34.0094,
        "lng": -118.4973
      }
    ],
    "directionsUrl": "https://www.google.com/maps/dir/?api=1&origin=Los+Angeles+International+Airport&destination=Santa+Monica+Pier&travelmode=driving&waypoints=Walmart+Neighborhood+Market%7CHollywood+Melrose+Hotel%7CVenice+Canals%7CVenice+Beach%7CMuscle+Beach"
  },
  "highlights": [
    "Venice Canals",
    "Venice Beach",
    "Muscle Beach",
    "Santa Monica Beach",
    "Santa Monica Pier"
  ],
  "links": [
    {
      "label": "Visiter Los Angeles : notre guide complet sur les lieux incontournables",
      "url": "https://www.roadtrippin.fr/californie/los-angeles/los-angeles.php"
    },
    {
      "label": "Notre guide pour visiter les plages et rues de Santa Monica et Venice",
      "url": "https://www.roadtrippin.fr/californie/los-angeles/santa-monica-venice.php"
    }
  ]
});
