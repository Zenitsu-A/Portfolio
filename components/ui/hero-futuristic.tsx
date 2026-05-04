'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three'; // Standard import for compatibility
import { Mesh } from 'three';

// We'll use standard Three.js math for better stability
const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

const Scene = () => {
  // Load textures
  const [rawMap, depthMap] = useTexture([TEXTUREMAP, DEPTHMAP]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);
  
  // Calculate size based on screen aspect ratio
  const [w, h] = useAspect(300, 300);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  // The Animation Logic (The "Move")
  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    
    const t = clock.getElapsedTime();
    // Smoothly follow the mouse
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.1, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.1, 0.1);
    
    // Subtle breathing animation
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;

    // Fade in when ready
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.5, h * 0.5, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial 
        map={rawMap} 
        transparent={true} 
        opacity={0} 
        depthWrite={false}
      />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const titleWords = 'Motion Graphics & Video Editing'.split(' ');
  const subtitle = 'Quality content creation with 100% client satisfaction.';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 200);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-svh bg-[#121212] overflow-hidden relative w-full">
      {/* Overlay Text */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-title tracking-tighter mb-4">
          <span className="flex flex-wrap justify-center gap-x-4">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-700 ${index < visibleWords ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        <p className={`text-sm md:text-xl font-sans text-gray-400 tracking-widest transition-opacity duration-1000 ${subtitleVisible ? 'opacity-100' : 'opacity-0'}`}>
          {subtitle}
        </p>
      </div>

      {/* 3D Canvas Section */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-50 font-sans text-[10px] tracking-[0.2em] uppercase text-primary animate-pulse">
        Scroll to Explore ↓
      </div>
    </div>
  );
};

export default HeroFuturistic;
