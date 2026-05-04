"use client";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, children, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: idx * 0.1, 
        duration: 0.8,
        ease: "easeOut" 
      }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-neutral-500/20",
        className
      )}
    >
      {/* Subtle pulse for each ring */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, delay: idx * 0.2 }}
        className="absolute inset-0 rounded-full border border-cyan-500/10"
      />
    </motion.div>
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);

  return (
    <div
      className={twMerge(
        "relative flex h-[500px] w-[500px] items-center justify-center rounded-full",
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full" />

      {/* Radar Sweep Effect */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ 
            transformOrigin: "center center",
            width: "100%",
            height: "100%"
        }}
        className="absolute z-40 flex items-center justify-center pointer-events-none"
      >
        {/* The "Fan" / Conic Gradient Sweep */}
        <div 
          className="relative h-1/2 w-1/2" 
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)",
            maskImage: "radial-gradient(circle at bottom right, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at bottom right, black, transparent 80%)",
            top: "-25%",
            left: "-25%",
            transform: "rotate(-90deg)"
          }}
        />
        
        {/* The Leading Edge Line */}
        <div className="absolute top-1/2 left-1/2 h-[1px] w-1/2 bg-gradient-to-r from-cyan-500/50 to-transparent origin-left" />
      </motion.div>

      {/* Grid Dots for Texture */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]">
        <div className="h-full w-full bg-[radial-gradient(#2e2e2e_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      </div>

      {/* Concentric Circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 12.5}%`,
            width: `${(idx + 1) * 12.5}%`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}

      {/* Center Blip */}
      <div className="relative z-50 h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]">
        <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-cyan-400"
        />
      </div>
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
  className
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay ?? 0 }}
      className={twMerge("relative z-50 flex flex-col items-center justify-center", className)}
    >
      <div className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl backdrop-blur-sm transition-colors hover:border-cyan-500/50">
        {/* Inner Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10 text-neutral-400 group-hover:text-cyan-400 transition-colors">
            {icon || (
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            )}
        </div>
      </div>
      
      {text && (
        <div className="mt-3 rounded-full bg-neutral-900/80 border border-white/5 px-3 py-1 backdrop-blur-md">
          <span className="block text-[10px] font-medium tracking-widest text-neutral-400 uppercase">
            {text}
          </span>
        </div>
      )}
    </motion.div>
  );
};
