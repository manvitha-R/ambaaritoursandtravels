// components/TawkToChatbot.jsx
"use client";

import Script from 'next/script';
import { useEffect } from 'react';

export default function TawkToChatbot() {
  useEffect(() => {
    // Initialize Tawk.to after script loads
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
  }, []);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://embed.tawk.to/69521c137a3b8f197fe401d5/1jdkbrbt3"
        crossOrigin="anonymous"
      />
    </>
  );
}