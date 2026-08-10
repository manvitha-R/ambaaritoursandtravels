"use client";

import Link from "next/link";
import Image from "next/image";
import * as Lucide from "lucide-react";
import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/About" },
  { label: "Packages", href: "/Packages" },
  { label: "Gallery", href: "/Gallery" },
  { label: "Contact", href: "/Contact" },
  { label: "Book Now", href: "/Booking" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/Terms" }
];

const internationalPackages = [
  { label: "Thailand Tours", href: "/Packages?region=international" },
  { label: "Dubai", href: "/Packages?region=international" },
  // { label: "Malaysia", href: "/Packages?region=international" },
  { label: "Malaysia and Singapore", href: "/Packages?region=international" },
  { label: "Vietnam", href: "Packages?region=international" },
  // { label: "Europe Tours", href: "/Packages?region=international" },
  // { label: "Sri Lanka Tours", href: "/Packages?region=international" },
  // { label: "Turkey Tours", href: "/Packages?region=international" },
  { label: "Andaman Coastal", href: "/Packages?region=international" },
];

const domesticPackages = [
  // { label: "Ladakh", href: "/Packages?region=domestic&zone=north" },
  // { label: "Spiti Valley", href: "/Packages?region=domestic&zone=north" },
  // { label : "Do Dham Yatra", href: "/Packages?region=domestic&zone=north" },
  // { label: "Assam-Meghalaya", href: "/Packages?region=domestic&zone=north" },
  { label: "Shirdi", href: "/Packages?region=domestic&zone=north" },
  { label: "Puri Jagannath", href: "/Packages?region=domestic&zone=north" },
  { label: "Kashi", href: "/Packages?region=domestic&zone=north" },
  { label: "Char Dham Yatra", href: "/Packages?region=domestic&zone=north" },
  // { label: "Navashakthi Peetha", href: "/Packages?region=domestic&zone=north" },
  // { label: "Rajasthan", href: "/Packages?region=domestic&zone=north" },
  // { label: "Gujarat", href: "/Packages?region=domestic&zone=north" },
  { label: "Vaishno Devi", href: "/Packages?region=domestic&zone=north" },
  // { label: "Odisha", href: "/Packages?region=domestic&zone=north" },
  { label: "Panchabhootha Yaatra", href: "/Packages?region=domestic&zone=north" },
  // { label: "Varanasi", href: "/Packages?region=domestic&zone=north" },
  // { label: "Dandeli", href: "/Packages?region=domestic&zone=south" },
  { label: "Murdeshwara", href: "/Packages?region=domestic&zone=south" },
  // { label: "Dharmasthala", href: "/Packages?region=domestic&zone=south" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.message === "already_subscribed") {
        setStatus("duplicate");
      } else if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* Background photo with dark overlay so text stays readable */}
      <div className="absolute inset-0">
        <Image
          src="/Images/4.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black" />
      </div>

      <div className="relative z-10">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* Newsletter Banner */}
      {/* <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-yellow-500/10 border-b border-yellow-500/20 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Get Exclusive Travel Deals
          </h3>
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            Subscribe to our newsletter and be the first to know about special offers, new destinations, and travel tips.
          </p>
          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you! You&apos;re now subscribed.
            </div>
          ) : status === "duplicate" ? (
            <div className="flex items-center justify-center gap-2 text-yellow-400 font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You&apos;re already subscribed!
            </div>
          ) : (
            <>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={status === "loading"}
                  className="flex-1 bg-white/5 border border-yellow-500/30 rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 text-sm disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold text-sm hover:from-yellow-300 hover:to-yellow-500 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {status === "error" && (
                <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
              )}
            </>

          )}
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/Images/logo_bg.png"
              alt="Ambaari Tours"
              width={368}
              height={133}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Ambaari Tours &amp; Travels — crafting unforgettable journeys across India and the world since 2025. Your dream trip is just one call away.
          </p>
          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
              { icon: FaFacebook, href: "#", label: "Facebook", color: "hover:bg-blue-700" },
              { icon: FaWhatsapp, href: "#", label: "WhatsApp", color: "hover:bg-green-600" }
              // { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
              // { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
            ].map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white ${color} hover:border-transparent transition-all duration-300 hover:scale-110`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 relative">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full" />
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-yellow-400 text-sm flex items-center gap-2 group transition-colors duration-200"
                >
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Packages Column */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 relative">
            Our Packages
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full" />
          </h4>
          <div className="mb-4">
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">International</p>
            <ul className="space-y-2">
              {internationalPackages.map((pkg) => (
                <li key={pkg.label}>
                  <Link href={pkg.href} className="text-gray-400 hover:text-yellow-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {pkg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">Domestic</p>
            <ul className="space-y-2">
              {domesticPackages.map((pkg) => (
                <li key={pkg.label}>
                  <Link href={pkg.href} className="text-gray-400 hover:text-yellow-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    {pkg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 relative">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500 rounded-full" />
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <Phone className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Call Us</p>
                <a href="tel:+919686626428" className="text-gray-300 hover:text-yellow-400 text-sm transition-colors">
                  +91 96866 26428
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <Mail className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">Email Us</p>
                <a
                  href="mailto:ambaaritoursandtravels19@gmail.com"
                  className="block text-gray-300 hover:text-yellow-400 text-xs sm:text-sm transition-colors whitespace-nowrap overflow-hidden"
                >
                  ambaaritoursandtravels19@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <MapPin className="w-4 h-4 text-yellow-400" />
              </div>
              <a
                href="https://www.google.com/maps/dir//Ambaari+tours+and+travels,+XG8F%2BF74,+2nd+Block,+Govindaraja+Nagar+Ward,+Byraveshwaranagar,+Nagarbhavi,+Bengaluru,+Karnataka+560072/@12.976128,77.529088,2785m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bae3d007d282371:0xf802a8cff0a62e19!2m2!1d77.5232002!2d12.9661321?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Visit Us</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    1st A Main Rd, 2nd Block, Govindaraja Nagar Ward, Mudalapalya, Nagarbhavi, Bengaluru, Karnataka 560072
                  </p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Business Hours</p>
                <p className="text-gray-300 text-sm">Mon–Sun: 10:00 AM – 7:00 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ambaari Tours &amp; Travels. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link href="/Contact" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
