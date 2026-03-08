import { Suspense } from "react";
import PackagesContent from "@/app/Packages/PackagesContent";

// Loading component for Suspense
function PackagesLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading packages...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PackagesPage() {
    return (
        <Suspense fallback={<PackagesLoading />}>
            <PackagesContent />
        </Suspense>
    );
}