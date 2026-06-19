/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playLuxuryChime } from '../utils/audio';
import { Mail, Phone, MapPin, Sparkles, ShieldCheck, Clock, User, Award, CheckCircle2 } from 'lucide-react';
import { ConsultationSubmission } from '../types';

export default function ConsultationForm() {
  const [formData, setFormData] = useState<ConsultationSubmission>({
    name: '',
    phone: '',
    email: '',
    city: '',
    interestedProduct: 'Diamond Rings',
    budgetRange: '25k - 50k',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');

  const BUDGET_OPTS = [
    { label: 'Under $10,000', value: '10k' },
    { label: '$10,000 - $25,000', value: '10k - 25k' },
    { label: '$25,000 - $50,000', value: '25k - 50k' },
    { label: '$50,050 - $100,000', value: '50k - 100k' },
    { label: 'Platinum Portfolio ($100,000+)', value: '100k+' }
  ];

  const PRODUCT_OPTS = [
    'Diamond Rings',
    'Bridal Collection',
    'Engagement Collection',
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Bespoke Jewellery'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    playLuxuryChime('sparkle');

    // Simulate luxury API response with high-end loading and randomized reference code
    setTimeout(() => {
      const randomRef = 'NVR-' + Math.floor(Math.random() * 90000 + 10000) + '-GIA';
      setBookingReference(randomRef);
      setIsSubmitting(false);
      setIsSuccess(true);
      playLuxuryChime('consultation');
    }, 2000);
  };

  return (
    <section id="consultation-form-section" className="py-24 border-t border-white/5 bg-gradient-to-b from-obsidian to-zinc-950 relative">
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Informational salon registration block (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold block mb-3 font-semibold">Private Salon Requests</span>
              <h2 className="font-serif text-4xl font-light tracking-wide text-white leading-tight mb-4">
                Arrange A Private Viewing
              </h2>
              <div className="w-16 h-[1px] bg-accent-gold mb-6" />
              <p className="text-zinc-400 text-sm md:text-base font-sans font-light leading-relaxed mb-6">
                Register to establish secure channels with our gemstone stewards. Private viewing rooms reside inside our secure offices in London, Zurich, Geneva, and our flagship design house in Surat.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/5 bg-zinc-950/40 flex items-center justify-center text-accent-gold shadow">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-zinc-200">Stewarding Turnarounds</h4>
                  <p className="text-zinc-500 text-xs font-light leading-normal mt-0.5">
                    Private concierges respond to client inquiries within three business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/5 bg-zinc-950/40 flex items-center justify-center text-accent-gold shadow">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-zinc-200">NDAs & Insured Delivery</h4>
                  <p className="text-zinc-500 text-xs font-light leading-normal mt-0.5">
                    All custom design consultations and secure shipments are protected under strict NDA and complete global insurance coverage.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom contact info */}
            <div className="border-t border-white/5 pt-6 text-[11px] font-mono text-zinc-600 uppercase flex flex-col md:flex-row gap-4 items-start md:items-center">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-zinc-700" /> +41 (0) 44 928 1000</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-zinc-700" /> concierge@novara.diamonds</span>
            </div>
          </div>

          {/* Form and Submission layout (Right 7 Cols) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
            <div className="luxury-glass bg-zinc-950 rounded-2xl p-6 md:p-10 border-white/5 shadow-2 shadow-black relative overflow-hidden min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="consultation-form"
                    onSubmit={handleBookingSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Lady / Sir Vance"
                            className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-650 transition focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Secure Mobile Coordinate</label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+44 7911 123456"
                          className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-650 transition focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Secure Email Coordinate</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="client@portfolio.com"
                          className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-650 transition focus:outline-none"
                        />
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">City of Residence</label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Singapore / Zurich / Surat"
                          className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-650 transition focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Product selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Product of Interest</label>
                        <select
                          id="enquiry-product-selector"
                          name="interestedProduct"
                          value={formData.interestedProduct}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-2.5 text-xs text-zinc-300 transition focus:outline-none appearance-none font-mono cursor-pointer"
                        >
                          {PRODUCT_OPTS.map((opt) => (
                            <option key={opt} value={opt} className="bg-zinc-950 text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Budget selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Indicated Budget Tier</label>
                        <select
                          id="enquiry-budget-range"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-2.5 text-xs text-zinc-300 transition focus:outline-none appearance-none font-mono cursor-pointer"
                        >
                          {BUDGET_OPTS.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-zinc-950 text-white">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Bespoke Specifications / Special Requests</label>
                      <textarea
                        id="enquiry-message-area"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Detail carat preferences, custom gold alloys, size specifications, or location requirements..."
                        className="w-full bg-zinc-900/60 border border-white/5 focus:border-accent-gold rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-650 transition focus:outline-none resize-none font-sans"
                      />
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-gold via-accent-gold to-accent-bronze hover:brightness-110 text-black font-semibold uppercase font-mono text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4.5 h-4.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            <span>Clearing secure channels...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 fill-black" />
                            <span>Request Salon Appointment</span>
                          </>
                        )}
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    key="consultation-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="text-center space-y-6 flex flex-col justify-center items-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-gold/10 border border-accent-gold/40 flex items-center justify-center text-accent-gold mb-2 shadow shadow-black">
                      <CheckCircle2 className="w-8 h-8 animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent-gold block">Registry Entry Confirmed</span>
                      <h3 className="font-serif text-3xl font-light text-white tracking-wide">
                        Appointment Requested
                      </h3>
                      <p className="text-zinc-400 text-xs font-sans font-light max-w-sm mx-auto leading-relaxed">
                        We have logged your portfolio in the secure Novara Client Registry. A private gemstone steward is analyzing your specifications. We will initiate contact on secure lines shortly.
                      </p>
                    </div>

                    {/* Receipt ticket panel */}
                    <div className="bg-zinc-950 p-5 rounded-xl border border-white/5 w-full max-w-sm space-y-3.5 text-left">
                      <div className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                        <span className="text-zinc-500 uppercase">Registry Account</span>
                        <span className="text-zinc-300 font-bold">{formData.name}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                        <span className="text-zinc-500 uppercase">Secure Code Reference</span>
                        <span className="text-accent-gold font-bold">{bookingReference}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-2">
                        <span className="text-zinc-500 uppercase">Assigned Hub</span>
                        <span className="text-zinc-300">Surat Design Office</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-zinc-500 uppercase">Estimated Response Wait</span>
                        <span className="text-white">Under 3 Hours</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          city: '',
                          interestedProduct: 'Diamond Rings',
                          budgetRange: '25k - 50k',
                          message: ''
                        });
                        playLuxuryChime();
                      }}
                      className="px-6 py-2.5 rounded-lg border border-white/5 text-zinc-500 hover:text-white hover:border-white/10 text-[10px] font-mono uppercase tracking-widest transition"
                    >
                      Registry Re-Entry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
