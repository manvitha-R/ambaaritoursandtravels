"use client";

import { Shield, Award, Headphones, DollarSign } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our top priority with verified partners",
  },
  {
    icon: Award,
    title: "Best Experience",
    description: "Curated tours by travel experts with 15+ years experience",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your travel needs",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description: "Competitive rates with no hidden charges guaranteed",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">Ambaari</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the difference with our premium travel services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}