"use client";

import Image from "next/image";
import { MapPin, Star, Plane, Hotel, UtensilsCrossed, Camera, Car, Ship } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    id: "13",
    slug: "thailand-4n-5d",
    name: "Thailand",
    image: "/Images/Thailand.png",
    description: "Sun, sand, and serenity on pristine beaches",
    rating: 4.9,
    // badge: "Best Seller",
    duration: "4 Nights / 5 Days",
    highlights: ["Tiger Park","Bangkok City Tour", "Pattaya Beach", "Coral Island", "Floating Market"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },
   {
    id: "24",
    slug: "malaysia-kuala-lumpur-2n-3d-24",
    name: "Malaysia",
    image: "/Images/Malaysia.png",
    description: "Sun, sand, and serenity on pristine beaches",
    rating: 4.9,
    // badge: "Best Seller",
    duration: "2 Nights / 3 Days",
    highlights: ["Kuala Lumpur","Batu Caves", "Petronas Twin Tower"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },
   {
    id: "23",
    slug: "vietnam-grand-tour-6n-7d",
    name: "Vietnam",
    image: "/Images/Vietnam.png",
    description: "Sun, sand, and serenity on pristine beaches",
    rating: 4.9,
    // badge: "Best Seller",
    duration: "3 Nights / 4 Days, 4 Nights / 5 Days, 6 Nights / 7 Days",
    highlights: ["Golden Hand bridge","Hanoi ","Halong", " Da Nang", "Ba Na Hills"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },
   {
    id: "16",
    slug: "dubai-5n-6d",
    name: "Dubai",
    image: "/Images/Dubai.png",
    description: "Sun, sand, and serenity on pristine beaches",
    rating: 4.9,
    // badge: "Best Seller",
    duration: "5 Nights / 6 Days",
    highlights: ["Burj Khalifa","Museun of future", "Dubai Mall & Frame", "Desert Safari", "Abu Dhabi"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },
  {
    id: "25",
    slug: "puri-jagannath-darshan-3n-4d",
    name: "Puri-Jagannath",
    image: "/Images/Puri.png",
    description: "The Jagannath Temple is a Hindu temple dedicated to Jagannath, a form of Vishnu.",
    rating: 4.9,
    // badge: "Road Trip",
    duration: "3 Nights / 4 Days",
    highlights: ["Bhubaneshwar", "Puri", "Chilika Lake", "Konark Sun Temple"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },

 {
    id: "26",
    slug: "shirdi-sai-baba-yatra-1n-2d",
    name: "Shirdi",
    image: "/Images/Shirdi.png",
    description: "Tropical paradise with rich heritage",
    rating: 4.7,
    // badge: "Island Getaway",
    duration: "1 Night / 2 Days",
    highlights: ["Traimbakeshwar", "Shirdi", "Shani Singanapur", "Ellora Caves", "Gruhashnewar"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },
  {
    id: "27",
    slug: "panchabhoota-yatra-3n-4d-srikalahasti-kanchipuram-thiruvannamalai-chidambaram-trichy-27",
    name: "Panchabhoota Sthalams",
    image: "/Images/Panchabhoota.png",
    description: "Spirituality and timeless culture by the Ganges",
    rating: 4.7,
    // badge: "Spiritual",
    duration: "3 Nights / 4 Days",
    highlights: ["Kanchipuram ", "Thiruvanaikaval","Thiruvannamalai", "Kalahasthi", "Chidambaram"],
    amenities: ["hotel", "meals", "sightseeing", "transport"],
  },
   {
    id: "28",
    slug: "do-dham-yatra-7n-8d-kedarnath-badrinath-28",
    name: "Do-Dham Yatra",
    image: "/Images/Do-dham.png",
    description: "Embark on a spiritual journey to the sacred shrines of Kedarnath and Badrinath.",
    rating: 4.9,
    // badge: "Best Seller",
    duration: "7 Nights / 8 Days",
    highlights: ["Haridwar","Rudra Prayag", "Guptakashi", "Kedarnath", "Joshimath", "Badrinath", "Mana Village"],
    amenities: [ "hotel", "meals", "sightseeing", "transport"],
  },
 
 
];

const amenityConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  flights: { icon: <Plane className="w-4 h-4" />, label: "Flights" },
  hotel: { icon: <Hotel className="w-4 h-4" />, label: "Hotel" },
  meals: { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Meals" },
  sightseeing: { icon: <Camera className="w-4 h-4" />, label: "Sightseeing" },
  transport: { icon: <Car className="w-4 h-4" />, label: "Transport" },
  cruise: { icon: <Ship className="w-4 h-4" />, label: "Cruise" },
};

export default function PopularDestinations() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full border border-yellow-500/30 mb-4">
            Handpicked for You
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              Packages
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the most sought-after travel experiences curated just for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={dest.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:-translate-y-2 border border-yellow-500/10 hover:border-yellow-500/40 bg-gray-900"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden flex-shrink-0">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                {/* <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                  {dest.badge}
                </div> */}

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>{dest.rating}</span>
                </div>

                {/* Name + Duration overlay at bottom of image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-white text-lg font-bold leading-tight">{dest.name}</h3>
                  </div>
                  <p className="text-yellow-300 text-xs font-medium">{dest.duration}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-4 gap-3">

                {/* Amenity Icons */}
                <div className="flex items-center gap-3 flex-wrap border-b border-yellow-500/10 pb-3">
                  {dest.amenities.map((key) => (
                    <div
                      key={key}
                      className="flex flex-col items-center gap-0.5 text-yellow-400"
                      title={amenityConfig[key]?.label}
                    >
                      {amenityConfig[key]?.icon}
                      <span className="text-[9px] text-gray-400">{amenityConfig[key]?.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tour Highlights */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-yellow-400 mb-1.5 uppercase tracking-wide">
                    Tour Highlights
                  </p>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {dest.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-1 text-gray-300 text-xs">
                        <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-yellow-500/10">
                  <Link
                    href={`/Packages/${dest.slug}`}
                    className="flex-1 text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg"
                  >
                    View Details
                  </Link>
                  <a
                    href={`https://wa.me/919686626428?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(dest.name)}%20package.%20Please%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg transition-all flex-shrink-0"
                  >
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/Packages"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-4 rounded-full text-base font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-yellow-500/30 hover:scale-105 inline-block"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}