"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import HeroSlider from "./components/HeroSlider";
import PopularDestinations from "./components/PopularDestinations";
import WhyChooseUs from "./components/WhyChooseUs";
import FeaturedExperiences from "./components/FeaturedExperiences";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import EnquiryModal from "./components/EnquiryModal";

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
        <EnquiryModal />

      {/* Splash Screen */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Splash />
      </div>

      {/* Main Content */}
      <div
        className={`transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Hero Slider */}
        <HeroSlider />

        {/* Popular Destinations / Packages */}
        <PopularDestinations />

        {/* Explore by Experience */}
        <FeaturedExperiences />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* Footer */}
        <Footer />

        {/* Back to Top */}
        <BackToTop />
      </div>
    </>
  );
}