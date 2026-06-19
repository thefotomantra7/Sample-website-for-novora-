/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Volume2, VolumeX, ArrowUp, Star, Sparkles, MessageSquare } from 'lucide-react';

// Modular Luxury Components
import Navbar from './components/Navbar';
import { NovaraLogoFull, GoldGradientDefs } from './components/NovaraLogo';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import Craftsmanship from './components/Craftsmanship';
import Collections from './components/Collections';
import CustomDesign from './components/CustomDesign';
import WhyNovara from './components/WhyNovara';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';

import { playLuxuryChime, setGlobalMute } from './utils/audio';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showAudioInvite, setShowAudioInvite] = useState<boolean>(false);

  // Initializing state, loading screen, scroll observer
  useEffect(() => {
    // 1. Loading screen simulation for diamond sparkle initialization
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      // Show audio chime prompt banner 1 second after load completes
      setTimeout(() => setShowAudioInvite(true), 1500);
    }, 2800);

    // 2. Scroll to top visibility tracker
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScrollVisibility);

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  // Sync mute state with global utility
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    setGlobalMute(nextMute);
    if (!nextMute) {
      setTimeout(() => playLuxuryChime('sparkle'), 100);
    }
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    playLuxuryChime();
  };

  const handleScrollToSection = (id: string) => {
    playLuxuryChime();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentThemeClasses = isDarkMode
    ? 'bg-obsidian text-diamond'
    : 'bg-stone-50 text-neutral-900 transition-colors duration-500';

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative font-sans ${currentThemeClasses} ${
      !isDarkMode ? 'light-luxury-theme' : ''
    }`}>

      {/* A. PLATINUM INTRO LOADING PRELOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center text-center p-6"
          >
            {/* Global Gold Gradients */}
            <GoldGradientDefs />

            <div className="space-y-6 relative max-w-sm mx-auto">
              {/* Outer Elegant Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-gold/[0.03] rounded-full blur-[60px] -z-10 animate-pulse" />

              {/* Majestic Emblem and Wordmark Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <NovaraLogoFull className="w-56 h-56" />
                <span className="font-mono text-[8px] uppercase tracking-[0.45em] text-accent-gold/70 block -mt-2.5 animate-pulse">
                  Calibrating Masterpiece Facets...
                </span>
              </motion.div>

              {/* Minimal Luxury Progress Bar */}
              <div className="w-32 h-[1px] bg-white/10 mx-auto relative overflow-hidden mt-6">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-accent-gold to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. CORE EXPERIENCE SECTIONS */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="w-full overflow-x-hidden relative"
        >
          {/* 1. Navbar */}
          <Navbar
            isDarkMode={isDarkMode}
            toggleTheme={handleToggleTheme}
            isMuted={isMuted}
            toggleMute={handleToggleMute}
          />

          {/* 2. Hero banner */}
          <Hero isDarkMode={isDarkMode} />

          {/* 3. Story Section */}
          <StorySection />

          {/* 4. Craftsmanship Showcase */}
          <Craftsmanship />

          {/* 5. Signature Catalog Collections */}
          <Collections />

          {/* 7. Custom Ring Designer */}
          <CustomDesign />

          {/* 8. Comparative Advantage - Why Novara */}
          <WhyNovara />

          {/* 9. Client reviews */}
          <Testimonials />

          {/* 10. Social Masonry Grid */}
          <InstagramFeed />

          {/* 11. Salon Consultation Booking */}
          <ConsultationForm />

          {/* 12. Footer */}
          <Footer />

          {/* C. FLOATING PRIVATE ATELIER RING WIDGETS */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            
            {/* WhatsApp Integration Hotwire bubble */}
            <button
              onClick={() => {
                playLuxuryChime();
                window.open('https://wa.me/41449281000', '_blank', 'noreferrer,noopener');
              }}
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 group relative"
              title="Speak directly on WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-white text-emerald-500" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-zinc-950/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded text-[9px] uppercase tracking-widest text-zinc-300 font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow">
                WhatsApp Concierge
              </span>
            </button>

            {/* Quick Consultation Register floating trigger */}
            <button
              onClick={() => handleScrollToSection('consultation-form-section')}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-gold/85 to-accent-bronze hover:brightness-110 flex items-center justify-center text-black font-semibold shadow-xl border border-white/10 hover:scale-105 active:scale-95 transition cursor-pointer group relative"
              title="Arrange a safe viewing appointment"
            >
              <Calendar className="w-5 h-5 fill-none" />
              
              {/* Notification bubble badge */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-650 bg-red-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold animate-pulse border border-zinc-950">
                1
              </span>
              
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-zinc-950/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded text-[9px] uppercase tracking-widest text-zinc-300 font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow">
                Book Viewing Room
              </span>
            </button>

            {/* Scroll back up viewport */}
            {showScrollTop && (
              <button
                onClick={() => {
                  playLuxuryChime();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition shadow-xl hover:scale-105 cursor-pointer"
                title="Scroll back top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* D. CHIME AUDIO PROMPT REGISTRY POP OVER */}
          <AnimatePresence>
            {showAudioInvite && isMuted && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                className="fixed bottom-6 left-6 z-40 max-w-sm luxury-glass rounded-xl p-5 border-accent-gold/30 bg-gradient-to-br from-zinc-950 to-obsidian text-left flex items-start gap-4 shadow-2xl shadow-black"
              >
                <div className="w-9 h-9 rounded-full bg-accent-gold/10 border border-accent-gold/35 flex items-center justify-center text-accent-gold shrink-0 mt-0.5">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-white leading-snug">
                    Enable Sound Experience
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed font-light font-sans">
                    Enable organic high-frequency crystal bell tones on diamond rotations and interactions to experience the bespoke luxurious boutique atmosphere.
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => {
                        handleToggleMute();
                        setShowAudioInvite(false);
                      }}
                      className="px-3.5 py-1.5 bg-accent-gold hover:bg-accent-bronze text-black rounded font-mono text-[9px] uppercase font-bold transition duration-300 cursor-pointer"
                    >
                      Enable Audio
                    </button>
                    <button
                      onClick={() => setShowAudioInvite(false)}
                      className="px-3 py-1.5 border border-white/5 hover:border-white/10 text-zinc-500 hover:text-zinc-300 rounded font-mono text-[9px] uppercase transition duration-300 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}

      {/* Theme Override Styling helper for Light Silver luxury mode */}
      {!isDarkMode && (
        <style dangerouslySetInnerHTML={{ __html: `
          .light-luxury-theme body {
            background-color: #F9F9FB !important;
            color: #111112 !important;
          }
          .light-luxury-theme .luxury-glass {
            background: rgba(255, 255, 255, 0.82) !important;
            border-color: rgba(0, 0, 0, 0.05) !important;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02) !important;
          }
          .light-luxury-theme h1,
          .light-luxury-theme h2,
          .light-luxury-theme h3,
          .light-luxury-theme h4,
          .light-luxury-theme blockquote {
            color: #111112 !important;
          }
          .light-luxury-theme p {
            color: #4A4A50 !important;
          }
          .light-luxury-theme text-zinc-300 {
            color: #1A1A1E !important;
          }
          .light-luxury-theme .text-white {
            color: #111112 !important;
          }
          .light-luxury-theme .bg-zinc-950,
          .light-luxury-theme .bg-[#0A0A0B],
          .light-luxury-theme .bg-[#080809] {
            background-color: #ECECEF !important;
          }
          .light-luxury-theme .bg-obsidian {
            background-color: #F4F4F7 !important;
          }
          .light-luxury-theme .border-white\\/5 {
            border-color: rgba(0, 0, 0, 0.06) !important;
          }
          .light-luxury-theme .text-zinc-500 {
            color: #71717A !important;
          }
          .light-luxury-theme input,
          .light-luxury-theme select,
          .light-luxury-theme textarea {
            background-color: #FFFFFF !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
            color: #111112 !important;
          }
          .light-luxury-theme input::placeholder,
          .light-luxury-theme textarea::placeholder {
            color: #A0A0AB !important;
          }
        `}} />
      )}

    </div>
  );
}
