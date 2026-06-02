import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

interface ClueCard {
  key: string
  icon: string
}

const CLUES: ClueCard[] = [
  { key: 'journal', icon: '📓' },
  { key: 'photo', icon: '📷' },
  { key: 'phone', icon: '📱' },
]

export function ActScene() {
  const { t } = useLang()
  const [openClue, setOpenClue] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)

  // Keyboard handler for clue cards
  const handleClueKey = useCallback((e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenClue(openClue === key ? null : key)
    }
  }, [openClue])

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
      // Kael slide-in
      ref.current!.querySelectorAll('[data-slide-left]').forEach((el) => {
        gsap.from(el, {
          x: -60, opacity: 0, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-act="2" className="relative min-h-[700vh] bg-deep overflow-hidden">
      <SceneBackground scene="apartment" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase block mb-3">
                {t('tl.scene')}
              </span>
              <div className="h-px w-16 bg-red/15 mx-auto" />
            </div>
            <div data-slide-left className="mt-8">
              <Kael pose="stand" expression="determined" size={130} className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Arrival — triggers door SFX */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-reveal data-sfx="door">
              <p className="font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide">
                {t('scene.1')}
              </p>
            </div>
          </div>
        </div>

        {/* Apartment description */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-reveal>
              <p className="font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide">
                {t('scene.2')}
              </p>
            </div>
          </div>
        </div>

        {/* Kael kneeling */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <Kael pose="kneel" expression="determined" size={100} className="mx-auto" />
              <p className="font-display text-ink text-lg sm:text-xl italic mt-6">
                {t('scene.3')}
              </p>
            </div>
          </div>
        </div>

        {/* Clue intro */}
        <div className="min-h-[40vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <p className="font-display text-ink text-lg sm:text-xl italic">
                {t('scene.4')}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive clue cards — with keyboard support */}
        {CLUES.map((clue) => (
          <div key={clue.key} className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              <div data-reveal>
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={openClue === clue.key}
                  aria-label={t(`clue.${clue.key}`)}
                  onClick={() => setOpenClue(openClue === clue.key ? null : clue.key)}
                  onKeyDown={(e) => handleClueKey(e, clue.key)}
                  className="w-full text-left group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-hot focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-lg"
                >
                  <div className={`border rounded-lg p-5 sm:p-6 transition-all duration-500
                    ${openClue === clue.key
                      ? 'border-red/30 bg-surface/80'
                      : 'border-faint/20 bg-surface/40 hover:border-red/20 hover:bg-surface/60'}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl" role="img" aria-hidden="true">{clue.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-ink text-base sm:text-lg font-semibold truncate">
                          {t(`clue.${clue.key}`)}
                        </h3>
                        <p className="font-typewriter text-paper/50 text-xs sm:text-sm truncate">
                          {t(`clue.${clue.key}.desc`)}
                        </p>
                      </div>
                      <span className={`text-red/40 transition-transform duration-300 flex-shrink-0 ${openClue === clue.key ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ${openClue === clue.key ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                      <div className="border-t border-faint/15 pt-4 space-y-3">
                        <p className="font-typewriter text-paper/70 text-sm leading-[1.7]">
                          {t(`clue.${clue.key}.text`)}
                        </p>
                        <p className="font-typewriter text-paper/50 text-xs leading-[1.6] italic">
                          {t(`clue.${clue.key}.detail`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Kael standing */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <Kael pose="stand" expression="determined" size={140} className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
