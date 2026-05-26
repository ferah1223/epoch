import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { Mira } from '../components/Mira'
import { SceneBackground } from '../components/SceneBackground'

export function ActTruth() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const [flash, setFlash] = useState(false)
  const [shake, setShake] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const p = parseInt(e.target.getAttribute('data-p') || '0')
          setV((prev) => [...new Set([...prev, p])])

          // Shock moment trigger (line index 4 = "The world stopped")
          if (p === 4) {
            // Screen flash
            setFlash(true)
            setTimeout(() => setFlash(false), 800)

            // Screen shake
            setShake(true)
            setTimeout(() => setShake(false), 600)
          }
        }
      })
    }, { threshold: 0.35 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (i: number) => v.includes(i)

  const lines = [
    { k: 'truth.1', style: 'normal', char: null as null | 'kael' | 'mira' },
    { k: 'truth.2', style: 'normal', char: 'mira' as const },
    { k: 'truth.3', style: 'dialog', char: null },
    { k: 'truth.4', style: 'dialog', char: 'mira' as const },
    { k: 'truth.5', style: 'shock', char: 'kael' as const },
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
      {/* Shock flash overlay */}
      <div
        className={`fixed inset-0 z-[60] pointer-events-none bg-white transition-opacity duration-700 ${
          flash ? 'opacity-[0.15]' : 'opacity-0'
        }`}
      />

      {/* Background - transitions darker at shock */}
      <SceneBackground scene="car" opacity={s(4) ? 0.9 : 0.5} />

      {/* Red pulse at shock moment */}
      <div
        className={`fixed inset-0 z-[1] pointer-events-none transition-all duration-[3000ms] ${
          s(4) ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,24,24,0.08)_0%,transparent_40%)] animate-[glow-pulse_2s_ease-in-out_infinite]" />
      </div>

      {/* Vignette intensifies at shock */}
      <div
        className={`fixed inset-0 z-[2] pointer-events-none transition-all duration-[2000ms] ${
          s(4) ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4,4,6,0.7) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div
              data-p="0"
              className={`transition-all duration-[2000ms] ${
                s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
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
              {/* Character display */}
              {line.char && (
                <div
                  data-p={i}
                  className={`flex justify-center mb-6 transition-all duration-[2000ms] ${
                    s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {line.char === 'kael' && (
                    <Kael
                      pose={i === 7 ? 'sit' : 'stand'}
                      expression={i === 7 ? 'cry' : i === 4 ? 'shock' : 'sad'}
                      size={i === 4 ? 160 : 130}
                      animated={i !== 4} // Freeze at shock moment
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

              {/* Text */}
              <div
                data-p={i}
                className={`transition-all duration-[1800ms] ${
                  s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <p
                  className={
                    line.style === 'shock'
                      ? 'font-display text-ink text-xl sm:text-2xl md:text-3xl italic text-center leading-[1.6] animate-[fade-in-up_1.5s_ease-out]'
                      : line.style === 'quote'
                        ? 'font-display text-ink text-lg sm:text-xl italic border-l-2 border-red/20 pl-4 sm:pl-5 leading-[1.8]'
                        : line.style === 'ending'
                          ? 'font-display text-ink text-xl sm:text-2xl text-center leading-[1.6]'
                          : line.style === 'dialog'
                            ? 'font-typewriter text-paper/60 text-sm sm:text-base leading-[1.8] tracking-wide border-l-2 border-red/10 pl-4'
                            : 'font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide'
                  }
                >
                  {t(line.k)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Beat of silence after shock */}
        <div className="h-[30vh] flex items-center justify-center">
          <div
            className={`transition-opacity duration-[2000ms] ${s(7) ? 'opacity-20' : 'opacity-0'}`}
          >
            <div className="w-1 h-1 bg-red-hot rounded-full animate-[glow-pulse_3s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
