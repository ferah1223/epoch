import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

interface Props {
  act: number
}

export function AudioCtrl({ act }: Props) {
  const { t } = useLang()
  const [muted, setMuted] = useState(true) // Start muted
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    if (muted || !ctxRef.current) return
    const ctx = ctxRef.current
    const gain = gainRef.current
    if (!gain) return

    // Different ambient per act
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(act === 4 ? 0.08 : 0.04, ctx.currentTime + 2)
  }, [act, muted])

  const initAudio = () => {
    if (ctxRef.current) {
      setMuted(!muted)
      return
    }

    const ctx = new AudioContext()
    ctxRef.current = ctx

    const gain = ctx.createGain()
    gain.gain.value = 0.04
    gain.connect(ctx.destination)
    gainRef.current = gain

    // Low ambient drone
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 60
    osc.connect(gain)
    osc.start()

    // Subtle harmonics
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 90
    const gain2 = ctx.createGain()
    gain2.gain.value = 0.3
    osc2.connect(gain2)
    gain2.connect(gain)
    osc2.start()

    setMuted(false)
  }

  return (
    <button
      onClick={initAudio}
      className="fixed top-4 right-4 z-50 p-2 rounded-md bg-surface/40 border border-faint/15
        hover:border-red/20 transition-all duration-300 cursor-pointer"
      aria-label={muted ? t('ui.sound') : t('ui.mute')}
      title={muted ? t('ui.sound') : t('ui.mute')}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-dim/50">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink/60">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  )
}
