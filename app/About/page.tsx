"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Map,
  Mountain,
  Trophy,
  Sparkles,
  ChevronRight,
  Building2,
  GraduationCap,
  Heart,
  Globe,
  Plane,
  Cloud,
  Bird,
  Flag,
  Castle,
  MapPin,
  Copyright,
  Award,
  Star,
  Target,
  Eye,
  Shield,
  Compass
} from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import AnimatedImage from "../components/AnimatedImage";
import BackToTop from "../components/BackToTop";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function AboutPage() {
  const [visibleStats, setVisibleStats] = useState(Array(8).fill(false));
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleStats(prev => prev.map((_, i) => true));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const height = navbar.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const rotateAnimation = {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const
    }
  };

  const bounceAnimation = (index: number) => ({
    y: index % 2 === 0 ? [0, -5, 0] : [0, 5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: index * 0.2,
      ease: "easeInOut" as const
    }
  });

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sharath Naik H O",
      role: "FOUNDER & CEO",
      bio: "Passionate traveler with expertise in crafting unique experiences across world."
    },
    {
      id: 2,
      name: "Manvitha R",
      role: "MANAGER",
      bio: "Skilled in strategic planning and team leadership."
    },

    {
      id: 4,
      name: "Shivaram M S",
      role: "DOMESTIC TEAM HEAD",
      bio: "Specializing in the domestic market, excels at aligning localized team strategies with broader corporate objectives."
    },
    {
      id: 5,
      name: "Akash R",
      role: "INTERNATIONAL TEAM HEAD",
      bio: "Driving cross-border initiatives and scaling high-performing, multicultural teams."
    },
    {
      id: 3,
      name: "Srinath",
      role: "VIDEO EDITOR",
      bio: "Expert in editing and content creation of all travel itineraries."
    },


  ];

  const coreValues = [
    {
      title: "Integrity",
      desc: "Honesty and transparency in every journey we plan and every interaction we have.",
      icon: "🤝",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Passion",
      desc: "Enthusiasm for exploration and creating unforgettable travel experiences.",
      icon: "❤️",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Excellence",
      desc: "Commitment to the highest quality service and attention to detail.",
      icon: "⭐",
      color: "from-yellow-500 to-amber-500"
    },
    {
      title: "Sustainability",
      desc: "Responsible travel practices that protect and preserve our destinations.",
      icon: "🌱",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Community",
      desc: "Building lasting connections through shared travel experiences.",
      icon: "👥",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Innovation",
      desc: "Constantly evolving to bring you unique and contemporary travel experiences.",
      icon: "💡",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "100+", label: "Trips Organized", icon: <Map className="w-5 h-5" /> },
    { number: "10K+", label: "Happy Travelers", icon: <Users className="w-5 h-5" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <Heart className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <Trophy className="w-5 h-5" /> }
  ];

  const features = [
    { icon: <Sparkles />, title: "Expert Guided Treks", desc: "Professional guides for safe and memorable mountain adventures" },
    { icon: <Map />, title: "International & Domestic Packages", desc: "Curated itineraries across world's most beautiful destinations" },
    { icon: <Users />, title: "Custom Group Trips", desc: "Tailored experiences for families, friends, and organizations" },
    { icon: <Building2 />, title: "Corporate Events", desc: "Team-building retreats and corporate getaways" },
    { icon: <GraduationCap />, title: "College Excursions", desc: "Energetic and educational trips for students" },
    { icon: <Heart />, title: "Personalized Service", desc: "Customized travel experiences designed just for you" }
  ];

  const handleViewPackages = () => {
    router.push('/Packages');
  };

  const handleStartJourney = () => {
    router.push('/Booking');
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-32 pb-16 px-4">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"
            animate={rotateAnimation}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/3 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear" as const
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <motion.div
            className="relative mb-20 rounded-3xl overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="relative h-64 md:h-80 lg:h-96">
              <AnimatedImage
                src="/Images/img21.jpg"
                alt="Ambaari Tours and Travels"
                className="h-full w-full"
                hoverScale={1.02}
                borderRadius="rounded-3xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-6 sm:py-3 bg-yellow-400/20 backdrop-blur-sm border border-yellow-500/30 rounded-full mb-6 max-w-full"
                    animate={floatAnimation}
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                    <span className="text-yellow-400 font-bold text-xs sm:text-base md:text-lg tracking-normal sm:tracking-wider whitespace-nowrap">AMBAARI TOURS AND TRAVELS</span>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    About Us
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-300 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Bringing world-class travel experiences to India
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Our Story Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-300 leading-relaxed text-lg text-center">
                Ambaari Tours and Travels organizes expertly guided treks, international and domestic travel packages,
                and custom group trips across India. We specialize in bringing people together through
                travel, offering specialized services for corporate team-building events and energetic
                college excursions. At Ambaari, we don't just plan trips; we create stories. Join us
                for a customized travel experience designed just for you.
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20 text-center"
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: "rgba(251, 191, 36, 0.5)" }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-yellow-400/10 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <motion.span
                  className="text-2xl sm:text-3xl font-bold text-yellow-400"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.span>
                <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Journey & Mission Images Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* <motion.div
              className="relative h-80 rounded-2xl overflow-hidden group"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedImage
                src="/Images/logo.jpeg"
                alt="Ambaari Travel Experiences"
                className="h-full w-full"
                hoverScale={1.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-white">Our Journey</h3>
                <p className="text-gray-300 text-sm">Since 2025</p>
              </div>
            </motion.div> */}

            {/* <motion.div
              className="relative h-80 rounded-2xl overflow-hidden group"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedImage
                src="/Images/img20.jpg"
                alt="Our Mission"
                className="h-full w-full"
                hoverScale={1.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                <p className="text-gray-300 text-sm">Creating memories since 2020</p>
              </div>
            </motion.div> */}
          </div>

          {/* Mission, Vision & Promise Section - all in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            {/* Mission Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To transform travel into transformative experiences that connect people, cultures,
                  and landscapes through expertly curated journeys across world's most breathtaking destinations.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To become world's most trusted travel partner, known for creating unique,
                  personalized experiences that exceed expectations. We envision a world where
                  travel is accessible, enjoyable, and transformative for everyone.
                </p>
              </div>
            </motion.div>

            {/* Promise Card */}
            <motion.div
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Promise</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every journey with us is crafted with care, safety, and attention to detail,
                  ensuring memories that last a lifetime.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Values Section - Ultra Minimal & Elegant */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-yellow-400 tracking-wide">Our Core Values</h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-2"></div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-2">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white/[0.03] border border-white/5 rounded-lg px-4 py-3 hover:border-yellow-400/30 transition-all duration-200"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  whileHover={{ y: -2, borderColor: "rgba(251, 191, 36, 0.3)" }}
                >
                  <h4 className="text-sm font-medium text-white mb-0.5">{value.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section - All cards in one row */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">Meet Our Expert Team</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                Passionate individuals who make your travel dreams come true
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="h-16 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-lg font-bold text-black">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <h4 className="text-sm font-semibold text-white whitespace-nowrap">
                      {member.name}
                    </h4>
                    <p className="text-yellow-400 text-xs font-medium mt-0.5">{member.role}</p>
                    <p className="text-gray-400 text-xs leading-relaxed mt-1 line-clamp-2">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats - keep as is, or optionally reduce size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
              {[
                // { label: "Team Members", value: teamMembers.length },
                { label: "Years Combined Experience", value: "4+" },
                { label: "Guided Tours", value: "500+" },
                { label: "Happy Travelers", value: "5000+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/5 border border-white/10 rounded-lg p-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="text-xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
          {/* Philosophy Section */}
          {/* <motion.div
            className="mb-20 p-8 bg-gradient-to-r from-yellow-400/10 to-orange-400/5 rounded-2xl border border-yellow-500/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-6 max-w-4xl mx-auto">
              <Compass className="w-12 h-12 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">Our Philosophy</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  We believe travel should be transformative. Every journey with Ambaari is carefully crafted
                  to create lasting memories, build connections, and inspire personal growth through exploration.
                </p>
              </div>
            </div>
          </motion.div> */}

          {/* Features/Specialties Section */}
          <motion.div
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">What We Specialize In</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 group"
                  variants={itemVariants}
                  whileHover={{ y: -8, borderColor: "rgba(251, 191, 36, 0.4)" }}
                  animate={bounceAnimation(index)}
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-black">{feature.icon}</div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-yellow-400/10 via-black to-yellow-400/10 rounded-3xl p-12 border border-yellow-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Create Your Story?
              </h3>

              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who have experienced India like never before.
                Let's craft your perfect journey together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleStartJourney}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-yellow-500 transition-all shadow-2xl shadow-yellow-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                </motion.button>

                {/* <motion.button
                  onClick={handleViewPackages}
                  className="bg-gray-800/50 border border-yellow-500/30 text-yellow-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Packages
                </motion.button> */}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}