import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useLang } from '../context/Language'

export function AudioCtrl({ act }: { act: number }) {
  const { t } = useLang()
  const [muted, setMuted] = useState(true)
  const ctxR = useRef<AudioContext | null>(null)
  const gainR = useRef<GainNode | null>(null)
  const oscR = useRef<OscillatorNode[]>([])

  const start = () => {
    if (ctxR.current) { setMuted(false); gainR.current && (gainR.current.gain.value = 0.1); return }
    const c = new AudioContext()
    ctxR.current = c
    const g = c.createGain(); g.gain.value = 0.1; g.connect(c.destination); gainR.current = g
    setMuted(false)
  }

  useEffect(() => {
    if (!ctxR.current || !gainR.current || muted) return
    const c = ctxR.current, g = gainR.current
    oscR.current.forEach(o => { try { o.stop() } catch {} }); oscR.current = []
    const mk = (type: OscillatorType, freq: number, vol: number, lp?: number) => {
      const o = c.createOscillator(); o.type = type; o.frequency.value = freq
      const gn = c.createGain(); gn.gain.value = vol
      if (lp) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp; o.connect(f).connect(gn).connect(g) }
      else o.connect(gn).connect(g)
      o.start(); oscR.current.push(o)
    }
    if (act <= 0) mk('sine', 50, 0.04)
    else if (act === 1) { mk('sine', 50, 0.03); mk('sine', 75, 0.015) }
    else if (act === 2) mk('sawtooth', 60, 0.025, 160)
    else if (act === 3) { mk('sine', 196, 0.012); mk('sine', 247, 0.008) }
    else if (act === 4) mk('triangle', 147, 0.035)
    else {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = 261.63
      const gn = c.createGain(); gn.gain.value = 0.025
      gn.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 8)
      o.connect(gn).connect(g); o.start(); oscR.current.push(o)
    }
  }, [act, muted])

  const toggle = () => { if (muted) start(); else { setMuted(true); gainR.current && (gainR.current.gain.value = 0) } }

  return (
    <button onClick={toggle}
      className="fixed top-5 right-5 z-50 w-9 h-9 rounded-full border border-red/15 bg-void/60 backdrop-blur-sm flex items-center justify-center hover:border-red/40 transition-all cursor-pointer"
      aria-label={muted ? t('ui.sound') : t('ui.mute')}>
      {muted ? <VolumeX size={14} className="text-dim" /> : <Volume2 size={14} className="text-red-hot" />}
    </button>
  )
}
