/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { Diamond, Drill, Eye, PenTool, Gem, CheckCircle, ArrowRight } from 'lucide-react';
import { StoryStage } from '../types';

const STORY_STAGES: StoryStage[] = [
  {
    id: 'rough',
    number: '01',
    title: 'Rough Diamond',
    subtitle: 'Ethical Sourcing from Core Depths',
    description: 'We source rough crystals from verified, conflict-free kimberlite formations under responsible mining initiatives.',
    fullStory: 'Before a diamond can shine, it exists as a raw, multi-billion-year-old crystal forged deep within the Earth\'s mantle. Novara Diamonds enforces direct-source contracts, selecting only octahedral and dodecahedral crystals of paramount crystalline purity, completely bypassing standard middlemen brokers.',
    gemstoneStatus: 'Raw Octahedron Carbon System',
    duration: 'Origin Discovery Phase'
  },
  {
    id: 'cutting',
    number: '02',
    title: 'Diamond Cutting',
    subtitle: 'Mathematical Cleaving & Bruting',
    description: 'Using high-power precision laser mapping and traditional steel blades to slice rough prisms into fundamental proportions.',
    fullStory: 'Our master craftspeople in Surat utilize 3D reflection scanners to construct digital gem twins. We map indices to maximize fire and scintillation, choosing internal proportions that deliver an ideal light-bounce even at the cost of raw carat weight. Cleaving shapes the girdle layout with sub-millimeter tolerances.',
    gemstoneStatus: 'Laser Facet Mapping Stage',
    duration: '24 to 72 Hours Slicing'
  },
  {
    id: 'polishing',
    number: '03',
    title: 'Master Polishing',
    subtitle: 'Aligning the 57 Facets of Passion',
    description: 'Each facet is polished with custom diamond-dust cast wheels to achieve flawless specular symmetry and optical refraction.',
    fullStory: 'Polishing is an elite, high-touch artisan craft. Master artisans hold the gemstone against rotating scaifes infused with micro-diamond dust. They carve the Table, Bezel, Star, and Pavilion facets, aligning them with absolute physical symmetry to unlock deep prismatic light-dispersion (the diamond fire).',
    gemstoneStatus: '57 Facets Mirror Real Alignment',
    duration: '50+ Artisan Hours per Carat'
  },
  {
    id: 'design',
    number: '04',
    title: 'Heirloom Design',
    subtitle: 'The Synthesis of Noble Metals',
    description: 'Our Parisian and Surat design ateliers translate custom conceptual sketches into 18k solid gold and platinum settings.',
    fullStory: 'Once the diamond passes strict optical tests, our luxury designers illustrate bespoke crown settings. Utilizing delicate gouache paintings and precision 3D CAD modeling, each ring band or necklace collar is molded to accentuate the unique refractive signature of its specific central gemstone.',
    gemstoneStatus: 'Dual CAD Blueprint Rendering',
    duration: '7 Days Concept Refinement'
  },
  {
    id: 'masterpiece',
    number: '05',
    title: 'The Masterpiece',
    subtitle: 'Prismatic Release & Certification',
    description: 'The final assembly is mounted, detailed, hand-engraved, and dual-certified by GIA for lifetime world provenance.',
    fullStory: 'Under high zoom, gold-smiths mount the diamond using microprongs, maximizing ambient light entry. The masterpiece undergoes rigorous ultrasonic cleansing and thermal stress assessment, culminating in independent GIA laser-microscopic engraving. A museum-grade heirloom is born.',
    gemstoneStatus: 'GIA Dual laser registered #09247',
    duration: 'Ready For Presentation'
  }
];

export default function StorySection() {
  const [activeStageId, setActiveStageId] = useState<string>('rough');

  const selectedStage = STORY_STAGES.find((s) => s.id === activeStageId) || STORY_STAGES[0];

  const handleStageSelect = (id: string) => {
    setActiveStageId(id);
    playLuxuryChime();
  };

  // Icon mapping
  const getStageIcon = (id: string, active: boolean) => {
    const cls = `w-5 h-5 transition-transform duration-500 ${
      active ? 'text-accent-gold rotate-12 scale-110' : 'text-zinc-650 text-zinc-500'
    }`;
    switch (id) {
      case 'rough': return <Diamond className={cls} />;
      case 'cutting': return <Drill className={cls} />;
      case 'polishing': return <Gem className={cls} />;
      case 'design': return <PenTool className={cls} />;
      case 'masterpiece': return <CheckCircle className={cls} />;
      default: return <Gem className={cls} />;
    }
  };

  return (
    <section id="story-section" className="py-24 border-t border-white/5 relative bg-obsidian overflow-hidden">
      
      {/* Aesthetic Parallax backdrop text */}
      <div className="absolute top-10 right-10 text-[120px] md:text-[200px] font-serif italic text-white/[0.012] select-none pointer-events-none font-bold uppercase">
        Heritage
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header content */}
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3">Our Lineage</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            The Journey of Absolute Perfection
          </h2>
          <div className="w-20 h-[1px] bg-accent-gold mb-6" />
          <p className="text-zinc-400 font-sans text-sm md:text-base font-light max-w-2xl leading-relaxed">
            Unlike traditional jewelry houses that source bulk pre-polished diamonds, Novara Diamonds governs the entire lifecycle. We cleave raw crystals, cultivate the brilliance, and forge modern heirlooms within our private ateliers.
          </p>
        </div>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Vertical Timeline Picker (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">Click to trace the transformation</span>
            <div className="space-y-3 relative">
              
              {/* Vertical connecting bar */}
              <div className="absolute left-[21px] top-6 bottom-6 w-[1px] bg-zinc-800" />

              {STORY_STAGES.map((stage) => {
                const isActive = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(stage.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all duration-500 text-left border ${
                      isActive
                        ? 'bg-white/[0.03] border-accent-gold/45 shadow-sm shadow-amber-900/5'
                        : 'bg-transparent border-transparent hover:bg-white/[0.01]'
                    }`}
                  >
                    {/* Ring Indicator */}
                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 z-10 transition-all ${
                      isActive ? 'bg-zinc-950 border-accent-gold shadow-md' : 'bg-zinc-900 border-zinc-800'
                    }`}>
                      {getStageIcon(stage.id, isActive)}
                    </div>

                    {/* Stage Label */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-semibold tracking-wide text-white">
                          {stage.title}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-600 font-bold">
                          STAGE {stage.number}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs font-light line-clamp-2">
                        {stage.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expanded Cinematic Display Card (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="luxury-glass rounded-2xl p-8 md:p-10 border-white/5 flex flex-col justify-between h-full bg-gradient-to-br from-zinc-950/70 to-obsidian"
              >
                {/* Content top */}
                <div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent-gold">Atelier Log Stage {selectedStage.number}</span>
                      <h3 className="font-serif text-2xl md:text-3xl font-light text-white tracking-wide mt-1">
                        {selectedStage.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block">Cycle Period</span>
                      <span className="text-xs text-zinc-300 font-light font-mono font-medium">{selectedStage.duration}</span>
                    </div>
                  </div>

                  <p className="font-serif italic text-base md:text-lg text-zinc-300 mb-6 font-light leading-relaxed">
                    "{selectedStage.subtitle}"
                  </p>

                  <p className="text-zinc-400 text-sm md:text-base font-sans font-light leading-relaxed mb-8">
                    {selectedStage.fullStory}
                  </p>
                </div>

                {/* Conceptual metadata footer */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-6 bg-white/[0.01] p-4 rounded-xl">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Crystalline Status</span>
                    <span className="text-xs text-white font-mono font-medium">{selectedStage.gemstoneStatus}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-zinc-500 block mb-1">Quality Assurance</span>
                    <span className="text-xs text-accent-gold font-mono flex items-center gap-1">
                      <span>✓ 100% Supervised</span>
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
