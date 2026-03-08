"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import HeroSlider from "./components/HeroSlider";
// import Services from "./components/Services";
import PopularDestinations from "./components/PopularDestinations";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowSplash(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Splash Screen */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Splash />
      </div>

      {/* Hero Slider */}
      <div
        className={`transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <HeroSlider />
      </div>

      {/* Services Section */}
      {/* <Services /> */}

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* <Contact/> */}
    </>
  );
}