"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    id: "13",
    name: "Thailand",
   image: "/Images/Thailand_pattaya.png",
    description: "Sun, sand, and serenity",
    // rating: 4.8,
    // tours: 24,
  },
  {
    id: "8",
    name: "Spiti Valley",
    image: "/Images/Spiti_Valley_.png",
    description: "Adventure in the Himalayas",
    // rating: 4.7,
    // tours: 32,
  },
  {
    id: "3",
    name: "Uttar Pradesh",
    image: "/Images/varanasi.png",
    description: "Spirituality and culture in Varanasi",
    // rating: 4.9,
    // tours: 18,
  },

  {
    id: "7",
    name: "MURDESHWARA SCUBA PACKAGE",
    image: "/Images/MURDESHWRA_SCUBA.png",
    description: "Island paradise with vibrant marine life",
    // rating: 4.9,
    // tours: 21,
  },
];

export default function PopularDestinations() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Packages</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the most sought-after travel experiences curated just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={dest.name}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:-translate-y-2 border border-yellow-500/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Badge */}
                {/* <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  {dest.rating}
                </div> */}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">{dest.description}</p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-400">{dest.tours} Tours Available</span> */}
               
                  <Link
                    href={`/Packages?package=${dest.id}`}  // lowercase 'd'
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:from-yellow-400 hover:to-yellow-400 transition-all group-hover:scale-105 shadow-lg"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/Packages`}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-4 rounded-full text-lg font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-yellow-500/30 hover:scale-105">
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}