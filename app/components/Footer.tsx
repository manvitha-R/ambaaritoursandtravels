import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-200 border-t border-yellow-500/20 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info / Logo */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-yellow-400">Ambaari Tours and Travels</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Discover the world with Ambaari – your trusted partner for unforgettable travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1DAeMK86YJ/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a> */}
              <a href="https://www.instagram.com/ambaari_tours_and_travels_ka09?igsh=MWo5dm42OTB0cDBtaA==" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links (now includes All Packages) */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/About" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Gallery" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/Packages" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  All Packages
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Booking" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Book Now
                </Link>
              </li>
              {/* You can uncomment these later if needed */}
              {/* <li><Link href="/FAQ">FAQ</Link></li> */}
              {/* <li><Link href="/Terms">Terms & Conditions</Link></li> */}
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-yellow-400 shrink-0 mt-1" />
                  <span>4th floor, No.879/e, next to Income tax office, 6th Block, Koramangala, Bengaluru, Karnataka 560034</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-yellow-400 shrink-0" />
                  <a href="tel:+91-8073 097 430" className="hover:text-yellow-400 transition-colors">
                    +91-8073 097 430
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-yellow-400 shrink-0" />
                  <a href="mailto:ambaaritoursandtravels19@gmail.com" className="hover:text-yellow-400 transition-colors">
                    ambaaritoursandtravels19@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-yellow-500/20 mt-8 pt-6 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ambaari Tours and Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}