/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { Sparkles, ArrowRight, Heart, Calendar, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { CustomJewelState } from '../types';

export default function CustomDesign() {
  const [style, setStyle] = useState<CustomJewelState['style']>('platinum');
  const [cut, setCut] = useState<CustomJewelState['cut']>('round');
  const [carat, setCarat] = useState<number>(2.0);
  const [clarity, setClarity] = useState<CustomJewelState['clarity']>('FL');
  const [ringType, setRingType] = useState<CustomJewelState['ringType']>('solitaire');

  // Multi-step custom workflow documentation
  const DESIGN_STEPS = [
    { num: '1', title: 'Consultation', desc: 'Secure connection with private gemstone stewards in Zurich, Surat or London.' },
    { num: '2', title: 'Concept Design', desc: 'Custom gouache paintings and 3D CAD modeling made custom to your hand profile.' },
    { num: '3', title: 'Diamond Selection', desc: 'Sourcing of specific candidate diamond stones matching desired clarity constraints.' },
    { num: '4', title: 'Craftsmanship', desc: 'Molding precious metals and microscopic stone-setting from our atelier artists.' },
    { num: '5', title: 'Delivery', desc: 'Armored carrier transportation to your door, protected inside museum lacquered drawers.' }
  ];

  // Base price computations based on realistic premium scales
  const calculateEstimate = () => {
    let base = 5000; // Base band craftsman mounting fee
    
    // Band Alloy multiplier
    if (style === 'platinum') base += 3500;
    else if (style === 'gold') base += 2200;
    else base += 2500;

    // Diamond Cut multipliers
    let cutMult = 1.0;
    if (cut === 'emerald') cutMult = 1.15;
    else if (cut === 'oval') cutMult = 1.10;
    else if (cut === 'princess') cutMult = 1.05;

    // Mount setting extras
    if (ringType === 'halo') base += 4000;
    else if (ringType === 'pave') base += 6500;
    else if (ringType === 'three-stone') base += 9000;

    // Exponential Carat valuation (representing natural diamond scarcity curves!)
    const caratVal = Math.pow(carat, 2.3) * 12000;

    // Diamond Clarity premiums
    let clarityMult = 1.0;
    if (clarity === 'FL') clarityMult = 1.6;
    else if (clarity === 'VVS1') clarityMult = 1.35;
    else if (clarity === 'VS1') clarityMult = 1.15;

    const total = (base + caratVal) * cutMult * clarityMult;
    return total;
  };

  const handleApplyBespokeSelection = () => {
    playLuxuryChime('consultation');
    
    // Find Consultation Form and auto fill the message text
    const customMessage = `Bespoke Custom Jewel Request:\n- Band: ${style.toUpperCase()}\n- Diamond Cut: ${cut.toUpperCase()}\n- Weight: ${carat.toFixed(2)}ct\n- Clarity Index: ${clarity}\n- Setting Type: ${ringType.toUpperCase()}\n- Computed Estimate: $${Math.round(calculateEstimate()).toLocaleString()}`;
    
    const formEl = document.getElementById('consultation-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      const selectEl = document.getElementById('enquiry-product-selector') as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = 'Bespoke Jewellery';
      }

      const textEl = document.getElementById('enquiry-message-area') as HTMLTextAreaElement;
      if (textEl) {
        textEl.value = customMessage;
      }

      const budgetEl = document.getElementById('enquiry-budget-range') as HTMLSelectElement;
      if (budgetEl) {
        const cost = calculateEstimate();
        if (cost < 25000) budgetEl.value = '10k - 25k';
        else if (cost < 50000) budgetEl.value = '25k - 50k';
        else if (cost < 100000) budgetEl.value = '50k - 100k';
        else budgetEl.value = '100k+';
      }
    }
  };

  const currentThemeHex = () => {
    if (style === 'platinum') return 'border-zinc-350 bg-gradient-to-r from-zinc-300 to-zinc-400';
    if (style === 'gold') return 'border-amber-400 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600';
    return 'border-rose-350 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500';
  };

  return (
    <section id="custom-design-section" className="py-24 border-t border-white/5 bg-gradient-to-b from-zinc-950 to-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 left-3/4 w-[450px] h-[450px] bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Title Content */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3 font-semibold">Atelier Bespoke</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
            Your Vision. Our Craftsmanship.
          </h2>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mb-4" />
          <p className="text-zinc-400 text-sm font-sans font-light">
            Model, scale, and evaluate your customized diamond centerpiece ring in real time. Our artisans build physically to your digital specifications.
          </p>
        </div>

        {/* Interactive Custom Ring Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Controls Editor Options (Left 7 Cols) */}
          <div className="lg:col-span-12 xl:col-span-7 luxury-glass bg-zinc-950/80 rounded-2xl p-6 md:p-8 border-white/5 space-y-6 flex flex-col justify-between">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
              {/* Alloy selection */}
              <div>
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block mb-3">1. Noble Band Alloy</span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => { setStyle('platinum'); playLuxuryChime(); }}
                    className={`flex-1 p-3.5 rounded-lg border text-center transition-all ${
                      style === 'platinum' ? 'border-zinc-400 text-white bg-zinc-450/10' : 'border-white/5 text-zinc-400 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-zinc-300 border border-white/30 mx-auto mb-1.5 shadow" />
                    <span className="text-[10px] uppercase font-mono tracking-wider">Platinum 950</span>
                  </button>

                  <button
                    onClick={() => { setStyle('gold'); playLuxuryChime(); }}
                    className={`flex-1 p-3.5 rounded-lg border text-center transition-all ${
                      style === 'gold' ? 'border-amber-400 text-white bg-amber-450/10' : 'border-white/5 text-zinc-400 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-amber-400 border border-white/30 mx-auto mb-1.5 shadow" />
                    <span className="text-[10px] uppercase font-mono tracking-wider">18k Yellow</span>
                  </button>

                  <button
                    onClick={() => { setStyle('rose'); playLuxuryChime(); }}
                    className={`flex-1 p-3.5 rounded-lg border text-center transition-all ${
                      style === 'rose' ? 'border-rose-450 text-white bg-rose-450/10' : 'border-white/5 text-zinc-400 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-rose-400 border border-white/30 mx-auto mb-1.5 shadow" />
                    <span className="text-[10px] uppercase font-mono tracking-wider">18K Blush Rose</span>
                  </button>
                </div>
              </div>

              {/* Central Cut selection */}
              <div>
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block mb-3">2. Central Diamond Cut</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'round', name: 'Round' },
                    { id: 'emerald', name: 'Emerald' },
                    { id: 'oval', name: 'Oval' },
                    { id: 'princess', name: 'Princess' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setCut(c.id as CustomJewelState['cut']); playLuxuryChime('sparkle'); }}
                      className={`py-2 px-3 rounded text-left transition text-xs border ${
                        cut === c.id ? 'border-accent-gold text-accent-gold bg-accent-gold/5 font-semibold' : 'border-white/5 text-zinc-400 hover:bg-white/[0.02]'
                      }`}
                    >
                      ✦ {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
              {/* Carat Sizing slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">3. Central Carats</span>
                  <span className="text-xs font-mono text-white font-bold">{carat.toFixed(2)} Carats</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.05"
                  value={carat}
                  onChange={(e) => { setCarat(parseFloat(e.target.value)); }}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent-gold"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-2">
                  <span>1.0ct</span>
                  <span>3.0ct</span>
                  <span>5.0ct (Imperial)</span>
                </div>
              </div>

              {/* Clarity */}
              <div>
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block mb-2.5">4. Gem Clarity Level (GIA)</span>
                <div className="flex bg-zinc-950 p-1 rounded-lg border border-white/5 gap-1">
                  {[
                    { id: 'FL', label: 'Flawless' },
                    { id: 'VVS1', label: 'VVS1' },
                    { id: 'VS1', label: 'VS1' },
                    { id: 'SI1', label: 'SI1' }
                  ].map((cl) => (
                    <button
                      key={cl.id}
                      onClick={() => { setClarity(cl.id as CustomJewelState['clarity']); playLuxuryChime(); }}
                      className={`flex-1 py-1.5 rounded text-center font-mono text-xs transition ${
                        clarity === cl.id ? 'bg-zinc-900 border border-white/10 text-accent-gold font-bold' : 'text-zinc-500 hover:text-zinc-400'
                      }`}
                      title={cl.label}
                    >
                      {cl.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mounting Type Select */}
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block mb-3">5. Ring Mount Setting</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: 'solitaire', label: 'Classic Solitaire', desc: 'Sovereign single prong setting' },
                  { id: 'halo', label: 'Diamond Halo', desc: 'Surrounded by micro gem-crown' },
                  { id: 'pave', label: 'Eternity Pave', desc: 'Central diamond + active band band' },
                  { id: 'three-stone', label: 'Prismatic Trinity', desc: 'Triple majestic diamond setup' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setRingType(item.id as CustomJewelState['ringType']); playLuxuryChime('sparkle'); }}
                    className={`p-3 text-left rounded-lg border transition ${
                      ringType === item.id
                        ? 'border-accent-gold bg-accent-gold/5 text-white'
                        : 'border-white/5 text-zinc-400 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="text-xs font-serif font-medium tracking-wide">{item.label}</div>
                    <div className="text-[9px] text-zinc-500 font-light leading-normal mt-1 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Render Outcome & Price Estimate (Right 5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between">
            <div className="luxury-glass bg-gradient-to-tr from-obsidian to-zinc-950 rounded-2xl p-6 md:p-8 border-white/5 flex flex-col justify-between h-full hover:border-accent-gold/15 transition-all">
              
              {/* Dynamic Design Sketch Representation */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 block mb-2">Live Blueprint Preview</span>
                <div className="bg-[#080809] border border-white/5 aspect-square w-full rounded-xl flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute top-3 left-3 flex gap-1.5 items-center bg-zinc-950/80 px-2.5 py-1 rounded border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                    <span className="text-[8px] font-mono text-zinc-400 tracking-widest">PROV: SURE-ACTIVE</span>
                  </div>

                  {/* Ring Abstract visual representation */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    
                    {/* Ring Band */}
                    <div className={`w-36 h-36 rounded-full border-[8px] absolute shadow-lg transition-all duration-500 ${currentThemeHex()}`} />
                    
                    {/* Central Gemstone Holder Accent */}
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rotate-45 transform absolute -top-1 z-10 flex items-center justify-center shadow-lg group-hover:rotate-90 transition-transform duration-700">
                      {/* Prism core glow */}
                      <div className="w-8 h-8 rounded-full bg-sky-300/10 blur relative z-0" />
                    </div>

                    {/* Central Unicode Visual Gem representation based on cut selected */}
                    <div className="absolute -top-4 font-bold text-4xl filter drop-shadow-[0_8px_16px_rgba(255,255,255,0.25)] z-20 transition-all">
                      {cut === 'round' ? '💎' : cut === 'emerald' ? '🟩' : cut === 'oval' ? '🪨' : '🔳'}
                    </div>

                    {/* Left & Right melee diamonds for Pave / Three-Stone mount options */}
                    {(ringType === 'pave' || ringType === 'three-stone') && (
                      <>
                        <div className="absolute top-5 left-10 text-xs shadow-md">✨</div>
                        <div className="absolute top-5 right-10 text-xs shadow-md">✨</div>
                      </>
                    )}

                    {/* Bottom band description stamp */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950/90 border border-white/5 py-1 px-3 rounded text-[8px] font-mono tracking-widest text-zinc-500 uppercase text-center w-full">
                      Setting: {ringType} • Alloy: {style}
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimate valuation bar */}
              <div className="border-t border-white/5 pt-6 mt-8 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 text-xs font-mono uppercase">Private Atelier Estimate</span>
                  <span className="text-2xl font-mono text-white tracking-tight font-bold">
                    ${Math.round(calculateEstimate()).toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-600 font-sans leading-relaxed">
                  *This estimate includes direct procurement mapping, in-house Surat metallurgical carving, and comprehensive GIA certification documentation. Taxes and transport are included.
                </div>

                <button
                  onClick={handleApplyBespokeSelection}
                  className="w-full py-4 rounded-xl bg-accent-gold hover:bg-accent-bronze font-mono uppercase text-xs text-black font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Submit Request of Proposal
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Milestone Methodology Workflow Horizontal block */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 block mb-4 text-center">Bespoke Architectural Timeline</span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {DESIGN_STEPS.map((step) => (
              <div key={step.num} className="luxury-glass bg-zinc-950/30 p-5 rounded-xl border-white/5 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-accent-gold mb-4 shadow">
                    {step.num}
                  </div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
