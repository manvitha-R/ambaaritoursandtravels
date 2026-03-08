"use client";

import { useState } from "react";
import { Car, Calendar, MapPin, Users, Search, Settings, Fuel } from "lucide-react";

export default function CarRentalForm() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [carType, setCarType] = useState("all");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sameLocation, setSameLocation] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/cars/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLocation,
          dropoffLocation: sameLocation ? pickupLocation : dropoffLocation,
          pickupDate,
          dropoffDate,
          pickupTime,
          carType
        })
      });
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Car search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Same Location Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="sameLocation"
          checked={sameLocation}
          onChange={(e) => setSameLocation(e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
        />
        <label htmlFor="sameLocation" className="text-sm text-gray-700">
          Return to same location
        </label>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Pickup Location</label>
          <div className="relative">
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="City, airport, or address"
              className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
            <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Dropoff Location (if different) */}
        {!sameLocation && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Dropoff Location</label>
            <div className="relative">
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Different return location"
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Pickup Date</label>
            <div className="relative">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Pickup Time</label>
            <div className="relative">
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Dropoff Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Dropoff Date</label>
            <div className="relative">
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Dropoff Time</label>
            <div className="relative">
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Car Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Car Type</label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
          >
            <option value="all">All Types</option>
            <option value="economy">Economy</option>
            <option value="compact">Compact</option>
            <option value="midsize">Midsize</option>
            <option value="standard">Standard</option>
            <option value="fullsize">Full Size</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
            <option value="convertible">Convertible</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-300 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search Cars
            </>
          )}
        </button>
      </form>

      {/* Search Results */}
      {searchResults && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Available Cars</h3>
          <div className="grid grid-cols-1 gap-4">
            {searchResults.data?.map((car, index) => (
              <CarResultCard key={index} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CarResultCard({ car }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4 h-32 bg-gray-200 rounded-lg relative">
          {car.image ? (
            <img src={car.image} alt={car.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <Car className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-gray-900">{car.name}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {car.seats} seats
                </span>
                <span className="flex items-center gap-1">
                  <Settings className="w-4 h-4" /> {car.transmission}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" /> {car.fuelType}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-600">₹{car.pricePerDay}</p>
              <p className="text-sm text-gray-500">per day</p>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-3">
            {car.features?.map((feature, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                {feature}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all">
              View Details
            </button>
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}