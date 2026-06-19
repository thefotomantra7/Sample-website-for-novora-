/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

// 1. Golden Gradient SVG Definition
export function GoldGradientDefs() {
  return (
    <svg className="absolute w-0 h-0" width="0" height="0">
      <defs>
        <linearGradient id="novaraGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBA73" />
          <stop offset="30%" stopColor="#FDF1D6" />
          <stop offset="70%" stopColor="#CBB16C" />
          <stop offset="100%" stopColor="#96752F" />
        </linearGradient>
        <radialGradient id="novaraGoldRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF1D6" />
          <stop offset="45%" stopColor="#D8BA77" />
          <stop offset="85%" stopColor="#96752F" />
          <stop offset="100%" stopColor="#634B19" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// 2. The Official Emblem (Monogram Circle)
export function NovaraEmblem({ className = "w-10 h-10", isDark = true }: LogoProps) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="novaraGoldInternal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA73" />
            <stop offset="30%" stopColor="#FDF1D6" />
            <stop offset="70%" stopColor="#CBB16C" />
            <stop offset="100%" stopColor="#96752F" />
          </linearGradient>
        </defs>
        
        {/* Outer Elegant Circle border with gold gradient */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="url(#novaraGoldInternal)" 
          strokeWidth="1.2" 
          className="opacity-90"
        />
        <circle 
          cx="50" 
          cy="50" 
          r="43.5" 
          fill="none" 
          stroke="url(#novaraGoldInternal)" 
          strokeWidth="0.4" 
          className="opacity-40"
        />

        {/* Serif Monogram "N" Custom Path for ultimate elegance */}
        {/* A beautifully crafted geometric serif N with traditional flares */}
        <path
          d="
            M 36 29 L 36 71
            M 31.5 29 H 40.5
            M 31.5 71 H 40.5
            M 36.5 31.5 L 63.5 68.5
            M 64 29 L 64 71
            M 59.5 29 H 68.5
            M 59.5 71 H 68.5
          "
          stroke="url(#novaraGoldInternal)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 4-pointed Flare Sparkle inside N's left pocket */}
        <path
          d="M 47.5 45 Q 47.5 49 43.5 49 Q 47.5 49 47.5 53 Q 47.5 49 51.5 49 Q 47.5 49 47.5 45 Z"
          fill="url(#novaraGoldInternal)"
        />

      </svg>
    </div>
  );
}

// 3. Complete Official Logo combining Monogram and Wordmark
export function NovaraLogoFull({ className = "w-48 h-48" }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Upper Medallion Emblem */}
      <NovaraEmblem className="w-24 h-24 mb-4" />
      
      {/* Novara Serif Wordmark */}
      <h2 
        className="font-serif text-3xl md:text-4xl font-light tracking-[0.25em] text-white uppercase leading-none select-none"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
      >
        NOVARA
      </h2>

      {/* Thin Gold Separators and subtext */}
      <div className="flex items-center gap-2 mt-2.5 w-full max-w-[210px] select-none opacity-80">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-accent-gold/60" />
        <span className="font-mono text-[8px] uppercase tracking-[0.45em] text-accent-gold/90 font-medium shrink-0">
          FINE JEWELLERY
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-accent-gold/60" />
      </div>

      {/* Tiny bottom gold star */}
      <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 mt-2.5 opacity-70">
        <path
          d="M 50 30 Q 50 50 30 50 Q 50 50 50 70 Q 50 50 70 50 Q 50 50 50 30 Z"
          fill="url(#novaraGold)"
        />
      </svg>
    </div>
  );
}
