/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { Mail, ArrowRight, Instagram, MessageSquare, MapPin, Sparkles, BookOpen, ShieldAlert } from 'lucide-react';
import { NovaraEmblem } from './NovaraLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playLuxuryChime('sparkle');
    setSubscribed(true);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  const hubs = [
    { city: "London", desc: "Mayfair Private Salon Room" },
    { city: "Zurich", desc: "Bahnhofstrasse Vault Suite" },
    { city: "Surat", desc: "Flagship Production & Cutting Hub" }
  ];

  const handleLinkClick = (id: string) => {
    playLuxuryChime();
    const item = document.getElementById(id);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-obsidian border-t border-white/5 pt-24 pb-12 text-zinc-400 font-sans relative">
      
      {/* Footer Sparkle details background */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-amber-500/[0.012] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Brand statement column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <button
            onClick={() => { playLuxuryChime(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3.5 text-left group"
          >
            <NovaraEmblem className="w-10 h-10 transition-transform duration-700 group-hover:rotate-12" isDark={true} />
            <div>
              <span className="font-serif text-xl font-medium tracking-[0.22em] text-white uppercase block leading-none">Novara</span>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.45em] text-accent-gold block mt-1.5">Fine Jewellery</span>
            </div>
          </button>
          
          <p className="text-xs font-light leading-relaxed max-w-sm text-zinc-500">
            A boutique luxury diamond house governing the entire cycle from rough crystal geology to finished fine heirloom masterpieces. Certified triple-excellent standards.
          </p>

          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/novara.diamonds"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playLuxuryChime()}
              className="w-8 h-8 rounded-full border border-white/5 hover:border-accent-gold text-zinc-500 hover:text-white flex items-center justify-center transition bg-zinc-950/45"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                playLuxuryChime();
                window.open('https://wa.me/41449281000', '_blank');
              }}
              className="w-8 h-8 rounded-full border border-white/5 hover:border-accent-gold text-zinc-500 hover:text-white flex items-center justify-center transition bg-zinc-950/45"
              title="Official WhatsApp Concierge Support Line"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Section (2 cols) */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">The House</h4>
          <ul className="space-y-2.5 text-xs font-light">
            {['Heritage', 'Craftsmanship', 'Collections', '3D Atelier'].map((label, idx) => {
              const ids = ['story-section', 'craft-section', 'collections-section', 'interactive-3d-experience'];
              return (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(ids[idx])}
                    className="hover:text-accent-gold transition cursor-pointer"
                  >
                    ✦ {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* International flagships (3 cols) */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">Flagship Locations</h4>
          <ul className="space-y-4 text-xs font-light">
            {hubs.map((hub) => (
              <li key={hub.city} className="flex gap-2.5 items-start">
                <MapPin className="w-3.5 h-3.5 text-zinc-650 mt-0.5 text-zinc-500 shrink-0" />
                <div>
                  <strong className="text-zinc-300 font-medium block">{hub.city}</strong>
                  <span className="text-zinc-650 text-zinc-500 text-[11px] leading-tight block">{hub.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Ledger subscription (3 cols) */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">The Private Ledger</h4>
          <p className="text-[11px] font-light leading-relaxed text-zinc-500">
            Register to join our private collector ledger, housing exclusive seasonal listings and private auction invites.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-2 relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Submit luxury email..."
                className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2.5 text-xs text-white placeholder-zinc-750 focus:border-accent-gold focus:outline-none transition font-sans"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1.5 p-1 text-zinc-500 hover:text-accent-gold transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-[10px] font-mono text-accent-gold bg-accent-gold/5 border border-accent-gold/20 p-3 rounded-lg flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Email logged in ledger. Thank you.</span>
            </div>
          )}
        </div>

      </div>

      {/* Underbar terms/copyright (12 cols) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-zinc-600 gap-4 uppercase">
        <div>
          © {currentYear} Novara Diamonds House. All World Rights Reserved. Registered in Switzerland. Code ID and GIA marks globally copyrighted.
        </div>
        <div className="flex gap-6">
          <button onClick={() => playLuxuryChime()} className="hover:text-zinc-400 transition cursor-pointer">Privacy Charter</button>
          <button onClick={() => playLuxuryChime()} className="hover:text-zinc-400 transition cursor-pointer">Anti-Money Laundering Declaration</button>
        </div>
      </div>

    </footer>
  );
}
