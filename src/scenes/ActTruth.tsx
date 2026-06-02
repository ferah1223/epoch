import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { Mira } from '../components/Mira'
import { SceneBackground } from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

export function ActTruth() {
  const { t } = useLang()
  const [flash, setFlash] = useState(false)
  const [shake, setShake] = useState(false)
  const [shockRevealed, setShockRevealed] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      // Standard reveals
      ref.current!.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })

      // Character reveals (slower, more dramatic)
      ref.current!.querySelectorAll('[data-char-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
        })
      })

      // SHOCK MOMENT — triggers flash, shake, and visual effects
      const shockEl = ref.current!.querySelector('[data-shock]')
      if (shockEl) {
        ScrollTrigger.create({
          trigger: shockEl,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            setShockRevealed(true)
            setFlash(true)
            setTimeout(() => setFlash(false), 800)
            setShake(true)
            setTimeout(() => setShake(false), 600)
          }
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  const lines = [
    { k: 'truth.1', style: 'normal', char: null as null | 'kael' | 'mira' },
    { k: 'truth.2', style: 'normal', char: 'mira' as const },
    { k: 'truth.3', style: 'dialog', char: null },
    { k: 'truth.4', style: 'dialog', char: 'mira' as const },
    { k: 'truth.5', style: 'shock', char: 'kael' as const, isShock: true },
    { k: 'truth.6', style: 'normal', char: 'mira' as const },
    { k: 'truth.7', style: 'quote', char: null },
    { k: 'truth.8', style: 'ending', char: 'kael' as const },
  ]

  return (
    <section
      ref={ref}
      data-act="4"
      className={`relative min-h-[700vh] overflow-hidden ${shake ? 'animate-[screen-shake_0.4s_ease-out]' : ''}`}
    >
      {/* Shock flash */}
      <div
        className={`fixed inset-0 z-[60] pointer-events-none bg-white transition-opacity duration-700 ${
          flash ? 'opacity-[0.15]' : 'opacity-0'
        }`}
      />

      <SceneBackground scene="car" opacity={shockRevealed ? 0.9 : 0.5} />

      {/* Red pulse at shock */}
      <div
        className={`fixed inset-0 z-[1] pointer-events-none transition-all duration-[3000ms] ${
          shockRevealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,24,24,0.08)_0%,transparent_40%)] animate-[glow-pulse_2s_ease-in-out_infinite]" />
      </div>

      {/* Vignette intensifies */}
      <div
        className={`fixed inset-0 z-[2] pointer-events-none transition-all duration-[2000ms] ${
          shockRevealed ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4,4,6,0.7) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header — heartbeat SFX */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal data-sfx="heartbeat">
              <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase block mb-3">
                {t('truth.act')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
                {t('truth.title')}
              </h2>
              <div className="h-px w-24 bg-red/15 mx-auto mt-4" />
            </div>
          </div>
        </div>

        {/* Story lines with characters */}
        {lines.map((line, i) => (
          <div key={i} className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              {line.char && (
                <div data-char-reveal className="flex justify-center mb-6">
                  {line.char === 'kael' && (
                    <Kael
                      pose={i === 7 ? 'sit' : 'stand'}
                      expression={i === 7 ? 'cry' : i === 4 ? 'shock' : 'sad'}
                      size={i === 4 ? 160 : 130}
                      animated={i !== 4}
                    />
                  )}
                  {line.char === 'mira' && (
                    <Mira
                      pose={i <= 2 ? 'stand' : 'wrap'}
                      expression={i <= 2 ? 'scared' : i === 5 ? 'cry' : 'sad'}
                      size={120}
                    />
                  )}
                </div>
              )}

              {/* Shock line triggers thunder SFX */}
              <div {...(line.isShock ? { 'data-shock': '', 'data-sfx': 'thunder' } : {})} data-reveal>
                <p className={
                  line.style === 'shock'
                    ? 'font-display text-ink text-xl sm:text-2xl md:text-3xl italic text-center leading-[1.6] animate-[fade-in-up_1.5s_ease-out]'
                    : line.style === 'quote'
                      ? 'font-display text-ink text-lg sm:text-xl italic border-l-2 border-red/20 pl-4 sm:pl-5 leading-[1.8]'
                      : line.style === 'ending'
                        ? 'font-display text-ink text-xl sm:text-2xl text-center leading-[1.6]'
                        : line.style === 'dialog'
                          ? 'font-typewriter text-paper/60 text-sm sm:text-base leading-[1.8] tracking-wide border-l-2 border-red/10 pl-4'
                          : 'font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide'
                }>
                  {t(line.k)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Beat of silence */}
        <div className="h-[30vh] flex items-center justify-center">
          <div data-reveal className="opacity-20">
            <div className="w-1 h-1 bg-red-hot rounded-full animate-[glow-pulse_3s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
