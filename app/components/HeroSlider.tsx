"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/Images/img17.jpg",
    heading: "Explore the World",
    sub: "Europe, Thailand, Sri Lanka & beyond",
    
  },
  {
    src: "/Images/img15.jpg",
    heading: "Adventure Awaits",
    sub: "Discover breathtaking landscapes across India",
  },
  {
    src: "/Images/img16.jpg",
    heading: "International Escapes",
    sub: "Unforgettable journeys tailored just for you",
  },
  {
    src: "/Images/img4.jpg",
    heading: "Memories Forever",
    sub: "Crafting experiences you'll cherish for a lifetime",
  },
  // {
  //   src: "/Images/img1.jpg",
  //   heading: "Your Dream Trip",
  //   sub: "Expert guidance from planning to your return",
  // },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="pt-0 h-screen relative overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.src}
            alt={slide.heading}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <span className="inline-block bg-yellow-400/20 text-yellow-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-yellow-400/30 mb-5 backdrop-blur-sm">
            ✈ Trusted by 5000+ Happy Travelers
          </span>
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl leading-tight">
            {slides[current].heading.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="text-amber-400"> {word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl mb-8 drop-shadow-lg max-w-2xl mx-auto">
            {slides[current].sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Packages"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full text-base font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-2xl shadow-amber-500/40 hover:scale-105"
            >
              Explore Packages
            </Link>
            <Link
              href="/Contact"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-base font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "bg-amber-400 w-8 h-3"
                : "bg-white/40 hover:bg-white/70 w-3 h-3"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs animate-bounce hidden md:flex">
        <span>Scroll to explore</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
