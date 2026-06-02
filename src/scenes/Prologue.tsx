import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/Language'
import { SceneBackground } from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

export function Prologue() {
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
      // Title gets slower, more dramatic reveal
      const title = ref.current!.querySelector('[data-reveal-title]')
      if (title) {
        gsap.from(title, {
          y: 50, opacity: 0, duration: 2.5, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none reverse' }
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-act="0" className="relative min-h-[500vh] bg-void overflow-hidden">
      <SceneBackground scene="window" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Title block */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
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
              <div data-reveal>
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
            <div data-reveal>
              <div className="w-10 h-px bg-red/30 mx-auto mb-8" />
              <p className="font-display text-ink text-xl sm:text-2xl italic">{t('pro.5')}</p>
              <div className="w-10 h-px bg-red/30 mx-auto mt-8" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="w-full max-w-xl text-center">
            <div data-reveal-title>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-none">
                {t('pro.6')}
              </h1>
            </div>
            <div data-reveal className="mt-8">
              <p className="font-display text-ink/40 text-sm sm:text-base italic">{t('pro.7')}</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="h-[30vh] flex items-center justify-center">
          <div data-reveal className="animate-bounce opacity-30">
            <div className="w-5 h-8 border border-ink/20 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-ink/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
