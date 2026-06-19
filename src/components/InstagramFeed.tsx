/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { InstagramPost } from '../types';

const INSTAGRAM_FEED: InstagramPost[] = [
  {
    id: 'p1',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    likes: '14.8k',
    comments: '512',
    caption: 'The Novara Sovereign Crown Ring — custom hand-detailed 18k yellow gold and immaculate 3.5ct brilliant-cut solitaire diamond. #NovaraDiamonds #SuratAtelier #LuxuryDetailing'
  },
  {
    id: 'p2',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop',
    likes: '9.3k',
    comments: '210',
    caption: 'Delicate facet calibration and micro-surface polishing inside our high-precision Surat workshop facility. Crafting the perfect angle of fire. #MasterCraftsmanship #Gemology'
  },
  {
    id: 'p3',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    likes: '24.5k',
    comments: '1.2k',
    caption: 'Selecting flawless, premium quality rough crystals of white fire to prepare for custom bridal collection creations. Ethical origin tracked by secure ledger. #BridalCollection #GiaCertified'
  },
  {
    id: 'p4',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    likes: '18.2k',
    comments: '402',
    caption: 'A breathtaking custom halo-cut platinum ring resting on silk, waiting for secure insured delivery to its destination salon viewing suite. #BespokeAtelier #PureOpulence'
  },
  {
    id: 'p5',
    imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop',
    likes: '21.1k',
    comments: '638',
    caption: 'Exquisite clarity assessment under shifting white spotlights. Displaying ideal symmetrical refraction and unmatched fire. #DFlawless #RefractionTests #DiamondLustre'
  }
];

export default function InstagramFeed() {
  const handleFeedRedirect = () => {
    playLuxuryChime();
    window.open('https://www.instagram.com/novara.diamonds', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-24 border-t border-white/5 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title / Anchor Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3 font-semibold">Live Social Ledger</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
              The Digital Journal
            </h2>
            <p className="text-zinc-500 font-sans text-sm font-light max-w-md mt-2">
              Follow our daily operations, design progress reports, and boutique collection releases on Instagram.
            </p>
          </div>

          <button
            onClick={handleFeedRedirect}
            className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-accent-gold text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white rounded-full bg-zinc-950/35 transition cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-accent-gold" />
            <span>@novara.diamonds</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </button>
        </div>

        {/* Mosaic Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {INSTAGRAM_FEED.map((post) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={post.id}
              onClick={handleFeedRedirect}
              className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-white/5 cursor-pointer group shadow shadow-black"
            >
              {/* Actual Image Tag Rendering with Referrer Policy protection as per skill requirements */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0"
              />

              {/* Image Overlay Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 z-10 flex flex-col justify-end p-4" />

              {/* Shimmer light bar across post */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-20" />

              {/* Floating Instagram Icon indicator on top corner */}
              <div className="absolute top-3 right-3 z-20 opacity-40 group-hover:opacity-100 transition duration-300">
                <Instagram className="w-4 h-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              </div>

              {/* Details card content showing when hovered */}
              <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-3 group-hover:translate-y-0 text-left">
                <div className="flex items-center gap-4 mb-2">
                  <span className="flex items-center gap-1 font-mono text-xs text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <MessageCircle className="w-3.5 h-3.5 text-sky-400 fill-none" /> {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-300 leading-tight line-clamp-2 font-sans font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {post.caption}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
