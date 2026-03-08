"use client";

import { useState } from "react";
import { Plane, Calendar, Users, ArrowLeftRight, Search } from "lucide-react";

export default function FlightSearchForm() {
  const [tripType, setTripType] = useState("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to flight search endpoint
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          departDate,
          returnDate: tripType === "roundtrip" ? returnDate : null,
          passengers,
          cabinClass,
          tripType
        })
      });
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Flight search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="space-y-6">
      {/* Trip Type Selector */}
      <div className="flex gap-4 mb-4">
        {["roundtrip", "oneway", "multicity"].map((type) => (
          <button
            key={type}
            onClick={() => setTripType(type)}
            className={`px-4 py-2 rounded-lg capitalize ${
              tripType === type
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "roundtrip" ? "Round Trip" : type === "oneway" ? "One Way" : "Multi-City"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">From</label>
            <div className="relative">
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="City or Airport (e.g., JFK)"
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Plane className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">To</label>
            <div className="relative">
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="City or Airport (e.g., LAX)"
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Plane className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Swap Button */}
          <button
            type="button"
            onClick={swapLocations}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-all hidden md:block"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Departure Date</label>
            <div className="relative">
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {tripType === "roundtrip" && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Return Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                  required
                />
                <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Passengers & Cabin Class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Passengers</label>
            <div className="relative">
              <select
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all appearance-none"
              >
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
              <Users className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Cabin Class</label>
            <div className="relative">
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all appearance-none"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
              <Plane className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
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
              Search Flights
            </>
          )}
        </button>
      </form>

      {/* Search Results */}
      {searchResults && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Search Results</h3>
          <div className="space-y-4">
            {searchResults.data?.map((flight, index) => (
              <FlightResultCard key={index} flight={flight} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FlightResultCard({ flight }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Plane className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{flight.airline}</p>
            <p className="text-sm text-gray-600">{flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-yellow-600">₹{flight.price}</p>
          <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-all">
            Select
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div className="text-center">
          <p className="font-bold text-gray-900">{flight.departure.time}</p>
          <p>{flight.departure.airport}</p>
        </div>
        <div className="flex-1 mx-4 relative">
          <div className="border-t border-gray-300 mt-3"></div>
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-xs">
            {flight.duration}
          </span>
        </div>
        <div className="text-center">
          <p className="font-bold text-gray-900">{flight.arrival.time}</p>
          <p>{flight.arrival.airport}</p>
        </div>
      </div>
    </div>
  );
}