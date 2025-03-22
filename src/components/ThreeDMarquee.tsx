"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreeDMarqueeProps {
  images: string[];
}

export const ThreeDMarquee = ({ images }: ThreeDMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback images if any of the provided ones fail to load
  const fallbackImages = [
    "https://th.bing.com/th/id/OIP.LKZGtfAG5cEGGqlUgY8Q-QHaEx?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.x-Q5LhRW1k0agDwNhz6QHQHaD4?w=600&h=315&rs=1&pid=ImgDetMain",
    "https://www.financewhile.com/wp-content/uploads/2023/04/AI-and-forex-trading-in-UAE-opportunities-and-challenges.jpg",
    "https://th.bing.com/th/id/OIP.lCmlAkMKV0v-_I6KZtimGQHaEL?rs=1&pid=ImgDetMain"
  ];

  // Handle image rotation
  useEffect(() => {
    // Auto-rotate through images
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 4 seconds interval for better viewing
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [images.length]);

  // Handle 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !marqueeRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate mouse position relative to center of container
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation angles based on mouse position
      const rotateY = (mouseX / width) * 6; // max 6 degrees
      const rotateX = -(mouseY / height) * 6; // max 6 degrees
      
      // Apply the transform
      marqueeRef.current.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    const fallbackIndex = currentIndex % fallbackImages.length;
    img.src = fallbackImages[fallbackIndex];
  };

  // Handle image load success
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden rounded-xl"
    >
      <div 
        ref={marqueeRef}
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
            >
              <img 
                src={images[currentIndex]}
                alt={`Dashboard preview ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-xl"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
              
              {/* Subtle white glare on top */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-xl"></div>
              
              {/* Corner glare */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-white/15 to-transparent rounded-tr-xl"></div>
              
              {/* Interface elements */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-t-xl"></div>
              
              {/* Image number indicator */}
              <div className="absolute top-2 right-3 px-2 py-1 bg-black/30 rounded text-xs text-white/90 backdrop-blur-sm">
                {currentIndex + 1}/{images.length}
              </div>
              
              {/* Button */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-blue-500/70 rounded-md text-xs text-white/80 backdrop-blur-sm">
                View Details
              </div>
              
              {/* Card border */}
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}; 