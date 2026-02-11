"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function DraggableCard({ children, rotate = 0, className = "", constraintsRef, style = {}, floatDelay = 0 }) {
  // Random float parameters for natural movement
  const floatParams = useMemo(() => ({
    duration: 3 + Math.random() * 2,
    yRange: 5 + Math.random() * 6,
    xRange: 2 + Math.random() * 4,
    rotateRange: 1 + Math.random() * 2,
  }), []);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.08, zIndex: 50 }}
      initial={{ 
        rotate, 
        y: -400, 
        opacity: 0 
      }}
      animate={{ 
        rotate: [rotate, rotate + floatParams.rotateRange, rotate - floatParams.rotateRange, rotate],
        y: [0, -floatParams.yRange, 0, floatParams.yRange * 0.5, 0],
        x: [0, floatParams.xRange, 0, -floatParams.xRange, 0],
        opacity: 1,
      }}
      transition={{
        y: {
          duration: floatParams.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay + 1.2,
        },
        x: {
          duration: floatParams.duration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay + 1.5,
        },
        rotate: {
          duration: floatParams.duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay + 1.2,
        },
        opacity: {
          duration: 0.4,
          delay: floatDelay * 0.15,
        },
        // Gravity drop effect - falls down with bounce
        default: {
          type: "spring",
          stiffness: 60,
          damping: 8,
          mass: 1.5,
          delay: floatDelay * 0.15,
        }
      }}
      style={style}
      className={`absolute cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {children}
    </motion.div>
  );
}
