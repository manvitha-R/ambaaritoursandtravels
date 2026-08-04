"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Download, Plane, Calendar } from "lucide-react";
import { generateItineraryPDF } from "../../utils/itineraryGenerator";

export function DepartureDatePicker({ availableDates }: { availableDates: any[] }) {
  const upcomingDates = (availableDates || []).filter((d) => new Date(d.startDate) > new Date());
  const [selectedDateId, setSelectedDateId] = useState<string>(upcomingDates[0]?.id || "");

  return (
    <div className="pb-5 border-b border-gray-800">
      <span className="text-gray-400 text-xs uppercase tracking-wide font-medium flex items-center gap-1.5 mb-3">
        <Calendar className="w-3.5 h-3.5 text-amber-400" /> Select Departure Date
      </span>
      {upcomingDates.length > 0 ? (
        <div className="grid grid-cols-5 gap-1.5">
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
  );
}

export function EnquiryForm({ packageTitle }: { packageTitle: string }) {
  const [enquiry, setEnquiry] = useState({ name: "", email: "", mobile: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async () => {
    if (!enquiry.name || !enquiry.mobile) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiry.name,
          email: enquiry.email,
          mobile: enquiry.mobile,
          destination: packageTitle,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="border-t border-gray-800 pt-4">
      <h4 className="font-bold text-white mb-1 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-amber-500 rounded-sm inline-block" /> For Enquiry
      </h4>
      <p className="text-gray-400 text-xs mb-4">{packageTitle}</p>

      {status === "sent" ? (
        <div className="text-center py-4">
          <p className="text-green-400 font-semibold">Enquiry sent!</p>
          <p className="text-gray-400 text-sm mt-1">We&apos;ll get back to you shortly.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            name="name"
            value={enquiry.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
          />
          <input
            name="email"
            value={enquiry.email}
            onChange={handleChange}
            placeholder="Enter Email ID"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
          />
          <input
            name="mobile"
            value={enquiry.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
          />
          {status === "error" && (
            <p className="text-red-400 text-xs">Please fill in your name and mobile number.</p>
          )}
          <button
            type="button"
            onClick={submitEnquiry}
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black py-2.5 rounded-lg font-bold text-sm hover:from-amber-300 hover:to-amber-400 transition-all disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Submit Enquiry"}
          </button>
        </div>
      )}
    </div>
  );
}

export function Gallery({ images, title }: { images?: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-80 bg-gradient-to-br from-amber-500/15 to-orange-500/10 flex items-center justify-center rounded-3xl border border-amber-500/10">
        <Plane className="w-20 h-20 text-amber-400/40" />
      </div>
    );
  }

  const activeImage = images[active];

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-3xl border border-amber-500/15 shadow-2xl shadow-black/50 bg-black">
        {/* Soft blurred backdrop so square/portrait posters fill the frame elegantly */}
        <div className="absolute inset-0">
          <Image src={activeImage} alt="" fill className="object-cover scale-110 blur-2xl opacity-30" aria-hidden />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {/* Sharp, fully-visible foreground image */}
        <div className="relative flex justify-center items-center py-6 md:py-10 px-4">
          <Image
            src={activeImage}
            alt={title}
            width={1200}
            height={1200}
            className="w-auto max-w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-2xl shadow-black/60"
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                active === i
                  ? "border-amber-400 shadow-lg shadow-amber-500/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${title} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface DownloadItineraryButtonProps {
  title: string;
  duration?: string;
  destination?: string;
  price?: number;
  images?: string[];
  itinerary?: { day: number; title: string; description: string; activities?: string[]; meals?: string[]; accommodation?: string }[];
  inclusions?: string[];
  exclusions?: string[];
  cancellationPolicy?: string;
  termsConditions?: string;
  className?: string;
}

export function DownloadItineraryButton({ className, ...pkg }: DownloadItineraryButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateItineraryPDF(pkg);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className={
        className ||
        "w-full flex items-center justify-center gap-2 bg-gray-800/60 hover:bg-gray-800 border border-amber-500/30 text-amber-300 py-3 rounded-xl font-semibold transition-all disabled:opacity-60"
      }
    >
      <Download className="w-4 h-4" />
      {downloading ? "Preparing..." : "Download Itinerary"}
    </button>
  );
}

export function ReadMoreText({ text, limit = 260 }: { text: string; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  const isLong = text.length > limit;
  const shown = expanded || !isLong ? text : `${text.slice(0, limit).trim()}...`;

  return (
    <div>
      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{shown}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
}

export function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number | null>(days[0]?.day ?? null);

  return (
    <div className="space-y-3">
      {days.map((day) => {
        const isOpen = openDay === day.day;
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
                <span className="text-amber-400">Day {day.day}</span> — {day.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 animate-fade-in">
                {day.description && (
                  <ul className="mb-3 space-y-1.5">
                    {day.description
                      .split(/(?<=[.!?])\s+(?=[A-Z])/)
                      .map((point) => point.trim())
                      .filter(Boolean)
                      .map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                  </ul>
                )}
                {day.activities && day.activities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {day.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PolicyAccordion({ sections }: { sections: { title: string; content: string }[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isOpen = openTitle === section.title;
        return (
          <div
            key={section.title}
            className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700"
          >
            <button
              type="button"
              onClick={() => setOpenTitle(isOpen ? null : section.title)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-700/30 transition-colors"
            >
              <span className="font-semibold text-white">{section.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 animate-fade-in">
                <ul className="space-y-1.5">
                  {section.content
                    .split(/(?<=[.!?])\s+(?=[A-Z])/)
                    .map((point) => point.trim())
                    .filter(Boolean)
                    .map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 leading-relaxed">
                        <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
