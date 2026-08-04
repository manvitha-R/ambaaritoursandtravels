"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import HeroSlider from "./components/HeroSlider";
import PopularDestinations from "./components/PopularDestinations";
import WhyChooseUs from "./components/WhyChooseUs";
// import FeaturedExperiences from "./components/FeaturedExperiences";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import EnquiryModal from "./components/EnquiryModal";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  // Separate from the splash fade: the navbar stays hidden for as long as the
  // full-screen HeroSlider is in view, and only appears once scrolled past it.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowSplash(false);
      }
      setPastHero(window.scrollY > window.innerHeight * 0.75);
    };

    window.addEventListener("scroll", handleScroll);

    // If the user never scrolls, don't leave them stuck on the splash forever —
    // auto-dismiss it after the same duration Splash.tsx uses for its own animation.
    const autoDismiss = setTimeout(() => setShowSplash(false), 7000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(autoDismiss);
    };
  }, []);




  return (
    <>
      <Navbar hideUntilScrolled={showSplash || !pastHero} />
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
        {/* <FeaturedExperiences /> */}

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