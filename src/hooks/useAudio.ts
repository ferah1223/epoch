/**
 * EPOCH Audio Engine v2.0
 * 
 * Three-layer audio system:
 * 1. Ambient Music — per-act synthesized atmospheric pads/drones
 * 2. Sound Effects — Web Audio synthesized (rain, thunder, heartbeat, phone, door, typewriter)
 * 3. Narration — pre-recorded TTS voiceover per act
 * 
 * All layers crossfade smoothly between acts.
 */

// ============================================================
// TYPES
// ============================================================
export type SfxName = 'heartbeat' | 'phone' | 'thunder' | 'door' | 'typewriter' | 'rain_start' | 'rain_stop'

export interface AudioEngine {
  muted: boolean
  toggle: () => void
  playSfx: (name: SfxName) => void
  playNarration: (act: number) => void
  stopNarration: () => void
  narrationPlaying: boolean
  setVolume: (layer: 'ambient' | 'sfx' | 'narration', value: number) => void
}

// ============================================================
// PER-ACT AMBIENT CONFIG
// ============================================================
interface AmbientConfig {
  /** Base frequency in Hz */
  baseFreq: number
  /** Oscillator type */
  waveType: OscillatorType
  /** Harmonic ratios (multiplied by baseFreq) */
  harmonics: number[]
  /** Master gain (0-1) */
  gain: number
  /** LFO rate in Hz (subtle pitch wobble) */
  lfoRate: number
  /** LFO depth (semitones) */
  lfoDepth: number
  /** Filter cutoff (0-1 normalized) */
  filterCutoff: number
  /** Reverb amount (0-1) */
  reverbMix: number
  /** Description (for debug) */
  mood: string
}

const ACT_AMBIENTS: Record<number, AmbientConfig> = {
  0: {
    baseFreq: 55, waveType: 'sine',
    harmonics: [1, 1.5, 2, 3],
    gain: 0.02, lfoRate: 0.15, lfoDepth: 0.3,
    filterCutoff: 0.3, reverbMix: 0.6,
    mood: 'Deep calm, lonely night'
  },
  1: {
    baseFreq: 65, waveType: 'sine',
    harmonics: [1, 1.5, 2, 2.5],
    gain: 0.025, lfoRate: 0.25, lfoDepth: 0.5,
    filterCutoff: 0.35, reverbMix: 0.5,
    mood: 'Tension rising, unease'
  },
  2: {
    baseFreq: 73.4, waveType: 'triangle',
    harmonics: [1, 1.33, 2, 2.67],
    gain: 0.022, lfoRate: 0.2, lfoDepth: 0.4,
    filterCutoff: 0.4, reverbMix: 0.55,
    mood: 'Investigation, mystery'
  },
  3: {
    baseFreq: 82.4, waveType: 'sawtooth',
    harmonics: [1, 1.5],
    gain: 0.018, lfoRate: 0.4, lfoDepth: 0.8,
    filterCutoff: 0.25, reverbMix: 0.4,
    mood: 'Urgency, pursuit'
  },
  4: {
    baseFreq: 49, waveType: 'sine',
    harmonics: [1, 1.5, 2, 2.5, 3, 4],
    gain: 0.035, lfoRate: 0.1, lfoDepth: 0.2,
    filterCutoff: 0.5, reverbMix: 0.7,
    mood: 'Emotional peak, devastation'
  },
  5: {
    baseFreq: 43.65, waveType: 'sine',
    harmonics: [1, 1.5, 2, 2.67],
    gain: 0.015, lfoRate: 0.08, lfoDepth: 0.15,
    filterCutoff: 0.35, reverbMix: 0.65,
    mood: 'Resolution, bittersweet peace'
  },
}

// ============================================================
// NARRATION FILE MAP
// ============================================================
const NARRATION_FILES: Record<number, string> = {
  0: '/audio/narration/prologue.ogg',
  1: '/audio/narration/act1_call.ogg',
  2: '/audio/narration/act2_scene.ogg',
  3: '/audio/narration/act3_hunt.ogg',
  4: '/audio/narration/act4_truth.ogg',
  5: '/audio/narration/act5_end.ogg',
}

// ============================================================
// AUDIO ENGINE CLASS
// ============================================================
class EpochAudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  
  // Layer gains
  private ambientGain: GainNode | null = null
  private sfxGain: GainNode | null = null
  private narrationGain: GainNode | null = null
  
  // Ambient state
  private ambientOscillators: OscillatorNode[] = []
  private ambientLfo: OscillatorNode | null = null
  private ambientFilter: BiquadFilterNode | null = null
  private ambientReverb: ConvolverNode | null = null
  private currentAct: number = -1
  
  // Rain state
  private rainNoise: AudioBufferSourceNode | null = null
  private rainGain: GainNode | null = null
  private rainActive: boolean = false
  
  // Narration state
  private narrationAudio: HTMLAudioElement | null = null
  private narrationSource: MediaElementAudioSourceNode | null = null
  private _narrationPlaying: boolean = false
  
  // Public state
  muted: boolean = true
  narrationPlaying: boolean = false
  
  // Volume knobs
  private volumes = { ambient: 1, sfx: 1, narration: 1 }
  
  // ============================================================
  // INITIALIZATION
  // ============================================================
  private init(): AudioContext {
    if (this.ctx) return this.ctx
    
    this.ctx = new AudioContext()
    
    // Master gain
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0 // Start muted
    this.masterGain.connect(this.ctx.destination)
    
    // Layer gains
    this.ambientGain = this.ctx.createGain()
    this.ambientGain.gain.value = this.volumes.ambient
    this.ambientGain.connect(this.masterGain)
    
    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = this.volumes.sfx
    this.sfxGain.connect(this.masterGain)
    
    this.narrationGain = this.ctx.createGain()
    this.narrationGain.gain.value = this.volumes.narration
    this.narrationGain.connect(this.masterGain)
    
    // Create reverb impulse response
    this.createReverb()
    
    return this.ctx
  }
  
  // ============================================================
  // REVERB (Convolution)
  // ============================================================
  private createReverb(): void {
    if (!this.ctx) return
    
    const rate = this.ctx.sampleRate
    const length = rate * 2.5 // 2.5 second reverb tail
    const impulse = this.ctx.createBuffer(2, length, rate)
    
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        // Exponential decay with early reflections
        const t = i / rate
        const decay = Math.exp(-t * 3)
        const earlyReflections = t < 0.05 ? 0.8 : 1
        data[i] = (Math.random() * 2 - 1) * decay * earlyReflections
      }
    }
    
    this.ambientReverb = this.ctx.createConvolver()
    this.ambientReverb.buffer = impulse
  }
  
  // ============================================================
  // AMBIENT MUSIC
  // ============================================================
  setAmbient(act: number): void {
    if (act === this.currentAct) return
    
    const ctx = this.init()
    const config = ACT_AMBIENTS[act] || ACT_AMBIENTS[0]
    
    // Clean up previous ambient
    this.cleanupAmbient()
    
    // Filter
    this.ambientFilter = ctx.createBiquadFilter()
    this.ambientFilter.type = 'lowpass'
    this.ambientFilter.frequency.value = config.filterCutoff * 2000 + 100
    this.ambientFilter.Q.value = 0.7
    
    // Dry/wet mix for reverb
    const dryGain = ctx.createGain()
    dryGain.gain.value = 1 - config.reverbMix * 0.5
    const wetGain = ctx.createGain()
    wetGain.gain.value = config.reverbMix * 0.5
    
    this.ambientFilter.connect(dryGain)
    dryGain.connect(this.ambientGain!)
    
    if (this.ambientReverb) {
      this.ambientFilter.connect(this.ambientReverb)
      this.ambientReverb.connect(wetGain)
      wetGain.connect(this.ambientGain!)
    }
    
    // LFO for subtle pitch modulation
    this.ambientLfo = ctx.createOscillator()
    this.ambientLfo.type = 'sine'
    this.ambientLfo.frequency.value = config.lfoRate
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = config.lfoDepth
    this.ambientLfo.connect(lfoGain)
    this.ambientLfo.start()
    
    // Create harmonic oscillators
    config.harmonics.forEach((ratio, i) => {
      const osc = ctx.createOscillator()
      osc.type = config.waveType
      osc.frequency.value = config.baseFreq * ratio
      
      // Connect LFO to frequency (subtle wobble)
      if (i === 0) {
        lfoGain.connect(osc.frequency)
      }
      
      // Each harmonic gets progressively quieter
      const harmonicGain = ctx.createGain()
      harmonicGain.gain.value = config.gain / (i + 1)
      
      // Fade in
      harmonicGain.gain.setValueAtTime(0, ctx.currentTime)
      harmonicGain.gain.linearRampToValueAtTime(
        config.gain / (i + 1),
        ctx.currentTime + 2
      )
      
      osc.connect(harmonicGain)
      harmonicGain.connect(this.ambientFilter!)
      osc.start()
      
      this.ambientOscillators.push(osc)
    })
    
    this.currentAct = act
  }
  
  private cleanupAmbient(): void {
    const ctx = this.ctx
    if (!ctx) return
    
    // Fade out existing oscillators
    this.ambientOscillators.forEach(osc => {
      try {
        osc.stop(ctx.currentTime + 1.5)
      } catch {}
    })
    this.ambientOscillators = []
    
    if (this.ambientLfo) {
      try { this.ambientLfo.stop(ctx.currentTime + 1.5) } catch {}
      this.ambientLfo = null
    }
    
    this.ambientFilter = null
  }
  
  // ============================================================
  // SOUND EFFECTS
  // ============================================================
  playSfx(name: SfxName): void {
    if (this.muted) return
    
    const ctx = this.init()
    const now = ctx.currentTime
    
    switch (name) {
      case 'heartbeat':
        this.playHeartbeat(ctx, now)
        break
      case 'phone':
        this.playPhone(ctx, now)
        break
      case 'thunder':
        this.playThunder(ctx, now)
        break
      case 'door':
        this.playDoor(ctx, now)
        break
      case 'typewriter':
        this.playTypewriter(ctx, now)
        break
      case 'rain_start':
        this.startRain(ctx)
        break
      case 'rain_stop':
        this.stopRain()
        break
    }
  }
  
  private playHeartbeat(ctx: AudioContext, now: number): void {
    // Double thump: lub-dub
    for (let i = 0; i < 2; i++) {
      const offset = i * 0.15
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(45, now + offset)
      osc.frequency.exponentialRampToValueAtTime(25, now + offset + 0.15)
      
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, now + offset)
      gain.gain.linearRampToValueAtTime(0.4, now + offset + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.25)
      
      osc.connect(gain)
      gain.connect(this.sfxGain!)
      osc.start(now + offset)
      osc.stop(now + offset + 0.3)
    }
  }
  
  private playPhone(ctx: AudioContext, now: number): void {
    // Ring: two tones at 440Hz + 480Hz, on-off pattern
    for (let burst = 0; burst < 3; burst++) {
      const burstStart = now + burst * 1.0
      
      for (const freq of [440, 480]) {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, burstStart)
        gain.gain.linearRampToValueAtTime(0.15, burstStart + 0.05)
        gain.gain.setValueAtTime(0.15, burstStart + 0.4)
        gain.gain.linearRampToValueAtTime(0, burstStart + 0.45)
        
        osc.connect(gain)
        gain.connect(this.sfxGain!)
        osc.start(burstStart)
        osc.stop(burstStart + 0.5)
      }
    }
  }
  
  private playThunder(ctx: AudioContext, now: number): void {
    // Noise burst with low-pass filter sweep
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    
    const source = ctx.createBufferSource()
    source.buffer = buffer
    
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(100, now + 1.5)
    filter.Q.value = 1
    
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.5, now + 0.05)
    gain.gain.setValueAtTime(0.5, now + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2)
    
    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.sfxGain!)
    source.start(now)
    source.stop(now + 2)
  }
  
  private playDoor(ctx: AudioContext, now: number): void {
    // Impact + resonance
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(120, now)
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2)
    
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.5, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
    
    // Add noise for texture
    const noiseLen = ctx.sampleRate * 0.1
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate)
    const noiseData = noiseBuf.getChannelData(0)
    for (let i = 0; i < noiseLen; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.1))
    }
    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuf
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.3
    
    osc.connect(gain)
    gain.connect(this.sfxGain!)
    noise.connect(noiseGain)
    noiseGain.connect(this.sfxGain!)
    
    osc.start(now)
    osc.stop(now + 0.5)
    noise.start(now)
    noise.stop(now + 0.1)
  }
  
  private playTypewriter(ctx: AudioContext, now: number): void {
    // Click: short noise burst
    const len = ctx.sampleRate * 0.03
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.15))
    }
    
    const source = ctx.createBufferSource()
    source.buffer = buf
    
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2000
    filter.Q.value = 2
    
    const gain = ctx.createGain()
    gain.gain.value = 0.25
    
    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.sfxGain!)
    source.start(now)
  }
  
  // ============================================================
  // RAIN (Continuous)
  // ============================================================
  private startRain(ctx: AudioContext): void {
    if (this.rainActive) return
    
    // Brown noise for rain
    const bufferSize = ctx.sampleRate * 4
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate)
    
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      let last = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        data[i] = last * 3.5
      }
    }
    
    this.rainNoise = ctx.createBufferSource()
    this.rainNoise.buffer = buffer
    this.rainNoise.loop = true
    
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 800
    
    this.rainGain = ctx.createGain()
    this.rainGain.gain.setValueAtTime(0, ctx.currentTime)
    this.rainGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2)
    
    this.rainNoise.connect(filter)
    filter.connect(this.rainGain)
    this.rainGain.connect(this.sfxGain!)
    this.rainNoise.start()
    
    this.rainActive = true
  }
  
  private stopRain(): void {
    if (!this.rainActive || !this.ctx || !this.rainGain || !this.rainNoise) return
    
    this.rainGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2)
    setTimeout(() => {
      try { this.rainNoise?.stop() } catch {}
      this.rainNoise = null
      this.rainGain = null
      this.rainActive = false
    }, 2500)
  }
  
  // ============================================================
  // NARRATION
  // ============================================================
  playNarration(act: number): void {
    const file = NARRATION_FILES[act]
    if (!file) return
    
    // Stop any existing narration
    this.stopNarration()
    
    if (!this.narrationAudio) {
      this.narrationAudio = new Audio()
      this.narrationAudio.addEventListener('ended', () => {
        this._narrationPlaying = false
        this.narrationPlaying = false
      })
    }
    
    this.narrationAudio.src = file
    this.narrationAudio.volume = 1
    
    // Connect to Web Audio for volume control
    if (this.ctx && !this.narrationSource) {
      this.narrationSource = this.ctx.createMediaElementSource(this.narrationAudio)
      this.narrationSource.connect(this.narrationGain!)
    }
    
    this.narrationAudio.play().then(() => {
      this._narrationPlaying = true
      this.narrationPlaying = true
    }).catch(() => {
      // Autoplay blocked — user needs to interact first
    })
  }
  
  stopNarration(): void {
    if (this.narrationAudio && this._narrationPlaying) {
      this.narrationAudio.pause()
      this.narrationAudio.currentTime = 0
      this._narrationPlaying = false
      this.narrationPlaying = false
    }
  }
  
  // ============================================================
  // MASTER CONTROLS
  // ============================================================
  toggle(): boolean {
    this.muted = !this.muted
    const ctx = this.init()
    
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(
        this.muted ? 0 : 1,
        ctx.currentTime + 0.3
      )
    }
    
    if (this.muted) {
      this.stopRain()
      this.stopNarration()
      if (ctx.state === 'running') {
        ctx.suspend()
      }
    } else {
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      // Start rain by default when unmuted
      this.startRain(ctx)
    }
    
    return !this.muted
  }
  
  setVolume(layer: 'ambient' | 'sfx' | 'narration', value: number): void {
    this.volumes[layer] = Math.max(0, Math.min(1, value))
    const gainNode = layer === 'ambient' ? this.ambientGain
                   : layer === 'sfx' ? this.sfxGain
                   : this.narrationGain
    if (gainNode && this.ctx) {
      gainNode.gain.linearRampToValueAtTime(this.volumes[layer], this.ctx.currentTime + 0.1)
    }
  }
  
  destroy(): void {
    this.cleanupAmbient()
    this.stopRain()
    this.stopNarration()
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
  }
}

// ============================================================
// SINGLETON
// ============================================================
let engine: EpochAudioEngine | null = null

export function getAudioEngine(): EpochAudioEngine {
  if (!engine) {
    engine = new EpochAudioEngine()
  }
  return engine
}

// React hook
import { useState, useCallback, useEffect, useRef } from 'react'

export function useAudio(act: number): AudioEngine {
  const [muted, setMuted] = useState(true)
  const [narrationPlaying, setNarrationPlaying] = useState(false)
  const engineRef = useRef<EpochAudioEngine>(null)
  
  useEffect(() => {
    engineRef.current = getAudioEngine()
    return () => {
      // Don't destroy singleton on unmount
    }
  }, [])
  
  // Update ambient when act changes
  useEffect(() => {
    if (engineRef.current && act >= 0 && !muted) {
      engineRef.current.setAmbient(act)
    }
  }, [act, muted])
  
  const toggle = useCallback(() => {
    const eng = getAudioEngine()
    const newState = eng.toggle()
    setMuted(!newState)
    if (newState && act >= 0) {
      eng.setAmbient(act)
    }
  }, [act])
  
  const playSfx = useCallback((name: SfxName) => {
    getAudioEngine().playSfx(name)
  }, [])
  
  const playNarration = useCallback((actNum: number) => {
    const eng = getAudioEngine()
    eng.playNarration(actNum)
    setNarrationPlaying(true)
  }, [])
  
  const stopNarration = useCallback(() => {
    getAudioEngine().stopNarration()
    setNarrationPlaying(false)
  }, [])
  
  const setVolume = useCallback((layer: 'ambient' | 'sfx' | 'narration', value: number) => {
    getAudioEngine().setVolume(layer, value)
  }, [])
  
  return {
    muted,
    toggle,
    playSfx,
    playNarration,
    stopNarration,
    narrationPlaying,
    setVolume,
  }
}
