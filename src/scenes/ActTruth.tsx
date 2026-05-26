import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

export function ActTruth() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || 0)])]) })
    }, { threshold: 0.3 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (i: number) => v.includes(i)

  // The emotional reveal lines - build up to the shock
  const lines = [
    { k: 'truth.1', style: 'normal' },
    { k: 'truth.2', style: 'normal' },
    { k: 'truth.3', style: 'dialog' },
    { k: 'truth.4', style: 'dialog' },
    { k: 'truth.5', style: 'shock' },       // THE MOMENT - world stops
    { k: 'truth.6', style: 'normal' },
    { k: 'truth.7', style: 'quote' },        // Lina's last words
    { k: 'truth.8', style: 'ending' },       // Sitting in car
  ]

  return (
    <section ref={ref} data-act="4" className="relative min-h-[500vh] bg-void overflow-hidden">
      {/* Background shifts darker at the shock moment */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-[3000ms]">
        <div className={'absolute inset-0 ' + (v.includes(4) ? 'bg-void' : 'bg-gradient-to-b from-shadow via-void to-void')} />
        {v.includes(4) && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,24,24,0.04)_0%,transparent_60%)]" />
        )}
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 pt-28">
        <div className="mb-12">
          <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase">{t('truth.act')}</span>
          <h2 className="font-display text-3xl md:text-5xl text-ink mt-2 tracking-tight">{t('truth.title')}</h2>
          <div className="h-px w-24 bg-red/15 mt-3" />
        </div>

        {lines.map((line, i) => (
          <div key={i} data-p={i}
            className={'transition-all duration-[1800ms] ' + (s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className={
              line.style === 'shock'
                ? 'font-display text-ink text-xl md:text-2xl italic my-12'
                : line.style === 'quote'
                  ? 'font-display text-ink text-lg md:text-xl italic my-10 border-l-2 border-red/20 pl-5'
                  : line.style === 'ending'
                    ? 'font-display text-ink text-xl md:text-2xl my-10'
                    : line.style === 'dialog'
                      ? 'font-typewriter text-paper/60 text-sm md:text-base leading-[1.8] tracking-wide my-8 border-l-2 border-red/10 pl-4'
                      : 'font-typewriter text-paper/70 text-sm md:text-base leading-[1.8] tracking-wide my-8'
            }>
              {t(line.k)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
