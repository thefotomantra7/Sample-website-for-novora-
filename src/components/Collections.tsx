/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { ShieldAlert, Compass, Star, Eye, Calendar, Sparkles, X, Heart, ShieldCheck } from 'lucide-react';
import { CollectionItem } from '../types';

const COLLECTION_CATEGORIES = [
  'All Collections',
  'Diamond Rings',
  'Bridal Collection',
  'Engagement Collection',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Bespoke Jewellery'
];

const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'aethelgard',
    name: 'The Aethelgard Solitaire',
    category: 'Diamond Rings',
    price: '$85,000',
    carat: '3.42 ct',
    clarity: 'FL (Flawless)',
    cut: 'Round Brilliant (Ideal)',
    image: '💍',
    features: ['Direct mining origin proof', 'Platinum 950 crown prongs', 'Conflict-free certification']
  },
  {
    id: 'aurora-bridal',
    name: 'Aurelia Crown Bridal Ensemble',
    category: 'Bridal Collection',
    price: '$124,000',
    carat: '5.20 ct (Combined)',
    clarity: 'VVS1',
    cut: 'Pear Shape & Marquess Sparkle',
    image: '👰',
    features: ['Symmetrical eternity spacing', 'D-Color absolute diamond grade', 'Double-locked master clasp']
  },
  {
    id: 'obsidian-engagement',
    name: 'Obsidian Halo Crown',
    category: 'Engagement Collection',
    price: '$62,500',
    carat: '2.80 ct',
    clarity: 'FL',
    cut: 'Princess Cut (Ideal Square)',
    image: '💎',
    features: ['French-set micro-pave details', 'Eco-responsible palladium gold', 'GIA microscopic laser engraved']
  },
  {
    id: 'starlight-collar',
    name: 'Starlight Marquise Cascade',
    category: 'Necklaces',
    price: '$280,000',
    carat: '12.45 ct (Total)',
    clarity: 'VVS2',
    cut: 'Marquise & Emerald cuts',
    image: '📿',
    features: ['Flexible platinum skeleton ringlets', 'Individually tensioned basket settings', 'Exquisite presentation velvet vault']
  },
  {
    id: 'soliel-drop',
    name: 'Soleil Canary Drop Earpieces',
    category: 'Earrings',
    price: '$98,000',
    carat: '4.60 ct (Combined)',
    clarity: 'VS1',
    cut: 'Cushion Canary / Radiant Sparkle',
    image: '✨',
    features: ['Natural deep yellow Canary Diamond gems', '18K absolute Sovereign Rose Gold', 'Anti-slip secure posts']
  },
  {
    id: 'elysian-tennis',
    name: 'The Elysian Eternity Tennis Band',
    category: 'Bracelets',
    price: '$145,000',
    carat: '8.80 ct',
    clarity: 'VVS1',
    cut: 'Round Brilliant Cuts (Identical matching)',
    image: '🪮',
    features: ['Laser-aligned gem heights', 'Dual safety slide clasp', 'Micro-milled structural links']
  },
  {
    id: 'bespoke-monarch',
    name: 'The Sovereign Monarch Crown',
    category: 'Bespoke Jewellery',
    price: 'Bespoke / POA',
    carat: '7.50 ct Main Gem',
    clarity: 'FL',
    cut: 'Emerald Decagon Cut',
    image: '👑',
    features: ['Designed via individual gouache sketches', 'Full metallurgical casting video included', 'Global armored courier delivery']
  }
];

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');
  const [activeItem, setActiveItem] = useState<CollectionItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredItems = selectedCategory === 'All Collections'
    ? COLLECTION_ITEMS
    : COLLECTION_ITEMS.filter(item => item.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playLuxuryChime();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleEnquire = (itemName: string) => {
    playLuxuryChime('consultation');
    setActiveItem(null);
    const formEl = document.getElementById('consultation-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Auto fill input product query
      const inputEl = document.getElementById('enquiry-product-selector') as HTMLSelectElement;
      if (inputEl) {
        inputEl.value = itemName;
      }
    }
  };

  return (
    <section id="collections-section" className="py-24 border-t border-white/5 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3 font-semibold">The Core Vaults</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
              Signature Collections
            </h2>
            <p className="text-zinc-500 font-sans text-sm font-light max-w-md mt-2">
              Every curated item passes through stringent gemological certification before taking its place in our private catalogs.
            </p>
          </div>

          {/* Sub-filtering tabs */}
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto scrollbar-none pb-2">
            {COLLECTION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); playLuxuryChime(); }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-accent-gold text-black border-accent-gold font-medium'
                    : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Collections Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => { setActiveItem(item); playLuxuryChime('sparkle'); }}
                  className="luxury-glass rounded-2xl overflow-hidden border-white/5 bg-gradient-to-b from-zinc-950/70 to-obsidian cursor-pointer group hover:border-accent-gold/25 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Decorative Imagery Card (Abstract high-end render mockup) */}
                  <div className="relative aspect-[4/3] w-full bg-[#080809] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />
                    
                    {/* Glowing light flare representing diamond specularity */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-900/10 blur-3xl group-hover:bg-indigo-900/15 transition-all duration-700 pointer-events-none" />

                    {/* Styled High quality Unicode jewel symbol representing the items beautifully */}
                    <div className="text-6xl filter drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 ease-out select-none">
                      {item.image}
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-950/80 border border-white/5 text-zinc-400 group-hover:border-accent-gold/20 transition-all">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-950/80 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition"
                    >
                      <Heart className={`w-3.5 h-3.5 transition-colors ${
                        isFav ? 'text-red-500 fill-red-500' : 'text-zinc-500'
                      }`} />
                    </button>
                    
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-accent-gold">
                        <span>Inspect Specs</span>
                        <Eye className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Core Description Card Body */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-white font-medium tracking-wide group-hover:text-accent-gold transition-colors block mb-1">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 block">Est Value</span>
                        <span className="text-sm font-mono text-zinc-300 font-semibold">{item.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 block">Carat Weight</span>
                        <span className="text-xs font-mono text-accent-gold font-bold">{item.carat}</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modal dialog detail sheet */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setActiveItem(null); playLuxuryChime(); }}
                className="absolute inset-0 bg-obsidian/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-2xl w-full luxury-glass bg-gradient-to-b from-zinc-950 to-obsidian rounded-2xl overflow-hidden border-white/10 p-8 shadow-2xl shadow-black z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => { setActiveItem(null); playLuxuryChime(); }}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column Image Representation */}
                  <div className="md:col-span-5 bg-zinc-950 aspect-square rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden p-6">
                    <div className="absolute top-3 left-3 bg-zinc-900/80 px-2 py-0.5 rounded text-[8px] font-mono text-zinc-400">
                      EST VALUE
                    </div>
                    <div className="text-7xl drop-shadow-[0_12px_24px_rgba(255,255,255,0.18)]">
                      {activeItem.image}
                    </div>
                  </div>

                  {/* Right Column Specifications Sheet */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold">{activeItem.category}</span>
                      <h3 className="font-serif text-2xl font-light text-white tracking-wide mt-1">
                        {activeItem.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-zinc-500">Clarification</span>
                        <span className="text-xs text-zinc-300 block">{activeItem.clarity}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase text-zinc-500">Gem Shape/Cut</span>
                        <span className="text-xs text-zinc-300 block">{activeItem.cut}</span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div>
                      <span className="text-[9px] font-mono uppercase text-zinc-500 block mb-2">Provenance Certifications</span>
                      <ul className="space-y-1.5">
                        {activeItem.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-zinc-400 font-light">
                            <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enquiry triggering box */}
                    <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[8px] font-mono uppercase text-zinc-500 block">Est Valuation</span>
                        <span className="text-base font-mono text-white font-semibold">{activeItem.price}</span>
                      </div>
                      
                      <button
                        onClick={() => handleEnquire(activeItem.name)}
                        className="px-5 py-3 bg-accent-gold hover:bg-accent-bronze rounded-lg text-black font-mono text-[10px] uppercase font-semibold tracking-wider transition-colors cursor-pointer"
                      >
                        Acquire Masterpiece
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </	AnimatePresence>

      </div>
    </section>
  );
}
