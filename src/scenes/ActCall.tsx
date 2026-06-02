import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

export function ActCall() {
  const { t } = useLang()
  const [ci, setCi] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const l1 = t('call.1')

  // Typewriter effect
  useEffect(() => {
    if (!started || ci >= l1.length) return
    const tm = setTimeout(() => setCi(ci + 1), 35)
    return () => clearTimeout(tm)
  }, [ci, l1, started])

  // GSAP reveals + typewriter trigger
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

      // Typewriter trigger: start typing when visible
      const twEl = ref.current!.querySelector('[data-typewriter]')
      if (twEl) {
        ScrollTrigger.create({
          trigger: twEl,
          start: 'top 80%',
          once: true,
          onEnter: () => setStarted(true)
        })
      }

      // Kael slide-in from left
      ref.current!.querySelectorAll('[data-slide-left]').forEach((el) => {
        gsap.from(el, {
          x: -50, opacity: 0, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-act="1" className="relative min-h-[600vh] bg-deep overflow-hidden">
      <SceneBackground scene="window" opacity={0.8} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header with Kael */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div className="flex items-end justify-center gap-6">
              <div data-slide-left>
                <Kael pose="stand" expression="neutral" size={120} />
              </div>
              <div data-reveal>
                <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase block mb-2">
                  {t('tl.call')}
                </span>
                <div className="h-px w-16 bg-red/15" />
              </div>
            </div>
          </div>
        </div>

        {/* Typewriter phone call — triggers SFX */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-typewriter data-sfx="typewriter" className="opacity-100">
              <p className="font-typewriter text-paper text-sm sm:text-base leading-[1.8] tracking-wide min-h-[80px]">
                {l1.slice(0, ci)}
                {ci < l1.length && <span className="text-red-hot animate-[typewriter-cursor_0.8s_step-end_infinite]">|</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Phone icon */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-reveal>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.2" className="text-red-hot mx-auto mb-6">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dialog lines */}
        {['call.2', 'call.3', 'call.4', 'call.5'].map((k) => (
          <div key={k} className="min-h-[50vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              <div data-reveal>
                <p className={`font-typewriter text-sm sm:text-base leading-[1.8] tracking-wide
                  ${k === 'call.5' ? 'text-red-hot/80 border-l-2 border-red/20 pl-4' : 'text-paper/70'}`}>
                  {t(k)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Kael realizes — emotional moment */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div className="flex flex-col items-center gap-6">
              <div data-reveal>
                <Kael pose="stand" expression="shock" size={140} />
              </div>
              <div data-reveal>
                <p className="font-display text-ink text-lg sm:text-xl italic text-center">
                  {t('call.6')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* More dialog */}
        {['call.7', 'call.8', 'call.9'].map((k) => (
          <div key={k} className="min-h-[50vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              <div data-reveal>
                <p className="font-typewriter text-paper/60 text-sm sm:text-base leading-[1.8] tracking-wide border-l-2 border-red/15 pl-4">
                  {t(k)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Final line */}
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <div className="w-8 h-px bg-red/30 mx-auto mb-8" />
              <p className="font-display text-ink text-xl sm:text-2xl italic">
                {t('call.10')}
              </p>
              <div className="w-8 h-px bg-red/30 mx-auto mt-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
