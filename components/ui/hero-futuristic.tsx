'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP, DEPTHMAP]);
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);
  const [w, h] = useAspect(300, 300);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTexture: { value: rawMap },
      uDepth: { value: depthMap },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uProgress: { value: 0 },
      uOpacity: { value: 0 },
      uColorCyan: { value: new THREE.Color("#22d3ee") },
      uColorPurple: { value: new THREE.Color("#a855f7") }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform sampler2D uDepth;
      uniform vec2 uMouse;
      uniform float uProgress;
      uniform float uOpacity;
      uniform vec3 uColorCyan;
      uniform vec3 uColorPurple;
      varying vec2 vUv;

      void main() {
        // 1. Depth-Based Parallax (The 3D movement effect)
        float depth = texture2D(uDepth, vUv).r;
        vec2 displacedUv = vUv + (uMouse * depth * 0.05);
        
        vec4 color = texture2D(uTexture, displacedUv);
        float displacedDepth = texture2D(uDepth, displacedUv).r;

        // 2. The 3D Scan Line (Contours to the shape using depth)
        // This is what makes it look 3D instead of flat
        float scanWidth = 0.015;
        float scanLine = smoothstep(scanWidth, 0.0, abs(displacedDepth - uProgress));
        
        // 3. Digital "Noise" Grain (for that AI Cinema aesthetic)
        float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
        
        // 4. Combine effects
        vec3 glowColor = mix(uColorCyan, uColorPurple, vUv.y);
        vec3 finalRGB = color.rgb + (glowColor * scanLine * 2.5);
        
        // Subtle scanline pattern
        finalRGB += glowColor * scanLine * noise * 0.5;

        gl_FragColor = vec4(finalRGB, uOpacity);
      }
    `
  }), [rawMap, depthMap]);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const material = meshRef.current.material as THREE.ShaderMaterial;

    // Orchestration: Matching the original scan timing
    material.uniforms.uProgress.value = Math.sin(t * 0.6) * 0.5 + 0.5;
    material.uniforms.uOpacity.value = THREE.MathUtils.lerp(material.uniforms.uOpacity.value, visible ? 1 : 0, 0.05);
    
    // Parallax mouse follow
    material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(material.uniforms.uMouse.value.x, pointer.x, 0.1);
    material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(material.uniforms.uMouse.value.y, pointer.y, 0.1);

    // Subtle float
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.5, h * 0.5, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial args={[shaderArgs]} transparent={true} depthWrite={false} />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const titleWords = 'Motion Graphics & Video Editing'.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 200);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-svh bg-[#121212] overflow-hidden relative w-full">
      {/* Title Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-title tracking-tighter leading-none">
          <span className="flex flex-wrap justify-center gap-x-4 md:gap-x-8">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
                  index < visibleWords ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 blur-sm'
                }`}
                style={{ 
                  transitionDelay: `${index * 0.1}s`,
                  background: 'linear-gradient(to bottom, #fff, #9ca3af)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-8 text-[10px] md:text-xs font-sans text-primary uppercase tracking-[0.6em] animate-pulse">
           Cinema Grade Production
        </p>
      </div>

      {/* 3D Canvas Section */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Modern UI Elements */}
      <div className="absolute bottom-12 left-12 z-30 hidden md:block">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-primary/30" />
          <span className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">Selected Works 2026</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 z-30">
        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-white text-xs">↓</span>
        </div>
      </div>
    </div>
  );
};

export default HeroFuturistic;
