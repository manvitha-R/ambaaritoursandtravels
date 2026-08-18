"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Users, Plane, Hotel, Utensils, Ticket, CheckCircle, Calendar, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";

// ---------- YOUR PACKAGES ARRAY (unchanged) ----------
const packages = [
  {
    id: 13,
    slug: "thailand-4n-5d",
    title: "THAILAND 4N/5D WITH FLIGHT",
    description: "Perfect Thailand getaway with 3 nights in Pattaya and 1 night in Bangkok including flights and all major attractions",
    price: "₹58,666",
    duration: "5 Days 4 Nights",
    // date: "August 23rd, 30th, September 6th, 13th, 20th, October 11th, 25th",                  // upcoming date
    // travelerCount: "20+ travellers can't be wrong – book your trip today!",
    group: "Max 25 People",
    highlight: "Best Value",
    image: "/Images/Thailand.png",
    color: "from-teal-500 to-cyan-600",
    places: ["Pattaya", "Bangkok", "Coral Island", "Big Buddha Temple", "Safari World"],
    inclusions: [
      { icon: Plane, text: "Return Flights" },
      { icon: Hotel, text: "3-Star Hotels" },
      { icon: Utensils, text: "Meals (Local Indian)" },
      { icon: Ticket, text: "All Entry Tickets" },
    ],
    details: [
      "Tiger Topia show at Sriracha",
      "Alcazar Cabaret show",
      "Coral Island speedboat tour",
      "Gems Gallery & Nong Nooch Village",
      "Big Buddha Temple (18m golden statue)",
      "Bangkok shopping & Chao Phraya dinner cruise",
      "Safari World & Marine Park"
    ],
    region: "international",
    country: "Thailand",
    category: "beach",
    tags: ["thailand", "pattaya", "bangkok", "flights-included"]
  },
  // {
  //   id: 14,
  //   slug: "budget-thailand-3n-4d-without-flight-package-14",
  //   title: "Thailand 3N/4D Without Flight",
  //   description: "Affordable Thailand tour covering Bangkok and Pattaya's highlights without flight, perfect for budget-conscious travelers",
  //   price: "₹25,999",
  //   duration: "4 Days 3 Nights",
  //   group: "Max 30 People",
  //   highlight: "Budget",
  //   image: "/Images/Thailand_3N-4Dwf.png",
  //   color: "from-green-500 to-emerald-600",
  //   places: ["Bangkok", "Pattaya", "Coral Island"],
  //   inclusions: [
  //     { icon: Hotel, text: "3-Star Hotels" },
  //     { icon: Utensils, text: "Breakfast Only" },
  //     { icon: Users, text: "AC Transport" },
  //     { icon: Ticket, text: "Sightseeing" },
  //   ],
  //   details: [
  //     "Bangkok city temple tour",
  //     "Pattaya beach visit",
  //     "Coral Island snorkeling",
  //     "Alcazar show (Optional)",
  //     "Shopping at local markets"
  //   ],
  //   region: "international",
  //   country: "Thailand",
  //   category: "budget",
  //   tags: ["thailand", "budget", "no-flights", "economy"]
  // },
  {
    id: 23,
    slug: "vietnam-grand-tour-6n-7d",
    title: "Vietnam Grand Tour 6N/7D",
    description: "Explore Vietnam's icons from a Halong Bay day cruise and ancient Hoi An to the Golden Bridge at Ba Na Hills and the vibrant streets of Ho Chi Minh City",
    price: "₹1,09,999",
    duration: "7 Days 6 Nights",
    date: "September 24th",
    group: "Max 20 People",
    highlight: "New",
    image: "/Images/Vietnam.png",
    color: "from-red-500 to-yellow-600",
    places: ["Hanoi", "Halong Bay", "Da Nang", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    inclusions: [
      { icon: Plane, text: "International & Domestic Flights + Visa" },
      { icon: Hotel, text: "AC Hotel Stay (Twin Sharing)" },
      { icon: Utensils, text: "Meals as per Itinerary (B/L/D)" },
      { icon: Ticket, text: "All Entrance Fees & Private Transfers" },
    ],
    details: [
      "Halong Bay day cruise with kayaking & cooking class",
      "Hanoi city tour: Tran Quoc Pagoda & Temple of Literature",
      "Marble Mountains & Hoi An Ancient Town",
      "Ba Na Hills cable car & Golden Bridge",
      "Ho Chi Minh City tour & Bitexco Skydeck",
      "Mekong Delta boat ride & village cycling",
      "Cu Chi Tunnels visit"
    ],
    region: "international",
    country: "Vietnam",
    category: "international",
    tags: ["vietnam", "halong-bay", "hoi-an", "ho-chi-minh", "mekong-delta"]
  },
  {
    id: 24,
    slug: "malaysia-kuala-lumpur-2n-3d-24",
    title: "Malaysia Kuala Lumpur 2N/3D",
    description: "Explore Kuala Lumpur with a Putrajaya photo stop, the KL Tower, sacred Batu Caves, a Genting Highlands cable car adventure, and the iconic Petronas Twin Towers",
    price: "₹54,999",
    duration: "3 Days 2 Nights",
    date: "September 20th, 27th, October 18th, 11th, 25th",
    group: "Max 25 People",
    highlight: "New",
    image: "/Images/Malaysia.png",
    color: "from-blue-500 to-cyan-600",
    places: ["Kuala Lumpur", "Putrajaya", "Batu Caves", "Genting Highlands", "Petronas Twin Towers"],
    inclusions: [
      { icon: Plane, text: "Return Flights" },
      { icon: Hotel, text: "3-Star Hotels" },
      { icon: Utensils, text: "Meals (Local Indian)" },
      { icon: Ticket, text: "Genting Highlands Cable Car" },
    ],
    details: [
      "Putrajaya photo stop",
      "KL Tower observation deck",
      "Batu Caves Hindu temple visit",
      "Genting Highlands cable car & entertainment",
      "Petronas Twin Towers photo stop",
      "Chinese temple & chocolate outlet shopping"
    ],
    region: "international",
    country: "Malaysia",
    category: "international",
    tags: ["malaysia", "kuala-lumpur", "batu-caves", "genting-highlands", "petronas-towers"]
  },
  // {
  //   id: 25,
  //   slug: "thailand-malaysia-combo-6n-7d-pattaya-bangkok-kuala-lumpur-25",
  //   title: "Thailand & Malaysia Combo 6N/7D",
  //   description: "Double-destination getaway covering 3 nights in Pattaya, 1 night in Bangkok, and 2 nights in Kuala Lumpur — Tiger Topia, Coral Island, the Big Buddha Temple, Genting Highlands, and the Petronas Twin Towers all in one trip",
  //   price: "Price on Request",
  //   duration: "7 Days 6 Nights",
  //   group: "Max 25 People",
  //   highlight: "New",
  //   image: "/Images/Thailand.png",
  //   color: "from-purple-500 to-blue-600",
  //   places: ["Pattaya", "Bangkok", "Kuala Lumpur", "Genting Highlands", "Petronas Twin Towers"],
  //   inclusions: [
  //     { icon: Plane, text: "Return Flights" },
  //     { icon: Hotel, text: "3-Star Hotels" },
  //     { icon: Utensils, text: "Meals (Local Indian)" },
  //     { icon: Ticket, text: "All Entry Tickets" },
  //   ],
  //   details: [
  //     "Tiger Topia show at Sriracha",
  //     "Alcazar Cabaret show",
  //     "Coral Island speedboat tour",
  //     "Big Buddha Temple (18m golden statue)",
  //     "Bangkok shopping & Chao Phraya dinner cruise",
  //     "Genting Highlands cable car",
  //     "Petronas Twin Towers & KL Tower"
  //   ],
  //   region: "international",
  //   country: "Thailand & Malaysia",
  //   category: "international",
  //   tags: ["thailand", "malaysia", "combo", "pattaya", "bangkok", "kuala-lumpur"]
  // },
  {
    id: 26,
    slug: "malaysia-singapore-combo-5n-6d-26",
    title: "Malaysia & Singapore Combo 5N/6D",
    description: "Double-country adventure from Putrajaya and Genting Highlands in Malaysia to Sentosa Island, Universal Studios, and Gardens by the Bay in Singapore",
    price: "₹1,29,999",
    duration: "6 Days 5 Nights",
    date: "September 22nd",
    group: "Max 25 People",
    highlight: "New",
    image: "/Images/Malaysia.png",
    color: "from-red-500 to-blue-600",
    places: ["Kuala Lumpur", "Genting Highlands", "Singapore", "Sentosa Island", "Gardens by the Bay"],
    inclusions: [
      { icon: Plane, text: "Return Flights" },
      { icon: Hotel, text: "Hotel Stay" },
      { icon: Utensils, text: "Full Board Meals" },
      { icon: Ticket, text: "Private Vehicle Transfers" },
    ],
    details: [
      "Putrajaya tour",
      "KL Tower observation deck",
      "Genting Highlands cable car & Batu Caves",
      "Singapore night safari",
      "Sentosa Island",
      "Universal Studios & Gardens by the Bay"
    ],
    region: "international",
    country: "Malaysia & Singapore",
    category: "international",
    tags: ["malaysia", "singapore", "combo", "sentosa", "universal-studios", "gardens-by-the-bay"]
  },

    {
    id: 16 ,
    slug: "dubai-5n-6d",
    title: "Dubai 5N/6D",
    description: "A luxurious getaway to Dubai, exploring the city's iconic landmarks, shopping destinations, and desert adventures.",
    price: "₹97,999",
    duration: "6 Days 5 Nights",
    date: "September 22nd",
    group: "Max 30 People",
    highlight: "Luxury",
    image: "/Images/Dubai.png",
    color: "from-amber-500 to-orange-700",
    places: ["Dubai", "Burj Khalifa", "Dubai Mall & Frame", "Museum of the Future", "Desert Safari", "Abu Dhabi"],
    inclusions: [
      { icon: Plane, text: "To & Fro Flights" },
      { icon: Hotel, text: "4-Star & 3-Star Hotels" },
      { icon: Utensils, text: "All Meals" },
      { icon: Ticket, text: "Muktinath Darshan by Jeep" },
    ],
    details: [
      "Daily Breakfast, Lunch & Dinner",
      "All Major Sightseeing",
      "Dhow Cruise with Dinner",
      "Desert Safari with BBQ Dinner ",
      "Abu Dhabi Full-Day Tour",
    ],
    region: "international",
    country: "Dubai",
    category: "luxury",
    tags: ["dubai", "burj khalifa", "dubai mall", "museum of the future","desert safari", "abu dhabi"]
  },
  //   {
  //   id: 16 ,
  //   slug: "thailand&malaysia-5n-6d",
  //   title: "Thailand & Malaysa 5N/6D",
  //   description: "A luxurious getaway to Thailand and Malaysia, exploring the iconic Landmarks, shopping destination, and adventures",
  //   price: "₹94,999",
  //   duration: "6 Days 5 Nights",
  //   date: "September 22nd",
  //   group: "Max 30 People",
  //   highlight: "Luxury",
  //   image: "/Images/Thailand.png",
  //   color: "from-amber-500 to-orange-700",
  //   places: ["Thailand", "Malaysia"],
  //   inclusions: [
  //     { icon: Plane, text: "To & Fro Flights" },
  //     { icon: Hotel, text: "4-Star & 3-Star Hotels" },
  //     { icon: Utensils, text: "All Meals" },
  //     // { icon: Ticket, text: "Muktinath Darshan by Jeep" },
  //   ],
  //   details: [
  //     "Daily Breakfast, Lunch & Dinner",
  //     "All Major Sightseeing",
  //   ],
  //   region: "international",
  //   country: "Thailand & Malaysia",
  //   category: "luxury",
  //   tags: ["thailand", "malaysia", "luxury", "sightseeing"]
  // },
  {
    id: 27,
    slug: "panchabhoota-yatra-3n-4d-srikalahasti-kanchipuram-thiruvannamalai-chidambaram-trichy-27",
    title: "Panchabhoota Yatra 3N/4D",
    description: "A sacred journey to the five Pancha Bhoota Sthalams representing the five elements — Vayu at Srikalahasti, Prithvi at Kanchipuram, Agni at Thiruvannamalai, Akasha at Chidambaram, and Appu at Thiruvanaikaval",
    price: "₹23,599",
    duration: "4 Days 3 Nights",
    date:"August 20th",
    group: "All Age Groups",
    highlight: "Spiritual",
    image: "/Images/Panchabhoota.png",
    color: "from-orange-500 to-red-600",
    places: ["Srikalahasti", "Kanchipuram", "Thiruvannamalai", "Chidambaram", "Trichy", "Thiruvanaikaval"],
    inclusions: [
      { icon: Hotel, text: "Comfortable Stay & All Meals" },
      { icon: Users, text: "AC Private Vehicle" },
      { icon: Ticket, text: "Pickup & Drop from Bangalore" },
      { icon: CheckCircle, text: "All Applicable Taxes" },
    ],
    details: [
      "Srikalahasteeswara Temple (Vayu - Air)",
      "Ekambareswarar Temple, Kanchipuram (Prithvi - Earth)",
      "Arunachaleeswarar Temple, Thiruvannamalai (Agni - Fire)",
      "Thillai Natarajar Temple, Chidambaram (Akasha - Space)",
      "Jambukeswarar Temple, Thiruvanaikaval (Appu - Water)"
    ],
    region: "domestic",
    // zone: "south",
    subType: "pilgrimage",
    category: "spiritual",
    tags: ["panchabhoota", "pilgrimage", "temple", "south-india"]
  },
  {
    id: 28,
    slug: "do-dham-yatra-7n-8d-kedarnath-badrinath-28",
    title: "Do Dham Yatra 7N/8D",
    description: "A divine journey to the abode of Lord Shiva and Lord Badrinarayan, covering Haridwar, Rudraprayag, Guptkashi, Kedarnath, Joshimath, Badrinath, and Mana Village",
    price: "₹45,999",
    duration: "8 Days 7 Nights",
    date: "September 15th, 25th",
    group: "Max 27 People",
    highlight: "Spiritual",
    image: "/Images/Do-dham.png",
    color: "from-amber-600 to-yellow-700",
    places: ["Delhi", "Haridwar", "Rudraprayag", "Guptkashi", "Kedarnath", "Joshimath", "Badrinath", "Mana Village"],
    inclusions: [
      { icon: Plane, text: "To & Fro Flights" },
      { icon: Hotel, text: "3-Star Hotel Stay" },
      { icon: Utensils, text: "All Meals (Pure Veg)" },
      { icon: Ticket, text: "Pickup & Drop from Delhi" },
    ],
    details: [
      "Ganga Aarti at Har Ki Pauri, Haridwar",
      "Kedarnath Temple trek & Abhishek darshan",
      "Sri Narsingh Temple, Joshimath",
      "Badrinath Temple darshan & Tapt Kund",
      "Mana Village, Vyas Gufa & Bhim Pul",
      "Dhari Devi Temple, Rudraprayag"
    ],
    region: "domestic",
    zone: "north",
    subType: "pilgrimage",
    category: "spiritual",
    tags: ["do-dham", "kedarnath", "badrinath", "char-dham", "north-india", "pilgrimage"]
  },
  {
    id: 29,
    slug: "char-dham-yatra-with-chopta-tunganath-14n-15d-yamunotri-gangotri-kedarnath-badrinath-29",
    title: "Char Dham Yatra 14N/15D",
    description: "A comprehensive pilgrimage and adventure tour to the four Char Dham temples of Uttarakhand — Yamunotri, Gangotri, Kedarnath, and Badrinath — combined with Chopta, the trek to Tungnath (the highest Shiva temple in the world), and the sacred Triyuginarayan Temple",
    price: "₹65,999",
    duration: "15 Days 14 Nights",
    group: "Max 30 People",
    highlight: "Spiritual",
    image: "/Images/Char-dham.png",
    color: "from-yellow-600 to-amber-700",
    places: ["Delhi", "Haridwar", "Yamunotri", "Gangotri", "Kedarnath", "Triyuginarayan", "Chopta", "Tungnath", "Badrinath", "Rishikesh"],
    inclusions: [
      { icon: Plane, text: "To & Fro Flights" },
      { icon: Users, text: "2x2 Luxury Coach" },
      { icon: Utensils, text: "All Meals (Pure Veg)" },
      { icon: Ticket, text: "VIP Darshan at Temple" },
    ],
    details: [
      "Yamunotri Temple trek",
      "Gangotri Temple & holy dip in the Bhagirathi",
      "Kedarnath Temple darshan (Jyotirlinga)",
      "Triyuginarayan Temple eternal flame",
      "Tungnath trek, Chopta",
      "Badrinath Temple darshan & Tapt Kund",
      "Karthik Swami Temple trek",
      "Rishikesh - Ram Jhula & Laxman Jhula"
    ],
    region: "domestic",
    zone: "north",
    subType: "pilgrimage",
    category: "spiritual",
    tags: ["char-dham", "kedarnath", "badrinath", "yamunotri", "gangotri", "tungnath", "north-india", "pilgrimage"]
  },
  {
    id: 30,
    slug: "kashi-yatra-8n-9d-lucknow-ayodhya-naimisharanya-prayagraj-chitrakoot-varanasi-gaya-baidyanath-30",
    title: "Kashi Yatra 8N/9D",
    description: "A spiritual circuit across Uttar Pradesh and Bihar covering Naimisharanya, Ayodhya (birthplace of Lord Rama), Prayagraj (Triveni Sangam), Chitrakoot, Varanasi (Kashi Vishwanath), Bodhgaya, Gaya, and the Baidyanath Jyotirlinga at Deogarh",
    price: "₹40,999",
    duration: "9 Days 8 Nights",
    date: "October 12th",
    group: "All Age Groups",
    highlight: "Spiritual",
    image: "/Images/Kashi.png",
    color: "from-orange-600 to-amber-700",
    places: ["Lucknow", "Ayodhya", "Naimisharanya", "Prayagraj", "Chitrakoot", "Varanasi", "Gaya", "Baidyanath"],
    inclusions: [
      { icon: Plane, text: "Flights 2 Way" },
      { icon: Users, text: "Transportation" },
      { icon: Utensils, text: "All Meals (Pure Veg)" },
      { icon: Ticket, text: "VIP Darshan at Temple" },
    ],
    details: [
      "Sri Rama Janmabhoomi & Sarayu Aarti, Ayodhya",
      "Triveni Sangam, Prayagraj",
      "Kamadgiri Parikrama, Chitrakoot",
      "Kashi Vishwanath Darshan & Ganga Aarti, Varanasi",
      "Maha Bodhi Vruksha, Bodhgaya",
      "Baidyanath Jyotirlinga, Deogarh"
    ],
    region: "domestic",
    zone: "north",
    subType: "pilgrimage",
    category: "spiritual",
    tags: ["kashi", "varanasi", "ayodhya", "baidyanath", "gaya", "pilgrimage"]
  },
  // {
  //   id: 31,
  //   slug: "muktinath-yatra-with-ayodhya-darshan-9n-10d-ayodhya-lumbini-pokhara-muktinath-kathmandu-janakpur-31",
  //   title: "Muktinath Yatra 9N/10D",
  //   description: "A Nepal spiritual pilgrimage combined with Ayodhya darshan — Lumbini, Pokhara, the sacred Muktinath Temple with its 108 water spouts, Kathmandu, and Janakpur, all in one journey",
  //   price: "₹51,999",
  //   duration: "10 Days 9 Nights",
  //   group: "Max 35 People",
  //   highlight: "Spiritual",
  //   image: "/Images/Mukthinath-yatra.png",
  //   color: "from-amber-500 to-orange-700",
  //   places: ["Ayodhya", "Gorakhpur", "Lumbini", "Pokhara", "Muktinath", "Kathmandu", "Janakpur"],
  //   inclusions: [
  //     { icon: Plane, text: "To & Fro Flights" },
  //     { icon: Hotel, text: "4-Star & 3-Star Hotels" },
  //     { icon: Utensils, text: "All Meals" },
  //     { icon: Ticket, text: "Muktinath Darshan by Jeep" },
  //   ],
  //   details: [
  //     "Shree Rama Janma Bhoomi, Ayodhya",
  //     "Lumbini World Heritage Site",
  //     "Fewa Lake & Tal Barahi Temple, Pokhara",
  //     "Muktinath Temple - 108 water spouts",
  //     "Pashupatinath & Swyambhunath, Kathmandu",
  //     "Janaki Temple, Janakpur"
  //   ],
  //   region: "domestic",
  //   country: "Nepal",
  //   category: "spiritual",
  //   tags: ["muktinath", "nepal", "ayodhya", "pokhara", "kathmandu", "pilgrimage"]
  // },
  {
    id: 32,
    slug: "shirdi-sai-baba-yatra-1n-2d",
    title: "Shirdi Yatra 1N/2D",
    description: "A spiritual journey to the holy city of Shirdi, dedicated to the revered Sai Baba, combined with visits to Ayodhya and other sacred sites",
    price: "₹19,999",
    duration: "2 Days 1 Night",
    date: "September 6th, 21st",
    group: "Max 30 People",
    highlight: "Spiritual",
    image: "/Images/Shirdi.png",
    color: "from-amber-500 to-orange-700",
    places: ["Traimbakeshwar", "Shirdi", "Shani Singanapur", " Ellora", "Gruhashnewar"],
    inclusions: [
      { icon: Plane, text: "To & Fro Flights" },
      { icon: Hotel, text: "4-Star & 3-Star Hotels" },
      { icon: Utensils, text: "All Meals" },
      // { icon: Ticket, text: "Muktinath Darshan by Jeep" },
    ],
    details: [
      "Enjoy sightseeing at Bandra Bridge",
      "Head to Siddivinayaka temple",
      "Explore Trimbakeshwar Jyotirlinga",
      "VIP darshan at Sai Baba Samadhi Mandir",
      "Visit Ellora Caves and Gruhashnewar Jyothirlinga ",
    ],
    region: "domestic",
    country: "India",
    category: "spiritual",
    tags: ["shirdi", "sai-baba", "ayodhya", "pokhara", "kathmandu", "pilgrimage"]
  },
   {
    id: 33,
    slug: "ujjain-omkareshwar-darshan-3n-4d",
    title: "Ujjain Omkareshwar Darshan 3N/4D",
    description: "A spiritual journey to the holy city of Ujjain, dedicated to the revered Omkareshwar Jyotirlinga, combined with visits to other sacred sites",
    price: "₹34,999",
    duration: "4 Days 3 Nights",
    date: "September 6th, 21st",
    group: "Max 30 People",
    highlight: "Spiritual",
    image: "/Images/Ujjain.png",
    color: "from-amber-500 to-orange-700",
    places: ["Ujjain", "Omkaareshwara", "Ujjain Corridor ", " Bhasmaarati Darshan", "Mamaleshwar"],
    inclusions: [
      { icon: Plane, text: "To & Fro Flights" },
      { icon: Hotel, text: "4-Star & 3-Star Hotels" },
      { icon: Utensils, text: "All Meals" },
      // { icon: Ticket, text: "Muktinath Darshan by Jeep" },
    ],
    details: [
      "Visit to Ujjaini Corridor ",
      "Morning Bhasmaarati Darshan",
      "Local sightseeing in Ujjain",
      "Visit Omkareshwar jyotirlinga ",
      "Visit Mamaleshwar temple",
    ],
    region: "domestic",
    country: "India",
    category: "spiritual",
    tags: ["ujjain", "omkareshwar", "ujjain corridor", "bhasmaarati darshan","mamaleshwar"]
  },

  {
    id: 25,
    slug: "puri-jagannath-darshan-3n-4d",
    title: "Puri-Jagannath Yatra 3N/4D",
    description: "Experience the spiritual essence of Puri and Jagannath Temple with this immersive yatra.",
    price: "₹35,999",
    duration: "4 Days 3 Nights",
    date: "September 6th, 21st",
    group: "Max 30 People",
    highlight: "Spiritual",
    image: "/Images/Puri.png",
    color: "from-amber-500 to-orange-700",
    places: ["Puri", "Jagannath Temple", "Puri Beach", "Chandrasekhara Perumal Temple", "Mamaleshwar"],
    inclusions: [
      { icon: Plane, text: "To & Fro Flights" },
      { icon: Hotel, text: "4-Star & 3-Star Hotels" },
      { icon: Utensils, text: "All Meals" },
      // { icon: Ticket, text: "Muktinath Darshan by Jeep" },
    ],
    details: [
      "Visit to Ujjaini Corridor ",
      "Morning Bhasmaarati Darshan",
      "Local sightseeing in Ujjain",
      "Visit Omkareshwar jyotirlinga ",
      "Visit Mamaleshwar temple",
    ],
    region: "domestic",
    country: "India",
    category: "spiritual",
    tags: ["ujjain", "omkareshwar", "ujjain corridor", "bhasmaarati darshan","mamaleshwar"]
  },
  
];

export default function PackagesContent() {
  const searchParams = useSearchParams();

  // Hierarchical filter states
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedSubType, setSelectedSubType] = useState("all");

  // Apply the region/zone filter requested via the URL (e.g. from the
  // Navbar's "Domestic"/"International" links: /Packages?region=domestic).
  useEffect(() => {
    const region = searchParams.get("region");
    const zone = searchParams.get("zone");
    if (region === "domestic" || region === "international") {
      setSelectedRegion(region);
    } else {
      setSelectedRegion("all");
    }
    setSelectedZone(zone === "north" || zone === "south" ? zone : "all");
  }, [searchParams]);

  // Advanced filtering logic
  const filteredPackages = packages.filter((pkg) => {
    if (selectedRegion !== "all" && pkg.region !== selectedRegion) return false;
    if (selectedRegion === "domestic" && selectedZone !== "all") {
      if (pkg.zone !== selectedZone) return false;
    }
    if (selectedRegion === "domestic" && selectedZone !== "all" && selectedSubType !== "all") {
      if (pkg.subType !== selectedSubType) return false;
    }
    return true;
  });

  // Reset dependent filters
  useEffect(() => {
    if (selectedRegion === "international") {
      setSelectedZone("all");
      setSelectedSubType("all");
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedZone === "all") {
      setSelectedSubType("all");
    }
  }, [selectedZone]);

  // Get filter summary text
  const getFilterSummary = () => {
    if (selectedRegion === "all") return "All Packages";
    let summary = selectedRegion === "domestic" ? "Domestic" : "International";
    if (selectedRegion === "domestic" && selectedZone !== "all") {
      summary += ` > ${selectedZone === "north" ? "North India" : "South India"}`;
      if (selectedSubType !== "all") {
        const subTypeLabels = {
          pilgrimage: "Pilgrimage",
          trekking: "Trekking",
          adventure: "Adventure",
          budget: "Budget Friendly",
          cultural: "Cultural"
        };
        summary += ` > ${subTypeLabels[selectedSubType]}`;
      }
    }
    return summary;
  };

  const renderPackageCard = (pkg) => (
    <div
      key={pkg.id}
      className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-2 border border-amber-500/10 hover:border-amber-500/40 bg-gray-900"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden flex-shrink-0">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Highlight badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
          {pkg.highlight}
        </div>

        {/* Name + Duration overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <h3 className="text-white text-lg font-bold leading-tight truncate">{pkg.title}</h3>
          </div>
          <p className="text-amber-300 text-xs font-medium">{pkg.duration}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Amenity Icons */}
        <div className="flex items-center gap-3 flex-wrap border-b border-amber-500/10 pb-3">
          {pkg.inclusions.slice(0, 4).map((inc, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-0.5 text-amber-400"
              title={inc.text}
            >
              <inc.icon className="w-4 h-4" />
              <span className="text-[9px] text-gray-400 max-w-[64px] truncate">{inc.text}</span>
            </div>
          ))}
        </div>

        {/* Tour Highlights */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-amber-400 mb-1.5 uppercase tracking-wide">
            Tour Highlights
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
            {pkg.details.slice(0, 4).map((point, idx) => (
              <li key={idx} className="flex items-start gap-1 text-gray-300 text-xs min-w-0">
                <span className="text-amber-400 mt-0.5 flex-shrink-0">•</span>
                <span className="truncate">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Dates */}
        <div className="flex items-center justify-between text-sm pt-1">
          <span className="text-amber-400 font-bold text-lg">{pkg.price}</span>
          {/* <span className="flex items-center gap-1 text-gray-400 text-xs">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {pkg.date || "Dates on Request"}
          </span> */}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-amber-500/10">
          <a
            href="https://wa.me/919686626428"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg transition-all flex-shrink-0"
          >
            <FaWhatsapp className="w-4 h-4 text-white" />
          </a>
          <Link
            href={`/Booking?package=${pkg.id}`}
            className="flex-1 text-center bg-gradient-to-r from-amber-400 to-amber-500 text-black px-3 py-2 rounded-full text-sm font-semibold hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg"
          >
            Book Now
          </Link>
          <Link
            href={`/Packages/${pkg.slug}`}
            className="flex-1 text-center border border-amber-500/40 text-amber-400 px-3 py-2 rounded-full text-sm font-semibold hover:bg-amber-500/10 transition-all"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );

  const internationalPackages = filteredPackages.filter((pkg) => pkg.region === "international");
  const domesticPackages = filteredPackages.filter((pkg) => pkg.region === "domestic");

  return (
    <>
      <Navbar />
      <BackToTop/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-30">
        {/* Hero Section – unchanged */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Images/imp2.jpg"
              alt="World Destinations"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">World</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Curated travel packages designed for unforgettable experiences
            </p>

            {/* Filter Summary (region/zone are set via the Navbar's Domestic/International links) */}
            {/* <div className="max-w-4xl mx-auto animate-slide-up">
              <div className="text-amber-400 animate-fade-in bg-black/30 backdrop-blur-sm rounded-xl py-3 px-6 border border-amber-500/20">
                <span className="font-semibold">Showing: </span>
                <span className="text-white">{getFilterSummary()}</span>
                <span className="text-gray-400 ml-2">({filteredPackages.length} packages found)</span>
              </div>
            </div> */}


            {/* ======= MAIN CONTENT – NEW CARD GRID ======= */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              {filteredPackages.length > 0 ? (
                selectedRegion === "all" ? (
                  <div className="space-y-16">
                    {internationalPackages.length > 0 && (
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-1.5 h-7 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                          International Packages
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {internationalPackages.map(renderPackageCard)}
                        </div>
                      </div>
                    )}
                    {domesticPackages.length > 0 && (
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                          <span className="w-1.5 h-7 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                          Domestic Packages
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {domesticPackages.map(renderPackageCard)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map(renderPackageCard)}
                  </div>
                )
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-amber-500/20 rounded-3xl">
                  <div className="text-amber-500 text-5xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No packages found</h3>
                  <p className="text-gray-300 mb-6">No packages match your current filter selection</p>
                  <button
                    onClick={() => {
                      setSelectedRegion("all");
                      setSelectedZone("all");
                      setSelectedSubType("all");
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-3 rounded-full font-bold hover:from-amber-400 hover:to-orange-500 transition-all hover:scale-105 shadow-lg"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Stats Section – unchanged */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "5000+", label: "Happy Travelers" },
                  { number: "150+", label: "Destinations" },
                  { number: "24/7", label: "Support" },
                  { number: "₹50L+", label: "Saved by Customers" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
      <BackToTop />
      <Footer />
    </>
  );
}