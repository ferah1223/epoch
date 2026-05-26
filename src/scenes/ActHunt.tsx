import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'
import { Kael } from '../components/Kael'
import { SceneBackground } from '../components/SceneBackground'

type Location = 'bar' | 'hotel' | 'pier'

interface LocData {
  key: Location
  scene: 'bar' | 'office' | 'pier'
  lines: string[]
}

const LOCS: LocData[] = [
  {
    key: 'bar',
    scene: 'bar',
    lines: ['loc.bar.narration', 'loc.bar.dialog', 'loc.bar.detail'],
  },
  {
    key: 'hotel',
    scene: 'office',
    lines: ['loc.hotel.narration', 'loc.hotel.dialog', 'loc.hotel.detail'],
  },
  {
    key: 'pier',
    scene: 'pier',
    lines: ['loc.pier.narration', 'loc.pier.dialog', 'loc.pier.detail'],
  },
]

interface Props {
  scrollY: number
}

export function ActHunt({ scrollY }: Props) {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const [activeLoc, setActiveLoc] = useState(0)
  const [locLines, setLocLines] = useState<Set<number>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const p = parseInt(e.target.getAttribute('data-p') || '0')
          setV((prev) => [...new Set([...prev, p])])
        }
      })
    }, { threshold: 0.3 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.getAttribute('data-loc-line') || '0')
          setLocLines((prev) => new Set([...prev, idx]))
        }
      })
    }, { threshold: 0.4 })
    scrollRef.current?.querySelectorAll('[data-loc-line]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [activeLoc])

  const s = (i: number) => v.includes(i)

  return (
    <section ref={ref} data-act="3" className="relative min-h-[800vh] overflow-hidden">
      <SceneBackground scene={LOCS[activeLoc].scene} scrollY={scrollY} opacity={0.7} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Act header */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="0"
              className={`transition-all duration-[2000ms] ${s(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <div data-p="1"
              className={`transition-all duration-[2000ms] ${s(1) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <Kael pose="walk" expression="determined" size={130} className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Location tabs */}
        <div className="min-h-[20vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg">
            <div data-p="2"
              className={`transition-all duration-[1500ms] ${s(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex gap-2 justify-center flex-wrap">
                {LOCS.map((loc, i) => (
                  <button
                    key={loc.key}
                    onClick={() => { setActiveLoc(i); setLocLines(new Set()) }}
                    className={`px-4 py-2 rounded-md font-typewriter text-xs sm:text-sm transition-all duration-300
                      ${activeLoc === i
                        ? 'bg-red/20 text-ink border border-red/30'
                        : 'bg-surface/40 text-paper/50 border border-faint/15 hover:border-red/15'}`}
                    aria-label={t(`loc.${loc.key}.name`)}
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
            <div data-p="3"
              className={`transition-all duration-[1500ms] ${s(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
              <div key={`${activeLoc}-${i}`} data-loc-line={i}
                className={`mt-6 transition-all duration-[1500ms] ${locLines.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className={`font-typewriter text-sm sm:text-base leading-[1.8] tracking-wide
                  ${i === 0 ? 'text-paper/70' : i === 1 ? 'text-paper/60 border-l-2 border-red/15 pl-4' : 'text-paper/50 pl-4 border-l border-red/10'}`}>
                  {t(lineKey)}
                </p>
              </div>
            ))}

            <div data-loc-line={3}
              className={`mt-8 transition-all duration-[1500ms] ${locLines.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Kael
                pose="stand"
                expression={activeLoc === 2 ? 'shock' : 'determined'}
                size={100}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Pier ending */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            <div data-p="4"
              className={`transition-all duration-[2000ms] ${s(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
