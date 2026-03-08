"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Plane, Building, Send, Clock, CheckCircle } from "lucide-react";
import Navbar from "./Navbar";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        travelType: "international" // "international" or "local"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef(null);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            y: -5,
            boxShadow: "0 20px 40px rgba(251, 191, 36, 0.2)",
            transition: {
                duration: 0.3
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
                travelType: "international"
            });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-16 px-4">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/3 rounded-full blur-3xl"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                <motion.div
                    className="max-w-7xl mx-auto relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header Section */}
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Contact Ambaari
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Your Gateway to Extraordinary Journeys - Whether Across Continents or Close to Home
                        </motion.p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Contact Cards */}
                        <motion.div className="space-y-6" variants={itemVariants}>
                            {/* Travel Type Selector */}
                            <motion.div
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20"
                                variants={cardHoverVariants}
                                whileHover="hover"
                            >
                                <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                    <Globe className="w-6 h-6" />
                                    Select Your Journey Type
                                </h3>
                                <div className="flex space-x-4">
                                    {[
                                        { id: "international", label: "International Travel", icon: Plane },
                                        { id: "local", label: "Local Getaways", icon: Building }
                                    ].map((type) => (
                                        <motion.button
                                            key={type.id}
                                            onClick={() => setFormData(prev => ({ ...prev, travelType: type.id }))}
                                            className={`flex-1 py-4 px-4 rounded-xl text-center transition-all ${formData.travelType === type.id
                                                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                                                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <type.icon className="w-6 h-6 mx-auto mb-2" />
                                            <span className="font-semibold">{type.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20"
                                variants={cardHoverVariants}
                                whileHover="hover"
                            >
                                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Get in Touch</h3>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: Phone,
                                            title: "Phone Numbers",
                                            items: [
                                                "International: +1 (555) 123-4567",
                                                "Local: (080) 1234-5678",
                                                "24/7 Emergency: +1 (555) 987-6543"
                                            ]
                                        },
                                        {
                                            icon: Mail,
                                            title: "Email Addresses",
                                            items: [
                                                "international@ambaari.com",
                                                "local@ambaari.com",
                                                "support@ambaari.com"
                                            ]
                                        },
                                        {
                                            icon: MapPin,
                                            title: "Our Offices",
                                            items: [
                                                "Global HQ: 123 Travel Plaza, New York, NY",
                                                "Local Office: 456 Adventure St, Bengaluru, IN",
                                                "Asia-Pacific: 789 Explore Ave, Singapore"
                                            ]
                                        },
                                        {
                                            icon: Clock,
                                            title: "Business Hours",
                                            items: [
                                                "International Desk: 24/7",
                                                "Local Desk: Mon-Sat 9AM-8PM",
                                                "Sunday: 10AM-6PM"
                                            ]
                                        }
                                    ].map((contact, index) => (
                                        <motion.div
                                            key={contact.title}
                                            className="pb-4 border-b border-gray-700 last:border-0 last:pb-0"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <contact.icon className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-200">{contact.title}</h4>
                                                    <ul className="mt-2 space-y-1">
                                                        {contact.items.map((item, i) => (
                                                            <li key={i} className="text-gray-400 text-sm">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Emergency Contact */}
                            <motion.div
                                className="bg-gradient-to-br from-red-900/20 to-red-800/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-red-400">Emergency Travel Assistance</h4>
                                        <p className="text-sm text-gray-300">Available 24/7 for all travelers</p>
                                        <p className="text-lg font-semibold text-white mt-1">+1 (555) 911-TRAVEL</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Contact Form */}
                        <motion.div
                            className="lg:col-span-2"
                            variants={itemVariants}
                        >
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center">
                                        <Send className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-yellow-400">
                                            {formData.travelType === "international"
                                                ? "International Travel Inquiry"
                                                : "Local Getaway Inquiry"}
                                        </h3>
                                        <p className="text-gray-400">
                                            {formData.travelType === "international"
                                                ? "Plan your dream international vacation with our expert team"
                                                : "Discover amazing local destinations and experiences"}
                                        </p>
                                    </div>
                                </div>

                                {isSubmitted ? (
                                    <motion.div
                                        className="text-center py-12"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                                        <h4 className="text-2xl font-bold text-green-400 mb-2">Message Sent Successfully!</h4>
                                        <p className="text-gray-300">
                                            Our {formData.travelType} travel specialist will contact you within 24 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {[
                                                { name: "name", label: "Full Name", type: "text", required: true },
                                                { name: "email", label: "Email Address", type: "email", required: true },
                                                { name: "phone", label: "Phone Number", type: "tel", required: true },
                                                {
                                                    name: "subject",
                                                    label: "Subject",
                                                    type: "select",
                                                    options: formData.travelType === "international"
                                                        ? ["International Vacation", "Business Travel", "Group Tour", "Honeymoon Package", "Luxury Cruise"]
                                                        : ["Weekend Getaway", "Family Vacation", "Adventure Trip", "Cultural Tour", "Road Trip"]
                                                }
                                            ].map((field, index) => (
                                                <motion.div
                                                    key={field.name}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <label className="block text-gray-300 mb-2 font-medium">
                                                        {field.label}
                                                    </label>
                                                    {field.type === "select" ? (
                                                        <select
                                                            name={field.name}
                                                            value={formData[field.name as keyof typeof formData]}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 bg-gray-900 border border-yellow-500/20 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                                            required={field.required}
                                                        >
                                                            <option value="">Select {field.label}</option>
                                                            {field.options?.map((option) => (
                                                                <option key={option} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            name={field.name}
                                                            value={formData[field.name as keyof typeof formData]}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 bg-gray-900 border border-yellow-500/20 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                                            required={field.required}
                                                        />
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className="block text-gray-300 mb-2 font-medium">
                                                Your Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={6}
                                                className="w-full px-4 py-3 bg-gray-900 border border-yellow-500/20 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                                                placeholder={`Tell us about your ${formData.travelType} travel plans...`}
                                                required
                                            />
                                        </motion.div>

                                        {/* Special Services */}
                                        <motion.div
                                            className="bg-gray-900/50 rounded-xl p-6 border border-yellow-500/10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <h4 className="font-semibold text-yellow-400 mb-4">
                                                {formData.travelType === "international"
                                                    ? "International Travel Services"
                                                    : "Local Travel Services"}
                                            </h4>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {(formData.travelType === "international"
                                                    ? [
                                                        "Visa Assistance", "Flight Bookings",
                                                        "Hotel Reservations", "Travel Insurance",
                                                        "Multi-City Tours", "Cultural Experiences"
                                                    ]
                                                    : [
                                                        "Transportation", "Accommodation",
                                                        "Local Guides", "Activity Bookings",
                                                        "Food Experiences", "Custom Itineraries"
                                                    ]
                                                ).map((service, index) => (
                                                    <motion.div
                                                        key={service}
                                                        className="flex items-center gap-2 text-gray-300"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.6 + (index * 0.05) }}
                                                    >
                                                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                                        <span>{service}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all ${isSubmitting
                                                    ? 'bg-gray-700 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500'
                                                } text-black shadow-lg shadow-yellow-500/30`}
                                            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <motion.div
                                                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    Sending Message...
                                                </span>
                                            ) : (
                                                `Send ${formData.travelType === "international" ? "International" : "Local"} Inquiry`
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>

                            {/* FAQ Section */}
                            <motion.div
                                className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20"
                                variants={itemVariants}
                            >
                                <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            q: "What's the response time for inquiries?",
                                            a: "We respond within 1-2 hours during business hours and within 6 hours for after-hours inquiries."
                                        },
                                        {
                                            q: "Do you offer travel insurance?",
                                            a: "Yes, comprehensive travel insurance is available for both international and local packages."
                                        },
                                        {
                                            q: "Can you handle group bookings?",
                                            a: "Absolutely! We specialize in group travel arrangements for families, corporate teams, and special events."
                                        },
                                        {
                                            q: "What payment methods do you accept?",
                                            a: "We accept all major credit cards, bank transfers, and also offer flexible payment plans."
                                        }
                                    ].map((faq, index) => (
                                        <motion.div
                                            key={faq.q}
                                            className="bg-gray-900/30 rounded-xl p-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + (index * 0.1) }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <h4 className="font-semibold text-gray-200 mb-2">{faq.q}</h4>
                                            <p className="text-gray-400 text-sm">{faq.a}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </>
    );
    
}
