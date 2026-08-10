"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Loader2 } from "lucide-react";
import { matchPages, matchPackages } from "./siteSearchData";
import { usePackageIndex } from "./usePackageIndex";

// Shown immediately (before the package index has loaded) so the animation
// never starts blank; real destination names replace these once fetched.
const FALLBACK_WORDS = ["Thailand", "Malaysia", "Dubai", "Singapore", "Vietnam"];

// Classic type-then-delete cycling placeholder, e.g. "Search for Thailand"
// typing out, pausing, deleting, then moving on to "Search for Malaysia".
function useTypewriter(words: string[], { typingSpeed = 65, deletingSpeed = 35, pauseMs = 1400 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const full = `Search for ${words[wordIndex % words.length]}`;
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < full.length) {
        timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pauseMs);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  // Reset cleanly if the word list changes (e.g. fallback -> real data).
  useEffect(() => {
    setText("");
    setWordIndex(0);
    setDeleting(false);
  }, [words]);

  return text;
}

// Always-visible navbar search bar. Empty + unfocused shows an animated
// "Search for <destination>" placeholder; typing opens a results dropdown
// underneath (or a "no results" message) — nothing shows on bare focus with
// an empty query.
export default function NavSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Small dataset — load it eagerly so the animated placeholder has real
  // destination names right away instead of waiting for a focus/click.
  const { packages, loading } = usePackageIndex(true);

  const placeholderWords = useMemo(() => {
    const names = packages.map((p) => p.country || p.destination).filter(Boolean);
    const unique = Array.from(new Set(names));
    return unique.length > 0 ? unique.slice(0, 12) : FALLBACK_WORDS;
  }, [packages]);

  const animatedPlaceholder = useTypewriter(placeholderWords);
  const showAnimatedPlaceholder = !focused && query.length === 0;

  const hasQuery = query.trim().length > 0;
  const showDropdown = focused && hasQuery;

  const matchedPages = hasQuery ? matchPages(query) : [];
  const matchedPackages = hasQuery ? matchPackages(packages, query) : [];
  const noResults = hasQuery && !loading && matchedPages.length === 0 && matchedPackages.length === 0;

  // Click outside collapses the dropdown.
  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);

  // Escape collapses the dropdown and blurs the input.
  useEffect(() => {
    if (!showDropdown) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocused(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showDropdown]);

  const closeAndReset = () => {
    setQuery("");
    setFocused(false);
  };

  const goToBestMatch = () => {
    if (matchedPackages.length > 0) {
      router.push(`/Packages/${matchedPackages[0].slug}`);
    } else if (matchedPages.length > 0) {
      router.push(matchedPages[0].href);
    } else {
      return;
    }
    closeAndReset();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-2 bg-gray-800/60 border rounded-full pl-4 pr-1.5 h-11 transition-colors ${
          focused ? "border-yellow-400" : "border-yellow-500/20 hover:border-yellow-500/40"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />

        <div className="relative flex-1 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToBestMatch();
            }}
            placeholder="Search packages, destinations & more"
            aria-label="Search packages, destinations and pages"
            className="w-full bg-transparent text-white placeholder-transparent text-sm focus:outline-none"
          />
          {showAnimatedPlaceholder && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 flex items-center text-gray-500 text-sm pointer-events-none whitespace-nowrap"
            >
              {animatedPlaceholder}
              <span className="ml-0.5 w-px h-4 bg-gray-500 pulse" />
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label="Search"
          onClick={goToBestMatch}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black flex items-center justify-center hover:from-yellow-300 hover:to-yellow-500 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-gradient-to-b from-gray-900 to-black border border-yellow-500/20 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="max-h-[70vh] overflow-y-auto">
            {noResults ? (
              <div className="px-5 py-8 text-center text-gray-400 text-sm">
                No results found for &ldquo;{query}&rdquo;.
              </div>
            ) : (
              <>
                {matchedPackages.length > 0 && (
                  <div className="px-3 pt-3">
                    <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Packages
                    </p>
                    <div className="space-y-1 pb-2">
                      {matchedPackages.slice(0, 6).map((pkg) => (
                        <Link
                          key={pkg.id}
                          href={`/Packages/${pkg.slug}`}
                          onClick={closeAndReset}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-yellow-500/10 transition-colors group"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-800 flex-shrink-0 bg-gray-800">
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
                              {pkg.destination || pkg.country}
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
                            onClick={closeAndReset}
                            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-yellow-500/10 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/10">
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
      )}
    </div>
  );
}
