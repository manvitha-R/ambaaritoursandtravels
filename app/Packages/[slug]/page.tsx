// app/Packages/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, Check, X, Hotel, Utensils, Car, Backpack, ShieldCheck, ArrowLeft, Compass, Sparkles } from "lucide-react";
import { ReadMoreText, ItineraryAccordion, PolicyAccordion, DownloadItineraryButton, Gallery, DepartureDatePicker, EnquiryForm } from "./DetailInteractive";
import ThailandExperience from "./ThailandExperience";
import VietnamExperience from "./VietnamExperience";
import MalaysiaExperience from "./MalaysiaExperience";
import MalaysiaSingaporeExperience from "./MalaysiaSingaporeExperience";
import DubaiExperience from "./DubaiExperience";
import PanchabhootaExperience from "./PanchabhootaExperience";
import DoDhamExperience from "./DoDhamExperience";
import CharDhamExperience from "./CharDhamExperience";
import ShirdiExperience from "./ShirdiExperience";
import PuriExperience from "./PuriExperience";
import UjjainExperience from "./UjjainExperience";
import KashiExperience from "./KashiExperience";
import Navbar from "@/app/components/Navbar";
import { JSX } from "react";

// These packages get a custom layout instead of the shared template —
// see ThailandExperience.tsx / VietnamExperience.tsx / MalaysiaExperience.tsx / MalaysiaSingaporeExperience.tsx / DubaiExperience.tsx / PanchabhootaExperience.tsx / DoDhamExperience.tsx / CharDhamExperience.tsx / ShirdiExperience.tsx / PuriExperience.tsx / UjjainExperience.tsx / KashiExperience.tsx.
const CUSTOM_EXPERIENCES: Record<string, (props: any) => JSX.Element> = {
  "thailand-4n-5d": ThailandExperience,
  "vietnam-grand-tour-6n-7d": VietnamExperience,
  "malaysia-kuala-lumpur-2n-3d-24": MalaysiaExperience,
  "malaysia-singapore-combo-5n-6d-26": MalaysiaSingaporeExperience,
  "dubai-5n-6d": DubaiExperience,
  "panchabhoota-yatra-3n-4d-srikalahasti-kanchipuram-thiruvannamalai-chidambaram-trichy-27": PanchabhootaExperience,
  "do-dham-yatra-7n-8d-kedarnath-badrinath-28": DoDhamExperience,
  "char-dham-yatra-with-chopta-tunganath-14n-15d-yamunotri-gangotri-kedarnath-badrinath-29": CharDhamExperience,
  "shirdi-sai-baba-yatra-1n-2d": ShirdiExperience,
  "puri-jagannath-darshan-3n-4d": PuriExperience,
  "ujjain-omkareshwar-darshan-3n-4d": UjjainExperience,
  "kashi-yatra-8n-9d-lucknow-ayodhya-naimisharanya-prayagraj-chitrakoot-varanasi-gaya-baidyanath-30": KashiExperience,
};

async function getPackage(slug: string) {
  const pkg = await prisma.package.findUnique({
    where: { slug, isActive: true },
    include: {
      availableDates: {
        where: { isActive: true },
        orderBy: { startDate: "asc" },
        include: { _count: { select: { bookings: true } } },
      },
    },
  });
  return pkg;
}

// Most package slugs encode their legacy id as the trailing "-N" (e.g.
// "malaysia-kuala-lumpur-2n-3d-24" -> "24"), which /Booking still reads via
// ?package=<id>. A handful of older packages don't follow that pattern, or —
// worse — their trailing digits happen to match a *different* package's id in
// the booking flow's hardcoded list. Those are mapped explicitly here so
// "Book Now" never lands on the wrong trip. `null` forces the safe fallback.
const SLUG_LEGACY_BOOKING_ID_OVERRIDES: Record<string, string | null> = {
  "thailand-4n-5d": "13",
  "vietnam-grand-tour-6n-7d": "23",
  "shirdi-sai-baba-yatra-1n-2d": "32",
  "dubai-5n-6d": "16",
  "puri-jagannath-darshan-3n-4d": "puri",
  "ujjain-omkareshwar-darshan-3n-4d": "33",
  // Slug ends in "-16", but booking id 16 now belongs to the Dubai package
  // above — without this override, Book Now here would silently start a
  // Dubai booking instead.
  "thailand-4n-5d-without-flight-package-16": null,
};

function getLegacyBookingId(slug: string) {
  if (slug in SLUG_LEGACY_BOOKING_ID_OVERRIDES) {
    return SLUG_LEGACY_BOOKING_ID_OVERRIDES[slug];
  }
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : null;
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackage(slug) as any;

  if (!pkg) {
    notFound();
  }

  const itinerary = (pkg.itinerary as any[]) || [];
  const highlights = [...new Set(itinerary.flatMap((day) => day.activities || []))].filter(Boolean);
  const legacyBookingId = getLegacyBookingId(pkg.slug);
  // Even without a resolvable legacy id, send them into the booking flow
  // (step 1 lets you pick a package) rather than bouncing back to the list.
  const bookNowHref = legacyBookingId ? `/Booking?package=${legacyBookingId}` : "/Booking";

  const policySections = [
    { title: "Cancellation & Refund Policy", content: pkg.cancellationPolicy || "Please contact us for cancellation and refund details." },
    { title: "Terms & Conditions", content: pkg.termsConditions || "Standard booking terms apply." },
  ];

  const CustomExperience = CUSTOM_EXPERIENCES[pkg.slug];
  if (CustomExperience) {
    return (
      <>
        <Navbar />
        <CustomExperience
          pkg={pkg}
          itinerary={itinerary as any}
          highlights={highlights}
          bookNowHref={bookNowHref}
          policySections={policySections}
        />
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="px-4 pt-32 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
            <Link
              href="/Packages"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Packages
            </Link>
          </div>
          {pkg.isOnSale && (
            <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded-full mb-3">
              On Sale
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">{pkg.title}</h1>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 mb-5" />
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-300 text-sm">
              <Clock className="w-4 h-4" /> {pkg.duration}
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-300 text-sm">
              <MapPin className="w-4 h-4" /> {pkg.destination}
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-300 text-sm">
              <Users className="w-4 h-4" /> {pkg.totalSeats ? `Max ${pkg.totalSeats} People` : "Flexible Group Size"}
            </span>
            {pkg.minAge ? (
              <span className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-300 text-sm">
                Min Age: {pkg.minAge}+
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <Gallery images={pkg.images} title={pkg.title} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Trip Overview */}
            <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" /> Trip Overview
              </h2>
              <ReadMoreText text={pkg.description || pkg.shortDesc || ""} />
            </section>

            {/* Quick Info */}
            <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/40 rounded-xl p-4 text-center border border-gray-700 hover:border-amber-500/40 transition-colors">
                <div className="w-11 h-11 mx-auto mb-2.5 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-white font-medium text-sm">{pkg.accommodation || "Accommodation"}</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-4 text-center border border-gray-700 hover:border-amber-500/40 transition-colors">
                <div className="w-11 h-11 mx-auto mb-2.5 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Car className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-white font-medium text-sm">{pkg.transportation || "Transportation"}</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-4 text-center border border-gray-700 hover:border-amber-500/40 transition-colors">
                <div className="w-11 h-11 mx-auto mb-2.5 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-white font-medium text-sm">{pkg.meals || "Meals"}</p>
              </div>
            </section>

            {/* Trip Highlights */}
            {highlights.length > 0 && (
              <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Trip Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" /> Itinerary
                </h2>
                <ItineraryAccordion days={itinerary as any} />
              </section>
            )}

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Inclusions
                </h3>
                <ul className="space-y-2.5">
                  {(pkg.inclusions || []).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/30 rounded-2xl p-6 border border-red-500/20">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" /> Exclusions
                </h3>
                <ul className="space-y-2.5">
                  {(pkg.exclusions || []).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Things to Carry */}
            {pkg.whatToCarry?.length > 0 && (
              <section className="bg-gray-800/30 rounded-2xl p-6 border border-amber-500/20">
                <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <Backpack className="w-5 h-5" /> Things to Carry
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {pkg.whatToCarry.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Policies */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> Policies
              </h2>
              <PolicyAccordion sections={policySections} />
              <p className="text-gray-500 text-sm mt-3">
                For full legal terms, see our{" "}
                <Link href="/Terms" className="text-amber-400 hover:text-amber-300 underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-amber-400 hover:text-amber-300 underline">
                  Privacy Policy
                </Link>{" "}
                pages.
              </p>
            </section>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gradient-to-b from-gray-900 to-black border border-amber-500/20 rounded-3xl p-6 shadow-2xl shadow-black/40 space-y-6">
              <div className="pb-5 border-b border-gray-800">
                <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">Starting From</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </span>
                  {pkg.discountPrice ? (
                    <span className="text-gray-500 line-through text-sm">₹{pkg.discountPrice.toLocaleString("en-IN")}</span>
                  ) : null}
                </div>
                <p className="text-gray-400 text-sm mt-1">per person</p>
                {/* {pkg.bookingAmount ? (
                  <p className="text-gray-500 text-xs mt-1">Booking amount: ₹{pkg.bookingAmount.toLocaleString("en-IN")} per person</p>
                ) : null} */}
              </div>

              <DepartureDatePicker availableDates={pkg.availableDates || []} />

              <Link
                href={bookNowHref}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-lg hover:from-green-400 hover:to-emerald-500 transition-all hover:scale-105 shadow-lg shadow-green-500/30 block text-center"
              >
                Book Now
              </Link>

              <DownloadItineraryButton
                title={pkg.title}
                duration={pkg.duration}
                destination={pkg.destination}
                price={pkg.price}
                images={pkg.images}
                itinerary={itinerary}
                inclusions={pkg.inclusions}
                exclusions={pkg.exclusions}
                cancellationPolicy={pkg.cancellationPolicy}
                termsConditions={pkg.termsConditions}
              />

              <div className="text-center text-gray-400 text-sm">
                <span className="text-amber-400">✦</span> Free cancellation up to 30 days
                <span className="text-amber-400 mx-2">✦</span>
                24/7 Support
              </div>

              <div className="border-t border-gray-800 pt-4">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" /> Need Help?
                </h4>
                <p className="text-gray-300 text-sm">Call +91 8073 097 430 or write to ambaaritoursandtravels19@gmail.com for a custom quote or group booking.</p>
              </div>

              <EnquiryForm packageTitle={pkg.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
