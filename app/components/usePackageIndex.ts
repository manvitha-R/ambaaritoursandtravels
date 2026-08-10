"use client";

import { useEffect, useState } from "react";
import type { PackageResult } from "./siteSearchData";

// Module-level cache so the desktop search bar and the mobile search overlay
// share one fetch of the package index instead of each hitting the API.
let cache: PackageResult[] | null = null;
let inflight: Promise<PackageResult[]> | null = null;

async function loadPackages(): Promise<PackageResult[]> {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetch("/api/packages/search")
      .then((res) => res.json())
      .then((data) => {
        cache = data.packages || [];
        return cache as PackageResult[];
      })
      .catch(() => {
        cache = [];
        return cache as PackageResult[];
      });
  }
  return inflight;
}

// `enabled` lets callers defer the fetch until the search UI is actually
// opened/focused rather than firing on every page load.
export function usePackageIndex(enabled: boolean) {
  const [packages, setPackages] = useState<PackageResult[]>(cache || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || cache) return;
    let active = true;
    setLoading(true);
    loadPackages().then((pkgs) => {
      if (!active) return;
      setPackages(pkgs);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [enabled]);

  return { packages: cache || packages, loading };
}
