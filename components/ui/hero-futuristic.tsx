'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png';
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp';

const Scene = ({ scaleFactor }: { scaleFactor: number }) => {
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
        float depth = texture2D(uDepth, vUv).r;
        vec2 displacedUv = vUv + (uMouse * depth * 0.04);
        vec4 color = texture2D(uTexture, displacedUv);
        float displacedDepth = texture2D(uDepth, displacedUv).r;

        float scanWidth = 0.04;
        float scanLine = smoothstep(scanWidth, 0.0, abs(displacedDepth - uProgress));
        
        float distFromCenter = distance(vUv, vec2(0.5));
        float edgeMask = smoothstep(0.5, 0.3, distFromCenter);
        
        vec3 glowColor = mix(uColorCyan, uColorPurple, displacedDepth);
        vec3 finalRGB = color.rgb + (glowColor * scanLine * 1.2);

        gl_FragColor = vec4(finalRGB, uOpacity * edgeMask);
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
    material.uniforms.uProgress.value = Math.sin(t * 0.4) * 0.5 + 0.5;
    material.uniforms.uOpacity.value = THREE.MathUtils.lerp(material.uniforms.uOpacity.value, visible ? 1 : 0, 0.05);
    material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(material.uniforms.uMouse.value.x, pointer.x, 0.08);
    material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(material.uniforms.uMouse.value.y, pointer.y, 0.08);
  });

  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]}>
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
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 180);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-svh bg-[#000000] overflow-hidden relative w-full">
      {/* BRANDING */}
      <div className="absolute top-10 left-10 z-50">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.6em] text-white/80">
          Ahmed Salah <span className="text-primary">/</span> Portfolio
        </span>
      </div>

      {/* HERO TEXT: Positioned lower and with Cyan Rim Light */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end items-center text-center pb-32 px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-title tracking-tighter leading-none text-white">
          <span className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
                  index < visibleWords ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
                style={{ 
                  transitionDelay: `${index * 0.08}s`,
                  // The "Cyan Rim Light" Effect
                  textShadow: '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.1)'
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>
        
        <p className={`mt-6 text-[9px] md:text-xs font-sans text-white uppercase tracking-[0.8em] transition-all duration-1000 delay-700 ${visibleWords === titleWords.length ? 'opacity-50 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           Clinical-Cinematic Production
        </p>
      </div>

      {/* 3D CANVAS: Shape size reduced further for dominance of text */}
      <div className="absolute inset-0 z-10 bg-black">
        <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
          <Suspense fallback={null}>
            <Scene scaleFactor={0.35} /> 
          </Suspense>
        </Canvas>
      </div>

      {/* TRIM SCROLL */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
        <span className="text-[8px] font-sans text-gray-600 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-12 h-[1px] bg-white/10" />
      </div>
    </div>
  );
};

export default HeroFuturistic;
