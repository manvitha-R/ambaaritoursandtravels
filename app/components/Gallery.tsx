"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Heart, Share2, Maximize2 } from "lucide-react";

// Define types
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  location: string;
  photographer: string;
  height?: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
}

// Sample gallery images (add your actual images here)
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/Images/gallery/travel-1.jpg",
    alt: "Beautiful sunset at Goa beach",
    category: "beach",
    location: "Goa",
    photographer: "Rajesh Kumar"
  },
  {
    id: 2,
    src: "/Images/gallery/travel-2.jpg",
    alt: "Trekking in the Himalayas",
    category: "trekking",
    location: "Himachal Pradesh",
    photographer: "Priya Sharma"
  },
  {
    id: 3,
    src: "/Images/gallery/travel-3.jpg",
    alt: "Kerala backwaters houseboat",
    category: "nature",
    location: "Kerala",
    photographer: "Anand Menon"
  },
  {
    id: 4,
    src: "/Images/gallery/travel-4.jpg",
    alt: "Taj Mahal at sunrise",
    category: "heritage",
    location: "Agra",
    photographer: "Vikram Singh"
  },
  {
    id: 5,
    src: "/Images/gallery/travel-5.jpg",
    alt: "Rajasthan desert safari",
    category: "adventure",
    location: "Jaisalmer",
    photographer: "Deepika Rathore"
  },
  {
    id: 6,
    src: "/Images/gallery/travel-6.jpg",
    alt: "Mysore Palace illumination",
    category: "heritage",
    location: "Mysore",
    photographer: "Karthik N"
  },
  {
    id: 7,
    src: "/Images/gallery/travel-7.jpg",
    alt: "Varanasi Ganga Aarti",
    category: "spiritual",
    location: "Varanasi",
    photographer: "Shubham Mishra"
  },
  {
    id: 8,
    src: "/Images/gallery/travel-8.jpg",
    alt: "Ladakh mountain landscape",
    category: "trekking",
    location: "Ladakh",
    photographer: "Tenzing Norbu"
  },
  {
    id: 9,
    src: "/Images/gallery/travel-9.jpg",
    alt: "Andaman beach paradise",
    category: "beach",
    location: "Andaman",
    photographer: "Meera Krishnan"
  },
  {
    id: 10,
    src: "/Images/gallery/travel-10.jpg",
    alt: "Hampi ruins architecture",
    category: "heritage",
    location: "Hampi",
    photographer: "Arjun Reddy"
  },
  {
    id: 11,
    src: "/Images/gallery/travel-11.jpg",
    alt: "Tea gardens in Munnar",
    category: "nature",
    location: "Munnar",
    photographer: "Lakshmi Nair"
  },
  {
    id: 12,
    src: "/Images/gallery/travel-12.jpg",
    alt: "Rishikesh river rafting",
    category: "adventure",
    location: "Rishikesh",
    photographer: "Aditya Rawat"
  },
  {
    id: 13,
    src: "/Images/gallery/travel-13.jpg",
    alt: "Udaipur city palace",
    category: "heritage",
    location: "Udaipur",
    photographer: "Rajat Mehta"
  },
  {
    id: 14,
    src: "/Images/gallery/travel-14.jpg",
    alt: "Sundarbans mangrove forest",
    category: "nature",
    location: "West Bengal",
    photographer: "Sudipta Das"
  },
  {
    id: 15,
    src: "/Images/gallery/travel-15.jpg",
    alt: "Goa church architecture",
    category: "heritage",
    location: "Goa",
    photographer: "Francis D'Souza"
  },
  {
    id: 16,
    src: "/Images/gallery/travel-16.jpg",
    alt: "Darjeeling toy train",
    category: "heritage",
    location: "Darjeeling",
    photographer: "Pema Sherpa"
  },
  {
    id: 17,
    src: "/Images/gallery/travel-17.jpg",
    alt: "Kutch white desert",
    category: "adventure",
    location: "Gujarat",
    photographer: "Neha Patel"
  },
  {
    id: 18,
    src: "/Images/gallery/travel-18.jpg",
    alt: "Ooty lake view",
    category: "nature",
    location: "Ooty",
    photographer: "Venkatesh R"
  },
  {
    id: 19,
    src: "/Images/gallery/travel-19.jpg",
    alt: "Kaziranga rhino sighting",
    category: "wildlife",
    location: "Assam",
    photographer: "Bikash Saikia"
  },
  {
    id: 20,
    src: "/Images/gallery/travel-20.jpg",
    alt: "Kodaikanal valley view",
    category: "nature",
    location: "Kodaikanal",
    photographer: "Senthil Kumar"
  },
  {
    id: 21,
    src: "/Images/gallery/travel-21.jpg",
    alt: "Gulmarg skiing adventure",
    category: "adventure",
    location: "Kashmir",
    photographer: "Amit Shah"
  },
  {
    id: 22,
    src: "/Images/gallery/travel-22.jpg",
    alt: "Khajuraho temple art",
    category: "heritage",
    location: "Madhya Pradesh",
    photographer: "Rajendra Tiwari"
  },
  {
    id: 23,
    src: "/Images/gallery/travel-23.jpg",
    alt: "Spiti valley monastery",
    category: "spiritual",
    location: "Himachal Pradesh",
    photographer: "Tsering Wangyal"
  },
  {
    id: 24,
    src: "/Images/gallery/travel-24.jpg",
    alt: "Alleppey boat race",
    category: "festival",
    location: "Kerala",
    photographer: "George Mathew"
  }
];

// Categories for filtering
const categories: Category[] = [
  { id: "all", label: "All Photos", icon: "📸" },
  { id: "beach", label: "Beaches", icon: "🏖️" },
  { id: "trekking", label: "Trekking", icon: "⛰️" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "heritage", label: "Heritage", icon: "🏛️" },
  { id: "adventure", label: "Adventure", icon: "🚵" },
  { id: "spiritual", label: "Spiritual", icon: "🕉️" },
  { id: "wildlife", label: "Wildlife", icon: "🐅" },
  { id: "festival", label: "Festivals", icon: "🎉" }
];

// Animation variants with proper Framer Motion types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

const lightboxVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [visibleImages, setVisibleImages] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // Filter images based on category
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const displayedImages = filteredImages.slice(0, visibleImages);
  const hasMore = visibleImages < filteredImages.length;

  // Lazy load more images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleImages(prev => Math.min(prev + 8, filteredImages.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, filteredImages.length]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleImages(12);
  }, [selectedCategory]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: number) => {
    if (!selectedImage) return;
    const currentIndex = displayedImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = (currentIndex + direction + displayedImages.length) % displayedImages.length;
    setSelectedImage(displayedImages[newIndex]);
  };

  const toggleLike = (imageId: number) => {
    setLikedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const downloadImage = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.location}-${image.alt}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            Travel Memories
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore breathtaking moments captured by our travelers across India
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
              {selectedCategory === category.id && (
                <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs">
                  {filteredImages.length}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={galleryRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio: index % 3 === 0 ? 4/3 : 1,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(image)}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold text-lg mb-1">{image.location}</p>
                <p className="text-gray-300 text-sm line-clamp-2">{image.alt}</p>
                <p className="text-yellow-400 text-xs mt-2">📸 {image.photographer}</p>
              </div>

              {/* Top Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(image.id);
                  }}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedImages.includes(image.id)
                        ? "text-red-500 fill-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(image);
                  }}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                  {categories.find(c => c.id === image.category)?.icon} {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading More Indicator */}
        {hasMore && (
          <div ref={observerRef} className="flex justify-center mt-12">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full"
              />
            ) : (
              <p className="text-gray-400">Scroll for more memories ✨</p>
            )}
          </div>
        )}

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-400"
        >
          Showing {displayedImages.length} of {filteredImages.length} memories
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Container */}
              <motion.div
                key={selectedImage.id}
                variants={lightboxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-5xl max-h-[90vh] w-full h-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    className="object-contain max-h-full max-w-full"
                    quality={100}
                    priority
                  />
                </div>

                {/* Image Info */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedImage.location}
                      </h3>
                      <p className="text-gray-300 text-lg mb-1">{selectedImage.alt}</p>
                      <p className="text-yellow-400 text-sm">
                        📸 Photographer: {selectedImage.photographer}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleLike(selectedImage.id)}
                        className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            likedImages.includes(selectedImage.id)
                              ? "text-red-500 fill-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => downloadImage(selectedImage)}
                        className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}