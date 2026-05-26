import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

export function ActEnd() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || 0)])]) })
    }, { threshold: 0.25 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (i: number) => v.includes(i)

  const lines = [
    { k: 'end.1', style: 'normal' },
    { k: 'end.2', style: 'emph' },
    { k: 'end.3', style: 'normal' },
    { k: 'end.4', style: 'letter' },
    { k: 'end.5', style: 'letter' },
    { k: 'end.6', style: 'letter-end' },
    { k: 'end.7', style: 'normal' },
    { k: 'end.8', style: 'final' },
  ]

  return (
    <section ref={ref} data-act="5" className="relative min-h-[500vh] bg-void overflow-hidden">
      <div className="relative z-10 max-w-xl mx-auto px-6 pt-28">
        <div className="mb-12">
          <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase">{t('end.act')}</span>
          <h2 className="font-display text-3xl md:text-5xl text-ink mt-2 tracking-tight">{t('end.title')}</h2>
          <div className="h-px w-24 bg-red/15 mt-3" />
        </div>

        {lines.map((line, i) => (
          <div key={i} data-p={i}
            className={'transition-all duration-[1800ms] ' + (s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className={
              line.style === 'emph'
                ? 'font-display text-ink text-xl md:text-2xl italic my-10'
                : line.style === 'letter'
                  ? 'font-display text-paper/80 text-base md:text-lg italic leading-[1.8] my-6 pl-4 border-l border-red/10'
                  : line.style === 'letter-end'
                    ? 'font-display text-ink text-lg md:text-xl italic my-8 pl-4 border-l border-red/20'
                    : line.style === 'final'
                      ? 'font-display text-ink text-xl md:text-2xl italic my-10'
                      : 'font-typewriter text-paper/70 text-sm md:text-base leading-[1.8] tracking-wide my-8'
            }>
              {t(line.k)}
            </p>
          </div>
        ))}

        {/* FIN */}
        <div data-p="8" className={'text-center py-20 transition-all duration-[2500ms] ' + (s(8) ? 'opacity-100' : 'opacity-0')}>
          <p className="font-display text-6xl md:text-8xl text-ink/[0.04] tracking-[0.2em] font-bold">{t('end.fin')}</p>
        </div>

        {/* Credits */}
        <div data-p="9" className={'py-16 transition-all duration-[1800ms] ' + (s(9) ? 'opacity-100' : 'opacity-0')}>
          <div className="space-y-10 text-center">
            <div>
              <p className="font-typewriter text-dim/40 text-xs tracking-[0.3em] uppercase mb-1">{t('end.credit1')}</p>
              <p className="font-display text-lg text-ink/80">{t('pro.6')}</p>
            </div>
            <div>
              <p className="font-typewriter text-dim/40 text-xs tracking-[0.3em] uppercase mb-1">{t('end.credit2')}</p>
            </div>
            <div>
              <p className="font-typewriter text-dim/30 text-xs tracking-[0.3em] uppercase">{t('end.credit3')}</p>
            </div>
          </div>
          <div className="text-center mt-16 pb-12">
            <div className="h-px bg-red/6 w-12 mx-auto mb-5" />
            <p className="font-typewriter text-dim/30 text-xs tracking-wider">{t('end.rain')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
