import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

export function ActHunt() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [loc, setLoc] = useState(0)

  const locs = [
    { nk: 'loc.bar.name', tk: 'loc.bar.time', rk: 'loc.bar.narration', dk: 'loc.bar.dialog', fk: 'loc.bar.detail' },
    { nk: 'loc.hotel.name', tk: 'loc.hotel.time', rk: 'loc.hotel.narration', dk: 'loc.hotel.dialog', fk: 'loc.hotel.detail' },
    { nk: 'loc.pier.name', tk: 'loc.pier.time', rk: 'loc.pier.narration', dk: 'loc.pier.dialog', fk: 'loc.pier.detail' },
  ]

  useEffect(() => {
    const sec = ref.current, tr = track.current
    if (!sec || !tr) return
    const onScroll = () => {
      const r = sec.getBoundingClientRect()
      const h = sec.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -r.top / h))
      tr.style.transform = 'translateX(-' + (p * 66.66) + '%)'
      setLoc(Math.min(2, Math.floor(p * 3)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} data-act="3" className="relative bg-deep" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background changes per location */}
        <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000">
          <div className={'absolute inset-0 ' + (loc === 0 ? 'bg-gradient-to-br from-deep via-shadow to-deep' : loc === 1 ? 'bg-gradient-to-br from-shadow via-deep to-shadow' : 'bg-gradient-to-b from-blue/[0.03] via-deep to-void')} />
          {loc === 0 && <div className="absolute bottom-0 left-[40%] w-48 h-48 bg-amber/[0.02] rounded-full blur-[80px]" />}
          {loc === 2 && <div className="absolute top-[20%] left-[50%] w-96 h-96 bg-blue/[0.03] rounded-full blur-[120px]" />}
        </div>

        <div className="relative z-10">
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase">{t('hunt.act')}</span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-1 tracking-tight">{t('hunt.title')}</h2>
            <div className="h-px w-24 bg-red/15 mt-3" />
          </div>
          <div className="absolute top-6 right-20 md:top-8 md:right-24 font-mono text-dim/30 text-xs">
            {String(loc+1).padStart(2,'0')}/03
          </div>

          <div className="flex items-center h-full px-4 md:px-8">
            <div ref={track} className="flex gap-6 transition-transform duration-75 ease-out" style={{ width: '300vw' }}>
              {locs.map((l, i) => (
                <div key={i} className="flex-shrink-0 w-[90vw] md:w-[58vw] h-[72vh] relative rounded-lg border border-red/6 overflow-hidden bg-surface/15">
                  <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-red-hot text-xs tracking-widest">{t(l.tk)}</span>
                      <div className="h-px flex-1 bg-red/8" />
                    </div>
                    <h3 className="font-display text-xl md:text-3xl text-ink mb-5 tracking-tight">{t(l.nk)}</h3>
                    <p className="font-typewriter text-paper/60 text-xs md:text-sm leading-[1.8] tracking-wide mb-5">{t(l.rk)}</p>
                    <p className="font-typewriter text-paper/50 text-xs md:text-sm leading-[1.8] tracking-wide border-l-2 border-red/8 pl-3 mb-5">{t(l.dk)}</p>
                    <div className="border-t border-faint pt-3 mt-auto">
                      <p className="font-body text-dim text-xs leading-relaxed">
                        <span className="text-red/40 font-semibold">FINDING: </span>{t(l.fk)}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-red/8" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-red/8" />
                </div>
              ))}
            </div>
          </div>

          {loc === 2 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
              <p className="font-display text-ink/70 text-base italic">{t('loc.pier.end')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
