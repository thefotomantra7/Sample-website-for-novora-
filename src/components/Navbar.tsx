/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sun, Moon, Sparkles, Menu, X, Calendar, Compass, Layers, ShieldCheck } from 'lucide-react';
import { playLuxuryChime, setGlobalMute } from '../utils/audio';
import { NovaraEmblem } from './NovaraLogo';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme, isMuted, toggleMute }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    playLuxuryChime();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { name: 'Heritage', id: 'story-section' },
    { name: 'Craftsmanship', id: 'craft-section' },
    { name: 'Collections', id: 'collections-section' },
    { name: '3D Atelier', id: 'interactive-3d-experience' },
    { name: 'Bespoke Atelier', id: 'custom-design-section' },
    { name: 'Why Novara', id: 'why-novara-section' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? isDarkMode
              ? 'bg-obsidian/85 backdrop-blur-md py-4 border-b border-white/5'
              : 'bg-white/90 backdrop-blur-md py-4 border-b border-black/5 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Emblem Logo */}
          <button
            onClick={() => {
              playLuxuryChime('sparkle');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <NovaraEmblem className="w-8.5 h-8.5 transition-transform duration-700 group-hover:rotate-12" isDark={isDarkMode} />
            <div>
              <span className={`font-serif text-lg md:text-xl font-medium tracking-[0.22em] uppercase block leading-none ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}>
                Novara
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.45em] text-zinc-500 border-none block mt-1">
                Fine Jewellery
              </span>
            </div>
          </button>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 hover:text-accent-gold ${
                  isDarkMode ? 'text-zinc-400 font-light' : 'text-zinc-600 font-medium'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Interactive Utility Ring */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Audio Toggle (Mute/Unmute) */}
            <button
              onClick={() => {
                toggleMute();
                // We chime immediately after unmuting to give a sample
                if (isMuted) {
                  setGlobalMute(false);
                  setTimeout(() => playLuxuryChime('sparkle'), 50);
                } else {
                  setGlobalMute(true);
                }
              }}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isMuted
                  ? 'border-white/5 text-zinc-500 hover:text-zinc-300'
                  : 'border-accent-gold/35 text-accent-gold bg-accent-gold/5'
              }`}
              title={isMuted ? 'Enable Luxury Melodies' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Dark & Light Theme Switcher */}
            <button
              onClick={() => {
                toggleTheme();
                playLuxuryChime();
              }}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDarkMode
                  ? 'border-white/5 text-zinc-400 hover:text-white'
                  : 'border-black/5 text-zinc-600 hover:text-black bg-zinc-50'
              }`}
              title={isDarkMode ? 'Platinum White Mode' : 'Obsidian Black Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* CTA Consulting */}
            <button
              onClick={() => handleNavClick('consultation-form-section')}
              className={`hidden md:flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest px-4 py-2 border transition-all duration-500 rounded-full ${
                isDarkMode
                  ? 'border-accent-gold/40 hover:border-accent-gold text-accent-gold bg-accent-gold/5 hover:bg-accent-gold/10'
                  : 'border-accent-bronze/40 hover:border-accent-bronze text-accent-bronze hover:bg-accent-bronze/5'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Register Salon</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playLuxuryChime();
              }}
              className={`lg:hidden w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDarkMode ? 'border-white/5 text-white' : 'border-black/5 text-zinc-800'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 w-full h-screen z-40 pt-24 px-6 md:px-12 ${
              isDarkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-950'
            } flex flex-col justify-between pb-12`}
          >
            <div className="space-y-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block border-b border-zinc-800 pb-2">
                Diamond House Navigation
              </span>
              <nav className="flex flex-col gap-6">
                {menuItems.map((item, index) => (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left text-2xl font-serif font-light tracking-wide text-zinc-300 hover:text-accent-gold transition"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <button
                onClick={() => handleNavClick('consultation-form-section')}
                className="w-full py-4 text-center rounded-lg border border-accent-gold/50 text-accent-gold text-xs uppercase font-mono tracking-widest bg-accent-gold/5"
              >
                Book Private Consultation
              </button>
              
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                <span>Direct Sourced</span>
                <span>•</span>
                <span>Crafted in Surat</span>
                <span>•</span>
                <span>GIA Certified</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
