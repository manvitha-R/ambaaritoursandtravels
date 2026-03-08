"use client";

import { useState } from "react";
import { Hotel, Car, Plane, Map, Ship, Compass } from "lucide-react";
import FlightSearchForm from "./search/FlightSearchForm";
import HotelSearchForm from "./search/HotelSearchForm";
import CarRentalForm from "./search/CarRentalForm";
import TripSearchForm from "./search/TripSearchForm";
import BackToTop from "./BackToTop";

const services = [
  { id: "hotels", icon: Hotel, label: "Hotels", color: "from-yellow-400 to-yellow-500", component: HotelSearchForm },
  { id: "cars", icon: Car, label: "Car Rentals", color: "from-yellow-400 to-yellow-500", component: CarRentalForm },
  { id: "flights", icon: Plane, label: "Flights", color: "from-yellow-400 to-yellow-500", component: FlightSearchForm },
  { id: "trips", icon: Map, label: "Trips", color: "from-yellow-400 to-yellow-500", component: TripSearchForm },
  { id: "cruises", icon: Ship, label: "Cruises", color: "from-yellow-400 to-yellow-500", component: null },
  { id: "activities", icon: Compass, label: "Activities", color: "from-yellow-400 to-yellow-500", component: null },
];

export default function Services() {
  const [active, setActive] = useState("flights"); // Default to flights

  const ActiveFormComponent = services.find(s => s.id === active)?.component;

  return (
    <>
      <section className="relative -mt-32 z-20 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-100">
            {/* Service Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = active === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActive(service.id)}
                    className={`p-6 transition-all duration-500 hover:scale-105 ${
                      isActive
                        ? `bg-gradient-to-br ${service.color} text-white shadow-lg`
                        : "bg-white text-gray-700 hover:bg-yellow-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon 
                        className={`w-8 h-8 transition-transform duration-500 ${
                          isActive ? "scale-110" : ""
                        }`}
                      />
                      <span className="font-semibold text-sm">{service.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Form Section */}
            <div className="p-8 bg-gradient-to-r from-yellow-30 via-orange-50 to-yellow-50">
              {ActiveFormComponent ? (
                <ActiveFormComponent />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">This service is coming soon!</p>
                  <p className="text-sm mt-2">We're working on bringing you the best {services.find(s => s.id === active)?.label.toLowerCase()} experience.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <BackToTop/>
    </>
  );
}