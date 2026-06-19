/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { ShieldAlert, Compass, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'elizabeth-paris',
    name: 'Lady Elizabeth Vance',
    location: 'Paris, France',
    quote: 'To witness the custom gouache painting translate into a 3.4ct Flawless Solitaire sitting on my finger is absolute magic. Novara Diamonds captures structural elegance that traditional retailers simply cannot match.',
    rating: 5,
    date: 'Dec 2025',
    verified: true
  },
  {
    id: 'marcus-zurich',
    name: 'Marcus Sterling',
    location: 'Zurich, Switzerland',
    quote: 'The GIA verification, combined with the transparent blockchain logs of the mining location, gave me absolute peace of mind. Truly owner-integrated luxury for collectors who refuse to compromise.',
    rating: 5,
    date: 'Feb 2026',
    verified: true
  },
  {
    id: 'mei-ling-singapore',
    name: 'Dr. Mei Ling',
    location: 'Singapore',
    quote: 'Their attention to optical fire rather than raw carat mass is immediately apparent. The scintillation index of my Marquise drop neckpiece sparkles under any dinner ambient light environment.',
    rating: 5,
    date: 'May 2026',
    verified: true
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    playLuxuryChime();
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    playLuxuryChime();
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[index];

  return (
    <section className="py-24 border-t border-white/5 bg-gradient-to-b from-obsidian via-zinc-950 to-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-900/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Quote aesthetic glyph */}
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-4 font-semibold">Client Narratives</span>
          <Quote className="w-10 h-10 text-accent-gold/20 mx-auto" />
        </div>

        {/* Carousel Block */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-center space-y-6 max-w-3xl"
            >
              {/* Star rating row */}
              <div className="flex items-center justify-center gap-1 text-accent-gold">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-gold shrink-0" />
                ))}
              </div>

              {/* Quote narrative content */}
              <blockquote className="font-serif text-lg md:text-2xl font-light text-white leading-relaxed tracking-wide italic">
                "{item.quote}"
              </blockquote>

              {/* Client specifications */}
              <div className="space-y-1">
                <div className="font-serif text-sm font-semibold tracking-wide text-zinc-200">
                  {item.name}
                </div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>Verified Patron ({item.date})</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls bar */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/5 hover:border-accent-gold text-zinc-400 hover:text-white flex items-center justify-center transition bg-zinc-950/40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setIndex(idx); playLuxuryChime(); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === idx ? 'w-6 bg-accent-gold' : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/5 hover:border-accent-gold text-zinc-400 hover:text-white flex items-center justify-center transition bg-zinc-950/40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
