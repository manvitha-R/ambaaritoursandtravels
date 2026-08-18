// prisma/seedPackages.js
// One-off seed for the 22 real tour packages shown on /Packages, so the
// DB-backed detail page at /Packages/[slug] has real content instead of
// the 3 unrelated demo rows created by prisma/seed.js.
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(/[₹,]/g, ''));
}

function parseDays(duration) {
  const match = duration.match(/(\d+)\s*Day/i);
  return match ? parseInt(match[1], 10) : 1;
}

function parseSeats(group) {
  const match = group.match(/\d+/);
  if (match) return parseInt(match[0], 10);
  if (/ladies/i.test(group)) return 25;
  if (/all age/i.test(group)) return 40;
  return 30;
}

function pickInclusion(inclusions, keywords) {
  const found = inclusions.find((text) =>
    keywords.some((kw) => text.toLowerCase().includes(kw))
  );
  return found || null;
}

function isAdventureHighAltitude(src) {
  return /spiti|ladakh|kunzum|khardung/i.test(src.title + src.places.join(' '));
}

function genExclusions(src) {
  const base = [
    'Personal expenses such as laundry, tips, and telephone calls',
    'Travel insurance (available on request)',
    'Early check-in or late check-out charges',
  ];
  if (src.region === 'international') {
    return [
      ...base,
      'Visa fees (if applicable)',
      // 'GST (5%) and TCS (5%) as per Indian taxation laws',
      'Any airfare not explicitly mentioned in inclusions',
    ];
  }
  return [
    ...base,
    // 'GST (5%) as applicable',
    'Any expenses arising due to natural calamities, flight/train delays, or personal reasons',
  ];
}

function genWhatToCarry(src) {
  const list = src.region === 'international'
    ? [
        'Valid passport & visa (as applicable)',
        'Photocopies of passport, visa & flight tickets',
        'Mobile phone, charger & power bank',
        'Universal travel adapter',
        'International debit/credit cards & some local currency',
        'Comfortable clothing for daily sightseeing',
        'Personal medication & basic first-aid',
      ]
    : [
        'Valid government ID proof (Aadhar/PAN/Voter ID)',
        'Comfortable clothing & footwear for sightseeing',
        'Mobile phone, charger & power bank',
        'Personal medication & basic first-aid',
        'Water bottle & personal toiletries',
        'Cash for personal expenses',
      ];
  if (isAdventureHighAltitude(src)) {
    list.push('Warm thermal wear, gloves & sunglasses (high-altitude cold)');
  }
  if (/scuba|coral|island|beach/i.test(src.title + src.places.join(' '))) {
    list.push('Swimwear & a change of clothes for water activities');
  }
  return list;
}

const CANCELLATION_POLICY =
  'We do not hold any reservations until we receive 100% confirmation from your end. To confirm a booking, 50% of the package cost must be paid in advance; the balance is due before departure. Cancellations made 30+ days before departure are eligible for a refund of the advance minus a 10% processing fee. Cancellations within 15-29 days incur a 50% cancellation charge, and cancellations within 14 days of departure are non-refundable. Rates may vary with an increase or decrease in the number of travelers, and flights/transport are subject to availability at the time of confirmation.';

const TERMS_CONDITIONS =
  'All bookings are subject to availability at the time of confirmation. Prices are per person on a twin/double-sharing basis unless stated otherwise and may change without prior notice until the booking is confirmed. Ambaari Tours and Travels acts as a booking agent for third-party service providers (airlines, hotels, transport operators) and is not liable for delays, losses, or damages caused by such third parties. Travelers must carry valid identification/travel documents as applicable. Please also refer to our Privacy Policy and Terms & Conditions pages for full details.';

function genItinerary(src) {
  const days = Math.max(1, parseDays(src.duration));
  const details = src.details.length ? src.details : [src.description];
  const places = src.places.length ? src.places : [src.title];

  const itinerary = [];
  for (let d = 1; d <= days; d++) {
    let title, description, activities;
    if (d === 1) {
      title = days === 1 ? `${places[0]} Day Tour` : `Arrival – ${places[0]}`;
      description = details[0] || `Arrive and begin exploring ${places[0]}.`;
      activities = details.slice(0, 2);
    } else if (d === days) {
      title = 'Departure';
      description = `Free time for last-minute sightseeing or shopping before departure.`;
      activities = details.slice(-2);
    } else {
      const place = places[(d - 1) % places.length];
      const idx = (d - 2) % details.length;
      title = place;
      description = details[idx] || `Explore ${place} and nearby attractions.`;
      activities = [details[idx], details[(idx + 1) % details.length]].filter(Boolean);
    }
    itinerary.push({
      day: d,
      title,
      description,
      activities: [...new Set(activities.filter(Boolean))],
      meals: [],
      accommodation: '',
    });
  }
  return itinerary;
}

// Real Day 0-5 itinerary from the Thailand 4N/5D (Pattaya 3N, Bangkok 1N) PDF,
// applied to legacyId 13 which matches that exact package.
const THAILAND_PATTAYA_ITINERARY = [
  {
    day: 0,
    title: 'Bangalore to Bangkok',
    description: 'Bangalore to Bangkok by flight with 7kg cabin luggage.',
    activities: ['Flight departure from Bangalore', '7kg cabin luggage only'],
    meals: [],
    accommodation: '',
  },
  {
    day: 1,
    title: 'Pattaya – Tiger Topia',
    description:
      'Arrival and fresh up at the airport, then transfer to Pattaya. After breakfast, visit Tiger Topia. Afternoon lunch, evening visit to the Alcazar show and dinner.',
    activities: ['Tiger Topia', 'Alcazar show & dinner'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Pattaya',
  },
  {
    day: 2,
    title: 'Pattaya – Coral Island',
    description:
      'After breakfast, visit Coral Island via speedboat. Optional water activities — parasailing, snorkeling, banana boat ride — available as a combo package (2500 THB, payable directly). Dinner at a local Indian restaurant and floating market.',
    activities: ['Coral Island speedboat tour', 'Optional water sports (2500 THB combo, payable directly)', 'Floating market'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Pattaya',
  },
  {
    day: 3,
    title: 'Pattaya – Gems Gallery – Nong Nooch Village – Big Buddha Temple',
    description:
      'Check out from the hotel after breakfast. Visit the Gems Gallery to learn about gemstone cutting and shopping, then Nong Nooch Village with lunch, followed by the Big Buddha Temple, famous for its 18-meter golden Buddha statue. Dinner at a local Indian restaurant.',
    activities: ['Gems Gallery', 'Nong Nooch Village', 'Big Buddha Temple'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Pattaya',
  },
  {
    day: 4,
    title: 'Bangkok – Shopping – Cruise',
    description:
      'Check out from the hotel after breakfast and take a day trip to Bangkok with free time for shopping and lunch. Evening dinner cruise.',
    activities: ['Bangkok shopping', 'Dinner cruise'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Bangkok',
  },
  {
    day: 5,
    title: 'Bangkok – Safari World & Marine Park',
    description:
      'After breakfast, check out from the hotel and visit Safari World & Marine Park. Afternoon lunch, then departure from Don Mueang International Airport (DMK) for Bangalore.',
    activities: ['Safari World & Marine Park', 'Departure from DMK Airport'],
    meals: ['Breakfast', 'Lunch'],
    accommodation: '',
  },
];

const THAILAND_PATTAYA_INCLUSIONS = [
  'Round-trip flights from Bangalore to Bangkok (Flight Baggage as per the airlines policy)',
  'Meals 3 times at local Indian restaurants',
  'Accommodation in 3-star or 4-star hotels (two-sharing basis)',
  'Entry tickets: Tiger Topia, Alcazar show, Coral Island, floating market, Nong Nooch tropical garden, Dinner cruise, Safari World & Marine Park',
  'Private transportation for all transfers and sightseeing as per the itinerary',
  'Airport transfers (DMK Airport to Pattaya and return)',
];

// Exact Exclusions/Note text from the Thailand 4N/5D PDF (legacyId 13) —
// overrides the generic genExclusions()/CANCELLATION_POLICY for that package.
const THAILAND_PATTAYA_EXCLUSIONS = [
  'Personal expenses such as laundry, tips, and telephone calls',
  'Travel insurance (available on request)',
  'Thailand visa fees',
  'Early check-in or late check-out charges',
  // 'GST (5%) and TCS (5%) as per Indian taxation laws',
];

const THAILAND_PATTAYA_NOTE =
  'We are not holding any reservations till we get 100% confirmation from your end. To confirm the booking, 50% payment should be paid from your end. Rates will vary with increase or decrease of persons. Flights are subjected to availability.';

const THAILAND_PATTAYA_TERMS =
  'Prices are per person on a twin-sharing basis.  Travel insurance, Thailand visa fees, early check-in/late check-out charges, and personal expenses (laundry, tips, telephone calls) are not included.';

// Real Day 1-7 itinerary from the Vietnam 6N/7D PDF, applied to legacyId 23.
const VIETNAM_ITINERARY = [
  {
    day: 1,
    title: 'Hanoi Arrival – Halong Bay Day Cruise',
    description:
      'Arrive in Hanoi and transfer for a Halong Bay day cruise departing from Tuan Chau Wharf, with a stop at Titop Island for swimming or trekking, a visit to Pearl Farm Village, kayaking, and an onboard cooking class.',
    activities: ['Tuan Chau Wharf departure', 'Titop Island (swim/trek)', 'Pearl Farm Village', 'Kayaking', 'Cooking class on cruise'],
    meals: ['Lunch'],
    accommodation: 'Overnight stay in Hanoi',
  },
  {
    day: 2,
    title: 'Halong Bay – Hanoi Half-Day City Tour',
    description:
      'Return from Halong Bay to Hanoi for a half-day city tour covering Surprise Cave, Tran Quoc Pagoda, the Temple of Literature, and Hanoi Train Street.',
    activities: ['Surprise Cave', 'Tran Quoc Pagoda', 'Temple of Literature', 'Hanoi Train Street'],
    meals: [],
    accommodation: 'Overnight stay in Hanoi',
  },
  {
    day: 3,
    title: 'Hanoi – Da Nang – Marble Mountains & Hoi An',
    description:
      "Fly to Da Nang and visit Linh Ung Pagoda (Lady Buddha), the Love Lock Bridge, Marble Mountains, Dragon Bridge, and the Non Nuoc stone-carving village, before exploring Hoi An Ancient Town, the Japanese Bridge, old merchant houses, Phuc Kien Assembly Hall, Nguyen Hoang Night Market, and Lantern Street along the Hoai River.",
    activities: ['Linh Ung Pagoda (Lady Buddha)', 'Marble Mountains & Dragon Bridge', 'Hoi An Ancient Town', 'Lantern Street & Hoai River walk'],
    meals: [],
    accommodation: 'Overnight stay in Da Nang',
  },
  {
    day: 4,
    title: 'Ba Na Hills – Golden Bridge',
    description:
      "Full day at Ba Na Hills via cable car to see the Golden Bridge, Le Jardin D'Amour flower gardens, Linh Ung Pagoda at Ba Na, the Debay Wine Cellar, and Fantasy Park.",
    activities: ['Ba Na Hills cable car', 'Golden Bridge', "Le Jardin D'Amour flower gardens", 'Debay Wine Cellar', 'Fantasy Park'],
    meals: [],
    accommodation: 'Overnight stay in Da Nang',
  },
  {
    day: 5,
    title: 'Da Nang – Ho Chi Minh City Half-Day Tour',
    description:
      'Fly to Ho Chi Minh City for a half-day tour of the Independence/Reunification Palace, Notre Dame Cathedral, the Bitexco Financial Tower Skydeck, and the War Remnants Museum.',
    activities: ['Independence/Reunification Palace', 'Notre Dame Cathedral', 'Bitexco Financial Tower Skydeck', 'War Remnants Museum'],
    meals: [],
    accommodation: 'Overnight stay in Ho Chi Minh City',
  },
  {
    day: 6,
    title: 'Mekong Delta & Famous Pagoda Tour',
    description:
      'Day trip to the Mekong Delta covering My Tho City, a Tien River boat ride, the Four Islands (Dragon, Unicorn, Phoenix, Tortoise), a sampan ride through the canals, village cycling, a coconut candy workshop, fruit tasting with honey tea, and traditional folk music.',
    activities: ['My Tho City', 'Tien River boat ride', 'Four Islands sampan ride', 'Coconut candy workshop'],
    meals: [],
    accommodation: 'Overnight stay in Ho Chi Minh City',
  },
  {
    day: 7,
    title: 'Cu Chi Tunnels, Shopping & Departure',
    description:
      'Visit the Cu Chi Tunnels including the tunnel system, trapdoors and war exhibits, and try guerrilla-style food (tea & cassava), followed by shopping and lunch before an airport transfer for departure.',
    activities: ['Cu Chi Tunnels visit', 'Trapdoors & war exhibits', 'Shopping & lunch', 'Airport transfer'],
    meals: ['Lunch'],
    accommodation: '',
  },
];

const VIETNAM_INCLUSIONS = [
  'Accommodation in shared AC rooms with private bathroom',
  'International and domestic flights, and visa',
  'Meals as stated in the itinerary (breakfast, lunch, dinner)',
  'Transfers and guided tours in private air-conditioned vehicles',
  'Entrance fees for all listed sightseeing',
  'Mineral water (2 bottles per day)',
  'Tipping',
];

const VIETNAM_EXCLUSIONS = [
  'Optional tours',
  'Personal travel insurance (strongly recommended)',
  'Personal expenses (drinks, souvenirs, laundry, etc.)',
];

const VIETNAM_CANCELLATION_POLICY =
  "If you cancel: 30+ days before travel – 25% of the package cost is charged. 15–29 days before travel – 50% is charged. 7–14 days before travel – 75% is charged. 0–6 days before travel or no-show – 100% cancellation charges apply. Flight tickets, visa fees, and insurance are 100% non-refundable once issued. If the company cancels the tour, you'll receive a full refund of the package cost or a transfer to another date; any flights/visas already issued will follow the airline's/embassy's own rules. Note: the itinerary is flexible based on your arrival flight schedule, and sites may be adjusted to allow more time at other locations.";

const VIETNAM_TERMS =
  "By booking this tour you agree to all terms below. Passport, visa, travel insurance, and vaccination requirements are the traveler's responsibility unless stated otherwise, and you must report on time for all transfers and sightseeing – vehicles will not wait more than 10 minutes, and missed transfers or sightseeing are not rescheduled or refunded. Sightseeing is subject to weather, traffic, local regulations, and site closures (strikes, renovation, festivals, government orders); no refunds are given for missed or closed attractions. Standard hotel check-in is 2 PM and check-out is 12 PM; early check-in/late check-out is subject to availability and extra charges, room allocation follows hotel policy, and use of hotel facilities is at the guest's own risk. Vehicles are provided per group size (A/C may not function in hill areas), and any damage to vehicles or hotel property is chargeable to the guest. The company is not responsible for flight delays, cancellations, rescheduling, lost baggage, or visa approval/rejection – any resulting extra expenses are borne by the traveler. Guests must disclose medical conditions and carry their own medication and insurance; the company is not liable for medical emergencies. Misbehavior with staff, guides, or co-travelers may lead to termination of the tour without refund. Meals are provided as per the itinerary only; special dietary requests are attempted but not guaranteed, and missed meals are non-refundable. The company is not liable for loss, injury, death, theft, accidents, natural disasters, political unrest, or other unforeseen events. Booking is confirmed only after advance payment, and full payment must be completed before departure.";

// Real Day 1-3 itinerary from the Malaysia 2N/3D PDF, applied to legacyId 24.
const MALAYSIA_ITINERARY = [
  {
    day: 1,
    title: 'Arrival & City Tour',
    description:
      "Arrive at Kuala Lumpur International Airport (KUL) and head to breakfast, with a photo stop en route at Putrajaya to capture Malaysia's futuristic administrative capital and Independence Square. After lunch, check in to the 3-star hotel and relax, then visit the KL Tower observation deck in the evening. Dinner at a local Indian restaurant.",
    activities: ['Putrajaya photo stop', 'KL Tower observation deck', 'Dinner at a local Indian restaurant'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Kuala Lumpur (3-star hotel)',
  },
  {
    day: 2,
    title: 'Batu Caves & Genting Highlands Adventure',
    description:
      'After breakfast, visit Batu Caves, a sacred Hindu temple, followed by lunch at a local Indian restaurant. Head to Genting Highlands with a two-way cable car ride included, enjoying the cool climate and entertainment options (casino, shopping, indoor theme parks). Evening photo stop at the Petronas Twin Towers, then dinner at a local Indian restaurant.',
    activities: ['Batu Caves Hindu temple', 'Genting Highlands cable car & entertainment', 'Petronas Twin Towers photo stop'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Kuala Lumpur (3-star hotel)',
  },
  {
    day: 3,
    title: 'Shopping & Departure',
    description:
      'Check out from the hotel after breakfast, visit a Chinese temple, and browse Malaysian chocolate brands and outlets with time for local shopping. After lunch, transfer to Kuala Lumpur International Airport for the flight back to Bangalore.',
    activities: ['Chinese temple visit', 'Malaysian chocolate outlets & local shopping', 'Airport transfer'],
    meals: ['Breakfast', 'Lunch'],
    accommodation: '',
  },
];

const MALAYSIA_INCLUSIONS = [
  'Round-trip flights from Bangalore to Kuala Lumpur (7kg cabin luggage only)',
  'Meals 3 times at local Indian restaurants',
  'Private transportation for all transfers and sightseeing as per the itinerary',
  'Accommodation in 3-star hotels (twin-sharing basis)',
];

const MALAYSIA_EXCLUSIONS = [
  'Personal expenses such as laundry, tips, and telephone calls',
  'Travel insurance (available on request)',
  'Malaysia visa fees',
  'Early check-in or late check-out charges',
  // 'GST (5%) and TCS (5%) as per Indian taxation laws',
];

const MALAYSIA_NOTE =
  'We are not holding any reservations till we get 100% confirmation from your end. To confirm the booking, 50% payment should be paid from your end. Rates will vary with increase or decrease of persons. Flights are subject to availability. All bookings are non-refundable.';

const MALAYSIA_TERMS =
  'Prices are per person on a twin-sharing basis. Travel insurance, Malaysia visa fees, early check-in/late check-out charges, and personal expenses (laundry, tips, telephone calls) are not included. All bookings are non-refundable.';

// Real Day 0-7 itinerary from the combined Thailand + Malaysia 6N/7D PDF
// (3N Pattaya, 1N Bangkok, 2N Kuala Lumpur), applied to legacyId 25.
const THAI_MALAYSIA_COMBO_ITINERARY = [
  {
    day: 0,
    title: 'Bangalore to Bangkok',
    description: 'Bangalore to Bangkok by flight with 7kg cabin luggage.',
    activities: ['Flight departure from Bangalore', '7kg cabin luggage only'],
    meals: [],
    accommodation: '',
  },
  {
    day: 1,
    title: 'Pattaya – Tiger Topia',
    description:
      'Arrival and fresh up at the airport, then transfer to Pattaya. After breakfast, visit Tiger Show Sriracha, famous for tiger and crocodile show exhibits and interactive animal experiences. Afternoon lunch, evening visit to the Alcazar show and dinner.',
    activities: ['Tiger show Sriracha', 'Alcazar show & dinner'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Pattaya',
  },
  {
    day: 2,
    title: 'Pattaya – Coral Island',
    description:
      'After breakfast, visit Coral Island via speedboat transfer with lunch on the island, plus the floating market. Optional water activities — parasailing, snorkeling, banana boat ride — available as a combo package (2500 THB, payable directly). Dinner at a local Indian restaurant.',
    activities: ['Coral Island speedboat tour', 'Floating market', 'Optional water sports (2500 THB combo, payable directly)'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Pattaya',
  },
  {
    day: 3,
    title: 'Pattaya – Gems Gallery – Nong Nooch Village – Big Buddha Temple',
    description:
      'Check out from the hotel after breakfast. Visit the Gems Gallery to learn about gemstone cutting and shopping, then Nong Nooch Village with lunch, followed by the Big Buddha Temple, famous for its 18-meter golden Buddha statue. Dinner at a local Indian restaurant.',
    activities: ['Gems Gallery', 'Nong Nooch Village', 'Big Buddha Temple'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Pattaya',
  },
  {
    day: 4,
    title: 'Bangkok – Shopping – Cruise',
    description:
      'Check out from the hotel after breakfast and take a day trip to Bangkok with free time for shopping and lunch. Evening Chao Phraya dinner cruise.',
    activities: ['Bangkok shopping', 'Chao Phraya dinner cruise'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Bangkok',
  },
  {
    day: 5,
    title: 'Bangkok – Safari World – Transfer to Malaysia',
    description:
      'After breakfast, check out from the hotel and visit Safari World & Marine Park. After lunch, transfer to Malaysia by flight. Dinner at a restaurant and overnight stay in Kuala Lumpur.',
    activities: ['Safari World & Marine Park', 'Flight transfer to Malaysia'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Kuala Lumpur',
  },
  {
    day: 6,
    title: 'Genting Highlands – KL Tower – Petronas Twin Towers',
    description:
      'Breakfast at the hotel, then depart for Genting Highlands with a cable car ride, plus a Batu Caves photo stop. After lunch, evening golden-hour photo stop at the Petronas Twin Towers and a visit to the KL Tower observation deck. Free time to leisure, dinner at a restaurant.',
    activities: ['Genting Highlands cable car', 'Batu Caves photo stop', 'Petronas Twin Towers photo stop', 'KL Tower observation deck'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Kuala Lumpur',
  },
  {
    day: 7,
    title: 'Checkout, Shopping & Departure',
    description:
      'Breakfast at the hotel, pack up and check out, then a Putrajaya tour and city exploring before lunch and departure to the airport.',
    activities: ['Putrajaya tour & city exploring', 'Airport departure'],
    meals: ['Breakfast', 'Lunch'],
    accommodation: '',
  },
];

const THAI_MALAYSIA_COMBO_INCLUSIONS = [
  'Round-trip flights from Bangalore to Bangkok (7kg cabin luggage only)',
  'Meals 3 times at local Indian restaurants',
  'Accommodation in 3-star hotels (twin-sharing basis)',
  'Entry tickets: Tiger Topia, Alcazar show, Coral Island, floating market, Nong Nooch tropical garden, Chao Phraya dinner cruise, Safari World & Marine Park',
  'Private transportation for all transfers and sightseeing as per the itinerary',
  'Airport transfers (Thailand, Malaysia and return)',
];

const THAI_MALAYSIA_COMBO_EXCLUSIONS = [
  'Personal expenses such as laundry, tips, and telephone calls',
  'Travel insurance (available on request)',
  'Thailand visa fees',
  'Early check-in or late check-out charges',
  // 'GST (5%) and TCS (5%) as per Indian taxation laws',
];

const THAI_MALAYSIA_COMBO_NOTE =
  'We are not holding any reservations till we get 100% confirmation from your end. To confirm the booking, 50% payment should be paid from your end. Rates will vary with increase or decrease of persons. Flights are subjected to availability.';

const THAI_MALAYSIA_COMBO_TERMS =
  'All bookings are non-refundable. Package is subject to availability at the time of booking. Confirmation is required in writing to proceed. Price is valid at the time of proposal and subject to change while booking.';

// Real Day 0-6 itinerary from the Malaysia & Singapore 5N/6D PDF, applied to legacyId 26.
const MALAYSIA_SINGAPORE_COMBO_ITINERARY = [
  {
    day: 0,
    title: 'Bangalore to Malaysia',
    description: 'Bangalore to Malaysia by overnight flight, 11 PM departure.',
    activities: ['Overnight flight departure from Bangalore'],
    meals: [],
    accommodation: '',
  },
  {
    day: 1,
    title: 'Arrival in Malaysia – Putrajaya & KL Tower',
    description:
      "Airport pickup and breakfast at an Indian restaurant, followed by a Putrajaya tour of Malaysia's administrative capital (the pink Putra Mosque, Perdana Putra, and its lake gardens) and local sightseeing. After lunch, check in to the hotel and refresh, then an evening night tour with the KL Tower observation deck. Dinner at an Indian restaurant.",
    activities: ['Putrajaya tour', 'KL Tower observation deck night tour'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Malaysia',
  },
  {
    day: 2,
    title: 'Genting Highlands & Batu Caves',
    description:
      "Morning breakfast at the hotel, then Genting Highlands, Malaysia's 'City of Entertainment,' via cable car, followed by a visit to Batu Caves.",
    activities: ['Genting Highlands cable car', 'Batu Caves visit'],
    meals: ['Breakfast'],
    accommodation: 'Overnight stay in Malaysia',
  },
  {
    day: 3,
    title: 'Kuala Lumpur to Singapore – Night Safari',
    description:
      'Morning breakfast and check out from the hotel, then travel from Kuala Lumpur to Singapore by A/C coach and check in to the Singapore hotel. Lunch at an Indian restaurant, followed by a night safari tour with dinner.',
    activities: ['Kuala Lumpur to Singapore coach transfer', 'Night safari tour'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Singapore',
  },
  {
    day: 4,
    title: 'Singapore City Tour – Sentosa Island',
    description:
      "Breakfast at the restaurant, then a Singapore city tour with a visit to Sentosa Island, the city's premier island resort with attractions, beaches, and entertainment, including lunch.",
    activities: ['Singapore city tour', 'Sentosa Island'],
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Overnight stay in Singapore',
  },
  {
    day: 5,
    title: 'Universal Studios & Gardens by the Bay',
    description:
      'Visit Universal Studios with its thrilling rides and immersive lands, including lunch, followed by Gardens by the Bay, featuring the futuristic Supertrees, Flower Dome, and Cloud Forest conservatories.',
    activities: ['Universal Studios', 'Gardens by the Bay'],
    meals: ['Lunch'],
    accommodation: 'Overnight stay in Singapore',
  },
  {
    day: 6,
    title: 'Shopping & Departure',
    description:
      'Breakfast at the restaurant and check out from the hotel, followed by shopping (Orchard Road, Marina Bay Sands, Bugis Street, Chinatown) before transferring to the airport for departure.',
    activities: ['Shopping (Orchard Road / Marina Bay Sands / Chinatown)', 'Airport transfer'],
    meals: ['Breakfast'],
    accommodation: '',
  },
];

const MALAYSIA_SINGAPORE_COMBO_INCLUSIONS = [
  '5 nights stay (entry-level room)',
  'Full board meals: breakfast, lunch, and dinner daily',
  'All transfers and sightseeing in a private vehicle',
  'Round-trip flight (7kg cabin luggage & 20kg check-in luggage)',
];

const MALAYSIA_SINGAPORE_COMBO_EXCLUSIONS = [
  'Any personal expenses (laundry, tips, telephone calls, etc.)',
  'Travel insurance (can be arranged on request)',
  'Meals other than those specified in the itinerary',
  'Optional activities',
  'Early check-in or late check-out charges at hotels',
  'Anything not mentioned in the inclusions',
];

const MALAYSIA_SINGAPORE_COMBO_NOTE =
  'We are not holding any reservations till we get 100% confirmation from your end. To confirm the booking, 50% payment should be paid from your end. Rates will vary with increase or decrease of persons. Flights are subjected to availability.';

const MALAYSIA_SINGAPORE_COMBO_TERMS =
  'All bookings are non-refundable. Package is subject to availability at the time of booking. Confirmation is required in writing to proceed. Price is valid at the time of proposal and subject to change while booking.';

// Real Day 1-4 itinerary from the PanchaBhoota Yatra 3N/4D PDF, applied to legacyId 27.
const PANCHABHOOTA_ITINERARY = [
  {
    day: 1,
    title: 'Bangalore to Srikalahasti – Kanchipuram',
    description:
      'Morning pickup from Bangalore at 8:00 AM and drive towards Srikalahasti, one of the most powerful Shiva shrines associated with Vayu (Air), renowned for the flame inside the sanctum that flickers naturally. After darshan of Sri Srikalahasteeswara Swamy, continue to Kanchipuram, the ancient city of temples, and check in to the hotel for an evening of quiet relaxation.',
    activities: ['Srikalahasteeswara Temple darshan (Vayu)', 'Drive to Kanchipuram'],
    meals: [],
    accommodation: 'Overnight stay in Kanchipuram',
  },
  {
    day: 2,
    title: 'Kanchipuram – Thiruvannamalai',
    description:
      'After breakfast, darshan at the majestic Ekambareswarar Temple, representing Prithvi (Earth), home to the sacred Earth Lingam and an ancient mango tree symbolizing fertility and stability. Travel on to Thiruvannamalai, the spiritual town dominated by the sacred Arunachala Hill, and check in to the hotel for the evening.',
    activities: ['Ekambareswarar Temple darshan (Prithvi)', 'Arunachala Hill, Thiruvannamalai'],
    meals: ['Breakfast'],
    accommodation: 'Overnight stay in Thiruvannamalai',
  },
  {
    day: 3,
    title: 'Thiruvannamalai – Chidambaram – Trichy',
    description:
      'Early darshan at the grand Arunachaleeswarar Temple, the embodiment of Agni (Fire), where Lord Shiva is worshipped as a column of divine fire. Check out before noon and drive to Chidambaram to visit the revered Thillai Natarajar Temple, symbolizing Akasha (Space/Ether). Continue the journey to Trichy for overnight rest.',
    activities: ['Arunachaleeswarar Temple darshan (Agni)', 'Thillai Natarajar Temple darshan (Akasha)'],
    meals: [],
    accommodation: 'Overnight stay in Trichy',
  },
  {
    day: 4,
    title: 'Trichy – Thiruvanaikaval – Bangalore',
    description:
      'After breakfast, check out and proceed to Thiruvanaikaval to visit the sacred Jambukeswarar Temple, representing Appu (Water), where the naturally flowing water beneath the sanctum signifies purity and healing. After darshan, begin the return journey to Bangalore, concluding the PanchaBhoota pilgrimage.',
    activities: ['Jambukeswarar Temple darshan (Appu)', 'Return journey to Bangalore'],
    meals: ['Breakfast'],
    accommodation: '',
  },
];

const PANCHABHOOTA_INCLUSIONS = [
  'Comfortable stays with all meals',
  'AC private vehicle for all transfers and sightseeing',
  'Pickup and drop from Bangalore',
  'Sightseeing, parking, tolls, driver allowances and fuel',
  'All applicable taxes',
];

const PANCHABHOOTA_EXCLUSIONS = [
  'Personal expenses',
  'Shopping, snacks, and tips',
  'Camera charges',
  'Travel insurance',
];

// Real Day 1-8 itinerary from the Do Dham Yatra 7N/8D PDF, applied to legacyId 28.
const DO_DHAM_ITINERARY = [
  {
    day: 1,
    title: 'Delhi – Haridwar (240 Kms / 4-5 Hrs)',
    description:
      'Arrive in Delhi, where our representative or driver meets you and drives to your Haridwar hotel. Check in and freshen up, then visit Mansa Devi Temple, Chandi Devi Temple, and Prem Nagar Ashram, before attending the Ganga Aarti at the famous Har Ki Pauri ghat in the evening. Dinner and overnight stay in Haridwar.',
    activities: ['Mansa Devi & Chandi Devi Temple', 'Prem Nagar Ashram', 'Ganga Aarti at Har Ki Pauri'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Haridwar',
  },
  {
    day: 2,
    title: 'Haridwar – Guptkashi (200 Kms / 5-6 Hrs)',
    description: 'Early morning check-out and drive to Guptkashi via Rudraprayag and Devprayag. Check in to the hotel on arrival, dinner and overnight stay.',
    activities: ['Drive via Rudraprayag & Devprayag'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Guptkashi',
  },
  {
    day: 3,
    title: 'Guptkashi – Sonprayag – Kedarnath (23 km trek one side)',
    description:
      'After breakfast, check out and drive to Sonprayag, then take a jeep (at own cost) to Gaurikund, from where the 23km trek to Kedarnath begins (doli/horse hire available at own cost). Check in at the government camps/lodge for an overnight stay (basic room-only accommodation; meals at own cost).',
    activities: ['Drive to Sonprayag & Gaurikund', '23km trek to Kedarnath'],
    meals: ['Breakfast'],
    accommodation: 'Overnight stay at Kedarnath (basic camp/lodge)',
  },
  {
    day: 4,
    title: 'Kedarnath – Sonprayag – Guptkashi',
    description:
      "Early morning bath followed by the 4:00 AM 'Abhishek' darshan of Kedarnath Shiva, with a chance to enter the Garbhagriha (meals at own cost). Begin the return 23km trek from Kedarnath to Sonprayag, then drive to Guptkashi for dinner and an overnight stay.",
    activities: ['Kedarnath Shiva Abhishek darshan', 'Return trek to Sonprayag'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Guptkashi',
  },
  {
    day: 5,
    title: 'Guptkashi – Badrinath (200 Km / 7-8 Hrs)',
    description:
      'Check out at 8:00 AM and drive to Badrinath via Joshimath, visiting Sri Narsingh Temple en route. On arrival, check in to the hotel, then bathe in the Tapt Kund hot water spring before the evening darshan at the Badrinath Temple, dedicated to Lord Vishnu. Dinner and overnight stay at the hotel.',
    activities: ['Sri Narsingh Temple, Joshimath', 'Tapt Kund bath', 'Badrinath Temple darshan'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Badrinath',
  },
  {
    day: 6,
    title: 'Badrinath – Pipalkoti / Rudraprayag',
    description:
      'Morning bath in the Tapt Kund and darshan of Badri Vishal, with Brahma Kapal significant for Pind Daan Shraddha of ancestors. Visit nearby sightseeing spots including Mana Village, Vyas Gufa, Maat Moorti, Charan Paduka, Bhim Pul, and the Mukh of the Saraswati River, before travelling on towards Rudraprayag/Pipalkoti for an overnight stay.',
    activities: ['Brahma Kapal darshan', 'Mana Village, Vyas Gufa & Bhim Pul'],
    meals: [],
    accommodation: 'Overnight stay in Pipalkoti/Rudraprayag',
  },
  {
    day: 7,
    title: 'Rudraprayag – Haridwar (315 Km / 9-10 Hrs)',
    description:
      'After breakfast, check out and drive via Rudraprayag and Devprayag, the holy confluence of the Alaknanda and Mandakini rivers, visiting the Dhari Devi Temple en route. Reach Haridwar in the evening for the Ganga Aarti, check in to the hotel, dinner and overnight stay.',
    activities: ['Dhari Devi Temple', 'Evening Ganga Aarti at Haridwar'],
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Overnight stay in Haridwar',
  },
  {
    day: 8,
    title: 'Haridwar – Delhi Drop',
    description: 'Early morning check-out from the hotel and drive to Delhi, with drop-off at the Delhi Railway Station/Airport for your onward journey.',
    activities: ['Drive to Delhi', 'Drop at Railway Station/Airport'],
    meals: [],
    accommodation: '',
  },
];

const DO_DHAM_INCLUSIONS = [
  'To & fro flight tickets',
  "07 nights' accommodation in 3-star hotels (twin/triple sharing; similar basis at Kedarnath)",
  'All meals - pure veg South Indian style',
  'Pick up & drop - Delhi',
  'Transfers and sightseeing as per itinerary',
  'All toll, parking, driver charges, and fuel cost inclusive',
];

const DO_DHAM_EXCLUSIONS = [
  'Porter, pony, horse, helicopter, cable car, jeep, auto, boat, or adventure activities not mentioned in inclusions',
  'A/C will not function in hill areas',
  'VIP entry tickets',
  'Personal expenses (laundry, telephone calls, tips & gratuity, drinks, rafting, rock climbing, paragliding, toy train, porterage)',
  'Additional sightseeing or extra vehicle usage beyond the itinerary',
  'Any costs from natural calamities (landslides, road blockage, political disturbances/strikes)',
  'Any increase in taxes or fuel price',
  'Room heater charges (payable directly to the hotel)',
  'Entry fees & guide charges not mentioned in inclusions',
  'Travel insurance (available at extra cost)',
];

const DO_DHAM_NOTE =
  'For booking, a 50% token amount and one scanned ID proof are required (for hotel booking); the balance is adjusted during the tour. Payment can be made online via NEFT or IMPS.';

const DO_DHAM_TERMS =
  "The infrastructure in the Kedarnath/Badrinath region is basic — expect water and power shortages (water supplied on a time basis) and no generator backup during power failures (candle light provided). Driving is not allowed after 7 PM in the Char Dham sector. All travelers' registration is mandatory for the yatra. Accommodation in the Char Dham sector is basic but neat and clean.";

// Real Day 1-15 itinerary from the Char Dham Yatra with Chopta Tunganath
// Triyuginarayan 14N/15D PDF, applied to legacyId 29.
const CHAR_DHAM_ITINERARY = [
  {
    day: 1,
    title: 'Delhi to Haridwar',
    description:
      'Pick up from an assigned point in Delhi and drive to Haridwar. Check in to the hotel, then visit the evening Ganga Aarti and Mansa Devi Temple. Dinner and overnight stay in Haridwar.',
    activities: ['Ganga Aarti', 'Mansa Devi Temple'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Haridwar',
  },
  {
    day: 2,
    title: 'Haridwar to Barkot (190 km / 6-7 hrs)',
    description:
      'After breakfast, drive to Barkot via Mussoorie, with a view of Kempty Fall en route and a visit to the Lakhamandal Temple, a Shiva shrine known for its graphite Shivling. Transfer to your hotel in Barkot and rest ahead of the Yamunotri yatra the next day.',
    activities: ['Kempty Fall view', 'Lakhamandal Temple'],
    meals: ['Breakfast'],
    accommodation: 'Overnight stay in Barkot',
  },
  {
    day: 3,
    title: 'Barkot to Yamunotri trek and back (45 km road + 6 km trek one way)',
    description:
      'Early morning drive to Jankichatti/Phoolchatti, from where a 6km trek (by foot, horse, or doli at own cost) leads to the Yamunotri Temple, dedicated to Goddess Yamuna, at 3,291m in the Garhwal Himalayas. Return to Barkot for an overnight stay.',
    activities: ['Yamunotri Temple trek', 'Surya Kund hot springs'],
    meals: [],
    accommodation: 'Overnight stay in Barkot',
  },
  {
    day: 4,
    title: 'Barkot to Uttarkashi (90 km / 3-4 hrs)',
    description: 'Drive to Uttarkashi, the "Kashi of the North," known for its temples and ashrams. Overnight stay in a hotel.',
    activities: ['Uttarkashi town & temples'],
    meals: [],
    accommodation: 'Overnight stay in Uttarkashi',
  },
  {
    day: 5,
    title: 'Uttarkashi to Gangotri and back (100 km / 3-4 hrs)',
    description:
      'Drive to Gangotri, take a holy dip in the sacred Bhagirathi (Ganges), and perform pooja and darshan at the Gangotri Temple before returning to Uttarkashi for an overnight stay.',
    activities: ['Holy dip at Gangotri', 'Gangotri Temple darshan'],
    meals: [],
    accommodation: 'Overnight stay in Uttarkashi',
  },
  {
    day: 6,
    title: 'Uttarkashi to Guptkashi (220 km / 8-9 hrs)',
    description:
      'Drive to Guptkashi via Moolgarh and Lambgoan, alongside the Mandakini River, visiting the Ardh Narishwar Temple on arrival. Overnight stay in Guptkashi.',
    activities: ['Ardh Narishwar Temple'],
    meals: [],
    accommodation: 'Overnight stay in Guptkashi',
  },
  {
    day: 7,
    title: 'Guptkashi – Sonprayag – Gaurikund – Kedarnath (30 km road + 18 km trek one way)',
    description:
      'Early departure for Kedarnath Dham, reached either by helicopter (ticket not included) or by trek via Sonprayag and Gaurikund. Enjoy Kedarnath darshan at one of the 12 Jyotirlingas of Lord Shiva, and stay overnight at Kedarnath.',
    activities: ['Kedarnath Temple darshan'],
    meals: [],
    accommodation: 'Overnight stay at Kedarnath',
  },
  {
    day: 8,
    title: 'Kedarnath to Triyuginarayan Temple, then Guptkashi (19 km trek / 6 hrs + 50 km / 1 hr)',
    description:
      "Visit the Triyuginarayan Temple, the legendary site of Lord Shiva and Goddess Parvati's marriage, home to a perpetual sacred fire believed to burn since the divine wedding. Continue to Guptkashi for an overnight hotel stay.",
    activities: ['Triyuginarayan Temple & eternal flame'],
    meals: [],
    accommodation: 'Overnight stay in Guptkashi',
  },
  {
    day: 9,
    title: 'Guptkashi to Chopta',
    description:
      'Drive to Chopta, a scenic meadow region in the Kedarnath wildlife sanctuary and base for the trek to Tungnath, the highest Shiva temple in the world and the third of the Panch Kedar temples, with Chandrashila summit nearby. Overnight stay in a camp/hotel.',
    activities: ['Chopta meadows', 'Tungnath temple trek'],
    meals: [],
    accommodation: 'Overnight stay in Chopta (camp/hotel)',
  },
  {
    day: 10,
    title: 'Chopta to Badrinath (200 km / 7-8 hrs)',
    description:
      'Check out at 8:00 AM and drive to Badrinath via Joshimath, visiting Sri Narsingh Temple en route. On arrival, bathe in the Tapt Kund hot spring before the evening darshan at the Badrinath Temple, dedicated to Lord Vishnu. Dinner and overnight stay at the hotel.',
    activities: ['Sri Narsingh Temple', 'Tapt Kund bath', 'Badrinath Temple darshan'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Badrinath',
  },
  {
    day: 11,
    title: 'Badrinath – Pipalkoti (80 km / 3 hrs)',
    description:
      'Morning bath in the Tapt Kund and darshan of Badri Vishal, with Brahma Kapal significant for Pind Daan Shraddha of ancestors. Visit Mana Village, Vyas Gufa, Maat Moorti, Charan Paduka, Bhim Pul, and the Mukh of the Saraswati River, before travelling to Pipalkoti for an overnight stay.',
    activities: ['Brahma Kapal darshan', 'Mana Village, Vyas Gufa & Bhim Pul'],
    meals: [],
    accommodation: 'Overnight stay in Pipalkoti',
  },
  {
    day: 12,
    title: 'Pipalkoti – Karthik Swamy trek – Rudra Prayag',
    description:
      'Visit the Kartik Swami Temple via a 3km trek one side from Kanak Chauri Village, known for its mystic ambiance and exquisite views. Drive on to Rudraprayag, the holy confluence of the Alaknanda and Mandakini rivers, for an overnight stay.',
    activities: ['Kartik Swami Temple trek'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Rudraprayag',
  },
  {
    day: 13,
    title: 'Rudra Prayag – Rishikesh – Haridwar (160 km / 6-7 hrs)',
    description:
      'Drive to Rishikesh for an evening of sightseeing — Ram Jhula, Laxman Jhula, Triveni Ghat, and the Ganga Aarti — before continuing to Haridwar for dinner and an overnight stay.',
    activities: ['Ram Jhula & Laxman Jhula', 'Triveni Ghat & Ganga Aarti, Rishikesh'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Haridwar',
  },
  {
    day: 14,
    title: 'Haridwar – Delhi',
    description:
      'Check out after breakfast and visit Mansa Devi Temple, Chandi Devi Temple, Daksha Mahadev Temple, Shanti Kunj, and Pavan Dham, then proceed to Delhi for dinner and an overnight stay.',
    activities: ['Chandi Devi & Daksha Mahadev Temple', 'Shanti Kunj & Pavan Dham'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Delhi',
  },
  {
    day: 15,
    title: 'Delhi Local Sightseeing – Bangalore',
    description: 'Delhi local sightseeing after breakfast, followed by an evening return flight to Bangalore.',
    activities: ['Delhi local sightseeing', 'Return flight to Bangalore'],
    meals: ['Breakfast'],
    accommodation: '',
  },
];

const CHAR_DHAM_INCLUSIONS = [
  'Round-trip flights (Bangalore-Delhi-Bangalore)',
  '2x2 luxury coach transportation throughout',
  'All meals - breakfast, lunch, and dinner (pure veg)',
  'Hotel/camp accommodation as per itinerary',
  'Sightseeing and temple visits as per itinerary',
  'Tour guide',
];

const CHAR_DHAM_EXCLUSIONS = [
  'Helicopter tickets to Kedarnath (if opted instead of trek)',
  'Horse, doli, or local jeep hire during treks (payable directly)',
  'Personal expenses and early check-in/late check-out charges',
  'Travel insurance',
  'Anything not mentioned in inclusions',
];

const CHAR_DHAM_NOTE =
  "This package can be customized as per your requirements. Check-in and check-out times follow hotel policy, and meals must be taken as per the hotel's schedule. The company is not responsible for cancellations due to weather or unforeseen events, and rates may vary due to changes in taxes, hotel rates, or government policies. No discounts are available after confirmation, and sightseeing may be rescheduled due to monument closures.";

const CHAR_DHAM_TERMS =
  'Rates are valid for Indian nationals only and are subject to availability at the time of booking. Base category rooms will be booked unless otherwise specified, and itinerary amendments are subject to availability and applicable charges. No refund is given for unutilized services. Valid ID proof is required at check-in (PAN card not accepted), and early check-in/late check-out is subject to hotel policy with direct payment. Rates may vary during festive seasons (15th December - 15th January).';

// Real Day 1-9 itinerary from the Kashi Yatra 8N/9D PDF, applied to legacyId 30.
const KASHI_YATRA_ITINERARY = [
  {
    day: 1,
    title: 'Arrival at Lucknow – Naimisharanya – Lucknow',
    description:
      'On arrival at Lucknow, meet and greet by our representative and proceed to Naimisharanya to visit Chakra Theertha, Lalitha Devi Temple, Vyasa Gaddi, and Hanuman Gadhi. Evening return to Lucknow for dinner and rest.',
    activities: ['Chakra Theertha & Lalitha Devi Temple', 'Vyasa Gaddi & Hanuman Gadhi'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Lucknow',
  },
  {
    day: 2,
    title: 'Lucknow – Ayodhya',
    description:
      'After breakfast, proceed to Ayodhya (135 km) and visit Sri Rama Janmabhoomi, Hanuman Gadhi, Kanaka Bhavan, and Dasharath Mahal. Evening Sarayu Aarti at Sarayu Ghat, back to the hotel for dinner and rest.',
    activities: ['Sri Rama Janmabhoomi', 'Kanaka Bhavan & Dasharath Mahal', 'Sarayu Aarti'],
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Overnight stay in Ayodhya',
  },
  {
    day: 3,
    title: 'Ayodhya – Prayag Raj',
    description:
      'After breakfast, proceed to Prayag Raj (170 km) and visit Triveni Sangam, Bade Hanuman Temple, Ananda Bhavan, and Alopi Maata Shakti Peetha Mandir. Evening Aarti at the Sangam, transfer to the hotel for dinner and rest.',
    activities: ['Triveni Sangam', 'Alopi Maata Shakti Peetha Mandir', 'Evening Aarti at Sangam'],
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Overnight stay in Prayag Raj',
  },
  {
    day: 4,
    title: 'Prayag Raj – Chitrakoot – Prayag Raj',
    description:
      'After breakfast, proceed to Chitrakoot (120 km) and visit the Kamadgiri Parikrama, Anusuya Maata Mandir, Hanuman Dhara, and Gupta Godavari caves. Evening Aarti at Ram Ghat, back to the hotel for dinner and rest.',
    activities: ['Kamadgiri Parikrama', 'Hanuman Dhara & Gupta Godavari caves'],
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Overnight stay in Prayag Raj',
  },
  {
    day: 5,
    title: 'Prayag Raj – Varanasi',
    description:
      'After breakfast, proceed to Varanasi (120 km) and visit Sarnath, BHU, and a Hanuman Temple. Evening Ganga Aarti at Dashashwamedh Ghat, transfer to the hotel for dinner and rest.',
    activities: ['Sarnath & BHU', 'Ganga Aarti at Dashashwamedh Ghat'],
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Overnight stay in Varanasi',
  },
  {
    day: 6,
    title: 'Varanasi',
    description: 'Morning visit to Kashi Vishwanath Darshan, Annapoorna & Vishalakshi Maata Mandir, and Kala Bhairava, followed by shopping, dinner and rest.',
    activities: ['Kashi Vishwanath Darshan', 'Annapoorna & Vishalakshi Maata Mandir', 'Kala Bhairava'],
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Overnight stay in Varanasi',
  },
  {
    day: 7,
    title: 'Varanasi – Bodhgaya',
    description:
      'After breakfast, proceed to Bodhgaya and visit the Maha Bodhi Vruksha, Thai Temple, Tibetan Monastery, the 80ft Buddha Statue, and the Sri Lankan and Japanese temples. Dinner and rest at the hotel.',
    activities: ['Maha Bodhi Vruksha', '80ft Buddha Statue', 'Thai, Tibetan & Japanese temples'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Bodhgaya',
  },
  {
    day: 8,
    title: 'Bodhgaya – Gaya – Deogarh',
    description:
      'After breakfast, proceed to Gaya to visit the Vishnu Pada Temple, Vatu Vruksha, and Pindadhan rituals. After lunch, proceed to Deogarh, check in and rest, then visit the Baidyanath Jyotirlinga for darshan. Dinner and rest at the hotel.',
    activities: ['Vishnu Pada Temple, Gaya', 'Pindadhan rituals', 'Baidyanath Jyotirlinga darshan'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Deogarh',
  },
  {
    day: 9,
    title: 'Deogarh – Ranchi – Bengaluru',
    description: 'After breakfast, proceed to Ranchi for the onward return journey to Bengaluru.',
    activities: ['Onward journey to Bengaluru'],
    meals: ['Breakfast'],
    accommodation: '',
  },
];

const KASHI_YATRA_INCLUSIONS = [
  'Flights 2 way',
  'Transportation',
  'All meals (pure veg)',
  'VIP darshan at temple',
  'Tour guide',
];

const KASHI_YATRA_EXCLUSIONS = [
  'Personal expenses and shopping',
  'Entry fees & guide charges not mentioned in inclusions',
  'Early check-in or late check-out charges',
  'Travel insurance',
  'Anything not mentioned in inclusions',
];

const KASHI_YATRA_NOTE =
  'This package can be customized as per your requirements. Check-in and check-out times follow hotel policy. The company is not responsible for cancellations due to weather or unforeseen events, and rates may vary due to changes in taxes, hotel rates, or government policies. No discounts are available after confirmation, and sightseeing may be rescheduled due to monument closures.';

// Real Day 1-10 itinerary from the Muktinath Yatra with Ayodhya Darshan 9N/10D PDF,
// applied to legacyId 31.
const MUKTINATH_ITINERARY = [
  {
    day: 1,
    title: 'Bangalore to Ayodhya',
    description:
      'Start from Bangalore to Lucknow by flight. On arrival, our Tour Executive greets you at the airport and transfers you to Ayodhya. Check in to the hotel, then evening visit to the Sarayu River, Shree Rama Janma Bhoomi, Hanuman Gadhi, and Dasharath Mahal. Dinner and rest at the hotel.',
    activities: ['Sarayu River', 'Shree Rama Janma Bhoomi', 'Hanuman Gadhi & Dasharath Mahal'],
    meals: ['Dinner'],
    accommodation: 'Overnight stay in Ayodhya',
  },
  {
    day: 2,
    title: 'Ayodhya – Gorakhpur – Lumbini',
    description:
      'After breakfast, journey from Ayodhya to Lumbini via Gorakhpur, visiting the Gorakshnatha Mandir en route. After lunch, proceed to Lumbini and start local sightseeing of this World Heritage Site — the Bodhi Tree & Pond, Ashoka Pillar, Eternal Peace Flame, Lumbini Garden, Burmese Lokamani Kala Pagoda, and Chinese Maitreya Temple. Check in and overnight stay in Lumbini.',
    activities: ['Gorakshnatha Mandir', 'Bodhi Tree & Ashoka Pillar, Lumbini', 'Lumbini Garden & pagodas'],
    meals: ['Breakfast', 'Lunch'],
    accommodation: 'Overnight stay in Lumbini',
  },
  {
    day: 3,
    title: 'Lumbini – Pokhara',
    description: 'Check out from the hotel in the morning and proceed to Pokhara, approximately a 6-7 hour drive. Check in and overnight stay at the hotel.',
    activities: ['Drive to Pokhara'],
    meals: [],
    accommodation: 'Overnight stay in Pokhara',
  },
  {
    day: 4,
    title: 'Pokhara Full Day Sightseeing',
    description:
      "Morning local sightseeing of Vindhyawasini Temple and Fewa Lake, the second-largest lake in Nepal, including the Tal Barahi Temple in the middle of the lake (reachable by a short boat ride), Seti Gorge, Devi's Fall, and Gupteshwar Mahadev Cave. Evening free to explore the Lakeside Market. Overnight stay at the hotel.",
    activities: ['Fewa Lake & Tal Barahi Temple', "Devi's Fall & Gupteshwar Mahadev Cave", 'Lakeside Market'],
    meals: [],
    accommodation: 'Overnight stay in Pokhara',
  },
  {
    day: 5,
    title: 'Pokhara to Muktinath',
    description:
      'Morning departure to Muktinath by Scorpio, approximately 8-9 hours. On arrival, explore the holy site, take a dip in the 108 water spouts, and visit the Muktinath Temple. Check in and overnight stay at the hotel.',
    activities: ['108 water spouts', 'Muktinath Temple darshan'],
    meals: [],
    accommodation: 'Overnight stay near Muktinath (Jomsom)',
  },
  {
    day: 6,
    title: 'Muktinath to Pokhara',
    description: 'Check out from the hotel in the morning and return to Pokhara, enjoying the scenic beauty of the mountains and valleys along the way. Overnight stay at the hotel.',
    activities: ['Scenic drive back to Pokhara'],
    meals: [],
    accommodation: 'Overnight stay in Pokhara',
  },
  {
    day: 7,
    title: 'Pokhara to Kathmandu via Manokamna',
    description:
      'After breakfast, drive to Kathmandu, approximately a 6-8 hour scenic journey via Manokamna. Visit the Manokamna Devi Temple, "Goddess of fulfilling wishes," reachable by a 9-minute cable car ride (at extra cost) or with the option of river rafting. Check in and overnight stay at the hotel in Kathmandu.',
    activities: ['Manokamna Devi Temple', 'Optional cable car / river rafting'],
    meals: ['Breakfast'],
    accommodation: 'Overnight stay in Kathmandu',
  },
  {
    day: 8,
    title: 'Kathmandu Full Day Sightseeing',
    description:
      'Morning sightseeing tour of Kathmandu — Pashupatinath, one of the holiest Hindu temples on the banks of the Bagmati River, Guhyeshwari Devi, the nearly 2,500-year-old Swyambhunath, and the Budhanilkantha Temple, home to the largest stone sculpture of Lord Vishnu sleeping on serpents. Evening free to stroll the local market. Overnight stay at the hotel.',
    activities: ['Pashupatinath Temple', 'Swyambhunath', 'Budhanilkantha Temple'],
    meals: [],
    accommodation: 'Overnight stay in Kathmandu',
  },
  {
    day: 9,
    title: 'Kathmandu Sightseeing – Janakpur',
    description:
      "Morning visit to Raj Darbar, Bhaktapur (the third ancient city of the Kathmandu Valley) and the Doleshwar Mahadev Temple, one of the holiest Shiva temples in Nepal, followed by Sanga Mahadev, home to the world's tallest Lord Shiva statue at around 143 feet. After lunch, begin the 6-7 hour journey to Janakpur. Check in, dinner and rest at the hotel.",
    activities: ['Raj Darbar, Bhaktapur', 'Doleshwar Mahadev Temple', "Sanga Mahadev - world's tallest Shiva statue"],
    meals: ['Lunch', 'Dinner'],
    accommodation: 'Overnight stay in Janakpur',
  },
  {
    day: 10,
    title: 'Janakpur Sightseeing – Patna Drop',
    description:
      'After breakfast, check out and visit the Janaki Temple, an essential pilgrimage site dedicated to Goddess Sita, and the nearby Ram Mandir. After lunch, proceed to Patna Airport for the return flight to Bangalore.',
    activities: ['Janaki Temple', 'Ram Mandir', 'Flight to Bangalore'],
    meals: ['Breakfast', 'Lunch'],
    accommodation: '',
  },
];

const MUKTINATH_INCLUSIONS = [
  'To & fro flight tickets',
  'All transport by private A/C vehicle',
  '4-Star & 3-Star deluxe accommodation at destinations',
  'Basic deluxe category accommodation at Jomsom',
  'Meal plan: breakfast, lunch, dinner',
  'Muktinath darshan by private non-A/C jeep',
  'All applicable Muktinath permits',
  'Accommodation VAT & service charges',
  "Driver's allowances, vehicle charges, vehicle fuel, toll taxes, parking & Bhansar",
  'Kannada tour guide',
  'Entry tickets',
];

const MUKTINATH_EXCLUSIONS = [
  'Border entry fee',
  'Drinks, snacks, etc. not mentioned in the inclusions',
  'Manokamna cable cars, etc. during sightseeing',
  'Adventure sports activities',
  'Transfers used for other activities not in the itinerary (personal visits, casino, pubs, bars)',
  'Personal expenses, laundry, personal phone calls, tips (guide, hotel, driver)',
  'Things not mentioned above in inclusions',
];

const MUKTINATH_NOTE =
  'We are not holding any reservations in hotels, transfers, buses, or flights, so confirmation is always subject to availability. Under unavoidable circumstances, hotels are subject to change; substitute hotels of a similar category will be provided. The complete package cost is for the entire group, and the per-person cost is calculated accordingly.';

const MUKTINATH_TERMS =
  "Cost is applicable only for Indian nationals travelling together with a valid Indian PAN & ID card. Indian guests must carry an original passport (with 6 months' validity) or original Voter ID, plus 2 photocopies; children (2-12 years) need a valid passport or current-year school photo ID with a birth certificate and must be accompanied by an adult; infants (0-24 months) need a valid passport or birth certificate and must be accompanied by at least one parent. Foreigners/NRIs must carry an original passport with a valid visa. Indian currency notes of ₹200, ₹500, and ₹2000 are not allowed in Nepal - please carry only ₹100 notes.";

// Source data extracted from app/Packages/PackagesContent.jsx
const SOURCE_PACKAGES = [
  // {
  //   legacyId: 1,
  //   title: 'Europe Dream Tour',
  //   description:
  //     'Experience the magic of Europe with our exclusive 10-day tour covering Paris, Rome, Amsterdam, and Switzerland',
  //   price: '₹3,70,999',
  //   duration: '10 Days 9 Nights',
  //   group: 'Max 20 People',
  //   image: '/Images/europe.png',
  //   places: ['Paris', 'Rome', 'Amsterdam', 'Swiss Alps', 'Venice'],
  //   inclusions: ['Return Flights', '5-Star Hotels', 'All Meals', 'Entry Tickets'],
  //   details: [
  //     'Eiffel Tower visit with dinner',
  //     'Roman Colosseum guided tour',
  //     'Amsterdam canal cruise',
  //     'Swiss mountain train ride',
  //     'Venice gondola experience',
  //   ],
  //   region: 'international',
  //   country: 'Multiple',
  //   minAge: 19,
  // },
  {
    legacyId: 3,
    title: 'Nepal – Ayodhya – Varanasi',
    description:
      'Spiritual journey through the most sacred cities with complete temple darshan arrangements',
    price: '₹34,999',
    duration: '10 Days 9 Nights',
    group: 'All Age Groups',
    image: '/Images/nepal.png',
    places: ['Lumbini', 'Pokhara', 'Jomsom', 'Kathmandu', 'Janakpur', 'Ayodhya', 'Varanasi'],
    inclusions: ['Comfort Stay', 'Breakfast and Dinner', 'Pooja Arrangements'],
    details: [
      'Scenic drive to Nepal',
      'Visit Maya Devi Temple (Birthplace of Lord Buddha)',
      'Scenic Himalayan drive to Jomsom',
      'Continue drive to Kathmandu',
      'Visit Janaki Temple',
      'Ayodhya Ram Mandir visit',
      'Ganga Aarti experience',
    ],
    region: 'international',
    country: 'Nepal',
    minAge: 5,
  },
  // {
  //   legacyId: 4,
  //   title: 'Turkey Adventure',
  //   description:
  //     'Discover the cultural blend of Europe and Asia with hot air balloon rides and ancient wonders',
  //   price: '₹2,13,175',
  //   duration: '7 Days 6 Nights',
  //   group: 'Max 18 People',
  //   image: '/Images/turkey.png',
  //   places: ['Cappadocia', 'Istanbul', 'Pamukkale', 'Ephesus'],
  //   inclusions: ['International Flights', '4-Star Hotels', 'Most Meals', 'Activities Included'],
  //   details: [
  //     'Cappadocia hot air balloon ride',
  //     'Hagia Sophia & Blue Mosque',
  //     'Pamukkale thermal pools',
  //     'Ephesus ancient city tour',
  //     'Bosphorus cruise',
  //   ],
  //   region: 'international',
  //   country: 'Turkey',
  //   minAge: 19,
  // },
  {
    legacyId: 5,
    title: 'Mantralaya Day Trip',
    description: 'Quick spiritual getaway from Bangalore to Mantralaya with hassle-free arrangements',
    price: '₹2,799',
    duration: '1 Day',
    group: 'Flexible',
    image: '/Images/Mantralaya 1D Package From Bamgalore.png',
    places: ['Mantralaya Temple', 'Tungabhadra River'],
    inclusions: ['AC Transport', 'Meals Included', 'Temple Entry', 'Same Day Return'],
    details: [
      'Early morning departure from Bangalore',
      'Breakfast & lunch included',
      'Temple darshan arrangements',
      'AC vehicle transportation',
      'Evening return to Bangalore',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 5,
  },
  {
    legacyId: 6,
    title: 'Thailand Paradise',
    description:
      'Complete Thailand experience with island hopping, cultural shows, and adventure activities',
    price: '₹45,999',
    duration: '6 Days 5 Nights',
    group: 'Max 25 People',
    image: '/Images/Thailand 4N5D (4).png',
    places: ['Bangkok', 'Pattaya', 'Coral Island', 'Safari World'],
    inclusions: ['Return Flights', 'Beach Resorts', 'All Meals', 'Tour Manager'],
    details: [
      'Tiger Park visit',
      'Coral Island snorkeling',
      'Floating market tour',
      'Dinner cruise with show',
      'Alcazar performance',
      'Safari World & Marine Park',
    ],
    region: 'international',
    country: 'Thailand',
    minAge: 19,
  },
  {
    legacyId: 7,
    title: 'South Karnataka Temple Tour',
    description: 'Explore the architectural marvels and spiritual centers of South Karnataka',
    price: '₹2,999',
    duration: '5 Days 4 Nights',
    group: 'All Age Groups',
    image: '/Images/SOUTH KARNATAKA TEMPLE TOUR.png',
    places: ['Mysore', 'Hassan', 'Belur', 'Halebid', 'Shravanabelagola'],
    inclusions: ['Hotel Stay', 'AC Transport', 'Breakfast & Dinner', 'All Entry Fees'],
    details: [
      'Mysore Palace visit',
      'Hassan temples tour',
      'Belur & Halebid heritage sites',
      'Shravanabelagola monolith',
      'Expert guide throughout',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 5,
  },
  {
    legacyId: 8,
    title: 'WINTER SPITI 4x4 CAR EXPEDITION LAST BATCH',
    description:
      'Thrilling winter expedition through the breathtaking Spiti Valley with 4x4 vehicles, snow-covered landscapes, and ancient monasteries',
    price: '₹31,999',
    duration: '8 Days 7 Nights',
    group: 'Max 12 People',
    image: '/Images/Spiti_Valley_.png',
    places: ['Manali', 'Kaza', 'Key Monastery', 'Chandratal Lake', 'Kunzum Pass'],
    inclusions: ['4x4 Vehicle', 'Camping/Homestay', 'All Meals', 'Permits'],
    details: [
      'Thrilling 4x4 expedition through snow',
      'Visit ancient Key Monastery',
      'Frozen Chandra Taal lake experience',
      'Cross Kunzum Pass (14,931 ft)',
      'Experience local Spitian culture',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 19,
  },
  {
    legacyId: 9,
    title: 'ADVENTURE LEH-LADAKH BIKE RIDE TRIP 5N/6D (Excluding Flight)',
    description:
      'Epic motorcycle journey through the highest motorable passes in the world, conquering Khardung La and experiencing stunning Himalayan landscapes',
    price: '₹26,499',
    duration: '6 Days 5 Nights',
    group: 'Max 10 Riders',
    image: '/Images/ladakh_5N-6D.png',
    places: ['Leh', 'Khardung La', 'Nubra Valley', 'Pangong Lake', 'Chang La'],
    inclusions: ['Royal Enfield Bike', 'Camping/Hotels', 'All Meals', 'Permits & Support'],
    details: [
      "Ride to Khardung La (World's highest motorable pass)",
      'Camp at Pangong Lake',
      'Explore Nubra Valley sand dunes',
      'Double humped camel safari',
      'Professional mechanic support',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 21,
  },
  {
    legacyId: 10,
    title: 'LEH-LADAKH BIKE RIDE TRIP 12N/13D (Excluding Flight) DEL - DEL',
    description:
      'Comprehensive Ladakh bike expedition from Delhi covering Manali-Leh highway, Nubra Valley, Pangong Lake, and return via Srinagar',
    price: '₹56,499',
    duration: '13 Days 12 Nights',
    group: 'Max 12 Riders',
    image: '/Images/ladakh_12N-13D.png',
    places: ['Delhi', 'Manali', 'Leh', 'Nubra', 'Pangong', 'Srinagar'],
    inclusions: ['Royal Enfield', 'Hotels/Camping', 'All Meals', 'Support Vehicle'],
    details: [
      'Complete circuit from Delhi',
      'Conquer 5 high mountain passes',
      'Experience both Manali-Leh & Srinagar-Leh highways',
      'Stay at Pangong Lake shore',
      'Professional photography coverage',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 21,
  },
  {
    legacyId: 11,
    title: 'LADAKH BIKE TRIP 7N-8D (Excluding Flight)',
    description:
      'Perfect duration bike trip covering all highlights of Ladakh including Khardung La, Nubra Valley, and the mesmerizing Pangong Lake',
    price: '₹31,499',
    duration: '8 Days 7 Nights',
    group: 'Max 12 Riders',
    image: '/Images/ladakh_7N-8D.jpg',
    places: ['Leh', 'Khardung La', 'Nubra Valley', 'Pangong Lake', 'Chang La'],
    inclusions: ['Royal Enfield', 'Hotels/Camping', 'All Meals', 'Permits & Support'],
    details: [
      'Ride to Khardung La (18,380 ft)',
      'Double humped camel ride in Nubra',
      'Camping at Pangong Lake',
      'Visit magnetic hill & confluence',
      'Professional photography',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 21,
  },
  {
    legacyId: 12,
    title: 'THAILAND LADIES BATCH SPCL 4N/5D (WF)',
    description:
      'Special ladies-only Thailand tour designed for female travelers with safe, comfortable accommodations and women-friendly activities',
    price: '₹45,999',
    duration: '5 Days 4 Nights',
    group: 'Ladies Only',
    image: '/Images/Thailand_Ladies_Special.png',
    places: ['Bangkok', 'Pattaya', 'Coral Island'],
    inclusions: ['Return Flights', '4-Star Resorts', 'All Meals', 'Lady Tour Manager'],
    details: [
      'Women-only group with female guide',
      'Spa and wellness sessions',
      'Shopping at MBK & Platinum Mall',
      'Coral Island water activities',
      'Alcazar Cabaret show',
    ],
    region: 'international',
    country: 'Thailand',
    minAge: 19,
  },
  {
    legacyId: 13,
    title: 'THAILAND 4N/5D ',
    description:'Perfect Thailand getaway with 3 nights in Pattaya and 1 night in Bangkok including flights and all major attractions',
    price: '₹54,000',
    duration: '5 Days 4 Nights',
    group: 'Max 25 People',
    image: '/Images/Thailand.png',
    places: ['Pattaya', 'Bangkok', 'Coral Island', 'Big Buddha Temple', 'Safari World'],
    inclusions: ['Return Flights', '3-Star Hotels', 'Meals (Local Indian)', 'All Entry Tickets'],
    details: [
      'Tiger Topia show at Sriracha',
      'Alcazar Cabaret show',
      'Coral Island speedboat tour',
      'Gems Gallery & Nong Nooch Village',
      'Big Buddha Temple (18m golden statue)',
      'Bangkok shopping & Chao Phraya dinner cruise',
      'Safari World & Marine Park',
    ],
    region: 'international',
    country: 'Thailand',
    minAge: 19,
  },
  {
    legacyId: 14,
    title: 'Budget Thailand 3N/4D Without Flight Package',
    description:
      "Affordable Thailand tour covering Bangkok and Pattaya's highlights without flight, perfect for budget-conscious travelers",
    price: '₹18,499',
    duration: '4 Days 3 Nights',
    group: 'Max 30 People',
    image: '/Images/Thailand_3N-4Dwf.png',
    places: ['Bangkok', 'Pattaya', 'Coral Island'],
    inclusions: ['3-Star Hotels', 'Breakfast Only', 'AC Transport', 'Sightseeing'],
    details: [
      'Bangkok city temple tour',
      'Pattaya beach visit',
      'Coral Island snorkeling',
      'Alcazar show (Optional)',
      'Shopping at local markets',
    ],
    region: 'international',
    country: 'Thailand',
    minAge: 19,
  },
  {
    legacyId: 15,
    title: 'Budget Thailand 3N/4D Without Flight Package (Only Breakfast)',
    description:
      'Super budget-friendly Thailand package with just breakfast included, giving you flexibility to explore food on your own',
    price: '₹12,999',
    duration: '4 Days 3 Nights',
    group: 'Max 30 People',
    image: '/Images/Thailand_3N-4D.png',
    places: ['Bangkok', 'Pattaya'],
    inclusions: ['Budget Hotels', 'Only Breakfast', 'AC Transport', 'Basic Sightseeing'],
    details: [
      'Flexible meal options',
      'Bangkok city orientation',
      'Pattaya beach time',
      'Free time for shopping',
      'Optional add-ons available',
    ],
    region: 'international',
    country: 'Thailand',
    minAge: 19,
  },
  {
    legacyId: 16,
    title: 'Thailand 4N/5D Without Flight Package',
    description:
      'Complete Thailand experience without flights, covering Bangkok and Pattaya with comfortable accommodations and guided tours',
    price: '₹26,999',
    duration: '5 Days 4 Nights',
    group: 'Max 25 People',
    image: '/Images/Thailand_4N-5D.png',
    places: ['Bangkok', 'Pattaya', 'Coral Island'],
    inclusions: ['3-4 Star Hotels', 'Breakfast & Dinner', 'AC Transport', 'All Entry Fees'],
    details: [
      'Golden Buddha & Wat Pho visit',
      'Pattaya Walking Street',
      'Coral Island tour with lunch',
      'Alcazar Cabaret show',
      'Elephant trekking (Optional)',
    ],
    region: 'international',
    country: 'Thailand',
    minAge: 19,
  },
  {
    legacyId: 17,
    title: 'DANDELI-GOKARNA 1N/2D TRIP',
    description: 'Quick weekend getaway combining the adventure of Dandeli with the serene beaches of Gokarna',
    price: '₹4,999',
    duration: '2 Days 1 Night',
    group: 'Max 20 People',
    image: '/Images/dandeli.png',
    places: ['Dandeli', 'Gokarna', 'Om Beach'],
    inclusions: ['AC Transport', 'Resort Stay', 'Meals Included', 'Activities'],
    details: [
      'River rafting in Dandeli',
      'Om Beach sunset view',
      'Trek to Half Moon Beach',
      'Jungle safari (Optional)',
      'Visit Mahabaleshwar Temple',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 12,
  },
  {
    legacyId: 18,
    title: 'MURDESHWARA SCUBA PACKAGE 1N/2D',
    description:
      'Experience the thrill of scuba diving in the clear waters of Murdeshwar with professional training and equipment',
    price: '₹6,999',
    duration: '2 Days 1 Night',
    group: 'Max 15 People',
    image: '/Images/MURDESHWRA_SCUBA.png',
    places: ['Murdeshwar', 'Netrani Island'],
    inclusions: ['AC Transport', 'Beach Resort', 'Meals Included', 'Scuba Diving'],
    details: [
      'Professional scuba diving training',
      '2 dives at Netrani Island',
      'Underwater photography',
      'Visit Murdeshwar Temple',
      'Beach sunset experience',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 12,
  },
  {
    legacyId: 19,
    title: 'DHARMASTHALA Complete Divine Circuit In 01 Day Trip',
    description:
      'Complete one-day spiritual tour covering Dharmasthala, Kukke Subramanya, and other sacred sites',
    price: '₹2,499',
    duration: '1 Day',
    group: 'Flexible',
    image: '/Images/Dharmasthala_.png',
    places: ['Dharmasthala', 'Kukke Subramanya', 'Manjunatha Temple'],
    inclusions: ['AC Transport', 'Prasadam Meals', 'Temple Entry', 'Same Day Return'],
    details: [
      'Darshan at Dharmasthala',
      'Visit Kukke Subramanya',
      'Special puja arrangements',
      'Breakfast & lunch included',
      'Return to Bangalore by night',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 5,
  },
  {
    legacyId: 20,
    title: 'SIGANDUR (JOG FALLS) 01 DAY TRIP',
    description:
      "Day trip to India's second-highest waterfall - Jog Falls, including visits to nearby viewpoints and attractions",
    price: '₹2,599',
    duration: '1 Day',
    group: 'Flexible',
    image: '/Images/Singadur_.png',
    places: ['Jog Falls', 'Sigandur', 'Linganamakki Dam'],
    inclusions: ['AC Transport', 'Meals Included', 'Entry Fees', 'Same Day Return'],
    details: [
      'View Jog Falls in full glory',
      'Visit Sigandur Temple',
      'Linganamakki Dam viewpoint',
      'Photography at waterfalls',
      'Breakfast & lunch provided',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 5,
  },
  {
    legacyId: 21,
    title: 'KASHI, PRAYAGRAJ, AYODHYA ,GAYA PACKAGE',
    description:
      "Spiritual journey through India's most sacred cities with complete temple darshan arrangements",
    price: '₹38,000',
    duration: '5 Nights/6 Days',
    group: 'All Age Groups',
    image: '/Images/prayagraj.jpg',
    places: ['Varanasi', 'Prayagraj', 'Ayodhya', 'Gaya'],
    inclusions: ['Comfort Stay', 'Breakfast', 'Pooja Arrangements'],
    details: [
      'Pickup from Airport / Railway Station',
      'Visit Kashi Vishwanath Temple',
      'Attend Ganga Aarti at Dashashwamedh Ghat',
      'Visit Kal Bhairav Temple',
      'Visit Hanuman Temple & local temples',
      'Visit Ram Janmabhoomi',
      'Visit Vishnupad Temple',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 5,
  },
  {
    legacyId: 22,
    title: 'Cambodia Premium Escape',
    description:
      'Experience the Magic of Hanoi & Halong Bay, immerse yourself in the perfect blend of culture, nature, and luxury',
    price: '₹25,999',
    duration: '4 Days 3 Nights',
    group: 'Max 20 People',
    image: '/Images/combodia.png',
    places: ['Angkor Temple', 'Kampong Phluk Floating Village Tour', 'Siem Reap Departure'],
    inclusions: ['5-Star Hotels'],
    details: [
      'Hotel in Siem Reap',
      'Angkor Temple Tour',
      'Explore ancient city ruins',
      'Enjoy breathtaking sunset views',
      'Kampong Phluk Floating Village Tour',
    ],
    region: 'international',
    country: 'Cambodia',
    minAge: 19,
  },
  {
    legacyId: 23,
    title: 'Vietnam Grand Tour 6N/7D',
    description:
      "Explore Vietnam's icons from a Halong Bay day cruise and ancient Hoi An to the Golden Bridge at Ba Na Hills and the vibrant streets of Ho Chi Minh City",
    price: '₹0',
    duration: '7 Days 6 Nights',
    group: 'Max 20 People',
    image: '/Images/Vietnam.png',
    places: ['Hanoi', 'Halong Bay', 'Da Nang', 'Hoi An', 'Ho Chi Minh City', 'Mekong Delta'],
    inclusions: [
      'International & Domestic Flights + Visa',
      'AC Hotel Stay (Twin Sharing)',
      'Meals as per Itinerary (B/L/D)',
      'All Entrance Fees & Private Transfers',
    ],
    details: [
      'Halong Bay day cruise with kayaking & cooking class',
      'Hanoi city tour: Tran Quoc Pagoda & Temple of Literature',
      'Marble Mountains & Hoi An Ancient Town',
      'Ba Na Hills cable car & Golden Bridge',
      'Ho Chi Minh City tour & Bitexco Skydeck',
      'Mekong Delta boat ride & village cycling',
      'Cu Chi Tunnels visit',
    ],
    region: 'international',
    country: 'Vietnam',
    minAge: 12,
  },
  {
    legacyId: 24,
    title: 'Malaysia Kuala Lumpur 2N/3D (Batu Caves, Genting Highlands & Petronas Towers)',
    description:
      'Explore Kuala Lumpur with a Putrajaya photo stop, the KL Tower, sacred Batu Caves, a Genting Highlands cable car adventure, and the iconic Petronas Twin Towers',
    price: '₹43,000',
    duration: '3 Days 2 Nights',
    group: 'Max 25 People',
    image: '/Images/Malaysia.png',
    places: ['Kuala Lumpur', 'Putrajaya', 'Batu Caves', 'Genting Highlands', 'Petronas Twin Towers'],
    inclusions: [
      'Return Flights',
      '3-Star Hotels',
      'Meals (Local Indian)',
      'Genting Highlands Cable Car',
    ],
    details: [
      'Putrajaya photo stop',
      'KL Tower observation deck',
      'Batu Caves Hindu temple visit',
      'Genting Highlands cable car & entertainment',
      'Petronas Twin Towers photo stop',
      'Chinese temple & chocolate outlet shopping',
    ],
    region: 'international',
    country: 'Malaysia',
    minAge: 12,
  },
  {
    legacyId: 25,
    title: 'Thailand & Malaysia Combo 6N/7D (Pattaya, Bangkok, Kuala Lumpur)',
    description:
      'Double-destination getaway covering 3 nights in Pattaya, 1 night in Bangkok, and 2 nights in Kuala Lumpur — Tiger Topia, Coral Island, the Big Buddha Temple, Genting Highlands, and the Petronas Twin Towers all in one trip',
    price: '₹0',
    duration: '7 Days 6 Nights',
    group: 'Max 25 People',
    image: '/Images/Thailand.png',
    places: ['Pattaya', 'Bangkok', 'Kuala Lumpur', 'Genting Highlands', 'Petronas Twin Towers'],
    inclusions: [
      'Return Flights',
      '3-Star Hotels',
      'Meals (Local Indian)',
      'All Entry Tickets',
    ],
    details: [
      'Tiger Topia show at Sriracha',
      'Alcazar Cabaret show',
      'Coral Island speedboat tour',
      'Big Buddha Temple (18m golden statue)',
      'Bangkok shopping & Chao Phraya dinner cruise',
      'Genting Highlands cable car',
      'Petronas Twin Towers & KL Tower',
    ],
    region: 'international',
    country: 'Thailand & Malaysia',
    minAge: 19,
  },
  {
    legacyId: 26,
    title: 'Malaysia & Singapore Combo 5N/6D',
    description:
      'Double-country adventure from Putrajaya and Genting Highlands in Malaysia to Sentosa Island, Universal Studios, and Gardens by the Bay in Singapore',
    price: '₹0',
    duration: '6 Days 5 Nights',
    group: 'Max 25 People',
    image: '/Images/Malaysia.png',
    places: ['Kuala Lumpur', 'Genting Highlands', 'Singapore', 'Sentosa Island', 'Gardens by the Bay'],
    inclusions: [
      'Return Flights',
      'Hotel Stay',
      'Full Board Meals',
      'Private Vehicle Transfers',
    ],
    details: [
      'Putrajaya tour',
      'KL Tower observation deck',
      'Genting Highlands cable car & Batu Caves',
      'Singapore night safari',
      'Sentosa Island',
      'Universal Studios & Gardens by the Bay',
    ],
    region: 'international',
    country: 'Malaysia & Singapore',
    minAge: 19,
  },
  {
    legacyId: 27,
    title: 'Panchabhoota Yatra 3N/4D (Srikalahasti, Kanchipuram, Thiruvannamalai, Chidambaram, Trichy)',
    description:
      'A sacred journey to the five Pancha Bhoota Sthalams representing the five elements — Vayu at Srikalahasti, Prithvi at Kanchipuram, Agni at Thiruvannamalai, Akasha at Chidambaram, and Appu at Thiruvanaikaval',
    price: '₹14,499',
    duration: '4 Days 3 Nights',
    group: 'All Age Groups',
    image: '/Images/Panchabhoota.png',
    places: ['Srikalahasti', 'Kanchipuram', 'Thiruvannamalai', 'Chidambaram', 'Trichy', 'Thiruvanaikaval'],
    inclusions: [
      'Comfortable Stay & All Meals',
      'AC Private Vehicle',
      'Pickup & Drop from Bangalore',
      'All Applicable Taxes',
    ],
    details: [
      'Srikalahasteeswara Temple (Vayu - Air)',
      'Ekambareswarar Temple, Kanchipuram (Prithvi - Earth)',
      'Arunachaleeswarar Temple, Thiruvannamalai (Agni - Fire)',
      'Thillai Natarajar Temple, Chidambaram (Akasha - Space)',
      'Jambukeswarar Temple, Thiruvanaikaval (Appu - Water)',
    ],
    region: 'domestic',
    country: 'India',
    minAge: 5,
  },
  {
    legacyId: 28,
    title: 'Do Dham Yatra 7N/8D (Kedarnath & Badrinath)',
    description:
      'A divine journey to the abode of Lord Shiva and Lord Badrinarayan, covering Haridwar, Rudraprayag, Guptkashi, Kedarnath, Joshimath, Badrinath, and Mana Village',
    price: '₹42,499',
    duration: '8 Days 7 Nights',
    group: 'Max 27 People',
    image: '/Images/Do-dham.png',
    places: ['Delhi', 'Haridwar', 'Rudraprayag', 'Guptkashi', 'Kedarnath', 'Joshimath', 'Badrinath', 'Mana Village'],
    inclusions: [
      'To & Fro Flights',
      '3-Star Hotel Stay',
      'All Meals (Pure Veg)',
      'Pickup & Drop from Delhi',
    ],
    details: [
      'Ganga Aarti at Har Ki Pauri, Haridwar',
      'Kedarnath Temple trek & Abhishek darshan',
      'Sri Narsingh Temple, Joshimath',
      'Badrinath Temple darshan & Tapt Kund',
      'Mana Village, Vyas Gufa & Bhim Pul',
      'Dhari Devi Temple, Rudraprayag',
    ],
    region: 'domestic',
    zone: 'north',
    minAge: 12,
    country: 'India',
  },
  {
    legacyId: 29,
    title: 'Char Dham Yatra with Chopta Tunganath 14N/15D (Yamunotri, Gangotri, Kedarnath, Badrinath)',
    description:
      'A comprehensive pilgrimage and adventure tour to the four Char Dham temples of Uttarakhand — Yamunotri, Gangotri, Kedarnath, and Badrinath — combined with Chopta, the trek to Tungnath (the highest Shiva temple in the world), and the sacred Triyuginarayan Temple',
    price: '₹61,999',
    duration: '15 Days 14 Nights',
    group: 'Max 30 People',
    image: '/Images/Char-dham.png',
    places: ['Delhi', 'Haridwar', 'Yamunotri', 'Gangotri', 'Kedarnath', 'Triyuginarayan', 'Chopta', 'Tungnath', 'Badrinath', 'Rishikesh'],
    inclusions: [
      'To & Fro Flights',
      '2x2 Luxury Coach',
      'All Meals (Pure Veg)',
      'VIP Darshan at Temple',
      'Tour Guide',
    ],
    details: [
      'Yamunotri Temple trek',
      'Gangotri Temple & holy dip in the Bhagirathi',
      'Kedarnath Temple darshan (Jyotirlinga)',
      'Triyuginarayan Temple eternal flame',
      'Tungnath trek, Chopta',
      'Badrinath Temple darshan & Tapt Kund',
      'Karthik Swami Temple trek',
      'Rishikesh - Ram Jhula & Laxman Jhula',
    ],
    region: 'domestic',
    zone: 'north',
    minAge: 12,
    country: 'India',
  },
  {
    legacyId: 30,
    title: 'Kashi Yatra 8N/9D (Lucknow, Ayodhya, Naimisharanya, Prayagraj, Chitrakoot, Varanasi, Gaya, Baidyanath)',
    description:
      'A spiritual circuit across Uttar Pradesh and Bihar covering Naimisharanya, Ayodhya (birthplace of Lord Rama), Prayagraj (Triveni Sangam), Chitrakoot, Varanasi (Kashi Vishwanath), Bodhgaya, Gaya, and the Baidyanath Jyotirlinga at Deogarh',
    price: '₹43,999',
    duration: '9 Days 8 Nights',
    group: 'All Age Groups',
    image: '/Images/Kashi.png',
    places: ['Lucknow', 'Ayodhya', 'Naimisharanya', 'Prayagraj', 'Chitrakoot', 'Varanasi', 'Gaya', 'Baidyanath'],
    inclusions: [
      'Flights 2 Way',
      'Transportation',
      'All Meals (Pure Veg)',
      'VIP Darshan at Temple',
      'Tour Guide',
    ],
    details: [
      'Sri Rama Janmabhoomi & Sarayu Aarti, Ayodhya',
      'Triveni Sangam, Prayagraj',
      'Kamadgiri Parikrama, Chitrakoot',
      'Kashi Vishwanath Darshan & Ganga Aarti, Varanasi',
      'Maha Bodhi Vruksha, Bodhgaya',
      'Baidyanath Jyotirlinga, Deogarh',
    ],
    region: 'domestic',
    zone: 'north',
    minAge: 5,
    country: 'India',
  },
  {
    legacyId: 31,
    title: 'Muktinath Yatra with Ayodhya Darshan 9N/10D (Ayodhya, Lumbini, Pokhara, Muktinath, Kathmandu, Janakpur)',
    description:
      'A Nepal spiritual pilgrimage combined with Ayodhya darshan — Lumbini, Pokhara, the sacred Muktinath Temple with its 108 water spouts, Kathmandu, and Janakpur, all in one journey',
    price: '₹51,999',
    duration: '10 Days 9 Nights',
    group: 'Max 35 People',
    image: '/Images/Mukthinath-yatra.png',
    places: ['Ayodhya', 'Gorakhpur', 'Lumbini', 'Pokhara', 'Muktinath', 'Kathmandu', 'Janakpur'],
    inclusions: [
      'To & Fro Flights',
      '4-Star & 3-Star Hotels',
      'All Meals (Breakfast, Lunch, Dinner)',
      'Muktinath Darshan by Jeep',
    ],
    details: [
      'Shree Rama Janma Bhoomi, Ayodhya',
      'Lumbini World Heritage Site',
      'Fewa Lake & Tal Barahi Temple, Pokhara',
      'Muktinath Temple - 108 water spouts',
      'Pashupatinath & Swyambhunath, Kathmandu',
      'Janaki Temple, Janakpur',
    ],
    region: 'international',
    country: 'Nepal',
    minAge: 0,
  },
  
];

function buildPackageData(src) {
  const slug = `${slugify(src.title)}-${src.legacyId}`;
  const isThailandPattaya = src.legacyId === 13;
  const isVietnam = src.legacyId === 23;
  const isMalaysia = src.legacyId === 24;
  const isThaiMalaysiaCombo = src.legacyId === 25;
  const isMalaysiaSingaporeCombo = src.legacyId === 26;
  const isPanchabhoota = src.legacyId === 27;
  const isDoDham = src.legacyId === 28;
  const isCharDham = src.legacyId === 29;
  const isKashiYatra = src.legacyId === 30;
  const isMuktinath = src.legacyId === 31;
  const itinerary = isThailandPattaya ? THAILAND_PATTAYA_ITINERARY : isVietnam ? VIETNAM_ITINERARY : isMalaysia ? MALAYSIA_ITINERARY : isThaiMalaysiaCombo ? THAI_MALAYSIA_COMBO_ITINERARY : isMalaysiaSingaporeCombo ? MALAYSIA_SINGAPORE_COMBO_ITINERARY : isPanchabhoota ? PANCHABHOOTA_ITINERARY : isDoDham ? DO_DHAM_ITINERARY : isCharDham ? CHAR_DHAM_ITINERARY : isKashiYatra ? KASHI_YATRA_ITINERARY : isMuktinath ? MUKTINATH_ITINERARY : genItinerary(src);
  const inclusions = isThailandPattaya ? THAILAND_PATTAYA_INCLUSIONS : isVietnam ? VIETNAM_INCLUSIONS : isMalaysia ? MALAYSIA_INCLUSIONS : isThaiMalaysiaCombo ? THAI_MALAYSIA_COMBO_INCLUSIONS : isMalaysiaSingaporeCombo ? MALAYSIA_SINGAPORE_COMBO_INCLUSIONS : isPanchabhoota ? PANCHABHOOTA_INCLUSIONS : isDoDham ? DO_DHAM_INCLUSIONS : isCharDham ? CHAR_DHAM_INCLUSIONS : isKashiYatra ? KASHI_YATRA_INCLUSIONS : isMuktinath ? MUKTINATH_INCLUSIONS : src.inclusions;
  const exclusions = isThailandPattaya ? THAILAND_PATTAYA_EXCLUSIONS : isVietnam ? VIETNAM_EXCLUSIONS : isMalaysia ? MALAYSIA_EXCLUSIONS : isThaiMalaysiaCombo ? THAI_MALAYSIA_COMBO_EXCLUSIONS : isMalaysiaSingaporeCombo ? MALAYSIA_SINGAPORE_COMBO_EXCLUSIONS : isPanchabhoota ? PANCHABHOOTA_EXCLUSIONS : isDoDham ? DO_DHAM_EXCLUSIONS : isCharDham ? CHAR_DHAM_EXCLUSIONS : isKashiYatra ? KASHI_YATRA_EXCLUSIONS : isMuktinath ? MUKTINATH_EXCLUSIONS : genExclusions(src);
  const images = isThaiMalaysiaCombo ? ['/Images/Thailand.png', '/Images/Malaysia.png'] : isMalaysiaSingaporeCombo ? ['/Images/Malaysia.png', '/Images/Singapore.png'] : [src.image];

  return {
    title: src.title,
    slug,
    description: src.description,
    shortDesc: src.description.length > 140 ? `${src.description.slice(0, 137)}...` : src.description,
    duration: src.duration,
    destination: src.places.slice(0, 3).join(', '),
    country: src.country,
    price: parsePrice(src.price),
    bookingAmount: Math.round(parsePrice(src.price) * 0.5),
    // gst: 5,
    images,
    inclusions,
    exclusions,
    whatToCarry: genWhatToCarry(src),
    itinerary,
    isActive: true,
    isOnSale: false,
    totalSeats: parseSeats(src.group),
    minAge: src.minAge,
    accommodation: isThailandPattaya
      ? '3-Star Hotels (Twin Sharing)'
      : isVietnam
      ? 'Shared AC Room (Twin Sharing) with Private Bathroom'
      : isMalaysia
      ? '3-Star Hotels (Twin Sharing)'
      : isThaiMalaysiaCombo
      ? '3-Star Hotels (Twin Sharing)'
      : isMalaysiaSingaporeCombo
      ? 'Entry-Level Room, Hotel Stay'
      : isDoDham
      ? '3-Star Hotels (Twin/Triple Sharing); Basic Camp at Kedarnath'
      : isCharDham
      ? '3-Star Hotels / Camps (as per itinerary)'
      : isKashiYatra
      ? 'Comfortable Hotel Stay (as per itinerary)'
      : isMuktinath
      ? '4-Star & 3-Star Deluxe Hotels (Double/Triple Sharing); Basic Deluxe at Jomsom'
      : pickInclusion(src.inclusions, ['hotel', 'resort', 'camping', 'homestay', 'stay']) || 'Standard Accommodation',
    transportation: isThailandPattaya
      ? 'Round-trip flights (Bangalore-Bangkok) & private vehicle transfers'
      : isVietnam
      ? 'International & domestic flights, visa, and private A/C vehicle transfers'
      : isMalaysia
      ? 'Round-trip flights (Bangalore-Kuala Lumpur) & private vehicle transfers'
      : isThaiMalaysiaCombo
      ? 'Round-trip flights (Bangalore-Bangkok), Bangkok-Malaysia flight & private vehicle transfers'
      : isMalaysiaSingaporeCombo
      ? 'Round-trip flight, Kuala Lumpur-Singapore A/C coach & private vehicle transfers'
      : isDoDham
      ? 'To & fro flights + A/C 27-seater luxury coach bus'
      : isCharDham
      ? 'Round-trip flights (Bangalore-Delhi-Bangalore) + 2x2 luxury coach'
      : isKashiYatra
      ? 'Round-trip flights + private vehicle transfers'
      : isMuktinath
      ? 'To & fro flights + private A/C vehicle + non-A/C jeep for Muktinath darshan'
      : pickInclusion(src.inclusions, ['transport', 'vehicle', 'flight', 'bike', 'enfield']) || 'AC Transport',
    meals: isThailandPattaya
      ? '3 meals at local Indian restaurants'
      : isVietnam
      ? 'As per itinerary (Breakfast, Lunch, Dinner) + 2 bottles of mineral water/day'
      : isMalaysia
      ? '3 meals at local Indian restaurants'
      : isThaiMalaysiaCombo
      ? '3 meals at local Indian restaurants'
      : isMalaysiaSingaporeCombo
      ? 'Full board (Breakfast, Lunch, Dinner daily)'
      : isDoDham
      ? 'Breakfast, Lunch & Dinner (Pure Veg, South Indian style)'
      : isCharDham
      ? 'Breakfast, Lunch & Dinner (Pure Veg)'
      : isKashiYatra
      ? 'All Meals (Pure Veg)'
      : isMuktinath
      ? 'Breakfast, Lunch & Dinner'
      : pickInclusion(src.inclusions, ['meal', 'breakfast', 'dinner', 'prasadam']) || 'As per itinerary',
    cancellationPolicy: isThailandPattaya ? THAILAND_PATTAYA_NOTE : isVietnam ? VIETNAM_CANCELLATION_POLICY : isMalaysia ? MALAYSIA_NOTE : isThaiMalaysiaCombo ? THAI_MALAYSIA_COMBO_NOTE : isMalaysiaSingaporeCombo ? MALAYSIA_SINGAPORE_COMBO_NOTE : isDoDham ? DO_DHAM_NOTE : isCharDham ? CHAR_DHAM_NOTE : isKashiYatra ? KASHI_YATRA_NOTE : isMuktinath ? MUKTINATH_NOTE : CANCELLATION_POLICY,
    termsConditions: isThailandPattaya ? THAILAND_PATTAYA_TERMS : isVietnam ? VIETNAM_TERMS : isMalaysia ? MALAYSIA_TERMS : isThaiMalaysiaCombo ? THAI_MALAYSIA_COMBO_TERMS : isMalaysiaSingaporeCombo ? MALAYSIA_SINGAPORE_COMBO_TERMS : isDoDham ? DO_DHAM_TERMS : isCharDham ? CHAR_DHAM_TERMS : isKashiYatra ? CHAR_DHAM_TERMS : isMuktinath ? MUKTINATH_TERMS : TERMS_CONDITIONS,
    pickUpPoints: isDoDham || isCharDham
      ? [{ city: 'Delhi', airport: 'Delhi Airport / Railway Station', googleMapLink: '' }]
      : isKashiYatra
      ? [{ city: 'Lucknow', airport: 'Lucknow Airport', googleMapLink: '' }]
      : [{ city: 'Bengaluru', airport: 'Bengaluru Airport', googleMapLink: '' }],
  };
}

async function main() {
  console.log('Removing packages that are no longer in the source list...');
  const keepSlugs = SOURCE_PACKAGES.map((src) => `${slugify(src.title)}-${src.legacyId}`);
  const { count: removed } = await prisma.package.deleteMany({
    where: { slug: { notIn: keepSlugs } },
  });
  console.log(`  removed ${removed} package(s) not in the source list`);

  console.log('Seeding real package detail pages...');
  let count = 0;
  for (const src of SOURCE_PACKAGES) {
    const data = buildPackageData(src);
    await prisma.package.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });
    console.log(`  upserted: ${data.slug}`);
    count++;
  }
  console.log(`Done. ${count} packages upserted.`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
