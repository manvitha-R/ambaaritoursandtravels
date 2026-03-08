// app/Destination/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DestinationPage() {
    const router = useRouter();
    
    useEffect(() => {
        // Redirect to the correct path if needed
        router.replace("/destination");
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Redirecting...</p>
            </div>
        </div>
    );
}