"use client";

import { useState } from "react";
import { Map, Calendar, Users, MapPin, Search, Plus, Trash2 } from "lucide-react";

export default function TripSearchForm() {
  const [destinations, setDestinations] = useState([{ city: "", duration: 1 }]);
  const [startDate, setStartDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("moderate");
  const [interests, setInterests] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const addDestination = () => {
    setDestinations([...destinations, { city: "", duration: 1 }]);
  };

  const removeDestination = (index) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

  const updateDestination = (index, field, value) => {
    const updated = [...destinations];
    updated[index][field] = value;
    setDestinations(updated);
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/trips/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations,
          startDate,
          travelers,
          budget,
          interests
        })
      });
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Trip search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Multiple Destinations */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Destinations</label>
          <div className="space-y-3">
            {destinations.map((dest, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={dest.city}
                    onChange={(e) => updateDestination(index, "city", e.target.value)}
                    placeholder="City or region"
                    className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    required
                  />
                  <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    value={dest.duration}
                    onChange={(e) => updateDestination(index, "duration", parseInt(e.target.value))}
                    min="1"
                    max="30"
                    placeholder="Days"
                    className="w-full px-4 py-3 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                    required
                  />
                </div>
                {destinations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDestination(index)}
                    className="px-3 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addDestination}
            className="mt-2 flex items-center gap-2 text-yellow-600 hover:text-yellow-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Destination
          </button>
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Travelers</label>
          <div className="relative">
            <select
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all appearance-none"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
              ))}
            </select>
            <Users className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Budget</label>
          <div className="flex gap-2">
            {["budget", "moderate", "luxury"].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={`flex-1 px-4 py-3 rounded-lg capitalize transition-all ${
                  budget === b
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {[
              "Culture", "Adventure", "Food", "Nature", "Shopping", 
              "History", "Beach", "Mountains", "City Life", "Wildlife"
            ].map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full transition-all ${
                  interests.includes(interest)
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {interest}
              </button>
            ))}
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
              Planning...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Plan My Trip
            </>
          )}
        </button>
      </form>

      {/* Search Results */}
      {searchResults && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recommended Trips</h3>
          <div className="space-y-4">
            {searchResults.data?.map((trip, index) => (
              <TripResultCard key={index} trip={trip} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TripResultCard({ trip }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 h-48 bg-gray-200 rounded-lg relative overflow-hidden">
          {trip.images && trip.images[0] ? (
            <img src={trip.images[0]} alt={trip.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
              <Map className="w-12 h-12 text-yellow-500" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-gray-900">{trip.name}</h4>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{trip.destinations.join(" → ")}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-600">₹{trip.price}</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{trip.description}</p>
          
          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-3">
            {trip.highlights?.slice(0, 3).map((highlight, idx) => (
              <span key={idx} className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs">
                {highlight}
              </span>
            ))}
            {trip.highlights?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{trip.highlights.length - 3} more
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all">
              View Itinerary
            </button>
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all">
              Book Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}