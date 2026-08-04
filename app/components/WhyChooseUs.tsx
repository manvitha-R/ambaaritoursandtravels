"use client";

import { Shield, Award, Headphones, DollarSign, Users, Globe, Camera, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    // icon: Shield,
    title: "Safe & Secure",
    description: "All our travel partners are fully verified and certified for your complete peace of mind.",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-400",
  },
  {
    // icon: Award,
    title: "Expert Curated Tours",
    description: "Travel experiences crafted by industry experts with 5+ years of excellence in tourism.",
    color: "from-yellow-400 to-yellow-600",
    bg: "bg-yellow-500/10",
    border: "hover:border-yellow-400",
  },
  {
    // icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock dedicated assistance before, during, and after your journey.",
    color: "from-green-500 to-green-700",
    bg: "bg-green-500/10",
    border: "hover:border-green-400",
  },
  {
    icon: DollarSign,
    title: "Best Price Guarantee",
    description: "Competitive rates with zero hidden charges. We match any lower price you find.",
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-400",
  },
  {
    icon: Users,
    title: "Group & Family Tours",
    description: "Specially designed packages for families, couples, friends, and corporate groups.",
    color: "from-pink-500 to-pink-700",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-400",
  },
  {
    icon: Globe,
    title: "Global Destinations",
    description: "Explore 50+ destinations across India and internationally with our curated packages.",
    color: "from-teal-500 to-teal-700",
    bg: "bg-teal-500/10",
    border: "hover:border-teal-400",
  },
  {
    icon: Camera,
    title: "Memorable Experiences",
    description: "Every trip is designed to create lifetime memories with unique, immersive experiences.",
    color: "from-orange-500 to-orange-700",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-400",
  },
  {
    icon: Heart,
    title: "Personalized Planning",
    description: "Tailor-made itineraries designed to match your interests, budget, and travel style.",
    color: "from-red-500 to-red-700",
    bg: "bg-red-500/10",
    border: "hover:border-red-400",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "Happy Travelers" },
  { value: 50, suffix: "+", label: "Destinations" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Tour Packages" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full border border-yellow-500/30 mb-4">
            Why Ambaari?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
              Ambaari Tours and Travels
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We go beyond just booking trips — we craft unforgettable experiences with care, expertise, and passion for travel.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50 ${feature.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* <div
                  className={`w-14 h-14 mb-5 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div> */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to explore the world with us?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Packages"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full text-base font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:scale-105"
            >
              View All Packages
            </a>
            <a
              href="/Contact"
              className="border-2 border-yellow-500/50 text-yellow-400 px-8 py-4 rounded-full text-base font-bold hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105"
            >
              Talk to an Expert
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
