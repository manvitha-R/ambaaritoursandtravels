"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Maximize2 } from "lucide-react";
import BackToTop from "../components/BackToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define types
interface GalleryImage {
  id: number;
  src: string;
  location: string;
}

// Sample gallery images - just add your images here
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/Images/gallery/travel-1.jpeg",
    location: "Thailand"
  },
  {
    id: 2,
    src: "/Images/gallery/travel-2.jpeg",
    location: "Thailand"
  },
  {
    id: 3,
    src: "/Images/gallery/travel-3.jpeg",
    location: ""
  },
  {
    id: 4,
    src: "/Images/gallery/travel-4.jpeg",
    location: ""
  },
  {
    id: 5,
    src: "/Images/gallery/travel-5.jpeg",
    location: ""
  },
  {
    id: 6,
    src: "/Images/gallery/travel-6.jpeg",
    location: ""
  },
  {
    id: 7,
    src: "/Images/gallery/travel-7.jpeg",
    location: ""
  },
  {
    id: 8,
    src: "/Images/gallery/travel-8.jpeg",
    location: ""
  },
  {
    id: 9,
    src: "/Images/gallery/travel-9.jpeg",
    location: ""
  },
  {
    id: 10,
    src: "/Images/gallery/travel-10.jpeg",
    location: ""
  },
  {
    id: 11,
    src: "/Images/gallery/travel-11.jpeg",
    location: ""
  },
  {
    id: 12,
    src: "/Images/gallery/travel-12.jpeg",
    location: ""
  },
  {
    id: 13,
    src: "/Images/gallery/travel-13.jpeg",
    location: ""
  },
  {
    id: 14,
    src: "/Images/gallery/travel-14.jpeg",
    location: ""
  },
  {
    id: 15,
    src: "/Images/gallery/travel-15.jpeg",
    location: ""
  },
  {
    id: 16,
    src: "/Images/gallery/travel-16.jpeg",
    location: ""
  },
  {
    id: 17,
    src: "/Images/gallery/travel-17.jpeg",
    location: "Goa Beach"
  },
  {
    id: 18,
    src: "/Images/gallery/travel-18.jpeg",
    location: "Goa Beach"
  },
//   {
//     id: 19,
//     src: "/Images/gallery/travel-19.jpeg",
//     location: "Kaziranga"
//   },
//   {
//     id: 20,
//     src: "/Images/gallery/travel-20.jpeg",
//     location: "Kodaikanal"
//   },
//   {
//     id: 21,
//     src: "/Images/gallery/travel-21.jpeg",
//     location: "Gulmarg"
//   },
//   {
//     id: 22,
//     src: "/Images/gallery/travel-22.jpeg",
//     location: "Khajuraho"
//   },
//   {
//     id: 23,
//     src: "/Images/gallery/travel-23.jpeg",
//     location: "Spiti Valley"
//   },
//   {
//     id: 24,
//     src: "/Images/gallery/travel-24.jpeg",
//     location: "Alleppey"
//   }
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

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [visibleImages, setVisibleImages] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const displayedImages = galleryImages.slice(0, visibleImages);
  const hasMore = visibleImages < galleryImages.length;

  // Lazy load more images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleImages(prev => Math.min(prev + 8, galleryImages.length));
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
  }, [hasMore, isLoading]);

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

        {/* Gallery Grid */}
        <motion.div
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
                  alt={image.location}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
          Showing {displayedImages.length} of {galleryImages.length} photos
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
                    alt={selectedImage.location}
                    width={1200}
                    height={800}
                    className="object-contain max-h-full max-w-full"
                    quality={100}
                    priority
                  />
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