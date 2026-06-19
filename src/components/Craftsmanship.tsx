/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { Hammer, Search, ShieldCheck, HelpCircle, Users, Award, Percent } from 'lucide-react';

interface CraftItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  spec: string;
  metric: string;
  metricLabel: string;
}

const CRAFT_ITEMS: CraftItem[] = [
  {
    id: 'sourcing',
    name: 'Sovereign Sourcing',
    subtitle: 'Direct Northern Mine Allocations',
    description: 'We procure gems exclusively from ethical high-pressure kimberlite pipes. By monitoring rough diamonds from source coordinates, we establish absolute provenance indices that exceed Kimberly Process standards.',
    spec: 'Argyle & Canada Arctic origins',
    metric: '100%',
    metricLabel: 'Ethically Sourced'
  },
  {
    id: 'cutting',
    name: 'Prismatic Cutting',
    subtitle: 'Optimal Light Dispersion Formulation',
    description: 'Cut is the single most critical factor in gemstone sparkle. Our master cutters in Surat prioritize standard geometric alignment over carat retention, carving exact proportions to maximize Fire and Light Scintillation.',
    spec: 'Ideal / Triple Excellent Rating',
    metric: '58',
    metricLabel: 'Facets of Brilliant cut'
  },
  {
    id: 'polishing',
    name: 'Artisan Polishing',
    subtitle: 'Scaife High-Friction Finishing',
    description: 'Polishing mirrors the raw diamond facets to flawless specular surfaces. Using historic cast-iron scaifes treated with micro-grade olivine diamond paste, each facet takes shape as an independent mirror compound.',
    spec: 'Sub-micron smoothness calibration',
    metric: '0.01',
    metricLabel: 'mm Tolerance Deviation'
  },
  {
    id: 'goldsmithing',
    name: 'Noble Goldsmithing',
    subtitle: 'Heirloom Alloy Formulation',
    description: 'We blend 95% platinum and solid 18K gold mixtures in-house to form incredibly dense, anti-abrasive bands. Each setting is handcrafted to cradle specific diamond vertices without obscuring natural light entrance.',
    spec: 'Solid Platinum 950 & 18k Filaments',
    metric: '18k',
    metricLabel: 'Luxury Solid Alloys'
  },
  {
    id: 'setting',
    name: 'Micro-Pave Mounting',
    subtitle: 'Surgical Microscope Precision',
    description: 'Under high zoom, our stone-setters align melee diamonds in precise dense bands. Prongs are carefully hand-burnished under high magnification to avoid stress fractures while ensuring lifelong security.',
    spec: 'Geller microscope alignment specs',
    metric: '100x',
    metricLabel: 'Microscope Calibration'
  }
];

export default function Craftsmanship() {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('sourcing');

  const selectedCraft = CRAFT_ITEMS.find((c) => c.id === selectedCraftId) || CRAFT_ITEMS[0];

  const handleSelect = (id: string) => {
    setSelectedCraftId(id);
    playLuxuryChime();
  };

  const stats = [
    { value: "100%", label: "In-House Manufacturing", desc: "No white-labeled outsourcing. We own the supply pipeline." },
    { value: "GIA", label: "Certified Gemstones", desc: "Independent certification of clarity, color, and carat weight." },
    { value: "99.8%", label: "Absolute Quality Audits", desc: "Meticulous internal laser scanning for micro-inclusions." },
    { value: "35+", label: "Master Artisans", desc: "Elite craftsmen in Surat with multi-generational experience." }
  ];

  return (
    <section id="craft-section" className="py-24 border-t border-white/5 relative bg-gradient-to-b from-obsidian to-zinc-950">
      
      {/* Background radial spotlight grid overlay */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Statistics Bar (Top Section) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={stat.label}
              className="luxury-glass rounded-xl p-6 border-white/5 bg-gradient-to-tr from-zinc-950 to-obsidian group hover:border-accent-gold/20 transition-all duration-300"
            >
              <div className="font-serif text-3xl md:text-4xl text-accent-gold font-light tracking-wide mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-semibold mb-1">
                {stat.label}
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Split Screen Showcase (Bottom Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Craft Selector menu (Left 5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3 font-semibold">The Atelier Standards</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-white leading-tight">
                Our Surgical Precision
              </h2>
              <p className="text-zinc-400 text-sm font-light mt-2 max-w-md">
                We focus on extreme, micro-level details. Choose an artisan specialization to inspect our technical methodologies:
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {CRAFT_ITEMS.map((craft) => {
                const isActive = craft.id === selectedCraftId;
                return (
                  <button
                    key={craft.id}
                    onClick={() => handleSelect(craft.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all border ${
                      isActive
                        ? 'bg-white/[0.03] border-accent-gold text-white'
                        : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono tracking-widest uppercase">{craft.id} Process</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                    </div>
                    <div className="font-serif font-light text-base mt-1.5 tracking-wide text-zinc-100 group-hover:text-white">
                      {craft.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed visual review (Right 7 Cols) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCraft.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="luxury-glass rounded-2xl p-8 md:p-12 border-white/5 flex flex-col justify-between h-full bg-gradient-to-tr from-obsidian to-zinc-950/90 relative"
              >
                
                {/* Decorative layout design elements */}
                <div className="absolute top-6 right-8 text-[70px] font-mono text-white/[0.01] font-bold select-none pointer-events-none">
                  {selectedCraft.metric}
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent-gold block mb-1">
                    Atelier Focus Point
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-white mb-2">
                    {selectedCraft.name}
                  </h3>
                  <p className="text-xs font-mono italic text-zinc-400 mb-6">
                    "{selectedCraft.subtitle}"
                  </p>

                  <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed mb-8">
                    {selectedCraft.description}
                  </p>
                </div>

                {/* Craft Specs Block Info */}
                <div className="border-t border-white/5 pt-6 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-zinc-500 block">Artisan Tolerances</span>
                    <span className="text-xs text-white tracking-wide font-sans">{selectedCraft.spec}</span>
                  </div>

                  <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 py-3 px-5 rounded-xl">
                    <div className="text-right">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block">Scale Value</span>
                      <span className="text-xs text-accent-gold font-mono font-bold block">{selectedCraft.metric}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-zinc-800" />
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block">Metric Measure</span>
                      <span className="text-[10px] text-zinc-300 font-sans tracking-wide block">{selectedCraft.metricLabel}</span>
                    </div>
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
