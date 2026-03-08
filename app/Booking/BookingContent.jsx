// app/booking/BookingContent.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from 'qrcode.react';
import { generateInvoice } from '../utils/invoiceGenerator';
import {
    CheckCircle,
    CreditCard,
    QrCode,
    Calendar,
    Users,
    MapPin,
    Shield,
    Phone,
    Mail,
    User,
    ChevronRight,
    Package,
    Clock,
    ArrowLeft
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";

const packages = [
    {
        id: "1",
        name: "Europe Dream Tour",
        price: 370999,
        duration: "10 Days 9 Nights",
        category: "International",
        image: "/Images/europe.png"
    },
    {
        id: "3",
        name: "Varanasi & Ayodhya Pilgrimage",
        price: 38899,
        duration: "4 Days 3 Nights",
        category: "Spiritual",
        image: "/Images/varanasi.png"
    },
    {
        id: "4",
        name: "Turkey Adventure",
        price: 213175,
        duration: "7 Days 6 Nights",
        category: "International",
        image: "/Images/turkey.png"
    },
    {
        id: "5",
        name: "Mantralaya Day Trip",
        price: 2799,
        duration: "1 Day",
        category: "Budget",
        image: "/Images/Mantralaya 1D Package From Bamgalore.png"
    },
    {
        id: "6",
        name: "Thailand Paradise",
        price: 45999,
        duration: "6 Days 5 Nights",
        category: "International",
        image: "/Images/Thailand 4N5D (4).png"
    },
    {
        id: "7",
        name: "South Karnataka Temple Tour",
        price: 2999,
        duration: "5 Days 4 Nights",
        category: "Cultural",
        image: "/Images/SOUTH KARNATAKA TEMPLE TOUR.png"
    },
    {
        id: "8",
        name: "Spiti Valley Expedition",
        price: 31999,
        duration: "8 Days 7 Nights",
        category: "Adventure",
        image: "/Images/Spiti_Valley_.png",
    },
    {
        id: "9",
        name: "ADVENTURE LEH-LADAKH BIKE RIDE TRIP 5N/6D (Excluding Flight) ",
        price: 26499,
        duration: "6 Days 5 Nights",
        category: "Adventure",
        image: "/Images/ladakh_5N-6D.png",
    },
    {
        id: "10",
        name: "LEH-LADAKH BIKE RIDE TRIP 12N/13D (Excluding Flight) DEL ",
        price: 56499,
        duration: "13 Days 12 Nights",
        category: "Adventure",
        image: "/Images/ladakh_12N-13D.png",
    },
    {
        id: "11",
        name: "LADAKH BIKE TRIP 7N-8D (Excluding Flight)",
        price: 31499,
        duration: "8 Days 7 Nights",
        category: "Adventure",
        image: "/Images/ladakh_7N-8D.jpg",
    },
    {
        id: "12",
        name: "THAILAND LADIES BATCH SPCL 4N/5D",
        price: 45999,
        duration: "5 Days 4 Nights",
        category: "Adventure",
        image: "/Images/Thailand_Ladies_Special.png",
    },
    {
        id: "13",
        name: "THAILAND 4N/5D WITH FLIGHT (Pattaya 3N, Bangkok 1N)",
        price: 46999,
        duration: "5 Days 4 Nights",
        category: "Adventure",
        image: "/Images/Thailand_pattaya.png",
    },
    {
        id: "14",
        name: "Budget Thailand 3N/4D Without Flight Package",
        price: 18499,
        duration: "4 Days 3 Nights",
        category: "Adventure",
        image: "/Images/Thailand_3N-4Dwf.png",
    },
    {
        id: "15",
        name: "Budget Thailand 3N/4D Without Flight Package (Only Breakfast)",
        price: 12999,
        duration: "4 Days 3 Nights",
        category: "Adventure",
        image: "/Images/Thailand_3N-4D.png",
    },
    {
        id: "16",
        name: "Thailand 4N/5D Without Flight Package",
        price: 26999,
        duration: "5 Days 4 Nights",
        category: "Adventure",
       image: "/Images/Thailand_4N-5D.png",
    },
     {
        id: "17",
        name: "DANDELI-GOKARNA 1N/2D TRIP",
        price: 4999,
        duration: "2 Days 1 Night",
        category: "Adventure",
       image: "/Images/dandeli.png",
    },
    {
        id: "18",
        name: "MURDESHWARA SCUBA PACKAGE 1N/2D",
        price: 6999,
        duration: "2 Days 1 Night",
        category: "Adventure",
      image: "/Images/MURDESHWRA_SCUBA.png",
    },
    {
        id: "19",
        name: "DHARMASTHALA Complete Divine Circuit In 01 Day Trip",
        price: 2499,
        duration: "1 Day",
        // category: "Adventure",
      image: "/Images/Dharmasthala_.png",
    },
     {
        id: "20",
        name: "SIGANDUR (JOG FALLS) 01 DAY TRIP",
        price: 2599,
        duration: "1 Day",
        // category: "Adventure",
      image: "/Images/Singadur_.png",
    },
];

const paymentMethods = [
    {
        id: "upi",
        name: "UPI",
        icon: "💸",
        description: "Instant payment",
        qrCode: "/Images/upi.jpeg"
    },
    {
        id: "card",
        name: "Credit/Debit Card",
        icon: "💳",
        description: "Secure card payment"
    },
    {
        id: "netbanking",
        name: "Net Banking",
        icon: "🏦",
        description: "All major banks"
    },
    {
        id: "wallet",
        name: "Wallet",
        icon: "📱",
        description: "PhonePe, GPay, Paytm"
    }
];

export default function BookingContent() {
    const searchParams = useSearchParams();
    const packageId = searchParams.get("package");

    const [step, setStep] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState("upi");
    const [showQR, setShowQR] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [paymentVerified, setPaymentVerified] = useState(false);
    const [paymentReference, setPaymentReference] = useState("");
    const [showPaymentVerification, setShowPaymentVerification] = useState(false);
    const [showInvoicePopup, setShowInvoicePopup] = useState(false);
    const [invoiceMessage, setInvoiceMessage] = useState("");
    const [invoiceStatus, setInvoiceStatus] = useState("success");
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        travelers: 1,
        travelDate: "",
        specialRequests: ""
    });

    // Find and set the selected package when packageId changes
    useEffect(() => {
        if (packageId) {
            const pkg = packages.find(p => p.id === packageId);
            if (pkg) {
                setSelectedPackage(pkg);
                // If package is found, we can move to step 2 automatically
                setStep(2);
            }
            setIsLoading(false);
        } else {
            // If no package ID, redirect to packages page
            window.location.href = '/Packages';
        }
    }, [packageId]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDownloadInvoice = async () => {
        if (!selectedPackage || !formData.name) {
            setInvoiceMessage("Please complete your booking first");
            setInvoiceStatus("warning");
            setShowInvoicePopup(true);
            return;
        }

        try {
            const bookingId = `AMB${Date.now().toString().slice(-8)}`;

            const bookingData = {
                bookingId: bookingId,
                package: selectedPackage,
                traveler: formData,
                payment: {
                    method: selectedPayment,
                    reference: paymentReference || 'Cash/UPI Payment',
                    amount: calculateTotal(),
                    verified: paymentVerified || true,
                    date: new Date().toISOString().split('T')[0]
                },
                invoiceDate: new Date().toLocaleDateString('en-GB'),
                totalAmount: calculateTotal(),
                subtotal: selectedPackage.price * formData.travelers,
                tax: selectedPackage.price * formData.travelers * 0.05
            };

            console.log('Generating invoice for:', bookingData);

            await generateInvoice(bookingData);

            setInvoiceMessage(`Invoice downloaded successfully!\nFile: Ambaari_Invoice_${bookingId}.pdf`);
            setInvoiceStatus("success");
            setShowInvoicePopup(true);

        } catch (error) {
            console.error('Error generating invoice:', error);
            setInvoiceMessage('Failed to generate invoice. Please try again or contact support.');
            setInvoiceStatus("error");
            setShowInvoicePopup(true);
        }
    };

    const calculateTotal = () => {
        if (!selectedPackage) return 0;
        const basePrice = selectedPackage.price;
        const gst = basePrice * 0.05;
        const convenienceFee = 299;
        return basePrice * formData.travelers + gst + convenienceFee;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 5) {
            try {
                const bookingData = {
                    bookingId: `AMB${Date.now().toString().slice(-8)}`,
                    package: selectedPackage,
                    traveler: formData,
                    payment: {
                        method: selectedPayment,
                        reference: paymentReference,
                        amount: calculateTotal(),
                        verified: paymentVerified
                    },
                    totalAmount: calculateTotal()
                };

                await sendBookingEmails(bookingData);
                setBookingComplete(true);

            } catch (error) {
                console.error("Booking failed:", error);
                alert("Booking failed. Please try again.");
            }
        } else {
            handleContinue();
        }
    };

    const handleContinue = () => {
        if (step === 4) {
            if (paymentReference && paymentReference.length >= 4) {
                setPaymentVerified(true);
                setTimeout(() => {
                    setStep(5);
                }, 1000);
            }
        } else if (step < 5) {
            setStep(step + 1);
        }
    };

    const sendBookingEmails = async (bookingData) => {
        try {
            const userEmailResponse = await fetch('/api/send-email/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: formData.email,
                    subject: `Booking Confirmation - ${bookingData.bookingId}`,
                    bookingData
                })
            });

            const adminEmailResponse = await fetch('/api/send-email/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: 'admin@ambaari.com',
                    subject: `New Booking - ${bookingData.bookingId}`,
                    bookingData
                })
            });

            return Promise.all([userEmailResponse, adminEmailResponse]);
        } catch (error) {
            console.error("Email sending failed:", error);
            throw error;
        }
    };

    const formatCurrency = (amount) => {
        const numericAmount = typeof amount === "string" ? Number(amount) : amount;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(numericAmount);
    };

    // Show loading state
    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-300">Loading booking details...</p>
                    </div>
                </div>
                <BackToTop />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 -z-10">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500"
                                    style={{ width: `${(step - 1) * 25}%` }}
                                />
                            </div>

                            {[1, 2, 3, 4, 5].map((stepNum) => (
                                <div key={stepNum} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${stepNum < step
                                            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-black scale-110"
                                            : stepNum === step
                                                ? "bg-amber-500 text-black scale-110 ring-4 ring-amber-500/30"
                                                : "bg-gray-800 text-gray-400"
                                        }`}>
                                        {stepNum < step ? <CheckCircle className="w-6 h-6" /> : stepNum}
                                    </div>
                                    <span className={`mt-2 text-sm font-medium transition-colors ${stepNum <= step ? "text-amber-400" : "text-gray-500"
                                        }`}>
                                        {stepNum === 1 && "Select Package"}
                                        {stepNum === 2 && "Traveler Details"}
                                        {stepNum === 3 && "Payment"}
                                        {stepNum === 4 && "Verify Payment"}
                                        {stepNum === 5 && "Confirmation"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-amber-500/20 rounded-3xl p-8 shadow-2xl">

                                {bookingComplete ? (
                                    // Success Screen
                                    <div className="text-center py-12 animate-fade-in">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-12 h-12 text-black" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4">
                                            Booking Confirmed! 🎉
                                        </h2>
                                        <p className="text-gray-300 mb-6">
                                            Your booking for {selectedPackage?.name} has been confirmed.
                                        </p>
                                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-6 max-w-md mx-auto mb-6">
                                            <div className="text-2xl font-bold text-white mb-2">
                                                Booking ID: AMB{Date.now().toString().slice(-8)}
                                            </div>
                                            <div className="text-gray-300 text-sm mb-4">
                                                Keep this ID for future reference
                                            </div>
                                            <div className="text-green-400 text-sm">
                                                ✓ Receipt sent to {formData.email}<br />
                                                ✓ Admin notified for processing
                                            </div>
                                        </div>
                                        <div className="mt-8 flex gap-4 justify-center">
                                            <Link
                                                href="/Packages"
                                                className="px-6 py-3 border border-amber-500 text-amber-400 rounded-full hover:bg-amber-500/10 transition-colors"
                                            >
                                                Explore More
                                            </Link>
                                            <button
                                                onClick={handleDownloadInvoice}
                                                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full font-bold hover:from-amber-400 hover:to-orange-500 transition-all flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download Invoice
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Form Steps
                                    <form onSubmit={handleSubmit}>
                                        {/* Step 1: Package Selection - Shows ONLY the selected package */}
                                        {step === 1 && selectedPackage && (
                                            <div className="animate-fade-in">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                                        <Package className="w-6 h-6 text-amber-400" />
                                                        Your Selected Package
                                                    </h2>

                                                    {/* Change Package Button */}
                                                    <Link
                                                        href="/Packages"
                                                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm"
                                                    >
                                                        <ArrowLeft className="w-4 h-4" />
                                                        Change Package
                                                    </Link>
                                                </div>

                                                {/* Single Package Card - Selected Package Only */}
                                                <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-2 border-amber-500 rounded-2xl p-6 hover:shadow-2xl transition-all">
                                                    <div className="flex flex-col md:flex-row gap-6">
                                                        {/* Package Image */}
                                                        <div className="md:w-1/3 relative h-48 md:h-auto rounded-xl overflow-hidden">
                                                            <Image
                                                                src={selectedPackage.image}
                                                                alt={selectedPackage.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        {/* Package Details */}
                                                        <div className="flex-1">
                                                            <h3 className="text-2xl font-bold text-white mb-2">{selectedPackage.name}</h3>
                                                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    {selectedPackage.duration}
                                                                </span>
                                                                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-xs">
                                                                    {selectedPackage.category}
                                                                </span>
                                                            </div>

                                                            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
                                                                {formatCurrency(selectedPackage.price)}
                                                                <span className="text-sm text-gray-400 font-normal ml-2">per person</span>
                                                            </div>

                                                            {/* Quick Highlights */}
                                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                                <div className="flex items-center gap-2 text-gray-300">
                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                    <span className="text-sm">Free cancellation</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-gray-300">
                                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                                    <span className="text-sm">Best price guarantee</span>
                                                                </div>
                                                            </div>

                                                            {/* Proceed Button */}
                                                            <button
                                                                type="button"
                                                                onClick={() => setStep(2)}
                                                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black py-3 rounded-lg font-bold hover:from-amber-400 hover:to-orange-500 transition-all hover:scale-105"
                                                            >
                                                                Proceed with this Package
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Traveler Details */}
                                        {step === 2 && (
                                            <div className="animate-fade-in">
                                                {/* Package Summary Card (Small) */}
                                                <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={selectedPackage.image}
                                                                alt={selectedPackage.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-bold text-white">{selectedPackage.name}</h3>
                                                                <Link
                                                                    href="/Packages"
                                                                    className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                                                                >
                                                                    Change
                                                                </Link>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                                <span>{selectedPackage.duration}</span>
                                                                <span className="px-2 py-0.5 bg-gray-800 rounded-full">
                                                                    {selectedPackage.category}
                                                                </span>
                                                                <span className="font-bold text-amber-400">
                                                                    {formatCurrency(selectedPackage.price)}/person
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                    <User className="w-6 h-6 text-amber-400" />
                                                    Traveler Details
                                                </h2>
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-gray-300 mb-2">Full Name *</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                                                                placeholder="Enter your full name"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-gray-300 mb-2">Email *</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                                                                placeholder="your@email.com"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-gray-300 mb-2">Phone Number *</label>
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                                                                placeholder="+91 98765 43210"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <label className="block text-gray-300 mb-2">Travel Date *</label>
                                                            <div className="relative">
                                                                <input
                                                                    type="date"
                                                                    name="travelDate"
                                                                    value={formData.travelDate}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    min={new Date().toISOString().split('T')[0]}
                                                                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors appearance-none custom-date-input"
                                                                />
                                                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-300 mb-2">
                                                            Number of Travelers
                                                        </label>
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                                                                className="w-10 h-10 rounded-full border border-amber-500 text-amber-400 flex items-center justify-center hover:bg-amber-500/10"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="text-2xl font-bold text-white w-12 text-center">
                                                                {formData.travelers}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                                                                className="w-10 h-10 rounded-full border border-amber-500 text-amber-400 flex items-center justify-center hover:bg-amber-500/10"
                                                            >
                                                                +
                                                            </button>
                                                            <span className="text-gray-400 ml-4">
                                                                {formData.travelers} {formData.travelers === 1 ? 'person' : 'people'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-300 mb-2">
                                                            Special Requests
                                                        </label>
                                                        <textarea
                                                            name="specialRequests"
                                                            value={formData.specialRequests}
                                                            onChange={handleInputChange}
                                                            rows={3}
                                                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                                                            placeholder="Any special requirements or requests..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Payment */}
                                        {step === 3 && (
                                            <div className="animate-fade-in">
                                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                    <CreditCard className="w-6 h-6 text-amber-400" />
                                                    Payment Method
                                                </h2>

                                                {/* Payment Options */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                                    {paymentMethods.map((method) => (
                                                        <div
                                                            key={method.id}
                                                            onClick={() => {
                                                                setSelectedPayment(method.id);
                                                                if (method.id === "upi") setShowQR(true);
                                                            }}
                                                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedPayment === method.id
                                                                ? "border-amber-500 bg-amber-500/10"
                                                                : "border-gray-700 hover:border-amber-500/50"
                                                                }`}
                                                        >
                                                            <div className="text-3xl mb-2">{method.icon}</div>
                                                            <div className="font-medium text-white">{method.name}</div>
                                                            <div className="text-sm text-gray-400">{method.description}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* UPI QR Code */}
                                                {selectedPayment === "upi" && showQR && (
                                                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-6 mb-6 animate-fade-in">
                                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                                            <div className="bg-white p-4 rounded-xl flex flex-col items-center">
                                                                <QRCodeSVG
                                                                    value={`upi://pay?pa=sharathnaik2021-1@okaxis&pn=Ambaari Tours&am=${calculateTotal()}&cu=INR&tn=Booking for ${selectedPackage?.name || 'Travel Package'}`}
                                                                    size={200}
                                                                    bgColor="#ffffff"
                                                                    fgColor="#000000"
                                                                    level="H"
                                                                    includeMargin={true}
                                                                />
                                                                <div className="mt-4 text-center">
                                                                    <div className="text-sm font-medium text-gray-700">Scan to Pay</div>
                                                                    <div className="text-xs text-gray-500">Amount: {formatCurrency(calculateTotal())}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="text-xl font-bold text-white mb-3">
                                                                    Scan to Pay
                                                                </h3>
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2 text-gray-300">
                                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                                        <span>UPI ID: sharathnaik2021-1@okaxis</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-gray-300">
                                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                                        <span>Bank: BOB</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-gray-300">
                                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                                        <span>Amount: {formatCurrency(calculateTotal())}</span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const upiLink = `upi://pay?pa=sharathnaik2021-1@okaxis&pn=Ambaari Tours&am=${calculateTotal()}&cu=INR`;
                                                                        navigator.clipboard.writeText(upiLink);
                                                                        alert("UPI payment link copied to clipboard!");
                                                                    }}
                                                                    className="mt-4 px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium hover:bg-amber-400 transition-colors"
                                                                >
                                                                    Copy Payment Link
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-2 px-6 py-2 bg-black/50 border border-amber-500 text-amber-400 rounded-full hover:bg-amber-500/10 transition-colors block"
                                                                    onClick={() => setShowQR(false)}
                                                                >
                                                                    Hide QR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Card Payment Form */}
                                                {selectedPayment === "card" && (
                                                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-6 mb-6 animate-fade-in">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-gray-300 mb-2">Card Number</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="1234 5678 9012 3456"
                                                                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-gray-300 mb-2">Expiry Date</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="MM/YY"
                                                                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-gray-300 mb-2">CVV</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="123"
                                                                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 4: Payment Verification */}
                                        {step === 4 && (
                                            <div className="animate-fade-in">
                                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                    <Shield className="w-6 h-6 text-amber-400" />
                                                    Verify Payment
                                                </h2>

                                                <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-6 mb-6">
                                                    <div className="text-center mb-6">
                                                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                                            <CheckCircle className="w-8 h-8 text-black" />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white mb-2">Payment Verification</h3>
                                                        <p className="text-gray-300 mb-4">
                                                            Please complete your payment and enter the transaction reference
                                                        </p>
                                                    </div>

                                                    <div className="space-y-6">
                                                        {/* Payment Details */}
                                                        <div className="bg-black/30 rounded-xl p-4">
                                                            <h4 className="font-bold text-white mb-3">Payment Summary</h4>
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between text-gray-300">
                                                                    <span>Package:</span>
                                                                    <span className="text-white">{selectedPackage?.name}</span>
                                                                </div>
                                                                <div className="flex justify-between text-gray-300">
                                                                    <span>Amount:</span>
                                                                    <span className="text-amber-400 text-lg font-bold">
                                                                        {formatCurrency(calculateTotal())}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between text-gray-300">
                                                                    <span>Payment Method:</span>
                                                                    <span className="text-white capitalize">{selectedPayment}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Payment Instructions */}
                                                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                                                <CheckCircle className="w-5 h-5 text-blue-400" />
                                                                Payment Instructions
                                                            </h4>
                                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                                <li className="flex items-start gap-2">
                                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                                                                    <span>Complete payment using your chosen method</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                                                                    <span>For UPI: Note down UPI transaction ID</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                                                                    <span>For Cards: Note down transaction reference</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                                                                    <span>Enter reference below to verify</span>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        {/* Payment Reference Input */}
                                                        <div>
                                                            <label className="block text-gray-300 mb-2">
                                                                Transaction Reference / UPI ID *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={paymentReference}
                                                                onChange={(e) => setPaymentReference(e.target.value)}
                                                                placeholder="Enter transaction reference, UPI ID, or last 4 digits"
                                                                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                                                                required
                                                            />
                                                            <p className="text-gray-500 text-sm mt-2">
                                                                Example: UPI123456789, TXN987654321, or last 4 digits of card
                                                            </p>
                                                        </div>

                                                        {/* Screenshot Upload (Optional) */}
                                                        <div>
                                                            <label className="block text-gray-300 mb-2">
                                                                Payment Screenshot (Optional)
                                                            </label>
                                                            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    id="paymentScreenshot"
                                                                />
                                                                <label htmlFor="paymentScreenshot" className="cursor-pointer">
                                                                    <div className="text-amber-500 text-3xl mb-2">📸</div>
                                                                    <div className="text-gray-300">Click to upload payment screenshot</div>
                                                                    <div className="text-gray-500 text-sm mt-1">Max 5MB - PNG, JPG, JPEG</div>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Verification Status */}
                                                        {paymentVerified && (
                                                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 animate-fade-in">
                                                                <div className="flex items-center gap-3">
                                                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                                                    <div>
                                                                        <div className="font-bold text-white">Payment Verified!</div>
                                                                        <div className="text-gray-300 text-sm">
                                                                            Your payment has been verified. You can proceed to booking confirmation.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 5: Confirmation */}
                                        {step === 5 && (
                                            <div className="animate-fade-in">
                                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                                    <Shield className="w-6 h-6 text-amber-400" />
                                                    Final Confirmation
                                                </h2>

                                                <div className="space-y-6">
                                                    {/* Package Summary */}
                                                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                                                <CheckCircle className="w-6 h-6 text-black" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-white">Payment Verified</h3>
                                                                <p className="text-gray-300">Reference: {paymentReference}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Traveler Details */}
                                                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
                                                        <h3 className="text-lg font-bold text-white mb-4">Traveler Information</h3>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <div className="text-sm text-gray-400">Name</div>
                                                                <div className="text-white">{formData.name}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-400">Email</div>
                                                                <div className="text-white">{formData.email}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-400">Phone</div>
                                                                <div className="text-white">{formData.phone}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-400">Travel Date</div>
                                                                <div className="text-white">{formData.travelDate}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-400">Travelers</div>
                                                                <div className="text-white">{formData.travelers} people</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Terms and Conditions */}
                                                    <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700 rounded-2xl p-6">
                                                        <h3 className="text-lg font-bold text-white mb-4">Terms & Conditions</h3>
                                                        <div className="space-y-3 text-gray-300 text-sm">
                                                            <div className="flex items-start gap-2">
                                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                <span>Free cancellation up to 20 days before the departure date</span>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                <span>Price includes all taxes and fees</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    required
                                                                    className="w-5 h-5 rounded border-gray-700 bg-black/50 text-amber-500 focus:ring-amber-500"
                                                                />
                                                                <span>I agree to the terms and conditions</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Submit Button */}
                                                    <div className="text-center pt-6">
                                                        <button
                                                            type="submit"
                                                            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-lg hover:from-green-400 hover:to-emerald-500 transition-all hover:scale-105 shadow-lg shadow-green-500/30"
                                                        >
                                                            Confirm Booking & Send Receipt
                                                        </button>
                                                        <p className="text-gray-400 text-sm mt-3">
                                                            Receipt will be sent to {formData.email} and ambaaritoursandtravels19@gmail.com
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Navigation Buttons */}
                                        {!bookingComplete && step !== 1 && (
                                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                                                {step > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(step - 1)}
                                                        className="px-8 py-3 border border-amber-500 text-amber-400 rounded-full hover:bg-amber-500/10 transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={handleContinue}
                                                    disabled={
                                                        (step === 2 && (!formData.name || !formData.email || !formData.phone || !formData.travelDate)) ||
                                                        (step === 4 && (!paymentReference || paymentReference.length < 4))
                                                    }
                                                    className={`px-8 py-3 rounded-full font-bold transition-all ml-auto ${(step === 2 && (!formData.name || !formData.email || !formData.phone || !formData.travelDate)) ||
                                                            (step === 4 && (!paymentReference || paymentReference.length < 4))
                                                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-400 hover:to-orange-500 hover:scale-105"
                                                        }`}
                                                >
                                                    {step === 4 ? "Verify & Continue" : "Continue"}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28">
                                {/* Booking Summary */}
                                <div className="bg-gradient-to-b from-gray-900 to-black border border-amber-500/20 rounded-3xl p-6 shadow-2xl mb-6">
                                    <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>

                                    {selectedPackage ? (
                                        <>
                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between text-gray-300">
                                                    <span>Package Price</span>
                                                    <span>{formatCurrency(selectedPackage.price)} × {formData.travelers}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-300">
                                                    <span>GST (5%)</span>
                                                    <span>{formatCurrency(selectedPackage.price * 0.05)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-300">
                                                    <span>Convenience Fee</span>
                                                    <span>₹299</span>
                                                </div>
                                                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-2" />
                                                <div className="flex justify-between text-xl font-bold text-white">
                                                    <span>Total Amount</span>
                                                    <span>{formatCurrency(calculateTotal())}</span>
                                                </div>
                                            </div>

                                            {/* What's Included */}
                                            <div className="mb-6">
                                                <h4 className="font-bold text-white mb-3">What's Included:</h4>
                                                <div className="space-y-2">
                                                    {[
                                                        "All accommodation",
                                                        "Meals as per itinerary",
                                                        "Transportation",
                                                        "Guide services",
                                                        "Entry tickets",
                                                    ].map((item, index) => (
                                                        <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                            <span>{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <Package className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                                            <p>Loading package details...</p>
                                        </div>
                                    )}

                                    {/* Contact Support */}
                                    <div className="border-t border-gray-800 pt-6">
                                        <h4 className="font-bold text-white mb-3">Need Help?</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Phone className="w-4 h-4 text-amber-400" />
                                                <span>+91 8073 097 430</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Mail className="w-4 h-4 text-amber-400" />
                                                <span>ambaaritoursandtravels19@gmail.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-4">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-8 h-8 text-green-500" />
                                        <div>
                                            <div className="font-bold text-white">Secure Booking</div>
                                            <div className="text-sm text-gray-300">SSL Encrypted • 100% Safe</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Popup Modal */}
            {showInvoicePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="relative max-w-md w-full">
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl p-6 shadow-2xl">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowInvoicePopup(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Icon based on status */}
                            <div className="text-center mb-4">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${invoiceStatus === "success"
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                        : invoiceStatus === "error"
                                            ? "bg-gradient-to-r from-red-500 to-pink-600"
                                            : "bg-gradient-to-r from-amber-500 to-orange-600"
                                    }`}>
                                    {invoiceStatus === "success" ? (
                                        <CheckCircle className="w-8 h-8 text-black" />
                                    ) : invoiceStatus === "error" ? (
                                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    )}
                                </div>

                                {/* Title based on status */}
                                <h3 className={`text-xl font-bold mb-2 ${invoiceStatus === "success"
                                        ? "text-green-400"
                                        : invoiceStatus === "error"
                                            ? "text-red-400"
                                            : "text-amber-400"
                                    }`}>
                                    {invoiceStatus === "success"
                                        ? "Success!"
                                        : invoiceStatus === "error"
                                            ? "Error"
                                            : "Notice"}
                                </h3>

                                {/* Message */}
                                <div className="text-gray-300 whitespace-pre-line">
                                    {invoiceMessage}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => setShowInvoicePopup(false)}
                                    className={`px-6 py-3 rounded-full font-bold transition-all hover:scale-105 ${invoiceStatus === "success"
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500"
                                            : invoiceStatus === "error"
                                                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-400 hover:to-pink-500"
                                                : "bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-400 hover:to-orange-500"
                                        }`}
                                >
                                    {invoiceStatus === "success"
                                        ? "Great!"
                                        : invoiceStatus === "error"
                                            ? "Try Again"
                                            : "Got It"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BackToTop />
        </>
    );
}