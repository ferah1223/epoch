import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

export function Prologue() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || 0)])]) })
    }, { threshold: 0.35 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  const s = (i: number) => v.includes(i)

  return (
    <section ref={ref} data-act="0" className="relative min-h-[400vh] bg-void overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-deep via-void to-void" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] md:w-[40vw] h-[50vh] border border-faint/20 rounded-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue/15 to-void" />
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="rain-drop absolute w-px bg-ink/5" style={{
              left: (10 + i * 6) + '%',
              height: '100%',
              animationDuration: (0.8 + (i % 3) * 0.3) + 's',
              animationDelay: (i * 0.12) + 's',
            }} />
          ))}
        </div>
        <div className="absolute bottom-0 right-[20%] w-40 h-40 bg-amber/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center z-10">
        <div className="max-w-xl px-6 text-center">
          <div data-p="0" className={'transition-all duration-[1800ms] ' + (s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="font-typewriter text-paper/70 text-sm md:text-base leading-[1.8] tracking-wide">{t('pro.1')}</p>
          </div>
          <div data-p="1" className={'mt-10 transition-all duration-[1800ms] ' + (s(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="font-typewriter text-paper/70 text-sm md:text-base leading-[1.8] tracking-wide">{t('pro.2')}</p>
          </div>
          <div data-p="2" className={'mt-10 transition-all duration-[1800ms] ' + (s(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="font-typewriter text-paper/60 text-sm md:text-base leading-[1.8] tracking-wide">{t('pro.3')}</p>
          </div>
          <div data-p="3" className={'mt-10 transition-all duration-[1800ms] ' + (s(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="font-typewriter text-paper/70 text-sm md:text-base leading-[1.8] tracking-wide">{t('pro.4')}</p>
          </div>
          <div data-p="4" className={'mt-12 transition-all duration-[1800ms] ' + (s(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="font-display text-ink text-xl md:text-2xl italic">{t('pro.5')}</p>
          </div>
          <div data-p="5" className={'mt-16 transition-all duration-[2500ms] ' + (s(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12')}>
            <div className="w-12 h-px bg-red/30 mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-none">{t('pro.6')}</h1>
            <div className="w-12 h-px bg-red/30 mx-auto mt-6" />
          </div>
          <div data-p="6" className={'mt-6 transition-all duration-[1800ms] ' + (s(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <p className="font-display text-ink/40 text-sm md:text-base italic">{t('pro.7')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
