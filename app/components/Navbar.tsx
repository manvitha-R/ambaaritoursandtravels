"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, Home, Phone, Mail, Shield, Search } from "lucide-react";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import SiteSearch from "./SiteSearch";
import NavSearchBar from "./NavSearchBar";
import { useSession } from "next-auth/react";



const WHATSAPP = "https://wa.me/919686626428";
const PHONE = "tel:+919686626428";
const EMAIL = "mailto:ambaaritoursandtravels19@gmail.com";
const FACEBOOK = "https://facebook.com";
const INSTAGRAM = "https://instagram.com";

export default function Navbar({ hideUntilScrolled }: { hideUntilScrolled?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isHome = pathname === "/";

  // On the home page, the navbar stays hidden over the splash/hero and only
  // appears once the user scrolls past them. The home page passes
  // `hideUntilScrolled` explicitly (tied to its own splash state) so both stay
  // perfectly in sync; every other page keeps the navbar visible immediately.
  const [scrolled, setScrolled] = useState(false);
  const controlledExternally = hideUntilScrolled !== undefined;

  useEffect(() => {
    if (!isHome || controlledExternally) return;
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, controlledExternally]);

  const navVisible = controlledExternally ? !hideUntilScrolled : !isHome || scrolled;

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
    <>
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      {/* Top contact bar */}
      <div className="bg-yellow-500 text-black text-xs px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: phone + email */}
          <div className="flex items-center gap-4">
            <a href={PHONE} className="flex items-center gap-1 hover:underline font-semibold">
              <Phone className="w-3 h-3" />
              +91 96866 26428
            </a>
            <a href={EMAIL} className="hidden sm:flex items-center gap-1 hover:underline font-semibold">
              <Mail className="w-3 h-3" />
              ambaaritoursandtravels19@gmail.com
            </a>
            <Link
              href="/privacy-policy"
              className="hidden md:flex items-center gap-1 hover:underline font-semibold"
            >
              <Shield className="w-3 h-3" />
              Privacy Policy
            </Link>
            <Link
              href="/Terms"
              className="hidden md:flex items-center gap-1 hover:underline font-semibold"
            >
              <Shield className="w-3 h-3" />
              Terms and Conditions
            </Link>

          </div>
          {/* Right: social icons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-70 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* Facebook */}
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/Images/logo_bg.png"
                alt="Ambaari"
                width={368}
                height={133}
                className="h-12 md:h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-md">
              <NavSearchBar />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 flex-shrink-0 ml-auto">
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

                    {/* Domestic - Direct Link */}
                    <Link
                      href="/Packages?region=domestic"
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 rounded-lg transition-all group mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Home className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium">Domestic</div>
                        <div className="text-xs text-gray-500 group-hover:text-yellow-300/70">Explore India</div>
                      </div>
                    </Link>

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


               {/* {session ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-white hover:text-yellow-400 transition">
                    Dashboard
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <Link href="/auth/login" className="text-white hover:text-yellow-400 transition">
                  Login
                </Link>
              )} */}

                {/* {session?.user?.role === "ADMIN" && (
                <Link href="/admin/dashboard" className="text-white hover:text-yellow-400 transition">
                  Admin
                </Link>
              )} */}

            </div>

            {/* Mobile Search + Toggle */}
            <div className="flex items-center gap-4 md:hidden ml-auto">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the site"
                className="text-yellow-400"
              >
                <Search size={24} />
              </button>
              <button className="text-yellow-400" onClick={() => setOpen(!open)}>
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
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

                      {/* Domestic */}
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
                            <div className="font-medium">Domestic</div>
                            <div className="text-xs text-gray-500">Explore India</div>
                          </div>
                        </div>
                      </Link>

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

              {session ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-white hover:text-yellow-400 transition">
                    Dashboard
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <Link href="/auth/login" className="text-white hover:text-yellow-400 transition">
                  Login
                </Link>
              )}

            </div>
          )}
        </nav>
      </div>
    </header>

    <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}