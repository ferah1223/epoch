import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'
import { SceneBackground } from '../components/SceneBackground'

export function Prologue() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || '0')])])
      })
    }, { threshold: 0.35 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (i: number) => v.includes(i)

  return (
    <section ref={ref} data-act="0" className="relative min-h-[500vh] bg-void overflow-hidden">
      <SceneBackground scene="window" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Title block - cinematic reveal */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="0"
              className={`transition-all duration-[2000ms] ${s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-typewriter text-paper/60 text-xs sm:text-sm tracking-[0.2em] leading-relaxed">
                {t('pro.1')}
              </p>
            </div>
          </div>
        </div>

        {/* Story paragraphs */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              <div data-p={i}
                className={`transition-all duration-[1800ms] ${s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className="font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide">
                  {t(`pro.${i + 1}`)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* "Until tonight." - dramatic pause */}
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="5"
              className={`transition-all duration-[2500ms] ${s(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-px bg-red/30 mx-auto mb-8" />
              <p className="font-display text-ink text-xl sm:text-2xl italic">{t('pro.5')}</p>
              <div className="w-10 h-px bg-red/30 mx-auto mt-8" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="w-full max-w-xl text-center">
            <div data-p="6"
              className={`transition-all duration-[3000ms] ${s(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-none">
                {t('pro.6')}
              </h1>
            </div>
            <div data-p="7"
              className={`mt-8 transition-all duration-[1800ms] ${s(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="font-display text-ink/40 text-sm sm:text-base italic">{t('pro.7')}</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="h-[30vh] flex items-center justify-center">
          <div className={`animate-bounce transition-opacity duration-1000 ${s(7) ? 'opacity-30' : 'opacity-0'}`}>
            <div className="w-5 h-8 border border-ink/20 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-ink/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
