"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/Images/international.png",
    heading: "Explore the World",
    sub: "Europe, Thailand, Sri Lanka & beyond",
    
  },
  {
    src: "/Images/domestic.png",
    heading: "Adventure Awaits",
    sub: "Discover breathtaking landscapes across India",
  },
  {
    src: "/Images/img15.jpg",
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
<>

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

      {/* Overlay — only darkens the bottom where the text sits, keeps the image clear up top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-16 md:pb-20">
        <div className="max-w-2xl">
          <span className="inline-block bg-yellow-400/20 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-400/30 mb-3 backdrop-blur-sm">
            ✈ Trusted by 5000+ Happy Travelers
          </span>
          <h1
            className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8)" }}
          >
            {slides[current].heading.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="text-amber-400"> {word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>
          <p
            className="text-gray-200 text-sm md:text-base mb-5 max-w-xl mx-auto"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
          >
            {slides[current].sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/Packages"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:scale-105"
            >
              Explore Packages
            </Link>
            <Link
              href="/Contact"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105"
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
    </section>
</>
  );
}
