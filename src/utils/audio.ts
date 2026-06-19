/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Global muted flag that can be set reactive by the UI
let isMutedGlobal = true;

export function setGlobalMute(muted: boolean) {
  isMutedGlobal = muted;
}

export function playLuxuryChime(type: 'sparkle' | 'consultation' | 'click' = 'click') {
  if (isMutedGlobal) return;

  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Standard high-quality crystal bell sound using additive synthesis
    const now = ctx.currentTime;

    if (type === 'sparkle') {
      // 3 rapid cascading high frequencies (shimmering diamond light)
      const freqs = [1800, 2400, 3200];
      reqSparkleCascade(ctx, freqs, now);
    } else if (type === 'consultation') {
      // Deep elegant resonance followed by a pleasant warm tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now); // E4
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.3); // E5

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 1.2);
    } else {
      // Gentle micro bell response for hovers and soft clicks
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now); // F#6 crystal bell tone
      
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(440, now); // Warm base A4
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      subOsc.start();
      osc.stop(now + 0.4);
      subOsc.stop(now + 0.4);
    }
  } catch (error) {
    console.warn("Audio Context playback failed or blocked by autoplay settings.", error);
  }
}

function reqSparkleCascade(ctx: AudioContext, freqs: number[], startTime: number) {
  freqs.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = index * 0.08;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime + delay);

    gain.gain.setValueAtTime(0, startTime + delay);
    gain.gain.linearRampToValueAtTime(0.05, startTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + delay + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime + delay);
    osc.stop(startTime + delay + 0.52);
  });
}
