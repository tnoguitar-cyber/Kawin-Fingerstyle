import { SynthNote } from '../types';

class AcousticGuitarEngine {
  private ctx: AudioContext | null = null;
  private isPlayingSequence = false;
  private sequenceTimeoutIds: number[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Converts Guitar String (1 = High E, 6 = Low E) and Fret to Frequency in Hz
  // Base open string frequencies in Hz (E2, A2, D3, G3, B3, E4)
  private getFrequency(stringNum: number, fret: number, tuning = 'Standard'): number {
    let openFreqs = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41]; // String 1 to 6

    if (tuning === 'DADGAD') {
      openFreqs = [293.66, 246.94, 196.00, 146.83, 110.00, 73.42];
    } else if (tuning === 'Drop D') {
      openFreqs = [329.63, 246.94, 196.00, 146.83, 110.00, 73.42];
    } else if (tuning === 'Open D') {
      openFreqs = [293.66, 220.00, 185.00, 146.83, 110.00, 73.42];
    }

    const openFreq = openFreqs[stringNum - 1] || 196.0;
    // Each fret is 1 semitone higher (2^(1/12))
    return openFreq * Math.pow(2, fret / 12);
  }

  public playNote(
    stringNum: number,
    fret: number,
    technique: 'pluck' | 'slap' | 'harmonic' | 'hammer' | 'pull' = 'pluck',
    duration = 1.2,
    tuning = 'Standard'
  ) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freq = this.getFrequency(stringNum, fret, tuning);

      if (technique === 'slap') {
        // Percussive body tap + string snap
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(120, now);
        filter.Q.setValueAtTime(3, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        whiteNoise.start(now);
      }

      // Guitar Pluck / Harmonic Synthesizer using Karplus-Strong approximation & dual oscillators
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      if (technique === 'harmonic') {
        // Chimey pure sine sound with higher octave
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq * 2, now);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 3, now);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.5);
      } else {
        // Rich acoustic string timbre (triangle + sawtooth with lowpass filter decay)
        osc1.type = 'triangle';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 1.002, now); // subtle warmth chorus

        // Pluck envelope
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        // Acoustic Body Resonance Lowpass Filter
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
      }

      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      if (technique !== 'harmonic') osc2.start(now);

      osc1.stop(now + duration + 0.1);
      if (technique !== 'harmonic') osc2.stop(now + duration + 0.1);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  public playSequence(
    notes: SynthNote[],
    tuning = 'Standard',
    tempoMultiplier = 1.0,
    onNoteHighlight?: (noteIndex: number | null) => void
  ) {
    this.stopSequence();
    this.initContext();
    this.isPlayingSequence = true;

    notes.forEach((note, index) => {
      const delayMs = (note.time * 1000) / tempoMultiplier;

      const timeoutId = window.setTimeout(() => {
        if (!this.isPlayingSequence) return;
        this.playNote(note.string, note.fret, note.technique || 'pluck', note.duration, tuning);
        if (onNoteHighlight) {
          onNoteHighlight(index);
        }
      }, delayMs);

      this.sequenceTimeoutIds.push(timeoutId);
    });

    // Schedule completion
    const lastNote = notes[notes.length - 1];
    const totalTimeMs = lastNote ? ((lastNote.time + 1.5) * 1000) / tempoMultiplier : 3000;
    const endTimeoutId = window.setTimeout(() => {
      this.isPlayingSequence = false;
      if (onNoteHighlight) onNoteHighlight(null);
    }, totalTimeMs);

    this.sequenceTimeoutIds.push(endTimeoutId);
  }

  public stopSequence() {
    this.isPlayingSequence = false;
    this.sequenceTimeoutIds.forEach((id) => clearTimeout(id));
    this.sequenceTimeoutIds = [];
  }

  public isRunningSequence(): boolean {
    return this.isPlayingSequence;
  }
}

export const audioEngine = new AcousticGuitarEngine();
