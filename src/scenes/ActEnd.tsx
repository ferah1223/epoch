import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

export function ActEnd() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || '0')])])
      })
    }, { threshold: 0.2 })
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
    <section ref={ref} data-act="5" className="relative min-h-[800vh] overflow-hidden">
      <SceneBackground scene="window" opacity={0.6} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="0"
              className={`transition-all duration-[2000ms] ${s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase block mb-3">
                {t('end.act')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
                {t('end.title')}
              </h2>
              <div className="h-px w-24 bg-red/15 mx-auto mt-4" />
            </div>
          </div>
        </div>

        {/* Story lines */}
        {lines.map((line, i) => (
          <div key={i} className="min-h-[55vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              {/* Show Kael with different expressions at key moments */}
              {i === 1 && (
                <div data-p={i}
                  className={`flex justify-center mb-6 transition-all duration-[2000ms] ${s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <Kael pose="stand" expression="sad" size={130} />
                </div>
              )}
              {i === 5 && (
                <div data-p={i}
                  className={`flex justify-center mb-6 transition-all duration-[2000ms] ${s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <Kael pose="sit" expression="cry" size={140} />
                </div>
              )}

              <div data-p={i}
                className={`transition-all duration-[1800ms] ${s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={
                  line.style === 'emph'
                    ? 'font-display text-ink text-xl sm:text-2xl italic text-center'
                    : line.style === 'letter'
                      ? 'font-display text-paper/80 text-base sm:text-lg italic leading-[1.8] border-l border-red/10 pl-4'
                      : line.style === 'letter-end'
                        ? 'font-display text-ink text-lg sm:text-xl italic border-l-2 border-red/20 pl-4'
                        : line.style === 'final'
                          ? 'font-display text-ink text-xl sm:text-2xl italic text-center'
                          : 'font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide'
                }>
                  {t(line.k)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* FIN */}
        <div className="h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="8"
              className={`transition-all duration-[3000ms] ${s(8) ? 'opacity-100' : 'opacity-0'}`}>
              <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink/[0.04] tracking-[0.2em] font-bold">
                {t('end.fin')}
              </p>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="9"
              className={`transition-all duration-[1800ms] ${s(9) ? 'opacity-100' : 'opacity-0'}`}>
              <div className="space-y-10">
                <div>
                  <p className="font-typewriter text-dim/40 text-xs tracking-[0.3em] uppercase mb-1">
                    {t('end.credit1')}
                  </p>
                  <p className="font-display text-lg text-ink/80">{t('pro.6')}</p>
                </div>
                <div>
                  <p className="font-typewriter text-dim/40 text-xs tracking-[0.3em] uppercase">
                    {t('end.credit2')}
                  </p>
                </div>
                <div>
                  <p className="font-typewriter text-dim/30 text-xs tracking-[0.3em] uppercase">
                    {t('end.credit3')}
                  </p>
                </div>
              </div>
              <div className="mt-16 pb-12">
                <div className="h-px bg-red/6 w-12 mx-auto mb-5" />
                <p className="font-typewriter text-dim/30 text-xs tracking-wider">
                  {t('end.rain')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
