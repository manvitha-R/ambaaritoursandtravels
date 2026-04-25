"use client";

import Image from "next/image";
import Link from "next/link";
import { Waves, Mountain, Landmark, Zap, TreePine, Compass } from "lucide-react";

const experiences = [
  {
    title: "Beach & Islands",
    description: "Sun-kissed shores and turquoise waters await",
    image: "/Images/img15.jpg",
    icon: Waves,
    href: "/Packages?type=beach",
    color: "from-cyan-500 to-blue-600",
    // count: "12 Packages",
  },
  {
    title: "Mountain Treks",
    description: "Conquer majestic peaks and serene valleys",
    image: "/Images/mountain.jpeg",
    icon: Mountain,
    href: "/Packages?type=mountain",
    color: "from-emerald-500 to-teal-600",
    // count: "18 Packages",
  },
  {
    title: "Heritage & Culture",
    description: "Immerse in history, art, and ancient traditions",
    image: "/Images/heritage.jpeg",
    icon: Landmark,
    href: "/Packages?type=heritage",
    color: "from-orange-500 to-amber-600",
    // count: "10 Packages",
  },
  {
    title: "Adventure Sports",
    description: "Thrill-seeking activities for the bold at heart",
    image: "/Images/adventure.jpg",
    icon: Zap,
    href: "/Packages?type=adventure",
    color: "from-red-500 to-rose-600",
    // count: "8 Packages",
  },
  {
    title: "Wildlife & Nature",
    description: "Discover India's incredible biodiversity up close",
    image: "/Images/wildlife.jpg",
    icon: TreePine,
    href: "/Packages?type=wildlife",
    color: "from-green-500 to-lime-600",
    // count: "7 Packages",
  },
  {
    title: "Spiritual Journeys",
    description: "Find peace and purpose at sacred destinations",
    image: "/Images/spiritual.jpg",
    icon: Compass,
    href: "/Packages?type=spiritual",
    color: "from-purple-500 to-violet-600",
    // count: "9 Packages",
  },
];

export default function FeaturedExperiences() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full border border-yellow-500/30 mb-4">
            Travel Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whatever your travel style, we have the perfect package designed just for you
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <Link
                href={exp.href}
                key={exp.title}
                className="group relative overflow-hidden rounded-2xl h-64 block shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/70 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {/* <span className="text-xs text-gray-300 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                      {exp.count}
                    </span> */}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {exp.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/Packages"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-4 rounded-full text-base font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-yellow-500/30 hover:scale-105"
          >
            Browse All Packages
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
