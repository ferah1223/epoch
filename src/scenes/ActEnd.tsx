import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

export function ActEnd() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
      // FIN text gets dramatic scale-in
      const fin = ref.current!.querySelector('[data-fin]')
      if (fin) {
        gsap.from(fin, {
          scale: 0.8, opacity: 0, duration: 3, ease: 'power3.out',
          scrollTrigger: { trigger: fin, start: 'top 80%', toggleActions: 'play none none reverse' }
        })
      }
      // Character reveals
      ref.current!.querySelectorAll('[data-char-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

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
            <div data-reveal>
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
              {i === 1 && (
                <div data-char-reveal className="flex justify-center mb-6">
                  <Kael pose="stand" expression="sad" size={130} />
                </div>
              )}
              {i === 5 && (
                <div data-char-reveal className="flex justify-center mb-6">
                  <Kael pose="sit" expression="cry" size={140} />
                </div>
              )}

              <div data-reveal>
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
            <div data-fin>
              <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink/[0.04] tracking-[0.2em] font-bold">
                {t('end.fin')}
              </p>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
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
