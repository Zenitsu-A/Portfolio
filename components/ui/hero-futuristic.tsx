'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

// Optimization: Preload textures to start the download immediately
useTexture.preload(TEXTUREMAP.src);
useTexture.preload(DEPTHMAP.src);

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    
    // FIX: Changed red overlay to Cyan (0.13, 0.82, 0.93)
    const scanOverlay = vec3(0.13, 0.82, 0.93).mul(oneMinus(scanLine)).mul(0.3);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, scanOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;
    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap.r;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // FIX: Changed red mask to Cyan/Purple glow
    const mask = dot.mul(flow).mul(vec3(1.3, 5.0, 9.3)); 

    const final = blendScreen(tMap, mask);
    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    if (meshRef.current?.material) {
      const mat = meshRef.current.material as any;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.4, h * 0.4, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

export const HeroFuturistic = () => {
  const titleWords = 'AHMED SALAH PRODUCTION'.split(' ');
  const subtitle = 'Quality content creation with 100% client satisfaction.';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    // ENHANCEMENT: Speed up text appearance (from 600ms down to 250ms)
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 250);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-svh bg-[#121212] overflow-hidden relative">
      <div className="h-svh uppercase items-center w-full absolute z-[60] pointer-events-none px-10 flex justify-center flex-col text-center">
        
        <div className="text-4xl md:text-6xl xl:text-8xl font-title tracking-tighter">
          <div className="flex flex-wrap justify-center gap-x-3 lg:gap-x-6 overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? 'fade-in' : 'opacity-0'}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm md:text-xl xl:text-2xl mt-6 overflow-hidden text-gray-400 font-sans tracking-widest max-w-2xl">
          <div className={subtitleVisible ? 'fade-in-subtitle' : 'opacity-0'}>
            {subtitle}
          </div>
        </div>
      </div>

      <button className="explore-btn font-sans z-[70]" style={{ animationDelay: '1.5s' }}>
        Scroll to explore
        <span className="ml-2">↓</span>
      </button>

      {/* ENHANCEMENT: Added Suspense and fallback to prevent blank screen during load */}
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-primary font-sans">Loading Cinema...</div>}>
        <Canvas flat gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }}
        >
          <PostProcessing strength={0.8} threshold={0.9} />
          <Scene />
        </Canvas>
      </Suspense>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-subtitle { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fade-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .fade-in-subtitle { animation: fade-in-subtitle 1s ease-out forwards; }
        
        .explore-btn {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.3);
          color: #22d3ee;
          padding: 10px 24px;
          border-radius: 100px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }
        .explore-btn:hover {
            background: rgba(34, 211, 238, 0.2);
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
};

export default HeroFuturistic;
