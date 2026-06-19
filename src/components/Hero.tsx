/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Award, ArrowRight, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { playLuxuryChime } from '../utils/audio';

interface GemColor {
  name: string;
  hex: string;
  colorValue: string;
  transmission: number;
  roughness: number;
}

const GEM_COLORS: GemColor[] = [
  { name: 'Flawless White', hex: '#FFFFFF', colorValue: '#ffffff', transmission: 0.95, roughness: 0.05 },
  { name: 'Argyle Pink', hex: '#FFB7C5', colorValue: '#ffccd5', transmission: 0.90, roughness: 0.08 },
  { name: 'Royal Sapphire', hex: '#002FA7', colorValue: '#0033aa', transmission: 0.82, roughness: 0.06 },
  { name: 'Zambian Emerald', hex: '#00A86B', colorValue: '#008855', transmission: 0.80, roughness: 0.07 },
  { name: 'Canary Yellow', hex: '#FFD700', colorValue: '#ffdd22', transmission: 0.92, roughness: 0.05 },
];

interface GemCut {
  id: string;
  name: string;
  radialSegments: number;
  scaleX: number;
  scaleZ: number;
  topRadius: number;
  heightCrown: number;
  heightPavilion: number;
}

const GEM_CUTS: GemCut[] = [
  { id: 'round', name: 'Round Brilliant', radialSegments: 16, scaleX: 1, scaleZ: 1, topRadius: 0.58, heightCrown: 0.35, heightPavilion: 0.85 },
  { id: 'princess', name: 'Princess (Square)', radialSegments: 4, scaleX: 1, scaleZ: 1, topRadius: 0.60, heightCrown: 0.40, heightPavilion: 0.80 },
  { id: 'emerald', name: 'Emerald Cut', radialSegments: 8, scaleX: 1.4, scaleZ: 0.9, topRadius: 0.65, heightCrown: 0.35, heightPavilion: 0.75 },
  { id: 'marquise', name: 'Marquise Eye', radialSegments: 12, scaleX: 1.8, scaleZ: 0.6, topRadius: 0.45, heightCrown: 0.38, heightPavilion: 0.82 },
  { id: 'pear', name: 'Pear Teardrop', radialSegments: 14, scaleX: 1.3, scaleZ: 1.0, topRadius: 0.50, heightCrown: 0.38, heightPavilion: 0.85 },
];

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D parameters state
  const [selectedCut, setSelectedCut] = useState<GemCut>(GEM_CUTS[0]);
  const [selectedColor, setSelectedColor] = useState<GemColor>(GEM_COLORS[0]);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.25);
  const [isSparkling, setIsSparkling] = useState<boolean>(false);

  // Three.js References
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const diamondGroupRef = useRef<THREE.Group | null>(null);

  // Drag interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const handleAction = (sectionId: string) => {
    playLuxuryChime('sparkle');
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInteractionChime = () => {
    setIsSparkling(true);
    playLuxuryChime('sparkle');
    setTimeout(() => setIsSparkling(false), 800);
  };

  // Re-generate Diamond Geometries and Materials whenever state changes
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Dark layout slate
    scene.background = null; // Let the page dark background show through!

    // 2. Camera setup
    const width = containerRef.current.clientWidth || 450;
    const height = containerRef.current.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 10);
    camera.position.set(0, 0, 3 / zoomLevel);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    // 4. Studio Environment Lighting
    const ambientLight = new THREE.AmbientLight('#11111E', 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 4.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const skyLight = new THREE.DirectionalLight('#DFE5FF', 2.5);
    skyLight.position.set(-5, 5, -3);
    scene.add(skyLight);

    const prismLight1 = new THREE.PointLight('#FFB3D1', 8.0, 10);
    prismLight1.position.set(-3, -2, 2);
    scene.add(prismLight1);

    const prismLight2 = new THREE.PointLight('#C2F0FF', 8.0, 10);
    prismLight2.position.set(3, -2, -2);
    scene.add(prismLight2);

    const bounceLight = new THREE.DirectionalLight('#D4AF37', 0.6);
    bounceLight.position.set(0, -5, 0);
    scene.add(bounceLight);

    // 5. Create Diamond Group
    const diamondGroup = new THREE.Group();
    diamondGroupRef.current = diamondGroup;

    // 6. Refractive Physical material
    const physicalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.colorValue),
      metalness: 0.05,
      roughness: selectedColor.roughness,
      transmission: selectedColor.transmission,
      thickness: 1.4,
      ior: 2.417, // Diamond refractive index
      side: THREE.DoubleSide,
      flatShading: true,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 0.15,
      sheenColor: new THREE.Color('#ffffff'),
    });

    const wireframeOverlayMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#D4AF37'),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    // 7. Geometries construction
    const segments = selectedCut.radialSegments;

    const crownGeo = new THREE.CylinderGeometry(
      selectedCut.topRadius,
      1.0,
      selectedCut.heightCrown,
      segments,
      1,
      false
    );

    const pavilionGeo = new THREE.CylinderGeometry(
      1.0,
      0.0,
      selectedCut.heightPavilion,
      segments,
      1,
      false
    );

    crownGeo.translate(0, selectedCut.heightCrown / 2, 0);
    pavilionGeo.translate(0, -selectedCut.heightPavilion / 2, 0);

    const crownMesh = new THREE.Mesh(crownGeo, physicalMaterial);
    const pavilionMesh = new THREE.Mesh(pavilionGeo, physicalMaterial);

    diamondGroup.add(crownMesh);
    diamondGroup.add(pavilionMesh);

    const crownWire = new THREE.Mesh(crownGeo, wireframeOverlayMaterial);
    const pavilionWire = new THREE.Mesh(pavilionGeo, wireframeOverlayMaterial);
    diamondGroup.add(crownWire);
    diamondGroup.add(pavilionWire);

    // Apply scaling based on cuts
    diamondGroup.scale.x *= selectedCut.scaleX;
    diamondGroup.scale.z *= selectedCut.scaleZ;
    
    if (selectedCut.id === 'princess') {
      diamondGroup.rotation.y = Math.PI / 4;
    }

    scene.add(diamondGroup);
    diamondGroup.rotation.x = 0.35; // Slight tilt

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (diamondGroupRef.current) {
        if (isRotating) {
          const delta = clock.getDelta();
          diamondGroupRef.current.rotation.y += 0.24 * (delta || 0.016);
          diamondGroupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (width && height && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      crownGeo.dispose();
      pavilionGeo.dispose();
      physicalMaterial.dispose();
      wireframeOverlayMaterial.dispose();
      renderer.dispose();
    };
  }, [selectedCut, selectedColor, isRotating, zoomLevel]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !diamondGroupRef.current) return;
    const deltaMove = {
      x: e.clientX - previousMousePosition.current.x,
      y: e.clientY - previousMousePosition.current.y
    };
    diamondGroupRef.current.rotation.y += deltaMove.x * 0.0075;
    diamondGroupRef.current.rotation.x += deltaMove.y * 0.0075;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => { isDragging.current = false; };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !diamondGroupRef.current || e.touches.length !== 1) return;
    const deltaMove = {
      x: e.touches[0].clientX - previousMousePosition.current.x,
      y: e.touches[0].clientY - previousMousePosition.current.y
    };
    diamondGroupRef.current.rotation.y += deltaMove.x * 0.008;
    diamondGroupRef.current.rotation.x += deltaMove.y * 0.008;
    previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div id="interactive-3d-experience" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian pt-24 lg:pt-28 pb-12">
      
      {/* 1. Subtle light glows background and Craftsman Watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Diamond Artisan Work Atmospheric Background Watermark */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-luminosity"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2000&auto=format&fit=crop')" 
          }}
        />
        {/* High-end velvet dark radial masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0B1220_90%)]" />

        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.015] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-sky-500/[0.012] rounded-full blur-[150px]" />
        
        {/* Subtle coordinate markers matching haute luxury aesthetic */}
        <div className="absolute top-10 left-10 font-mono text-[9px] text-zinc-850 text-zinc-650 tracking-widest hidden lg:block uppercase select-none">
          SYSTEM: INTERACTIVE ATELIER ACTIVE / 57 FACETS
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-5 space-y-6 text-left flex flex-col justify-center">
            
            {/* Elegant Luxury Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-md self-start"
            >
              <Award className="w-3.5 h-3.5 text-accent-gold" />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-300">
                Triple-Excellent Standards
              </span>
            </motion.div>

            {/* Title / Motto heading */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.45em] gold-text-gradient font-semibold block">
                "From Rough Crystal To Masterpiece"
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-light leading-none tracking-tight text-white m-0 p-0">
                Crafted In Surat.<span className="block font-playfair italic font-normal text-zinc-400 mt-2">Admired Worldwide.</span>
              </h1>
            </div>

            {/* Description subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              className="text-zinc-405 text-zinc-400 text-xs sm:text-sm md:text-base font-light font-sans leading-relaxed max-w-lg m-0 p-0"
            >
              Premium Diamond & Gold Jewellery Designed For Modern Luxury. We govern every breath of the journey—guaranteeing ethical origins, flawless cuts, and masterful craftsmanship.
            </motion.p>

            {/* Button Array: Clean side-by-side spacing with NO duplicate/excessive buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 m-0 p-0"
            >
              {/* Primary - Explore */}
              <button
                onClick={() => handleAction('collections-section')}
                className="px-8 py-3.5 bg-gradient-to-r from-accent-gold/90 via-accent-gold to-accent-bronze hover:brightness-110 rounded-full font-mono text-[11px] text-black font-semibold uppercase tracking-widest transition shadow shadow-amber-950/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary - Book Consultation */}
              <button
                onClick={() => handleAction('consultation-form-section')}
                className="px-8 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/10 hover:border-accent-gold/40 rounded-full font-mono text-[11px] text-zinc-300 font-semibold uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Consultation</span>
              </button>
            </motion.div>

          </div>

          {/* RIGHT SIDE INTERACTIVE 3D ARTRACTION */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center select-none relative">
            
            <div className="luxury-glass bg-zinc-950/40 rounded-2xl border-white/5 relative overflow-hidden flex flex-col h-[480px] md:h-[520px] shadow-2xl shadow-black relative group">
              
              {/* Top HUD options controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
                <div className="bg-zinc-950/90 backdrop-blur border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Sparkles className={`w-3.5 h-3.5 text-accent-gold ${isSparkling ? 'animate-pulse' : ''}`} />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-300">
                    {selectedCut.name} • {selectedColor.name}
                  </span>
                </div>

                <div className="flex gap-2 pointer-events-auto">
                  <button
                    onClick={handleInteractionChime}
                    className="w-8 h-8 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent-gold transition"
                    title="Sparkle Refraction Chime"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCut(GEM_CUTS[0]);
                      setSelectedColor(GEM_COLORS[0]);
                      setIsRotating(true);
                      setZoomLevel(1.25);
                      playLuxuryChime();
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent-gold transition"
                    title="Reset 3D Environment"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ThreeJS WebGL view */}
              <div
                ref={containerRef}
                className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing bg-transparent"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>

              {/* Bottom Customization HUD Toggles integrated perfectly in Hero section */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col space-y-3 bg-zinc-950/90 backdrop-blur border border-white/5 p-4 rounded-xl z-20">
                
                {/* 1. CUT selection row */}
                <div className="flex flex-col space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Select Cut Aspect</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {GEM_CUTS.map(cut => (
                      <button
                        key={cut.id}
                        onClick={() => { setSelectedCut(cut); playLuxuryChime('sparkle'); }}
                        className={`px-3 py-1 rounded text-[9px] font-mono tracking-wider transition ${
                          selectedCut.id === cut.id
                            ? 'bg-accent-gold text-black font-semibold'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-805'
                        }`}
                      >
                        {cut.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. COLOR selector row */}
                <div className="flex flex-col space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Physical Colorway</span>
                  <div className="flex gap-2 pt-1">
                    {GEM_COLORS.map(col => (
                      <button
                        key={col.name}
                        onClick={() => { setSelectedColor(col); playLuxuryChime('sparkle'); }}
                        className={`w-4 h-4 rounded-full border relative transition-all duration-300 ${
                          selectedColor.name === col.name ? 'border-accent-gold scale-125' : 'border-white/10'
                        }`}
                        title={col.name}
                        style={{ backgroundColor: col.colorValue }}
                      >
                        {selectedColor.name === col.name && (
                          <span className="absolute inset-0.5 bg-black rounded-full opacity-30" />
                        )}
                      </button>
                    ))}
                    <div className="flex-1" />
                    {/* Pause rotation row */}
                    <button
                      onClick={() => { setIsRotating(!isRotating); playLuxuryChime(); }}
                      className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white"
                    >
                      {isRotating ? '⏸ PAUSE ROTATION' : '▶ AUTO-ROTATE'}
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
