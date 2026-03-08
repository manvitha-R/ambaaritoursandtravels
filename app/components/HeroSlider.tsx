"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  // "/Images/logo.jpeg",
  // "/Images/logo.jpeg",
   "/Images/img17.jpg",
   "/Images/img15.jpg",
  "/Images/img16.jpg",
 "/Images/img4.jpg",
  
  // "/Images/img3.jpg",
 
   
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-16 h-screen relative overflow-hidden">
      {slides.map((slide, index) => (
        <Image
          key={slide}
          src={slide}
          alt={`Travel destination ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 animate-fade-in drop-shadow-2xl">
            Explore the World with <span className="text-amber-400">Ambaari</span>
          </h1>
          <p className="text-gray-200 text-xl md:text-2xl mb-10 drop-shadow-lg">
            Unforgettable journeys await you
          </p>
          {/* <button className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-black px-10 py-4 rounded-full text-lg font-bold hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl shadow-amber-500/50 hover:scale-105">
            Start Your Journey
          </button> */}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? "bg-amber-400 w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}