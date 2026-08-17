"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  Backpack,
  ShieldCheck,
  Hotel,
  Car,
  Utensils,
  Compass,
  Sparkles,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { ReadMoreText, PolicyAccordion, DownloadItineraryButton } from "./DetailInteractive";
import BackToTop from "@/app/components/BackToTop";

interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  meals?: string[];
  accommodation?: string;
}

// Curated to match the uploaded photos, in this order:
// 0 Malaysia.png poster (cover tile), 1 Putrajaya, 2 KL Tower, 3 Genting Highlands
// cable car, 4 Batu Caves, 5 Petronas Twin Towers, 6 Singapore.png (Marina Bay/city),
// 7 Sentosa/Merlion, 8 Universal Studios, 9 Gardens by the Bay (Supertree Grove),
// 10 Flower Dome & Cloud Forest.
const DAY_IMAGE_INDEX: Record<number, number> = { 0: 0, 1: 1, 2: 3, 3: 6, 4: 7, 5: 8, 6: 9 };

export default function MalaysiaSingaporeExperience({
  pkg,
  itinerary,
  highlights,
  bookNowHref,
  policySections,
}: {
  pkg: any;
  itinerary: DayItinerary[];
  highlights: string[];
  bookNowHref: string;
  policySections: { title: string; content: string }[];
}) {
  const images: string[] = pkg.images?.length ? pkg.images : ["/Images/Malaysia.png"];
  const mosaicImages = images.slice(0, 5);

  const imageForDay = (day: number) => {
    const idx = DAY_IMAGE_INDEX[day] ?? day;
    return images[idx % images.length];
  };

  const [openDay, setOpenDay] = useState<number | null>(null);

  const availableDates: any[] = pkg.availableDates || [];
  const upcomingDates = availableDates.filter((d) => new Date(d.startDate) > new Date());
  const [selectedDateId, setSelectedDateId] = useState<string>(upcomingDates[0]?.id || "");

  const [enquiry, setEnquiry] = useState({ name: "", email: "", mobile: "" });
  const [enquiryStatus, setEnquiryStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async () => {
    if (!enquiry.name || !enquiry.mobile) {
      setEnquiryStatus("error");
      return;
    }
    setEnquiryStatus("loading");
    const selectedDate = availableDates.find((d) => d.id === selectedDateId);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiry.name,
          email: enquiry.email,
          mobile: enquiry.mobile,
          date: selectedDate ? new Date(selectedDate.startDate).toISOString().slice(0, 10) : "",
          destination: pkg.title,
        }),
      });
      const data = await res.json();
      setEnquiryStatus(data.success ? "sent" : "error");
    } catch {
      setEnquiryStatus("error");
    }
  };

  return (
    <>
    <BackToTop/>
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-36 pb-2 flex justify-end">
        <Link
          href="/Packages"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </Link>
      </div>

      {/* Hero photo mosaic — every supplied photo is visible at once, full color, no dimming */}
      <section className="max-w-7xl mx-auto px-4 pt-4 pb-8">
        {mosaicImages.length <= 1 && (
          <div className="mb-5">
            {/* <p className="text-amber-400 tracking-[0.25em] text-[10px] md:text-[11px] uppercase mb-1">
              Ambaari Tours and Travels Presents
            </p> */}
            <h1 className="text-lg md:text-2xl font-semibold text-white">
              Malaysia &amp; Singapore <span className="text-amber-200 font-normal text-sm md:text-base">· 5 Nights / 6 Days</span>
            </h1>
          </div>
        )}
        {mosaicImages.length > 1 && (
          <div className="relative">
            <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3 aspect-[8/3] rounded-3xl overflow-hidden border border-amber-500/10 shadow-2xl shadow-black/50">
              {mosaicImages.map((src, i) => {
                const isPoster = src === images[0] && i === 0;
                return (
                  <div key={i} className={`relative ${i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}>
                    {isPoster ? (
                      <>
                        {/* Blurred backdrop fills the wide tile so the square poster isn't cropped */}
                        <Image src={src} alt="" fill className="object-cover scale-110 blur-xl opacity-50" aria-hidden />
                        <div className="absolute inset-0 flex items-center justify-center p-3">
                          <Image
                            src={src}
                            alt={`${pkg.title} poster`}
                            width={600}
                            height={600}
                            className="w-auto h-full max-w-full object-contain rounded-lg shadow-xl"
                            priority
                          />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={src}
                        alt={`${pkg.title} photo ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent rounded-b-3xl px-5 md:px-7 py-5">
              {/* <p className="text-amber-400 tracking-[0.25em] text-[10px] md:text-[11px] uppercase mb-1">
                Ambaari Tours and Travels Presents
              </p> */}
              <h1 className="text-lg md:text-2xl font-semibold text-white">
                Malaysia &amp; Singapore <span className="text-amber-200 font-normal text-sm md:text-base">· 5 Nights / 6 Days</span>
              </h1>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-5">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 border border-amber-500/20 rounded-full text-amber-300 text-sm">
            <Clock className="w-4 h-4" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 border border-amber-500/20 rounded-full text-amber-300 text-sm">
            <MapPin className="w-4 h-4" /> {pkg.destination}
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 border border-amber-500/20 rounded-full text-amber-300 text-sm">
            <Users className="w-4 h-4" /> {pkg.totalSeats ? `Max ${pkg.totalSeats} People` : "Flexible Group Size"}
          </span>
        </div>
      </section>

      {/* Booking-critical content */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* Itinerary — collapsed by default; expanding a day reveals a photo + description + activities */}
              {itinerary.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-sm inline-block" />
                    Itinerary
                  </h2>
                  <div className="space-y-3">
                    {itinerary.map((day) => {
                      const isOpen = openDay === day.day;
                      const dayImg = imageForDay(day.day);
                      const imgIsPoster = dayImg === images[0];
                      return (
                        <div
                          key={day.day}
                          className="bg-gray-800/40 rounded-xl overflow-hidden border border-amber-500/20"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenDay(isOpen ? null : day.day)}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-amber-500/5 transition-colors"
                          >
                            <span className="font-semibold text-white">
                              <span className="text-amber-400">Day {day.day}</span> &nbsp; {day.title}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 animate-fade-in">
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-2/5 flex-shrink-0">
                                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-amber-500/10 bg-gray-900">
                                    {imgIsPoster ? (
                                      <>
                                        <Image src={dayImg} alt="" fill className="object-cover scale-110 blur-xl opacity-50" aria-hidden />
                                        <div className="absolute inset-0 flex items-center justify-center p-3">
                                          <Image
                                            src={dayImg}
                                            alt={day.title}
                                            width={500}
                                            height={500}
                                            className="w-auto h-full max-w-full object-contain rounded-lg shadow-xl"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <Image src={dayImg} alt={day.title} fill className="object-cover" />
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-300 leading-relaxed mb-3">{day.description}</p>
                                  {day.activities && day.activities.length > 0 && (
                                    <ul className="space-y-1.5 mb-3">
                                      {day.activities.map((activity, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                          <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                                          <span>{activity}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {(day.meals?.length || day.accommodation) && (
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
                                      {day.meals && day.meals.length > 0 && (
                                        <span className="px-2.5 py-1 bg-gray-800/60 rounded-full text-gray-400 text-[11px]">
                                          🍽 Meals: {day.meals.join(", ")}
                                        </span>
                                      )}
                                      {day.accommodation && (
                                        <span className="px-2.5 py-1 bg-gray-800/60 rounded-full text-gray-400 text-[11px]">
                                          🏨 {day.accommodation}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" /> Trip Overview
                </h2>
                <ReadMoreText text={pkg.description || pkg.shortDesc || ""} />
              </section>

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

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-gradient-to-b from-gray-900 to-black border border-amber-500/20 rounded-3xl p-6 shadow-2xl shadow-black/40 space-y-6">
                <div className="pb-5 border-b border-gray-800">
                  <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">Starting From</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    {pkg.discountPrice ? (
                      <span className="text-gray-500 line-through text-sm">
                        ₹{pkg.discountPrice.toLocaleString("en-IN")}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">per person</p>
                </div>

                {/* Select Departure Date — calendar-style date cards */}
                <div className="pb-5 border-b border-gray-800">
                  <span className="text-gray-400 text-xs uppercase tracking-wide font-medium flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Select Departure Date
                  </span>
                  {upcomingDates.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5">
                      {upcomingDates.map((d) => {
                        const start = new Date(d.startDate);
                        const isSelected = selectedDateId === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDateId(d.id)}
                            className={`flex flex-col items-center rounded-lg border py-1.5 transition-all ${
                              isSelected
                                ? "bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/10"
                                : "bg-gray-800/60 border-gray-700 hover:border-amber-500/40"
                            }`}
                          >
                            <span className="text-[9px] uppercase tracking-wide text-gray-400">
                              {start.toLocaleDateString("en-IN", { month: "short" })}
                            </span>
                            <span className={`text-sm font-bold leading-tight ${isSelected ? "text-amber-300" : "text-white"}`}>
                              {start.getDate()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Dates on request — enquire below or call us.</p>
                  )}
                </div>

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
                  itinerary={itinerary as any}
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
                    <Sparkles className="w-4 h-4 text-amber-400" /> Need Help?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Call +91 8073 097 430 or write to ambaaritoursandtravels19@gmail.com for a custom quote or
                    group booking.
                  </p>
                </div>

              {/* For Enquiry */}
              <div className="border-t border-gray-800 pt-4">
                <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-amber-500 rounded-sm inline-block" /> For Enquiry
                </h4>
                <p className="text-gray-400 text-xs mb-4">{pkg.title}</p>

                {enquiryStatus === "sent" ? (
                  <div className="text-center py-4">
                    <p className="text-green-400 font-semibold">Enquiry sent!</p>
                    <p className="text-gray-400 text-sm mt-1">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      name="name"
                      value={enquiry.name}
                      onChange={handleEnquiryChange}
                      placeholder="Enter Name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      name="email"
                      value={enquiry.email}
                      onChange={handleEnquiryChange}
                      placeholder="Enter Email ID"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      name="mobile"
                      value={enquiry.mobile}
                      onChange={handleEnquiryChange}
                      placeholder="Enter Mobile Number"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
                    />
                    {enquiryStatus === "error" && (
                      <p className="text-red-400 text-xs">Please fill in your name and mobile number.</p>
                    )}
                    <button
                      type="button"
                      onClick={submitEnquiry}
                      disabled={enquiryStatus === "loading"}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black py-2.5 rounded-lg font-bold text-sm hover:from-amber-300 hover:to-amber-400 transition-all disabled:opacity-60"
                    >
                      {enquiryStatus === "loading" ? "Sending..." : "Submit Enquiry"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}
