// app/booking/page.jsx
"use client";

import { Suspense } from "react";
import BookingContent from "@/app/Booking/BookingContent";

export default function BookingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-amber-400 text-lg font-medium">Loading booking page...</p>
                </div>
            </div>
        }>
            <BookingContent />
        </Suspense>
    );
}