"use client";

import { useState } from "react";
import { Hotel, Calendar, Users, MapPin, Search, Star, Wifi, Coffee, Car } from "lucide-react";

export default function HotelSearchForm() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          checkIn,
          checkOut,
          guests,
          rooms
        })
      });
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Hotel search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Destination</label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to stay?"
              className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
              required
            />
            <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Check In</label>
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Check Out</label>
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                required
              />
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Guests & Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Guests</label>
            <div className="relative">
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all appearance-none"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
              <Users className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Rooms</label>
            <div className="relative">
              <select
                value={rooms}
                onChange={(e) => setRooms(parseInt(e.target.value))}
                className="w-full px-4 py-3 pr-10 text-gray-900 rounded-lg border-2 border-yellow-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all appearance-none"
              >
                {[1,2,3,4].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                ))}
              </select>
              <Hotel className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
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
              Search Hotels
            </>
          )}
        </button>
      </form>

      {/* Search Results */}
      {searchResults && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Available Hotels</h3>
          <div className="grid grid-cols-1 gap-4">
            {searchResults.data?.map((hotel, index) => (
              <HotelResultCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HotelResultCard({ hotel }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 h-48 bg-gray-200 rounded-lg relative">
          {hotel.image ? (
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <Hotel className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-gray-900">{hotel.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-4 h-4 ${star <= hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{hotel.reviews} reviews</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{hotel.address}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-600">₹{hotel.price}</p>
              <p className="text-sm text-gray-500">per night</p>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-3 mt-4">
            {hotel.amenities?.map((amenity, idx) => (
              <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {amenity.icon === 'wifi' && <Wifi className="w-4 h-4" />}
                {amenity.icon === 'coffee' && <Coffee className="w-4 h-4" />}
                {amenity.icon === 'parking' && <Car className="w-4 h-4" />}
                {amenity.label}
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