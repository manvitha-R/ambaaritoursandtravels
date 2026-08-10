// Shared data + filtering logic for both the desktop inline search bar
// (NavSearchBar) and the mobile full-screen search (SiteSearch), so the two
// stay in sync and don't duplicate the "what counts as a match" rules.
import {
  Compass,
  Info,
  Images,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface SitePage {
  title: string;
  href: string;
  icon: LucideIcon;
  keywords: string;
}

export interface PackageResult {
  id: string;
  slug: string;
  title: string;
  shortDesc: string | null;
  description: string | null;
  destination: string;
  country: string;
  duration: string;
  price: number;
  images: string[];
}

// Every non-package page worth jumping straight to, plus a few keywords so
// e.g. searching "contact us" or "trip" still finds the right page.
export const SITE_PAGES: SitePage[] = [
  { title: "Home", href: "/", icon: Compass, keywords: "home main landing" },
  { title: "About Us", href: "/About", icon: Info, keywords: "about company story team who we are" },
  { title: "All Packages", href: "/Packages", icon: Compass, keywords: "packages tours trips deals international domestic" },
  { title: "Gallery", href: "/Gallery", icon: Images, keywords: "gallery photos pictures images" },
  { title: "Contact Us", href: "/Contact", icon: PhoneCall, keywords: "contact support phone email address reach us" },
  { title: "Book Now", href: "/Booking", icon: CalendarCheck, keywords: "booking book reserve reservation" },
  { title: "Terms and Conditions", href: "/Terms", icon: FileText, keywords: "terms conditions legal policy" },
  { title: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck, keywords: "privacy policy data" },
];

export function matchPages(query: string): SitePage[] {
  const q = query.trim().toLowerCase();
  if (!q) return SITE_PAGES;
  return SITE_PAGES.filter((p) => p.title.toLowerCase().includes(q) || p.keywords.includes(q));
}

export function matchPackages(packages: PackageResult[], query: string): PackageResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return packages.filter((pkg) => {
    const haystack = [pkg.title, pkg.shortDesc, pkg.description, pkg.destination, pkg.country]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
