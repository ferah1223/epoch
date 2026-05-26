import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { Mira } from '../components/Mira'
import { SceneBackground } from '../components/SceneBackground'

export function ActTruth() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || '0')])])
      })
    }, { threshold: 0.25 })
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
    <section ref={ref} data-act="4" className="relative min-h-[700vh] overflow-hidden">
      {/* Background shifts darker at the shock moment */}
      <SceneBackground scene="car" opacity={s(4) ? 0.9 : 0.5} />

      {/* Red glow overlay at shock */}
      {s(4) && (
        <div className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-[3000ms]"
          style={{ opacity: s(4) ? 1 : 0 }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,24,24,0.06)_0%,transparent_50%)]" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="0"
              className={`transition-all duration-[2000ms] ${s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                <div data-p={i}
                  className={`flex justify-center mb-6 transition-all duration-[2000ms] ${s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {line.char === 'kael' && (
                    <Kael
                      pose={i === 7 ? 'sit' : i === 4 ? 'stand' : 'stand'}
                      expression={i === 7 ? 'cry' : i === 4 ? 'shock' : 'sad'}
                      size={i === 4 ? 160 : 130}
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
              <div data-p={i}
                className={`transition-all duration-[1800ms] ${s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={
                  line.style === 'shock'
                    ? 'font-display text-ink text-xl sm:text-2xl italic text-center'
                    : line.style === 'quote'
                      ? 'font-display text-ink text-lg sm:text-xl italic border-l-2 border-red/20 pl-4 sm:pl-5'
                      : line.style === 'ending'
                        ? 'font-display text-ink text-xl sm:text-2xl text-center'
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
      </div>
    </section>
  )
}
