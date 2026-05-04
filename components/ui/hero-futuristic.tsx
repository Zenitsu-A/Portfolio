'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

  // The "Adjustment Layer" (Shader)
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTexture: { value: rawMap },
      uDepth: { value: depthMap },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 0 },
      uScanColor: { value: new THREE.Color("#22d3ee") } // Your Cyan
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
      uniform float uTime;
      uniform float uOpacity;
      uniform vec3 uScanColor;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(uTexture, vUv);
        
        // The Scan Line Logic
        float scanPos = sin(uTime * 0.8) * 0.5 + 0.5;
        float scanWidth = 0.02;
        float dist = abs(vUv.y - scanPos);
        float edge = smoothstep(scanWidth, 0.0, dist);
        
        // Add Glow (Like a neon light)
        vec3 finalColor = mix(color.rgb, uScanColor, edge * 0.6);
        
        gl_FragColor = vec4(finalColor, uOpacity);
      }
    `
  }), [rawMap, depthMap]);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    
    // Update Uniforms
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = t;
    material.uniforms.uOpacity.value = THREE.MathUtils.lerp(material.uniforms.uOpacity.value, visible ? 1 : 0, 0.05);
    
    // Smooth Movement
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.15, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.15, 0.1);
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.45, h * 0.45, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial 
        args={[shaderArgs]} 
        transparent={true} 
        depthWrite={false}
      />
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
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-7xl font-title tracking-tighter">
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
        <p className="mt-4 text-xs md:text-sm font-sans text-cyan-400/60 uppercase tracking-[0.4em] animate-pulse">
           Established Production Quality
        </p>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 font-sans text-[9px] tracking-[0.3em] uppercase text-gray-500">
        Discover the craft ↓
      </div>
    </div>
  );
};

export default HeroFuturistic;
