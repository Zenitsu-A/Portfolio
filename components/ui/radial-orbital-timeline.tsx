@@ -1,120 +1,146 @@
"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

// --- The Icon with "Scanned" logic ---
export const IconContainer = ({ 
  icon, 
  text, 
  angle = 0, 
  distance = 0, 
  sweepDuration = 6 
}: { 
  icon?: React.ReactNode; 
  text: string; 
  angle: number; 
  distance: number; 
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
          filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: sweepDuration - 0.8,
          delay: delay,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/90 shadow-2xl backdrop-blur-md">
           <div className="text-cyan-500/50">
            {icon || <div className="h-2 w-2 rounded-full bg-current" />}
           </div>
        </div>
        <span className="mt-2 text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
          {text}
        </span>
      </motion.div>
    </div>
    );
};

// Alias so both names work
export const ScannedIcon = IconContainer;

export const Radar = ({ className }: { className?: string }) => {
  const sweepDuration = 6;
  const circles = new Array(8).fill(1);

  return (
    <div className={twMerge("relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-black", className)}>
      {/* Box Boundary Fade Mask */}
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{
          maskImage: "radial-gradient(circle, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 80%)",
           }}
        >
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

        {/* Overlayed Sweep (Line + Trail) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: sweepDuration, ease: "linear", repeat: Infinity }}
          className="absolute z-40 h-[80%] w-[80%] pointer-events-none"
        >
          <div 
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 90deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)",
              transform: "rotate(-180deg)", 
            }}
          />
          <div className="absolute top-1/2 left-1/2 h-[2px] w-1/2 bg-gradient-to-r from-cyan-400 to-transparent origin-left" />
        </motion.div>
        
        {circles.map((_, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-neutral-800"
            style={{ width: `${(idx + 1) * 12}%`, height: `${(idx + 1) * 12}%` }}
          />
        ))}
        
        {/* Example Icons - Ensure props are passed in page.tsx as well */}
        <IconContainer text="Security" angle={45} distance={30} sweepDuration={sweepDuration} />
        <IconContainer text="Database" angle={160} distance={40} sweepDuration={sweepDuration} />
        
        <div className="relative z-50 h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,1)]" />
        </div>
    </div>
  );
};

// 1. Find the main function/const for your timeline
const RadialOrbitalTimeline = () => {
  return (
    // your component JSX
     );};// 2. ADD THIS LINE:export default RadialOrbitalTimeline;
