"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GlowingEffect } from "./GlowingEffect";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [rotations, setRotations] = useState<number[]>([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Generate fixed rotation values on client side only
  useEffect(() => {
    setIsClient(true);
    const newRotations = Array(testimonials.length).fill(0).map(() => 
      Math.floor(Math.random() * 21) - 10
    );
    setRotations(newRotations);
  }, [testimonials.length]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && isClient) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isClient]);

  // Safe rotation getter that only returns rotations on client
  const getRotation = (index: number) => {
    if (!isClient) return 0;
    return rotations[index] || 0;
  };
  
  const handleMouseEnter = (index: number) => {
    setHoveredCardIndex(index);
  };
  
  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-6xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            {isClient && (
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: getRotation(index),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : getRotation(index),
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: getRotation(index),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                      {/* Glowing effect */}
                      <GlowingEffect 
                        disabled={!isActive(index) || hoveredCardIndex !== index}
                        glow={true}
                        blur={0}
                        spread={30}
                        borderWidth={1.5}
                        variant="default"
                        movementDuration={1.2}
                      />
                      
                      <div className="absolute inset-0 rounded-3xl bg-[#0c0c14]/90 backdrop-blur-sm"></div>
                      <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
                      
                      {/* User image */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img 
                            src={testimonial.src}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="absolute top-36 left-1/2 transform -translate-x-1/2 flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            {!isClient && (
              // Simple placeholder during server rendering
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                <div className="absolute inset-0 rounded-3xl bg-[#0c0c14]/90 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
                
                {/* User image */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={testimonials[0].src}
                      alt={testimonials[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Rating */}
                <div className="absolute top-36 left-1/2 transform -translate-x-1/2 flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            {isClient && (
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="relative rounded-xl overflow-hidden p-6 bg-gradient-to-br from-blue-600/5 to-purple-600/5"
                onMouseEnter={() => handleMouseEnter(-1)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Glowing effect for the text content box */}
                <GlowingEffect 
                  disabled={hoveredCardIndex !== -1}
                  glow={true}
                  blur={0}
                  spread={35}
                  borderWidth={1}
                  variant="default"
                  movementDuration={1.5}
                />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm text-blue-400">
                    {testimonials[active].designation}
                  </p>
                  <motion.p className="mt-8 text-lg text-gray-300">
                    {testimonials[active].quote.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </div>
              </motion.div>
            )}
            {!isClient && (
              <div className="relative rounded-xl overflow-hidden p-6 bg-gradient-to-br from-blue-600/5 to-purple-600/5">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white">
                    {testimonials[0].name}
                  </h3>
                  <p className="text-sm text-blue-400">
                    {testimonials[0].designation}
                  </p>
                  <p className="mt-8 text-lg text-gray-300">
                    {testimonials[0].quote}
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 