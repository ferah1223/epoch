import { useEffect, useRef, useState, useCallback } from 'react'

interface AudioEngine {
  muted: boolean
  toggle: () => void
  // Trigger a sound effect
  playSfx: (name: SfxName) => void
}

type SfxName = 'heartbeat' | 'phone' | 'thunder' | 'door' | 'typewriter'

// Per-act ambient configurations
const ACT_AMBIENTS: Record<number, { freq: number; gain: number; type: OscillatorType; harmonics?: number[] }> = {
  0: { freq: 55, gain: 0.025, type: 'sine', harmonics: [82.5, 110] },      // Prologue - deep calm
  1: { freq: 65, gain: 0.035, type: 'sine', harmonics: [97.5, 130] },      // Call - tension rising
  2: { freq: 75, gain: 0.03, type: 'triangle', harmonics: [112.5, 150] },  // Scene - investigation
  3: { freq: 85, gain: 0.04, type: 'sawtooth', harmonics: [127.5] },       // Hunt - urgency
  4: { freq: 50, gain: 0.06, type: 'sine', harmonics: [75, 100, 150] },   // Truth - emotional peak
  5: { freq: 45, gain: 0.02, type: 'sine', harmonics: [67.5, 90] },       // End - resolution
}

export function useAudio(act: number): AudioEngine {
  const [muted, setMuted] = useState(true)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const prevActRef = useRef(-1)

  // Clean up all oscillators
  const cleanup = useCallback(() => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop() } catch {}
    })
    oscillatorsRef.current = []
  }, [])

  // Create ambient for current act
  const createAmbient = useCallback((actNum: number) => {
    const ctx = ctxRef.current
    const master = masterGainRef.current
    if (!ctx || !master) return

    cleanup()

    const config = ACT_AMBIENTS[actNum] || ACT_AMBIENTS[0]

    // Main oscillator
    const osc = ctx.createOscillator()
    osc.type = config.type
    osc.frequency.value = config.freq

    const gainNode = ctx.createGain()
    gainNode.gain.value = config.gain

    osc.connect(gainNode)
    gainNode.connect(master)
    osc.start()
    oscillatorsRef.current.push(osc)

    // Harmonics
    if (config.harmonics) {
      config.harmonics.forEach((freq, i) => {
        const hosc = ctx.createOscillator()
        hosc.type = 'sine'
        hosc.frequency.value = freq

        const hgain = ctx.createGain()
        hgain.gain.value = config.gain * (0.3 / (i + 1))

        hosc.connect(hgain)
        hgain.connect(master)
        hosc.start()
        oscillatorsRef.current.push(hosc)
      })
    }

    // Smooth gain transition
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 2)
  }, [cleanup])

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (ctxRef.current) {
      setMuted(!muted)
      if (masterGainRef.current) {
        masterGainRef.current.gain.value = muted ? 1 : 0
      }
      return
    }

    const ctx = new AudioContext()
    ctxRef.current = ctx

    // Master gain
    const master = ctx.createGain()
    master.gain.value = 1
    master.connect(ctx.destination)
    masterGainRef.current = master

    // Create ambient for current act
    createAmbient(act)
    prevActRef.current = act
    setMuted(false)
  }, [muted, act, createAmbient])

  // Switch ambient when act changes
  useEffect(() => {
    if (muted || !ctxRef.current || act === prevActRef.current) return

    const ctx = ctxRef.current
    const master = masterGainRef.current
    if (!master) return

    // Crossfade: fade out old, create new
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)

    setTimeout(() => {
      createAmbient(act)
      prevActRef.current = act
    }, 1000)
  }, [act, muted, createAmbient])

  // Play sound effects
  const playSfx = useCallback((name: SfxName) => {
    const ctx = ctxRef.current
    const master = masterGainRef.current
    if (!ctx || !master || muted) return

    const sfxGain = ctx.createGain()
    sfxGain.connect(master)

    switch (name) {
      case 'heartbeat': {
        // Double thump
        const now = ctx.currentTime
        for (let i = 0; i < 2; i++) {
          const osc = ctx.createOscillator()
          osc.type = 'sine'
          osc.frequency.value = 40 + i * 10
          const g = ctx.createGain()
          g.gain.setValueAtTime(0, now + i * 0.15)
          g.gain.linearRampToValueAtTime(0.15, now + i * 0.15 + 0.05)
          g.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.2)
          osc.connect(g)
          g.connect(sfxGain)
          osc.start(now + i * 0.15)
          osc.stop(now + i * 0.15 + 0.25)
        }
        break
      }
      case 'phone': {
        // Ring ring
        const now = ctx.currentTime
        for (let i = 0; i < 2; i++) {
          const osc = ctx.createOscillator()
          osc.type = 'sine'
          osc.frequency.value = 440
          const g = ctx.createGain()
          g.gain.setValueAtTime(0, now + i * 0.4)
          g.gain.linearRampToValueAtTime(0.08, now + i * 0.4 + 0.05)
          g.gain.linearRampToValueAtTime(0, now + i * 0.4 + 0.3)
          osc.connect(g)
          g.connect(sfxGain)
          osc.start(now + i * 0.4)
          osc.stop(now + i * 0.4 + 0.35)
        }
        break
      }
      case 'thunder': {
        // Low rumble
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'
        osc.frequency.value = 30
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, now)
        g.gain.linearRampToValueAtTime(0.1, now + 0.1)
        g.gain.exponentialRampToValueAtTime(0.001, now + 2)
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 100
        osc.connect(filter)
        filter.connect(g)
        g.connect(sfxGain)
        osc.start(now)
        osc.stop(now + 2.5)
        break
      }
      case 'door': {
        // Creak
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(200, now)
        osc.frequency.linearRampToValueAtTime(300, now + 0.3)
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, now)
        g.gain.linearRampToValueAtTime(0.05, now + 0.05)
        g.gain.linearRampToValueAtTime(0, now + 0.4)
        osc.connect(g)
        g.connect(sfxGain)
        osc.start(now)
        osc.stop(now + 0.5)
        break
      }
      case 'typewriter': {
        // Click
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        osc.type = 'square'
        osc.frequency.value = 800
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.03, now)
        g.gain.linearRampToValueAtTime(0, now + 0.02)
        osc.connect(g)
        g.connect(sfxGain)
        osc.start(now)
        osc.stop(now + 0.03)
        break
      }
    }
  }, [muted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
      ctxRef.current?.close()
    }
  }, [cleanup])

  return { muted, toggle: initAudio, playSfx }
}
