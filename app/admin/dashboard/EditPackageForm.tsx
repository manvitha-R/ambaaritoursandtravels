// app/admin/dashboard/EditPackageForm.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Calendar, MapPin, Save, Package, AlertCircle } from "lucide-react";

interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

interface PickUpPoint {
  city: string;
  airport: string;
  googleMapLink: string;
}

interface PackageData {
  id: string;
  title: string;
  slug: string;
  duration: string;
  destination: string;
  country: string;
  price: number;
  discountPrice: number | null;
  bookingAmount: number;
  gst: number;
  shortDesc: string;
  description: string;
  totalSeats: number;
  minAge: number;
  accommodation: string;
  transportation: string;
  meals: string;
  isActive: boolean;
  isOnSale: boolean;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  whatToCarry: string[];
  itinerary: DayItinerary[];
  availableDates: any[];
  pickUpPoints: PickUpPoint[];
  cancellationPolicy: string;
  termsConditions: string;
  additionalInfo: string;
}

export default function EditPackageForm({
  packageId,
  onClose,
  onSuccess
}: {
  packageId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PackageData | null>(null);

  // UI state for arrays
  const [newImage, setNewImage] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newWhatToCarry, setNewWhatToCarry] = useState("");
  const [newItem, setNewItem] = useState("");

  // Fetch package data on mount
  useEffect(() => {
    fetchPackageData();
  }, [packageId]);

  // In EditPackageForm.tsx, update the fetchPackageData function
  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/admin/packages/${packageId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch package: ${response.status}`);
      }

      const data = await response.json();

      // Ensure all arrays exist
      const safeData = {
        ...data,
        images: data.images || [],
        inclusions: data.inclusions || [],
        exclusions: data.exclusions || [],
        whatToCarry: data.whatToCarry || [],
        itinerary: data.itinerary || [],
        availableDates: data.availableDates || [],
        pickUpPoints: data.pickUpPoints || [],
        accommodation: data.accommodation || "",
        transportation: data.transportation || "",
        meals: data.meals || "",
        cancellationPolicy: data.cancellationPolicy || "",
        termsConditions: data.termsConditions || "",
        additionalInfo: data.additionalInfo || "",
      };

      setFormData(safeData);
    } catch (error) {
      console.error("Error fetching package:", error);
      setError(error instanceof Error ? error.message : "Failed to load package data");
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Image management
  const addImage = () => {
    if (!formData) return;
    if (newImage.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImage] });
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    if (!formData) return;
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  // Inclusion management
  const addInclusion = () => {
    if (!formData) return;
    if (newInclusion.trim()) {
      setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion] });
      setNewInclusion("");
    }
  };

  const removeInclusion = (index: number) => {
    if (!formData) return;
    setFormData({ ...formData, inclusions: formData.inclusions.filter((_, i) => i !== index) });
  };

  // Exclusion management
  const addExclusion = () => {
    if (!formData) return;
    if (newExclusion.trim()) {
      setFormData({ ...formData, exclusions: [...formData.exclusions, newExclusion] });
      setNewExclusion("");
    }
  };

  const removeExclusion = (index: number) => {
    if (!formData) return;
    setFormData({ ...formData, exclusions: formData.exclusions.filter((_, i) => i !== index) });
  };

  // What to Carry management
  const addWhatToCarry = () => {
    if (!formData) return;
    if (newWhatToCarry.trim()) {
      setFormData({ ...formData, whatToCarry: [...formData.whatToCarry, newWhatToCarry] });
      setNewWhatToCarry("");
    }
  };

  const removeWhatToCarry = (index: number) => {
    if (!formData) return;
    setFormData({ ...formData, whatToCarry: formData.whatToCarry.filter((_, i) => i !== index) });
  };

  // Itinerary management
  const addItineraryDay = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: formData.itinerary.length + 1, title: "", description: "", activities: [], meals: [], accommodation: "" }
      ]
    });
  };

  const updateItinerary = (index: number, field: string, value: any) => {
    if (!formData) return;
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, itinerary: updated });
  };

  const removeItineraryDay = (index: number) => {
    if (!formData) return;
    const updated = formData.itinerary.filter((_, i) => i !== index);
    setFormData({ ...formData, itinerary: updated.map((day, i) => ({ ...day, day: i + 1 })) });
  };

  const addItineraryActivity = (dayIndex: number) => {
    if (!formData || !newItem.trim()) return;
    const updated = [...formData.itinerary];
    updated[dayIndex].activities.push(newItem);
    setFormData({ ...formData, itinerary: updated });
    setNewItem("");
  };

  const removeItineraryActivity = (dayIndex: number, activityIndex: number) => {
    if (!formData) return;
    const updated = [...formData.itinerary];
    updated[dayIndex].activities.splice(activityIndex, 1);
    setFormData({ ...formData, itinerary: updated });
  };

  // Pick Up Points management
  const addPickUpPoint = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      pickUpPoints: [...formData.pickUpPoints, { city: "", airport: "", googleMapLink: "" }]
    });
  };

  const updatePickUpPoint = (index: number, field: string, value: string) => {
    if (!formData) return;
    const updated = [...formData.pickUpPoints];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, pickUpPoints: updated });
  };

  const removePickUpPoint = (index: number) => {
    if (!formData) return;
    setFormData({ ...formData, pickUpPoints: formData.pickUpPoints.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        setError(error.error || "Failed to update package");
      }
    } catch (error) {
      console.error("Error updating package:", error);
      setError("Failed to update package");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl p-8">
          <div className="text-white text-center">
            <Package className="w-12 h-12 text-yellow-400 animate-pulse mx-auto mb-4" />
            <div>Loading package data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Error Loading Package</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="relative max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-yellow-500/20">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 rounded-t-2xl border-b border-yellow-500/20 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Edit Package: {formData.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Package Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Destination *</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Minimum Age</label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.minAge}
                    onChange={handleNumberChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Total Seats</label>
                  <input
                    type="number"
                    name="totalSeats"
                    value={formData.totalSeats}
                    onChange={handleNumberChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Accommodation</label>
                  <input
                    type="text"
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                    placeholder="3 or 4 Star Hotel"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Transportation</label>
                  <input
                    type="text"
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                    placeholder="Private Vehicle - Toyota Commuter"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Meals</label>
                  <input
                    type="text"
                    name="meals"
                    value={formData.meals}
                    onChange={handleChange}
                    placeholder="All Meals (Buffet)"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Short Description</label>
                <textarea
                  name="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Price and Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Pricing & Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice || ""}
                    onChange={handleNumberChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">GST (%)</label>
                  <input
                    type="number"
                    name="gst"
                    value={formData.gst}
                    onChange={handleNumberChange}
                    step="0.1"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-gray-700 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-gray-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isOnSale"
                    checked={formData.isOnSale}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-gray-700 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-gray-300">On Sale</span>
                </label>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Images</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                />
                <button type="button" onClick={addImage} className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.images.length === 0 && (
                  <p className="text-gray-500 text-sm">No images added yet.</p>
                )}
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-400 border-b border-green-500/20 pb-2">Inclusions ✅</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    placeholder="Add inclusion"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  />
                  <button type="button" onClick={addInclusion} className="px-4 py-2 bg-green-500 text-black rounded-lg">Add</button>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {formData.inclusions.length === 0 && (
                    <p className="text-gray-500 text-sm">No inclusions added yet.</p>
                  )}
                  {formData.inclusions.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                      <span className="text-gray-300 text-sm">{item}</span>
                      <button type="button" onClick={() => removeInclusion(idx)} className="text-red-400 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400 border-b border-red-500/20 pb-2">Exclusions ❌</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    placeholder="Add exclusion"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  />
                  <button type="button" onClick={addExclusion} className="px-4 py-2 bg-red-500 text-white rounded-lg">Add</button>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {formData.exclusions.length === 0 && (
                    <p className="text-gray-500 text-sm">No exclusions added yet.</p>
                  )}
                  {formData.exclusions.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                      <span className="text-gray-300 text-sm">{item}</span>
                      <button type="button" onClick={() => removeExclusion(idx)} className="text-red-400 text-sm">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Things to Carry */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Things to Carry 🎒</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newWhatToCarry}
                  onChange={(e) => setNewWhatToCarry(e.target.value)}
                  placeholder="Add item"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
                <button type="button" onClick={addWhatToCarry} className="px-4 py-2 bg-yellow-500 text-black rounded-lg">Add</button>
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {formData.whatToCarry.length === 0 && (
                  <p className="text-gray-500 text-sm">No items added yet.</p>
                )}
                {formData.whatToCarry.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                    <span className="text-gray-300 text-sm">{item}</span>
                    <button type="button" onClick={() => removeWhatToCarry(idx)} className="text-red-400 text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Policies</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Cancellation Policy</label>
                <textarea
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Terms & Conditions</label>
                <textarea
                  name="termsConditions"
                  value={formData.termsConditions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Additional Info</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Itinerary - Simplified for now */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-yellow-500/20 pb-2">
                <h3 className="text-lg font-semibold text-yellow-400">Itinerary</h3>
                <button type="button" onClick={addItineraryDay} className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm font-medium">
                  + Add Day
                </button>
              </div>
              {formData.itinerary.length === 0 && (
                <p className="text-gray-500 text-center py-4">No itinerary days added yet. Click "Add Day" to create.</p>
              )}
              {formData.itinerary.map((day, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-white">Day {day.day}</h4>
                    {formData.itinerary.length > 1 && (
                      <button type="button" onClick={() => removeItineraryDay(idx)} className="text-red-400 text-sm">
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateItinerary(idx, "title", e.target.value)}
                    placeholder="Day Title"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                  <textarea
                    value={day.description}
                    onChange={(e) => updateItinerary(idx, "description", e.target.value)}
                    placeholder="Day Description"
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                  <div>
                    <label className="text-sm text-gray-400">Activities</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add activity"
                        className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white"
                      />
                      <button type="button" onClick={() => addItineraryActivity(idx)} className="px-2 py-1 bg-yellow-500 text-black rounded text-sm">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {day.activities.map((act, actIdx) => (
                        <span key={actIdx} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300 flex items-center gap-1">
                          {act}
                          <button type="button" onClick={() => removeItineraryActivity(idx, actIdx)} className="text-red-400 hover:text-red-300">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="sticky bottom-0 bg-gray-900 pt-4 flex justify-end gap-3 border-t border-gray-700">
              <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-semibold hover:from-yellow-300 hover:to-yellow-500 disabled:opacity-50 flex items-center gap-2">
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}