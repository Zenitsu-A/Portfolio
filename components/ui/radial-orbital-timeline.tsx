"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const IconContainer = ({ 
  icon, 
  text, 
  angle = 0, 
  distance = 0, 
  sweepDuration = 6 
}: { 
  icon?: React.ReactNode; 
  text?: string; 
  angle?: number; 
  distance?: number; 
  sweepDuration?: number;
}) => {
  const delay = (angle / 360) * sweepDuration;

  return (
    <div 
      className="absolute z-50 -translate-x-1/2 -translate-y-1/2"
      style={{
        top: `${50 + Math.sin((angle * Math.PI) / 180) * distance}%`,
        left: `${50 + Math.cos((angle * Math.PI) / 180) * distance}%`,
      }}
    >
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ 
          opacity: [0.2, 1, 0.2], 
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: sweepDuration - 0.8,
          delay: delay,
        }}
        className="flex flex-col items-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/90 backdrop-blur-md">
           <div className="text-cyan-500/50">{icon || <div className="h-2 w-2 rounded-full bg-current" />}</div>
        </div>
        {text && <span className="mt-2 text-[10px] font-bold text-neutral-500 uppercase">{text}</span>}
      </motion.div>
    </div>
  );
};

export const Radar = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  const sweepDuration = 6;
  return (
    <div className={twMerge("relative h-[500px] w-full flex items-center justify-center overflow-hidden bg-black", className)}>
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{
          maskImage: "radial-gradient(circle, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 85%)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: sweepDuration, ease: "linear", repeat: Infinity }}
          className="absolute z-40 h-[80%] w-[80%] pointer-events-none"
        >
          <div 
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.4) 50%, transparent 100%)",
              transform: "rotate(-180deg)",
            }}
          />
          <div className="absolute top-1/2 left-1/2 h-[2px] w-1/2 bg-gradient-to-r from-cyan-400 to-transparent origin-left" />
        </motion.div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full border border-neutral-800" style={{ width: `${(i + 1) * 12}%`, height: `${(i + 1) * 12}%` }} />
        ))}
        {children}
      </div>
    </div>
  );
};

// Explicit alias for the build tool
export const ScannedIcon = IconContainer;
// At the bottom of radial-orbital-timeline.tsx
const RadialOrbitalTimeline = () => {
   // ... your existing component logic ...
   return (
     <div> {/* ... your existing JSX ... */} </div>
   );
};

export default RadialOrbitalTimeline;
