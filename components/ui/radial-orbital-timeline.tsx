"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

// --- 1. The Icon Container (with Scanning Logic) ---
// Renamed from ScannedIcon to IconContainer to fix your build error
export const IconContainer = ({ 
  icon, 
  text, 
  angle, 
  distance, 
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
        initial={{ opacity: 0.4 }}
        animate={{ 
          opacity: [0.4, 1, 0.4], 
          scale: [1, 1.1, 1],
          filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
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
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/80 shadow-2xl backdrop-blur-md">
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

// Also export ScannedIcon as an alias just in case you use both names
export const ScannedIcon = IconContainer;

// --- 2. The Main Radar Component ---
export const Radar = ({ className }: { className?: string }) => {
  const sweepDuration = 6;
  const circles = new Array(8).fill(1);

  return (
    <div className={twMerge("relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-black", className)}>
      
      {/* TASK 2 & 3: Fading Box Boundary */}
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{
          maskImage: "radial-gradient(circle, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 80%)",
        }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

        {/* TASK 1: Integrated Sweep (Line + Trail perfectly overlaid) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: sweepDuration, ease: "linear", repeat: Infinity }}
          className="absolute z-40 h-[80%] w-[80%] pointer-events-none"
        >
          {/* The Trail (Conic Gradient) */}
          <div 
            className="absolute inset-0"
            style={{
              // Aligns the "hot" part of the gradient with the line (90deg offset)
              background: "conic-gradient(from 90deg, transparent 0%, rgba(6, 182, 212, 0.4) 50%, transparent 100%)",
              transform: "rotate(-180deg)", 
            }}
          />
          {/* The Hard Leading Line */}
          <div className="absolute top-1/2 left-1/2 h-[2px] w-1/2 bg-gradient-to-r from-cyan-400 via-cyan-400/40 to-transparent origin-left shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </motion.div>

        {/* Concentric Circles */}
        {circles.map((_, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-neutral-800"
            style={{
              width: `${(idx + 1) * 12}%`,
              height: `${(idx + 1) * 12}%`,
            }}
          />
        ))}

        {/* TASK 4: Icons with Scanned Logic */}
        <IconContainer text="Security" angle={45} distance={30} sweepDuration={sweepDuration} />
        <IconContainer text="Database" angle={160} distance={40} sweepDuration={sweepDuration} />
        <IconContainer text="Cloud" angle={280} distance={25} sweepDuration={sweepDuration} />
        <IconContainer text="Analytics" angle={330} distance={35} sweepDuration={sweepDuration} />

        {/* Center Point */}
        <div className="relative z-50 h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,1)]" />
      </div>
    </div>
  );
};
