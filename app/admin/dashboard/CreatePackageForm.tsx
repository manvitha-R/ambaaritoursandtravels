// app/admin/dashboard/CreatePackageForm.tsx
"use client";

import { useState } from "react";
import { X, Plus, Trash2, Calendar, MapPin, DollarSign, FileText, Image as ImageIcon } from "lucide-react";

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

export default function CreatePackageForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    duration: "",
    destination: "",
    country: "Thailand",
    price: 0,
    discountPrice: 0,
    bookingAmount: 20000,
    gst: 5,
    shortDesc: "",
    description: "",
    totalSeats: 40,
    minAge: 19,
    accommodation: "3 or 4 Star Hotel",
    transportation: "Private Vehicle - Toyota Commuter",
    meals: "All Meals (Buffet)",
    isOnSale: false,
    isActive: true,
    images: [] as string[],
    inclusions: [] as string[],
    exclusions: [] as string[],
    whatToCarry: [] as string[],
    cancellationPolicy: "",
    termsConditions: "",
    additionalInfo: "",
  });

  const [itinerary, setItinerary] = useState<DayItinerary[]>([
    { day: 1, title: "", description: "", activities: [], meals: [], accommodation: "" }
  ]);
  const [availableDates, setAvailableDates] = useState([{ startDate: "", endDate: "", price: 0 }]);
  const [pickUpPoints, setPickUpPoints] = useState<PickUpPoint[]>([
    { city: "Bengaluru", airport: "Bengaluru Airport", googleMapLink: "" }
  ]);
  const [newImage, setNewImage] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newWhatToCarry, setNewWhatToCarry] = useState("");
  const [newItem, setNewItem] = useState("");
  const [uploading, setUploading] = useState(false);



  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 200 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ ...formData, images: [...formData.images, data.url] });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData({ ...formData, slug });
  };

  // Itinerary functions
  const addItineraryDay = () => {
    setItinerary([...itinerary, {
      day: itinerary.length + 1,
      title: "",
      description: "",
      activities: [],
      meals: [],
      accommodation: ""
    }]);
  };

  const updateItinerary = (index: number, field: string, value: any) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setItinerary(updated);
  };

  const removeItineraryDay = (index: number) => {
    const updated = itinerary.filter((_, i) => i !== index);
    setItinerary(updated.map((day, i) => ({ ...day, day: i + 1 })));
  };

  const addItineraryActivity = (dayIndex: number, activity: string) => {
    if (!activity.trim()) return;
    const updated = [...itinerary];
    updated[dayIndex].activities.push(activity);
    setItinerary(updated);
    setNewItem("");
  };

  const removeItineraryActivity = (dayIndex: number, activityIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(updated);
  };

  // Available Dates functions
  const addAvailableDate = () => {
    setAvailableDates([...availableDates, { startDate: "", endDate: "", price: 0 }]);
  };

  const updateAvailableDate = (index: number, field: string, value: any) => {
    const updated = [...availableDates];
    updated[index] = { ...updated[index], [field]: value };
    setAvailableDates(updated);
  };

  const removeAvailableDate = (index: number) => {
    setAvailableDates(availableDates.filter((_, i) => i !== index));
  };

  // Pick Up Points functions
  const addPickUpPoint = () => {
    setPickUpPoints([...pickUpPoints, { city: "", airport: "", googleMapLink: "" }]);
  };

  const updatePickUpPoint = (index: number, field: string, value: string) => {
    const updated = [...pickUpPoints];
    updated[index] = { ...updated[index], [field]: value };
    setPickUpPoints(updated);
  };

  const removePickUpPoint = (index: number) => {
    setPickUpPoints(pickUpPoints.filter((_, i) => i !== index));
  };

  // Array management functions
  const addImage = () => {
    if (newImage.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImage] });
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion] });
      setNewInclusion("");
    }
  };

  const removeInclusion = (index: number) => {
    setFormData({ ...formData, inclusions: formData.inclusions.filter((_, i) => i !== index) });
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setFormData({ ...formData, exclusions: [...formData.exclusions, newExclusion] });
      setNewExclusion("");
    }
  };

  const removeExclusion = (index: number) => {
    setFormData({ ...formData, exclusions: formData.exclusions.filter((_, i) => i !== index) });
  };

  const addWhatToCarry = () => {
    if (newWhatToCarry.trim()) {
      setFormData({ ...formData, whatToCarry: [...formData.whatToCarry, newWhatToCarry] });
      setNewWhatToCarry("");
    }
  };

  const removeWhatToCarry = (index: number) => {
    setFormData({ ...formData, whatToCarry: formData.whatToCarry.filter((_, i) => i !== index) });
  };

  // In CreatePackageForm.tsx, before the API call
  // In CreatePackageForm.tsx - Update the payload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.title || !formData.slug || !formData.duration || !formData.destination || !formData.price) {
      console.error("Missing required fields");
      setLoading(false);
      return;
    }

    // Prepare the complete payload
    const payload = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      shortDesc: formData.shortDesc,
      duration: formData.duration,
      destination: formData.destination,
      country: formData.country,
      price: formData.price,
      discountPrice: formData.discountPrice || null,
      bookingAmount: formData.bookingAmount,
      gst: formData.gst,
      images: formData.images || [],
      inclusions: formData.inclusions || [],
      exclusions: formData.exclusions || [],
      whatToCarry: formData.whatToCarry || [], // Add this line
      cancellationPolicy: formData.cancellationPolicy || null,
      termsConditions: formData.termsConditions || null,
      additionalInfo: formData.additionalInfo || null,
      totalSeats: formData.totalSeats || null,
      isActive: formData.isActive,
      isOnSale: formData.isOnSale,
      minAge: formData.minAge,
      accommodation: formData.accommodation,
      transportation: formData.transportation,
      meals: formData.meals,
      itinerary: itinerary.length > 0 ? itinerary : null,
      availableDates: availableDates.filter(d => d.startDate && d.endDate),
      pickUpPoints: pickUpPoints,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch("/api/admin/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        throw new Error(data.details || data.error || "Failed to create package");
      }

      // Success
      onSuccess();
    } catch (error) {
      console.error("Error creating package:", error);
      alert(error instanceof Error ? error.message : "Failed to create package");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="relative max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-yellow-500/20">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 rounded-t-2xl border-b border-yellow-500/20 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Create New Tour Package</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

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
                    onBlur={generateSlug}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="4N/5D"
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
                    placeholder="Pattaya-Bangkok"
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
                    onChange={handleChange}
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

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Booking Amount (₹)</label>
                  <input
                    type="number"
                    name="bookingAmount"
                    value={formData.bookingAmount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">GST (%)</label>
                  <input
                    type="number"
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    step="0.1"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isOnSale}
                    onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-gray-300">Mark as On Sale</span>
                </label>
              </div>
            </div>

            {/* Images */}


            {/* Images Section with Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-500/20 pb-2">Images</h3>

              {/* File Upload Input */}
              <div className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('imageUpload')?.click()}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition flex items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Upload Image
                  </button>
                </div>


                {/* Show uploading indicator */}
                {uploading && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent"></div>
                    Uploading image...
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Or enter image URL directly"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400"
                    >
                      Add URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Preview Grid */}
            

              <div className="flex flex-wrap gap-3 mt-4">
                {formData.images.length === 0 && (
                  <p className="text-gray-500 text-sm">No images added yet. Upload or add image URLs above.</p>
                )}
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                      {img ? (
                        <img
                          src={img}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Show a colored div instead of broken image
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                              parent.style.backgroundColor = '#374151';
                              parent.style.display = 'flex';
                              parent.style.alignItems = 'center';
                              parent.style.justifyContent = 'center';
                              parent.innerHTML = '<span style="color: #9CA3AF; font-size: 12px;">Invalid URL</span>';
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-800">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
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


            {/* Itinerary */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-yellow-500/20 pb-2">
                <h3 className="text-lg font-semibold text-yellow-400">Itinerary</h3>
                <button type="button" onClick={addItineraryDay} className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm font-medium">
                  + Add Day
                </button>
              </div>
              {itinerary.map((day, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-white">Day {day.day}</h4>
                    {itinerary.length > 1 && (
                      <button type="button" onClick={() => removeItineraryDay(idx)} className="text-red-400 text-sm">
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateItinerary(idx, "title", e.target.value)}
                    placeholder="Day Title (e.g., Bangkok Arrival – Pattaya Transfer)"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
                  />
                  <textarea
                    value={day.description}
                    onChange={(e) => updateItinerary(idx, "description", e.target.value)}
                    placeholder="Day Description"
                    rows={3}
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
                      <button type="button" onClick={() => addItineraryActivity(idx, newItem)} className="px-2 py-1 bg-yellow-500 text-black rounded text-sm">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {day.activities.map((act, actIdx) => (
                        <span key={actIdx} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300 flex items-center gap-1">
                          {act}
                          <button type="button" onClick={() => removeItineraryActivity(idx, actIdx)} className="text-red-400">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
                <div className="space-y-1">
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
                <div className="space-y-1">
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
              <div className="space-y-1">
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

            {/* Available Dates */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-yellow-500/20 pb-2">
                <h3 className="text-lg font-semibold text-yellow-400">Available Dates</h3>
                <button type="button" onClick={addAvailableDate} className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm font-medium">
                  + Add Date
                </button>
              </div>
              {availableDates.map((date, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <input
                    type="date"
                    value={date.startDate}
                    onChange={(e) => updateAvailableDate(idx, "startDate", e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <input
                    type="date"
                    value={date.endDate}
                    onChange={(e) => updateAvailableDate(idx, "endDate", e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Price"
                      value={date.price}
                      onChange={(e) => updateAvailableDate(idx, "price", parseFloat(e.target.value))}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    {availableDates.length > 1 && (
                      <button type="button" onClick={() => removeAvailableDate(idx)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pick Up Points */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-yellow-500/20 pb-2">
                <h3 className="text-lg font-semibold text-yellow-400">Pick Up Points</h3>
                <button type="button" onClick={addPickUpPoint} className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm font-medium">
                  + Add Location
                </button>
              </div>
              {pickUpPoints.map((point, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <input
                    type="text"
                    value={point.city}
                    onChange={(e) => updatePickUpPoint(idx, "city", e.target.value)}
                    placeholder="City"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={point.airport}
                    onChange={(e) => updatePickUpPoint(idx, "airport", e.target.value)}
                    placeholder="Airport/Location"
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={point.googleMapLink}
                      onChange={(e) => updatePickUpPoint(idx, "googleMapLink", e.target.value)}
                      placeholder="Google Maps Link"
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    {pickUpPoints.length > 1 && (
                      <button type="button" onClick={() => removePickUpPoint(idx)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="sticky bottom-0 bg-gray-900 pt-4 flex justify-end gap-3 border-t border-gray-700">
              <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-semibold hover:from-yellow-300 hover:to-yellow-500 disabled:opacity-50">
                {loading ? "Creating..." : "Create Package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}