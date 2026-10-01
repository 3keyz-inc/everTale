// Web Audio API Synth with multiple ambient soundscapes
export type SoundscapeMode = 'celestial' | 'lullaby' | 'ocean' | 'forest';

export interface SoundscapeOption {
  id: SoundscapeMode;
  name: string;
  description: string;
  icon: string;
}

export const SOUNDSCAPE_OPTIONS: SoundscapeOption[] = [
  {
    id: 'celestial',
    name: 'Celestial Chimes',
    description: 'Zephyr’s mystical pentatonic chimes & warm atmospheric drone',
    icon: '✨',
  },
  {
    id: 'lullaby',
    name: 'Stardust Harp & Lullaby',
    description: 'Gentle warm harp arpeggios & soothing bed-time pad',
    icon: '🌙',
  },
  {
    id: 'ocean',
    name: 'Cosmic Ocean Waves',
    description: 'Rhythmic starlight tide swells & soft dream bells',
    icon: '🌊',
  },
  {
    id: 'forest',
    name: 'Sanctuary Night Breeze',
    description: 'Soft whispering nocturnal breeze & resonant crystal bowl notes',
    icon: '🍃',
  },
];

class MysticalAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMode: SoundscapeMode = 'celestial';
  private timerId: any = null;
  private waveTimerId: any = null;
  private activeNodes: (OscillatorNode | AudioBufferSourceNode | GainNode | BiquadFilterNode)[] = [];

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentMode(): SoundscapeMode {
    return this.currentMode;
  }

  public setSoundscape(mode: SoundscapeMode) {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.restartCurrentSoundscape();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.startBackgroundSound();
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.clearTimers();
    this.stopActiveNodes();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  private restartCurrentSoundscape() {
    this.clearTimers();
    this.stopActiveNodes();
    if (this.ctx && this.isPlaying) {
      this.startBackgroundSound();
    }
  }

  private clearTimers() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.waveTimerId) {
      clearInterval(this.waveTimerId);
      this.waveTimerId = null;
    }
  }

  private stopActiveNodes() {
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch (e) {
        // ignore already stopped nodes
      }
    });
    this.activeNodes = [];
  }

  private startBackgroundSound() {
    if (!this.ctx) return;

    switch (this.currentMode) {
      case 'celestial':
        this.startCelestialDrone();
        this.scheduleCelestialChimes();
        break;
      case 'lullaby':
        this.startLullabyPad();
        this.scheduleHarpNotes();
        break;
      case 'ocean':
        this.startOceanSwells();
        this.scheduleDreamBells();
        break;
      case 'forest':
        this.startForestBreeze();
        this.scheduleCrystalBowl();
        break;
    }
  }

  // MODE 1: CELESTIAL
  private startCelestialDrone() {
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(108, this.ctx.currentTime); // A2

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(162, this.ctx.currentTime); // E3 fifth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();

    this.activeNodes.push(osc1, osc2, gain, filter);
  }

  private scheduleCelestialChimes() {
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5 pentatonic
    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      this.playChimeNote(freq);
    }, 2400);
  }

  // MODE 2: LULLABY & HARP
  private startLullabyPad() {
    if (!this.ctx) return;
    const root = this.ctx.createOscillator();
    const third = this.ctx.createOscillator();
    const fifth = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    root.type = 'sine';
    root.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3

    third.type = 'sine';
    third.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3

    fifth.type = 'sine';
    fifth.frequency.setValueAtTime(196.00, this.ctx.currentTime); // G3

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.035, this.ctx.currentTime);

    root.connect(filter);
    third.connect(filter);
    fifth.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    root.start();
    third.start();
    fifth.start();

    this.activeNodes.push(root, third, fifth, gain, filter);
  }

  private scheduleHarpNotes() {
    // Warm F major 7 / C pentatonic harp notes
    const harpNotes = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99];
    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = harpNotes[Math.floor(Math.random() * harpNotes.length)];
      this.playPluckedHarp(freq);
    }, 1800);
  }

  private playPluckedHarp(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 1.5);

    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  // MODE 3: COSMIC OCEAN & DREAM WAVES
  private startOceanSwells() {
    if (!this.ctx) return;

    // Synthesize gentle ocean wave noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();

    // Modulate cutoff to simulate ocean wave swelling
    this.waveTimerId = setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      filter.frequency.linearRampToValueAtTime(450, now + 3);
      gain.gain.linearRampToValueAtTime(0.04, now + 3);
      filter.frequency.linearRampToValueAtTime(120, now + 7);
      gain.gain.linearRampToValueAtTime(0.008, now + 7);
    }, 8000);

    this.activeNodes.push(whiteNoise, filter, gain);
  }

  private scheduleDreamBells() {
    const bellNotes = [440, 554.37, 659.25, 880, 1108.73];
    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = bellNotes[Math.floor(Math.random() * bellNotes.length)];
      this.playChimeNote(freq);
    }, 3200);
  }

  // MODE 4: SANCTUARY FOREST & CRYSTAL BOWL
  private startForestBreeze() {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(80, this.ctx.currentTime); // Sub rumble

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);

    osc1.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();

    this.activeNodes.push(osc1, gain, filter);
  }

  private scheduleCrystalBowl() {
    const bowlNotes = [293.66, 369.99, 440.00, 587.33, 739.99]; // D major pentatonic
    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = bowlNotes[Math.floor(Math.random() * bowlNotes.length)];
      this.playCrystalSingingBowl(freq);
    }, 2800);
  }

  private playCrystalSingingBowl(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Pure crystal bowl long resonance envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 4.6);
  }

  public playChimeNote(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 3.1);
  }
}

export const audioSynth = new MysticalAudioSynth();

