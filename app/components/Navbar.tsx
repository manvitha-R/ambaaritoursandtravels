"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, Home, MapPin } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Function to check if package dropdown should be highlighted
  const isPackageActive = () => {
    return pathname.startsWith("/Packages");
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${show ? "translate-y-0" : "-translate-y-full"
      } bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg border-b border-yellow-500/20`}>
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Images/nav-logo.jpg"
              alt="Ambaari"
              width={500}
              height={70}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home Link */}
            <Link
              href="/"
              className={`transition-colors duration-300 font-medium ${isActive("/")
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "text-gray-200 hover:text-yellow-400"
                }`}
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              href="/About"
              className={`transition-colors duration-300 font-medium ${isActive("/About")
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "text-gray-200 hover:text-yellow-400"
                }`}
            >
              About
            </Link>

           
            {/* Packages Dropdown - Simplified */}
            <div className="relative group">
              <button className={`flex items-center gap-1 transition-colors duration-300 font-medium ${isPackageActive()
                  ? "text-yellow-400"
                  : "text-gray-200 group-hover:text-yellow-400"
                }`}>
                Packages
                <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isPackageActive() ? "text-yellow-400" : ""
                  }`} />
              </button>

              <div className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-3">
                  {/* International - Direct Link */}
                  <Link
                    href="/Packages?region=international"
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">International</div>
                      <div className="text-xs text-gray-500 group-hover:text-yellow-300/70">Explore the world</div>
                    </div>
                  </Link>

                  {/* Domestic with Submenu */}
                  <div className="relative group/sub mt-1">
                    <Link
                      href="/Packages?region=domestic"
                      className="flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Home className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium">Domestic</div>
                          <div className="text-xs text-gray-500 group-hover:text-yellow-300/70">Explore India</div>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 -rotate-90 group-hover/sub:rotate-0 transition-transform" />
                    </Link>

                    {/* Domestic Submenu (North & South India) */}
                    <div className="absolute left-full top-0 ml-2 w-56 bg-gradient-to-b from-gray-900 to-black border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                      <div className="p-3">
                        {/* North India Link */}
                        <Link
                          href="/Packages?region=domestic&zone=north"
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <div className="font-medium">North India</div>
                            <div className="text-xs text-gray-500">Himalayas & Culture</div>
                          </div>
                        </Link>

                        {/* South India Link */}
                        <Link
                          href="/Packages?region=domestic&zone=south"
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-teal-400" />
                          </div>
                          <div>
                            <div className="font-medium">South India</div>
                            <div className="text-xs text-gray-500">Temples & Beaches</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* View All Packages */}
                  <div className="mt-3 pt-3 border-t border-yellow-500/20">
                    <Link
                      href="/Packages"
                      className="block text-center text-yellow-400 hover:text-yellow-300 text-sm font-semibold py-2"
                    >
                      View All Packages →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

             {/* Gallery Link */}
            <Link
              href="/Gallery"
              className={`transition-colors duration-300 font-medium ${isActive("/Gallery")
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "text-gray-200 hover:text-yellow-400"
                }`}
            >
              Gallery
            </Link>


            {/* Contact Link */}
            <Link
              href="/Contact"
              className={`transition-colors duration-300 font-medium ${isActive("/Contact")
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "text-gray-200 hover:text-yellow-400"
                }`}
            >
              Contact
            </Link>

            {/* Book Now Button */}
            <Link
              href="/Booking"
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${isActive("/Booking")
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/50"
                  : "bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-400 hover:to-orange-500"
                }`}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-yellow-400" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-yellow-500/20">
            <div className="space-y-2 mb-4">
              {/* Mobile Home */}
              <Link
                href="/"
                className={`block px-4 py-3 rounded transition-all ${isActive("/")
                    ? "bg-yellow-500/20 text-yellow-400 font-bold"
                    : "text-gray-200 hover:bg-yellow-500/10 hover:text-yellow-400"
                  }`}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>

              {/* Mobile About */}
              <Link
                href="/About"
                className={`block px-4 py-3 rounded transition-all ${isActive("/About")
                    ? "bg-yellow-500/20 text-yellow-400 font-bold"
                    : "text-gray-200 hover:bg-yellow-500/10 hover:text-yellow-400"
                  }`}
                onClick={() => setOpen(false)}
              >
                About
              </Link>

              {/* Mobile Gallery */}
              <Link
                href="/Gallery"
                className={`block px-4 py-3 rounded transition-all ${isActive("/Gallery")
                    ? "bg-yellow-500/20 text-yellow-400 font-bold"
                    : "text-gray-200 hover:bg-yellow-500/10 hover:text-yellow-400"
                  }`}
                onClick={() => setOpen(false)}
              >
                Gallery
              </Link>

              {/* Mobile Packages Accordion - Simplified */}
              <div>
                <button
                  onClick={() => setPackageOpen(!packageOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded transition-all ${isPackageActive()
                      ? "bg-yellow-500/20 text-yellow-400 font-bold"
                      : "text-gray-200 hover:bg-yellow-500/10 hover:text-yellow-400"
                    }`}
                >
                  <span>Packages</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${packageOpen ? 'rotate-180' : ''}`} />
                </button>

                {packageOpen && (
                  <div className="ml-4 mt-2 space-y-3">
                    {/* International */}
                    <Link
                      href="/Packages?region=international"
                      className="block px-6 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">International</div>
                          <div className="text-xs text-gray-500">Explore the world</div>
                        </div>
                      </div>
                    </Link>

                    {/* Domestic with nested options */}
                    <div className="ml-2">
                      <Link
                        href="/Packages?region=domestic"
                        className="block px-6 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all"
                        onClick={() => setOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <Home className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium">All Domestic</div>
                            <div className="text-xs text-gray-500">Explore India</div>
                          </div>
                        </div>
                      </Link>

                      <div className="ml-12 mt-2 space-y-2">
                        {/* North India */}
                        <Link
                          href="/Packages?region=domestic&zone=north"
                          className="block px-4 py-2 text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all text-sm"
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-orange-400" />
                            <span>North India</span>
                          </div>
                        </Link>

                        {/* South India */}
                        <Link
                          href="/Packages?region=domestic&zone=south"
                          className="block px-4 py-2 text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all text-sm"
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-teal-400" />
                            <span>South India</span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* View All Packages */}
                    <Link
                      href="/Packages"
                      className="block px-6 py-3 text-center text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all mt-2 border-t border-yellow-500/20 pt-3"
                      onClick={() => setOpen(false)}
                    >
                      View All Packages →
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Contact */}
              <Link
                href="/Contact"
                className={`block px-4 py-3 rounded transition-all ${isActive("/Contact")
                    ? "bg-yellow-500/20 text-yellow-400 font-bold"
                    : "text-gray-200 hover:bg-yellow-500/10 hover:text-yellow-400"
                  }`}
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Book Now */}
            <div className="px-4">
              <Link
                href="/Booking"
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${isActive("/Booking")
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/50"
                    : "bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-400 hover:to-orange-500"
                  }`}
                onClick={() => setOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}