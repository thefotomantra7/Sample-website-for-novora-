/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HelpCircle, Diamond, DollarSign, Gem, BadgeCheck, Scale } from 'lucide-react';

export default function WhyNovara() {
  const advantages = [
    {
      title: "Direct Sourced / Owner Model",
      desc: "Because we govern our mine supply contracts directly, we bypass traditional diamond brokers—guaranteeing authentic provenance and premium pricing ratios."
    },
    {
      title: "GIA Laser-Certified Gems",
      desc: "Every single center gem above 0.5 carats in our vault carries physical microscopic laser engraving and a verified GIA global report dossier."
    },
    {
      title: "100% In-House Craftsmanship",
      desc: "Our gold and platinum work is poured and hand-detailed in our Surat and Paris private artisan hubs. We do not white-label generic external designs."
    },
    {
      title: "Bespoke Sculptural Design",
      desc: "No machine-stamped bands. Each item is hand-sculpted in CAD and high-purity casting molds custom formulated to fit your center gemstone."
    },
    {
      title: "Prismatic Light Quality",
      desc: "Unlike standard commercial gems, we sacrifice raw carat mass during cutting if required, prioritizing optical light reflection standards."
    },
    {
      title: "Conflict-Free Transparencies",
      desc: "We track diamonds using strict block coordinates, tracing their journey from native ground-level crystals to your presentation package."
    }
  ];

  return (
    <section id="why-novara-section" className="py-24 border-t border-white/5 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Title Content */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3 font-semibold">The Core Distinctions</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
            A Revolution In Luxury Diamonds
          </h2>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mb-4" />
          <p className="text-zinc-400 font-sans text-sm font-light leading-relaxed">
            By taking control of the entire diamond lifecycle, we bypass intermediaries, eliminate undisclosed quality compromises, and deliver unparalleled, certified gemstone value.
          </p>
        </div>

        {/* Traditional Retail vs. Novara Comparison Board */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          
          {/* Traditional Retail (Negative/Grey) */}
          <div className="luxury-glass bg-zinc-950/20 border-white/5 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-950/10 border border-red-900/10 flex items-center justify-center text-red-500">
                <Scale className="w-5 h-5 opacity-70" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-zinc-400 font-medium">Traditional Luxury Retail Models</h3>
                <span className="text-[10px] font-mono uppercase text-zinc-600 block">Typical Middleman Sourcing</span>
              </div>
            </div>

            <ul className="space-y-4 font-sans text-xs text-zinc-500 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <div>
                  <strong className="text-zinc-400 font-semibold block">300%+ Broker Inflation Markups</strong>
                  Jewelry travels through mining cartels, exporters, cutters, wholesalers, and retail agents, piling on massive overhead fees.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <div>
                  <strong className="text-zinc-400 font-semibold block">Outsourced Standardized Mountings</strong>
                  Alloys and micro-settings are frequently bulk outsourced to mass-stamping facilities, resulting in loose links and quick wear-&-tear.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✕</span>
                <div>
                  <strong className="text-zinc-400 font-semibold block">Obscured Sourcing & Origin Prov</strong>
                  Multiple diamond lots are blended, making it virtually impossible to accurately verify the specific mines or ethical labor provenance index.
                </div>
              </li>
            </ul>
          </div>

          {/* Novara Diamonds (Positive/Gold) */}
          <div className="luxury-glass bg-zinc-950/80 border-accent-gold/25 rounded-2xl p-8 space-y-6 bg-gradient-to-tr from-zinc-950 to-obsidian">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold shadow shadow-black">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-white font-medium">The Novara Integrated Assembly</h3>
                <span className="text-[10px] font-mono uppercase text-accent-gold block font-semibold">Direct Sourced & Hand-Polished</span>
              </div>
            </div>

            <ul className="space-y-4 font-sans text-xs text-zinc-400 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold">✓</span>
                <div>
                  <strong className="text-white font-semibold block">Uninflated Direct Procurement Value</strong>
                  By owning our cutting, sorting, and polishing complexes, we deliver flawless museum-tier diamond jewellery without third-party fees.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold">✓</span>
                <div>
                  <strong className="text-white font-semibold block">Surgical Microscope Micro Prong Set</strong>
                  Each crown alloy is hand-poured in-house and detailed under Geller microscope zoom arrays, optimizing durable lifespans.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold font-bold">✓</span>
                <div>
                  <strong className="text-white font-semibold block">Blockchain-Accredited Conflict-Free Proof</strong>
                  Every gem profile traces to precise mining coordinates, proving strict accordance with humanitarian working regulations.
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Six Golden Adv Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={adv.title}
              className="p-6 rounded-xl border border-white/5 bg-zinc-950/40 hover:border-accent-gold/10 hover:bg-zinc-950 transition"
            >
              <div className="w-8 h-8 rounded-full border border-accent-gold/30 flex items-center justify-center text-accent-gold mb-4 text-xs font-mono font-bold">
                {idx + 1}
              </div>
              <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-2.5">
                {adv.title}
              </h4>
              <p className="text-zinc-500 text-xs font-light leading-relaxed font-sans">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
