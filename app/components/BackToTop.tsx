// components/BackToTop.jsx - UPDATED POSITION
"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-40 p-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-110 group"
          aria-label="Back to top"
          style={{ zIndex: 40 }} // Lower than chatbot
        >
          <ChevronUp className="w-6 h-6" />
          <span className="absolute -top-10 right-1/2 translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Back to Top
          </span>
        </button>
      )}
    </>
  );
}