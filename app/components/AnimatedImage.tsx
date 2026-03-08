// components/AnimatedImage.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  hoverScale?: number;
  duration?: number;
  borderRadius?: string;
}

export default function AnimatedImage({
  src,
  alt,
  className = "",
  hoverScale = 1.05,
  duration = 0.5,
  borderRadius = "rounded-xl"
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden ${borderRadius} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.9
      }}
      transition={{ duration }}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.3 }
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}