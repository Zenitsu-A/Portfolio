"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

// --- 1. The Scanned Icon Component ---
// This icon "pings" based on its position (angle) relative to the sweep duration
export const ScannedIcon = ({ 
  icon, 
  text, 
  angle, 
  distance, 
  sweepDuration = 6 
}: { 
  icon?: React.ReactNode; 
  text: string; 
  angle: number; // 0 to 360
  distance: number; // percentage from center
  sweepDuration?: number;
}) => {
  // Calculate delay so the ping happens exactly when the line passes
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
        initial={{ opacity: 0.4, scale: 1 }}
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
           <div className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
            {icon || <div className="h-4 w-4 rounded-full bg-current" />}
           </div>
        </div>
        <span className="mt-2 text-[10px] font-bold tracking-tighter text-neutral-500 uppercase">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

// --- 2. The Main Radar Component ---
export const Radar = () => {
  const sweepDuration = 6;
  const circles = new Array(6).fill(1);

  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-black">
      
      {/* 
          TASK 2 & 3: Fading Box Boundary 
          We use a radial mask so the lines/circles fade out before hitting the edge 
      */}
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{
          maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)",
        }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />

        {/* TASK 1: Integrated Sweep (Line + Trail) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: sweepDuration, ease: "linear", repeat: Infinity }}
          className="absolute z-40 h-[80%] w-[80%] pointer-events-none"
        >
          {/* The Trail (Conic Gradient) */}
          <div 
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)",
              transform: "rotate(-180deg)", // Syncs the tail to the line
              maskImage: "radial-gradient(circle at center, black, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at center, black, transparent 70%)",
            }}
          />
          {/* The Hard Leading Line */}
          <div className="absolute top-1/2 left-1/2 h-[1px] w-1/2 bg-gradient-to-r from-cyan-400 to-transparent origin-left shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </motion.div>

        {/* Concentric Circles */}
        {circles.map((_, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-neutral-800"
            style={{
              width: `${(idx + 1) * 15}%`,
              height: `${(idx + 1) * 15}%`,
            }}
          />
        ))}

        {/* --- TASK 4: Icons with Scanned Logic --- */}
        <ScannedIcon text="Security" angle={45} distance={30} sweepDuration={sweepDuration} />
        <ScannedIcon text="Database" angle={160} distance={40} sweepDuration={sweepDuration} />
        <ScannedIcon text="Cloud" angle={280} distance={25} sweepDuration={sweepDuration} />
        <ScannedIcon text="Analytics" angle={330} distance={35} sweepDuration={sweepDuration} />

        {/* Center Point */}
        <div className="relative z-50 h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,1)]" />
      </div>
    </div>
  );
};
