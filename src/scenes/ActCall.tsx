import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

export function ActCall() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const [ci, setCi] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const l1 = t('call.1')

  useEffect(() => {
    if (ci >= l1.length) return
    const tm = setTimeout(() => setCi(ci + 1), 40)
    return () => clearTimeout(tm)
  }, [ci, l1])

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || 0)])]) })
    }, { threshold: 0.3 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (i: number) => v.includes(i)

  return (
    <section ref={ref} data-act="1" className="relative min-h-[500vh] bg-deep overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-deep via-shadow to-deep" />
        <div className="absolute bottom-0 left-[30%] w-60 h-60 bg-amber/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center z-10">
        <div className="max-w-xl px-6 w-full">
          <div className="mb-10">
            <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase">{t('tl.call')}</span>
            <div className="h-px w-16 bg-red/15 mt-2" />
          </div>

          <p className="font-typewriter text-paper text-sm md:text-base leading-[1.8] tracking-wide mb-8 min-h-[50px]">
            {l1.slice(0, ci)}
            {ci < l1.length && <span className="text-red-hot animate-pulse">|</span>}
          </p>

          <div className={'transition-all duration-1000 ' + (ci >= l1.length ? 'opacity-100' : 'opacity-0')}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-red-hot mx-auto mb-8">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 48.7 48.7 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 48.7 48.7 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>

          {['call.2','call.3','call.4','call.5'].map((k, i) => (
            <div key={k} data-p={i + 1} className={'mt-7 transition-all duration-[1500ms] ' + (s(i + 1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
              <p className={'font-typewriter text-sm md:text-base leading-[1.8] tracking-wide ' +
                (k === 'call.5' ? 'text-red-hot/80 border-l-2 border-red/20 pl-4' : 'text-paper/70')}>
                {t(k)}
              </p>
            </div>
          ))}

          <div data-p="5" className={'mt-10 transition-all duration-[1500ms] ' + (s(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <p className="font-display text-ink text-lg italic">{t('call.6')}</p>
          </div>
          <div data-p="6" className={'mt-6 transition-all duration-[1500ms] ' + (s(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <p className="font-typewriter text-paper/60 text-sm leading-[1.8] tracking-wide border-l-2 border-red/15 pl-4">{t('call.7')}</p>
          </div>
          <div data-p="7" className={'mt-6 transition-all duration-[1500ms] ' + (s(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <p className="font-display text-ink text-lg italic">{t('call.8')}</p>
          </div>
          <div data-p="8" className={'mt-6 transition-all duration-[1500ms] ' + (s(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <p className="font-typewriter text-paper/60 text-sm leading-[1.8] tracking-wide border-l-2 border-red/15 pl-4">{t('call.9')}</p>
          </div>
          <div data-p="9" className={'mt-10 transition-all duration-[2000ms] ' + (s(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <p className="font-display text-ink text-xl md:text-2xl italic">{t('call.10')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
