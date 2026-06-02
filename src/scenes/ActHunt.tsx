import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

type Location = 'bar' | 'hotel' | 'pier'

interface LocData {
  key: Location
  scene: 'bar' | 'office' | 'pier'
  lines: string[]
}

const LOCS: LocData[] = [
  { key: 'bar', scene: 'bar', lines: ['loc.bar.narration', 'loc.bar.dialog', 'loc.bar.detail'] },
  { key: 'hotel', scene: 'office', lines: ['loc.hotel.narration', 'loc.hotel.dialog', 'loc.hotel.detail'] },
  { key: 'pier', scene: 'pier', lines: ['loc.pier.narration', 'loc.pier.dialog', 'loc.pier.detail'] },
]

export function ActHunt() {
  const { t } = useLang()
  const [activeLoc, setActiveLoc] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Keyboard navigation for tabs (arrow keys)
  const handleTabKeyDown = useCallback((e: React.KeyboardEvent) => {
    const tabs = tabRefs.current.filter(Boolean)
    const current = tabs.findIndex(t => t === document.activeElement)
    if (current === -1) return

    let next = current
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (current + 1) % tabs.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (current - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      next = 0
    } else if (e.key === 'End') {
      next = tabs.length - 1
    } else return

    e.preventDefault()
    tabs[next]?.focus()
    setActiveLoc(next)
  }, [])

  // GSAP reveals
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
      // Location line reveals (when activeLoc changes, re-trigger)
      ref.current!.querySelectorAll('[data-slide-left]').forEach((el) => {
        gsap.from(el, {
          x: -80, opacity: 0, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Reveal location lines when content changes
  useEffect(() => {
    if (!scrollRef.current) return
    const ctx = gsap.context(() => {
      scrollRef.current!.querySelectorAll('[data-loc-line]').forEach((el) => {
        gsap.from(el, {
          y: 20, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
        })
      })
    }, scrollRef)
    return () => ctx.revert()
  }, [activeLoc])

  return (
    <section ref={ref} data-act="3" className="relative min-h-[800vh] overflow-hidden">
      <SceneBackground scene={LOCS[activeLoc].scene} opacity={0.7} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase block mb-3">
                {t('hunt.act')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
                {t('hunt.title')}
              </h2>
              <div className="h-px w-24 bg-red/15 mx-auto mt-4" />
            </div>
          </div>
        </div>

        {/* Kael walking */}
        <div className="min-h-[40vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-slide-left>
              <Kael pose="walk" expression="determined" size={130} className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Location tabs — with keyboard arrow navigation */}
        <div className="min-h-[20vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-reveal>
              <div
                role="tablist"
                aria-label="Investigation locations"
                className="flex gap-2 justify-center flex-wrap"
                onKeyDown={handleTabKeyDown}
              >
                {LOCS.map((loc, i) => (
                  <button
                    key={loc.key}
                    ref={el => { tabRefs.current[i] = el }}
                    role="tab"
                    aria-selected={activeLoc === i}
                    aria-controls={`tabpanel-${loc.key}`}
                    tabIndex={activeLoc === i ? 0 : -1}
                    onClick={() => setActiveLoc(i)}
                    className={`px-4 py-2 rounded-md font-typewriter text-xs sm:text-sm transition-all duration-300 cursor-pointer
                      outline-none focus-visible:ring-2 focus-visible:ring-red-hot focus-visible:ring-offset-1 focus-visible:ring-offset-void
                      ${activeLoc === i
                        ? 'bg-red/20 text-ink border border-red/30'
                        : 'bg-surface/40 text-paper/50 border border-faint/15 hover:border-red/15'}`}
                  >
                    {t(`loc.${loc.key}.name`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location details */}
        <div ref={scrollRef} className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div
              role="tabpanel"
              id={`tabpanel-${LOCS[activeLoc].key}`}
              aria-labelledby={`tab-${LOCS[activeLoc].key}`}
            >
              <div data-loc-line={0}>
                <div className="mb-6">
                  <h3 className="font-display text-ink text-xl sm:text-2xl font-semibold">
                    {t(`loc.${LOCS[activeLoc].key}.name`)}
                  </h3>
                  <span className="font-typewriter text-dim/60 text-xs tracking-wider">
                    {t(`loc.${LOCS[activeLoc].key}.time`)}
                  </span>
                </div>
              </div>

              {LOCS[activeLoc].lines.map((lineKey, i) => (
                <div key={`${activeLoc}-${i}`} data-loc-line={i + 1}
                  className="mt-6">
                  <p className={`font-typewriter text-sm sm:text-base leading-[1.8] tracking-wide
                    ${i === 0 ? 'text-paper/70' : i === 1 ? 'text-paper/60 border-l-2 border-red/15 pl-4' : 'text-paper/50 pl-4 border-l border-red/10'}`}>
                    {t(lineKey)}
                  </p>
                </div>
              ))}

              <div data-loc-line={4} className="mt-8">
                <Kael
                  pose="stand"
                  expression={activeLoc === 2 ? 'shock' : 'determined'}
                  size={100}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pier ending */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-reveal>
              <div className="w-8 h-px bg-red/30 mx-auto mb-6" />
              <p className="font-display text-ink text-lg sm:text-xl italic">
                {t('loc.pier.end')}
              </p>
              <div className="w-8 h-px bg-red/30 mx-auto mt-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
