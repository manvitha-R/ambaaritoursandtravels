"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Splash() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Auto-scroll animation
    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 7000, 1);

      setScrollProgress(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setShowSplash(false);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    // Manual scroll handling
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500;
      const manualProgress = Math.min(scrollPosition / maxScroll, 1);

      // Override auto animation with manual scroll
      setScrollProgress(manualProgress * 100);

      if (manualProgress >= 0.95) {
        setShowSplash(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate plane transformation
  const planeStyle = {
    transform: `
      translateY(${-scrollProgress * 2}px)
      rotateX(${scrollProgress * 0.15}deg)
      scale(${Math.max(1 - scrollProgress * 0.002, 0.8)})
    `,
    opacity: Math.max(1 - scrollProgress * 0.01, 0)
  };

  // Airplane icon animation based on scroll progress
  const airplaneStyle = {
    transform: `
      translateY(${scrollProgress * 0.5}px)
      rotate(${scrollProgress * 0.3}deg)
    `,
    opacity: Math.min(scrollProgress * 0.02, 0.8)
  };

  if (!showSplash) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-black"
      style={{ zIndex: 50 }}
    >
      <div
        className="relative transition-all duration-100"
        style={planeStyle}
      >
        <Image
          src="/Images/logo.jpeg"
          alt="Ambaari Tours and Travels"
          width={900}
          height={400}
          priority
          className="animate-pulse"
        />

        {/* Airplane icon that flies up as you scroll */}
        <div
          className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={airplaneStyle}
        >
          {/* Airplane Icon */}
          {/* Simple Paper Airplane */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/80"
          >
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Flight path trail */}
          <div
            className="w-1 h-12 bg-gradient-to-t from-white/50 to-transparent mt-1"
            style={{
              height: `${Math.min(scrollProgress * 2, 60)}px`,
              opacity: Math.min(scrollProgress * 0.02, 0.6)
            }}
          />
        </div>

        {/* Scroll hint */}
       <p className="absolute text-bold -bottom-32 left-1/2 transform -translate-x-1/2 text-white/80 text-xl whitespace-nowrap">
          Scroll up to take off 
        </p>
      </div>
    </section>
  );
}