"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  width?: string | number;
  className?: string;
}

export const AnimatedTooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 200,
  width = 'auto',
  className = ''
}: AnimatedTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const positions = {
    top: { y: -10, originY: 1 },
    bottom: { y: 10, originY: 0 },
    left: { x: -10, originX: 1 },
    right: { x: 10, originX: 0 }
  };
  
  const positionStyles = positions[position] || positions.top;
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.85,
              ...positionStyles,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: position === 'top' ? -5 : (position === 'bottom' ? 5 : 0),
              x: position === 'left' ? -5 : (position === 'right' ? 5 : 0)
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.85,
              transition: { duration: 0.15 }
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: delay / 1000
            }}
            style={{ 
              transformOrigin: position === 'top' ? 'bottom center' : 
                              (position === 'bottom' ? 'top center' : 
                              (position === 'left' ? 'right center' : 'left center'))
            }}
            className={`absolute z-50 ${
              position === 'top' ? 'bottom-full mb-2' : 
              position === 'bottom' ? 'top-full mt-2' : 
              position === 'left' ? 'right-full mr-2' : 
              'left-full ml-2'
            } ${className}`}
          >
            <div 
              className="bg-gray-900 text-white text-sm rounded-md px-3 py-2 shadow-lg backdrop-blur-sm border border-gray-800"
              style={{ width }}
            >
              {content}
              <div className={`absolute w-2 h-2 bg-gray-900 border-gray-800 transform rotate-45 ${
                position === 'top' ? 'bottom-0 -mb-1 left-1/2 -translate-x-1/2 border-b border-r' : 
                position === 'bottom' ? 'top-0 -mt-1 left-1/2 -translate-x-1/2 border-t border-l' : 
                position === 'left' ? 'right-0 -mr-1 top-1/2 -translate-y-1/2 border-t border-r' : 
                'left-0 -ml-1 top-1/2 -translate-y-1/2 border-b border-l'
              }`}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Keep both exports to maintain compatibility with both import styles
export default AnimatedTooltip;