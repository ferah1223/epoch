import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

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
  const [v, setV] = useState<number[]>([])
  const [openClue, setOpenClue] = useState<string | null>(null)
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

  return (
    <section ref={ref} data-act="2" className="relative min-h-[700vh] bg-deep overflow-hidden">
      <SceneBackground scene="apartment" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header with Kael entering */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="0"
              className={`transition-all duration-[2000ms] ${s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase block mb-3">
                {t('tl.scene')}
              </span>
              <div className="h-px w-16 bg-red/15 mx-auto" />
            </div>
            <div data-p="0"
              className={`mt-8 transition-all duration-[2000ms] delay-500 ${s(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
              <Kael pose="stand" expression="determined" size={130} className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Arrival narration */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-p="1"
              className={`transition-all duration-[1800ms] ${s(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide">
                {t('scene.1')}
              </p>
            </div>
          </div>
        </div>

        {/* Apartment description */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-p="2"
              className={`transition-all duration-[1800ms] ${s(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="font-typewriter text-paper/70 text-sm sm:text-base leading-[1.8] tracking-wide">
                {t('scene.2')}
              </p>
            </div>
          </div>
        </div>

        {/* Kael kneeling - investigation */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="3"
              className={`transition-all duration-[1800ms] ${s(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
            <div data-p="4"
              className={`transition-all duration-[1500ms] ${s(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="font-display text-ink text-lg sm:text-xl italic">
                {t('scene.4')}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive clue cards */}
        {CLUES.map((clue, i) => (
          <div key={clue.key} className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
              <div data-p={i + 5}
                className={`transition-all duration-[1500ms] ${s(i + 5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button
                  onClick={() => setOpenClue(openClue === clue.key ? null : clue.key)}
                  className="w-full text-left group cursor-pointer"
                  aria-expanded={openClue === clue.key}
                  aria-label={t(`clue.${clue.key}`)}
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
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Kael standing - determined */}
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="8"
              className={`transition-all duration-[2000ms] ${s(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Kael pose="stand" expression="determined" size={140} className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
