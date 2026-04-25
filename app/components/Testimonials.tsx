"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Manvitha Rajeev",
    location: "Shivamogga",
    rating: 5,
    text: "Me and my friends went on a trip to Madikeri, which was well organized by Ambaari tours and travels. It was a great experience and I recommend others as well. And they also guide you for the international packages.",
    trip: "Madikeri",
    initials: "MR",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Abhishek Shetty",
    location: "Bangalore",
    rating: 5,
    text: "Guide Sharath naik was very kind and Helpful person Totally Highly recommend travel agency in Bangalore To Friends and FamilyBest and memorable 1 Day Package with Ambaari tours and travels.",
    trip: "1 day package",
    initials: "AS",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Samhitha R",
    location: "Bangalore",
    rating: 5,
    text: "Me and my sister planned a trip, and we got a guide from ambaari travels. The entire experience was amazing—we enjoyed so much! Everything was well organized, the guide was very helpful and friendly, and the trip became truly memorable for us. Highly recommended for a stress-free and enjoyable travel experience.",
    trip: "Chikmagalur",
    initials: "SR",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Hanamamt Kurani",
    location: "Bangalore",
    rating: 5,
    text: "Dandeli Package 🙏was awesome and super and service, bus, food was good overall good travel company in Bangalore",
    trip: "Dandeli package",
    initials: "HK",
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Siva Prasad",
    location: "Bangalore",
    rating: 5,
    text: "I had good experience with this travels, the price and the service are good. Planning to travel with them once again.",
    trip: "Murdeshwara Scuba Package",
    initials: "SP",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Vishal Naik",
    location: "Bangalore",
    rating: 5,
    text: "Our family took the Prayagraj trip package, and it was really comfortable. Thank you to Sharath for making it possible for our family.",
    trip: "Prayagraj Trip Package",
    initials: "VN",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Srenika Ravikiran Varada",
    location: "Bangalore",
    rating: 5,
    text: "They organise very well ,food is good ad very helpful especially for senior citizens. I am very happy with the service and the price is also good. I will definitely recommend to my friends and family.",
    trip: "Triranga trip package",
    initials:"SRV",
    color: "from-green-500 to-lime-600"
  },
  {
    name: "Maddala Tharesh",
    location: "Bangalore",
    rating: 5,
    text: "I had a great experience with Ambaari tours and travels. The trip was well organized, and the guide was very helpful and friendly. I highly recommend them for a stress-free and enjoyable travel experience.",
    trip: "Thailand Trip Package",
    initials: "MT",
    color: "from-yellow-500 to-yellow-600"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const visibleCount = 3;

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(testimonials[(current + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full border border-yellow-500/30 mb-4">
            Traveler Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
              Travelers Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real stories from real travelers who experienced the Ambaari difference
          </p>
        </div>

        {/* Testimonials Grid - Desktop shows 3, Mobile shows 1 */}
        <div className="relative">
          {/* Desktop: 3 cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
            {getVisible().map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
            ))}
          </div>

          {/* Mobile/Tablet: 1 card */}
          <div className="lg:hidden mb-10">
            <TestimonialCard testimonial={testimonials[current]} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-yellow-500/40 text-yellow-400 flex items-center justify-center hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 h-3 bg-yellow-400"
                      : "w-3 h-3 bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-yellow-500/40 text-yellow-400 flex items-center justify-center hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="relative p-6 md:p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/10">
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-10 h-10 text-yellow-400" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Trip badge */}
      <div className="mb-5">
        <span className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full">
          {testimonial.trip}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}
        >
          {testimonial.initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-gray-500 text-xs">{testimonial.location}</div>
        </div>
      </div>
    </div>
  );
}
