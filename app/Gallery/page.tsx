"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Maximize2, Play } from "lucide-react";
import BackToTop from "../components/BackToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define types
interface GalleryImage {
  id: number;
  src: string;
  location: string;
  type?: "image" | "video";
}

// Gallery photos (and videos), grouped by destination.
//
// To add more photos for an existing destination (e.g. more Thailand shots),
// just append a new entry below with a unique `id` and the same `location`
// string — it'll automatically show up under that destination's filter tab.
// To add a brand-new destination (e.g. "Puri"), do the same with a new
// `location` name; a tab for it appears automatically, no other code needed.
// To add a video, set `type: "video"` — it plays inline (in its destination's
// grid and the lightbox) and also automatically appears in the standalone
// "Videos" section further down the page.
const galleryImages: GalleryImage[] = [
  { id: 52, src: "/videos/thailand-review-video.mp4", location: "Thailand", type: "video" },
 
  // { id: 2, src: "/Images/gallery/travel-2.jpeg", location: "Thailand" },
  { id: 19, src: "/Images/gallery/travel-19.jpeg", location: "Thailand" },
  { id: 20, src: "/Images/gallery/travel-20.jpeg", location: "Thailand" },
  { id: 21, src: "/Images/gallery/travel-21.jpeg", location: "Thailand" },
  { id: 22, src: "/Images/gallery/travel-22.jpeg", location: "Thailand" },
  { id: 16, src: "/Images/gallery/travel-16.jpeg", location: "Thailand" },
  //  { id: 16, src: "/Images/gallery/travel-16.jpeg", location: "Thailand" },
{ id: 38, src: "/Images/gallery/35.png", location: "Thailand" },
{ id: 39, src: "/Images/gallery/36.png", location: "Thailand" },
{ id: 40, src: "/Images/gallery/40.png", location: "Thailand" },
{ id: 41, src: "/Images/gallery/41.png", location: "Thailand" },
{ id: 42, src: "/Images/gallery/42.png", location: "Thailand" },
{ id: 43, src: "/Images/gallery/43.png", location: "Thailand" },
{ id: 44, src: "/Images/gallery/44.png", location: "Thailand" },
{ id: 45, src: "/Images/gallery/45.png", location: "Thailand" },
{ id: 46, src: "/Images/gallery/46.png", location: "Thailand" },
{ id: 47, src: "/Images/gallery/47.png", location: "Thailand" },
{ id: 48, src: "/Images/gallery/48.png", location: "Thailand" },
{ id: 49, src: "/Images/gallery/49.png", location: "Thailand" },
{ id: 50, src: "/Images/gallery/53.png", location: "Thailand" },
{ id: 51, src: "/Images/gallery/54.png", location: "Thailand" },


  { id: 53, src: "/videos/malaysia-review.mp4", location: "Malaysia", type: "video" },
  // { id: 3, src: "/Images/gallery/travel-3.jpeg", location: "Malaysia" },
  { id: 4, src: "/Images/gallery/travel-4.jpeg", location: "Malaysia" },
  { id: 5, src: "/Images/gallery/travel-5.jpeg", location: "Malaysia" },
  { id: 6, src: "/Images/gallery/travel-6.jpeg", location: "Malaysia" },
  { id: 7, src: "/Images/gallery/travel-7.jpeg", location: "Malaysia" },
  { id: 8, src: "/Images/gallery/travel-8.jpeg", location: "Malaysia" },
  { id: 9, src: "/Images/gallery/travel-9.jpeg", location: "Malaysia" },
  { id: 10, src: "/Images/gallery/travel-10.jpeg", location: "Malaysia" },
  { id: 11, src: "/Images/gallery/travel-11.jpeg", location: "Malaysia" },
  { id: 12, src: "/Images/gallery/travel-12.jpeg", location: "Malaysia" },
  { id: 13, src: "/Images/gallery/travel-13.jpeg", location: "Malaysia" },
  { id: 14, src: "/Images/gallery/travel-14.jpeg", location: "Malaysia" },
  { id: 15, src: "/Images/gallery/travel-15.jpeg", location: "Malaysia" },
  { id: 31, src: "/Images/gallery/10.png", location: "Malaysia" },
  { id: 32, src: "/Images/gallery/13.png", location: "Malaysia" },
  { id: 33, src: "/Images/gallery/14.png", location: "Malaysia" },
  { id: 34, src: "/Images/gallery/15(1).png", location: "Malaysia" },
  { id: 35, src: "/Images/gallery/18.png", location: "Malaysia" },
  { id: 36, src: "/Images/gallery/19.png", location: "Malaysia" },
  { id: 37, src: "/Images/gallery/21.png", location: "Malaysia" },
  
   { id: 1, src: "/Images/gallery/travel-1.jpeg", location: "Malaysia" },

  { id: 17, src: "/Images/gallery/travel-17.jpeg", location: "Goa" },
  { id: 18, src: "/Images/gallery/travel-18.jpeg", location: "Goa" },


  { id: 54, src: "/videos/puri-review.mp4", location: "Puri", type: "video" },
  { id: 55, src: "/videos/puri-review-2.mp4", location: "Puri", type: "video" },
  {id: 23, src: "/Images/gallery/24.png", location: "Puri"},
  {id: 24, src: "/Images/gallery/25.png", location: "Puri"},
  {id: 25, src: "/Images/gallery/26.png", location: "Puri"},
  {id: 26, src: "/Images/gallery/27.png", location: "Puri"},
  {id: 27, src: "/Images/gallery/28.png", location: "Puri"},
  {id: 28, src: "/Images/gallery/29.png", location: "Puri"},
  {id: 29, src: "/Images/gallery/30.png", location: "Puri"},
  {id: 30, src: "/Images/gallery/31.png", location: "Puri"},
];

// Animation variants
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

// Unique destinations, in the order each first appears, with a photo count
// for the tab label — derived from the data above so a new `location` value
// automatically gets its own tab with no other code changes needed.
const destinations = Array.from(new Set(galleryImages.map((img) => img.location))).map(
  (name) => ({ name, count: galleryImages.filter((img) => img.location === name).length })
);

// Every video, regardless of destination, also gets its own standalone section.
const galleryVideos = galleryImages.filter((img) => img.type === "video");

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [activeDestination, setActiveDestination] = useState<string>("All");
  const [visibleImages, setVisibleImages] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const filteredImages =
    activeDestination === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.location === activeDestination);

  const displayedImages = filteredImages.slice(0, visibleImages);
  const hasMore = visibleImages < filteredImages.length;

  const selectDestination = (name: string) => {
    setActiveDestination(name);
    setVisibleImages(12); // reset pagination whenever the filter changes
  };

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

  return (
    <>
    <Navbar/>
    <section className="py-20 pt-34 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            Photo Gallery
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Beautiful moments captured across India
          </p>
        </motion.div>

        {/* Videos Section — every item with type: "video" in galleryImages, regardless of destination */}
        {galleryVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-14"
          >
            <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <Play className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Videos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryVideos.map((video) => (
                <div
                  key={video.id}
                  className="group relative aspect-video overflow-hidden rounded-2xl cursor-pointer border border-gray-800"
                  onClick={() => handleImageClick(video)}
                >
                  <video
                    src={video.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-semibold text-sm">{video.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Destination Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={() => selectDestination("All")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
              activeDestination === "All"
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-transparent shadow-lg shadow-yellow-500/30"
                : "bg-white/5 text-gray-300 border-gray-700 hover:border-yellow-500/50 hover:text-yellow-400"
            }`}
          >
            All ({galleryImages.length})
          </button>
          {destinations.map((dest) => (
            <button
              key={dest.name}
              onClick={() => selectDestination(dest.name)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeDestination === dest.name
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-transparent shadow-lg shadow-yellow-500/30"
                  : "bg-white/5 text-gray-300 border-gray-700 hover:border-yellow-500/50 hover:text-yellow-400"
              }`}
            >
              {dest.name} ({dest.count})
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          key={activeDestination}
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
              {/* Image or video thumbnail */}
              <div className="absolute inset-0">
                {image.type === "video" ? (
                  <video
                    src={image.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.location}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Play Badge for videos */}
              {image.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Location Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold text-lg">{image.location}</p>
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
              <p className="text-gray-400 animate-pulse">Scroll for more photos ✨</p>
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
          Showing {displayedImages.length} of {filteredImages.length} photos
          {activeDestination !== "All" && <> from {activeDestination}</>}
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
                  {selectedImage.type === "video" ? (
                    <video
                      src={selectedImage.src}
                      className="max-h-full max-w-full"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.location}
                      width={1200}
                      height={800}
                      className="object-contain max-h-full max-w-full"
                      quality={100}
                      priority
                    />
                  )}
                </div>

                {/* Location Info */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {selectedImage.location}
                    </h3>
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
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    <BackToTop/>
    <Footer/>
    </>
  );
}