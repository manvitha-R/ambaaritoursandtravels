"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, MapPin, Loader2 } from "lucide-react";
import { matchPages, matchPackages } from "./siteSearchData";
import { usePackageIndex } from "./usePackageIndex";

// Full-screen search used on mobile, where there isn't room for the inline
// NavSearchBar next to the logo and hamburger toggle.
export default function SiteSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { packages, loading } = usePackageIndex(open);

  // Focus the input and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Reset the query each time the search is closed, so it opens fresh next time.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const matchedPages = matchPages(query);
  const matchedPackages = matchPackages(packages, query);
  const noResults = query.trim().length > 0 && matchedPages.length === 0 && matchedPackages.length === 0 && !loading;

  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 sm:pt-32 bg-black/70 backdrop-blur-sm">
      {/* Click-outside area */}
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />

      <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black border border-yellow-500/20 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
          <Search className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, destinations, pages..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-base focus:outline-none min-w-0"
          />
          {loading && <Loader2 className="w-4 h-4 text-gray-500 animate-spin flex-shrink-0" />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[65vh] overflow-y-auto">
          {noResults ? (
            <div className="px-5 py-10 text-center text-gray-400 text-sm">
              No results for &ldquo;{query}&rdquo;. Try a destination, package name, or page.
            </div>
          ) : (
            <>
              {matchedPackages.length > 0 && (
                <div className="px-3 pt-3">
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Packages
                  </p>
                  <div className="space-y-1 pb-2">
                    {matchedPackages.slice(0, 8).map((pkg) => (
                      <Link
                        key={pkg.id}
                        href={`/Packages/${pkg.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-yellow-500/10 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-800 flex-shrink-0 bg-gray-800">
                          {pkg.images?.[0] && (
                            <Image src={pkg.images[0]} alt="" fill className="object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-sm font-medium truncate group-hover:text-yellow-400 transition-colors">
                            {pkg.title}
                          </p>
                          <p className="flex items-center gap-1 text-gray-400 text-xs truncate">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {pkg.destination || pkg.country} · {pkg.duration}
                          </p>
                        </div>
                        {pkg.price > 0 && (
                          <span className="text-amber-400 text-xs font-semibold flex-shrink-0">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedPages.length > 0 && (
                <div className="px-3 pt-1 pb-3">
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Pages
                  </p>
                  <div className="space-y-1">
                    {matchedPages.map((page) => {
                      const Icon = page.icon;
                      return (
                        <Link
                          key={page.href}
                          href={page.href}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-yellow-500/10 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/10">
                            <Icon className="w-4 h-4 text-yellow-400" />
                          </div>
                          <span className="text-gray-200 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                            {page.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
