// Web Audio API ambient graduation music & sound effects synthesizer
// Completely self-contained, no external MP3 files needed!

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentNoteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Chime sound when breaking wax seal and opening envelope
  playEnvelopeOpenSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sparkling chime frequencies (pentatonic chord: C5, E5, G5, B5, C6)
      const freqs = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.3);
      });
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Soft button click chime
  playClickSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // ignore
    }
  }

  // Soothing background instrumental music loop (Pomp & Circumstance / Canon in D inspired graduation warmth)
  toggleBackgroundMusic(onStateChange) {
    this.init();
    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBackgroundMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startBackgroundMusic() {
    if (this.isPlayingMusic || !this.ctx) return;
    this.isPlayingMusic = true;

    // Gentle chord sequence (D major / Canon arpeggio: D, A, Bm, F#m, G, D, G, A)
    const melodyNotes = [
      // D
      { note: 293.66, dur: 0.6 }, { note: 369.99, dur: 0.4 }, { note: 440.00, dur: 0.6 }, { note: 587.33, dur: 0.8 },
      // A
      { note: 220.00, dur: 0.6 }, { note: 277.18, dur: 0.4 }, { note: 329.63, dur: 0.6 }, { note: 440.00, dur: 0.8 },
      // Bm
      { note: 246.94, dur: 0.6 }, { note: 293.66, dur: 0.4 }, { note: 369.99, dur: 0.6 }, { note: 493.88, dur: 0.8 },
      // F#m
      { note: 185.00, dur: 0.6 }, { note: 220.00, dur: 0.4 }, { note: 277.18, dur: 0.6 }, { note: 369.99, dur: 0.8 },
      // G
      { note: 196.00, dur: 0.6 }, { note: 246.94, dur: 0.4 }, { note: 293.66, dur: 0.6 }, { note: 392.00, dur: 0.8 },
      // D
      { note: 293.66, dur: 0.6 }, { note: 369.99, dur: 0.4 }, { note: 440.00, dur: 0.6 }, { note: 587.33, dur: 0.8 },
      // G
      { note: 196.00, dur: 0.6 }, { note: 293.66, dur: 0.4 }, { note: 392.00, dur: 0.6 }, { note: 493.88, dur: 0.8 },
      // A
      { note: 220.00, dur: 0.6 }, { note: 277.18, dur: 0.4 }, { note: 329.63, dur: 0.6 }, { note: 440.00, dur: 0.8 }
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const item = melodyNotes[noteIdx];
      const now = this.ctx.currentTime;

      // Soft celesta / piano timbre
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(item.note * 2, now); // harmonic overtone

      const noteDuration = item.dur * 0.9;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration + 0.8);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + noteDuration + 0.9);
      osc2.stop(now + noteDuration + 0.9);

      noteIdx = (noteIdx + 1) % melodyNotes.length;
      this.musicTimer = setTimeout(playNext, item.dur * 700);
    };

    playNext();
  }

  stopBackgroundMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const soundManager = new SoundManager();
