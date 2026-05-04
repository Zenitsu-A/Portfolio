"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-800",
        className
      )}
    />
  );
};

// --- Task 4: The Icon with scanning logic ---
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
  // Sync the ping with the radar rotation
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
          filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: sweepDuration - 0.8,
          delay: delay,
        }}
        className="flex flex-col items-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/90 shadow-2xl backdrop-blur-md">
           <div className="text-cyan-500/50">
            {icon || <div className="h-2 w-2 rounded-full bg-current" />}
           </div>
        </div>
        {text && (
          <span className="mt-2 text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
            {text}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export const Radar = ({ className, children }: { className?: string, children?: React.ReactNode }) => {
  const sweepDuration = 6;
  const circles = new Array(8).fill(1);

  return (
    <div className={twMerge("relative h-[500px] w-full flex items-center justify-center overflow-hidden bg-black", className)}>
      {/* 
          Task 2 & 3: Box Boundary Fade 
          This mask prevents hard edges on circles and the radar line.
      */}
      <div 
        className="relative flex h-full w-full items-center justify-center"
        style={{
          maskImage: "radial-gradient(circle, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 85%)",
        }}
      >
        {/* Background Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

        {/* Task 1: Integrated Sweep (Line + Trail overlaid) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: sweepDuration, ease: "linear", repeat: Infinity }}
          className="absolute z-40 h-[80%] w-[80%] pointer-events-none"
        >
          {/* Light Trail (The Gradient Fan) */}
          <div 
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.4) 50%, transparent 100%)",
              transform: "rotate(-180deg)", // Perfectly aligns trail behind the line
              maskImage: "radial-gradient(circle at center, black, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at center, black, transparent 70%)",
            }}
          />
          {/* Hard Leading Line */}
          <div className="absolute top-1/2 left-1/2 h-[2px] w-1/2 bg-gradient-to-r from-cyan-400 via-cyan-400/50 to-transparent origin-left shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
        </motion.div>

        {/* Concentric Circles */}
        {circles.map((_, idx) => (
          <Circle
            key={idx}
            idx={idx}
            style={{
              width: `${(idx + 1) * 12}%`,
              height: `${(idx + 1) * 12}%`,
            }}
          />
        ))}

        {/* This allows you to drop IconContainers inside <Radar> in your page.tsx */}
        {children}

        {/* Center Point Glow */}
        <div className="relative z-50 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)]" />
      </div>
    </div>
  );
};
