import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language'

export function ActScene() {
  const { t } = useLang()
  const [v, setV] = useState<number[]>([])
  const [exp, setExp] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const clues = [
    { ik: 'journal', tk: 'clue.journal', dk: 'clue.journal.desc', xk: 'clue.journal.text', fk: 'clue.journal.detail' },
    { ik: 'photo', tk: 'clue.photo', dk: 'clue.photo.desc', xk: '', fk: 'clue.photo.detail' },
    { ik: 'phone', tk: 'clue.phone', dk: 'clue.phone.desc', xk: 'clue.phone.text', fk: '' },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setV((p) => [...new Set([...p, +(e.target.getAttribute('data-p') || 0)])]) })
    }, { threshold: 0.3 })
    ref.current?.querySelectorAll('[data-p]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (i: number) => v.includes(i)

  // Background: small apartment, dim light
  return (
    <section ref={ref} data-act="2" className="relative min-h-[350vh] bg-shadow overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-deep via-shadow to-deep" />
        <div className="absolute top-[40%] left-[15%] w-32 h-32 bg-amber/[0.015] rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28">
        <div className="mb-12">
          <span className="font-typewriter text-red/50 text-xs tracking-[0.3em] uppercase">{t('tl.scene')}</span>
          <h2 className="font-display text-3xl md:text-5xl text-ink mt-2 tracking-tight">{t('tl.scene')}</h2>
          <div className="h-px w-24 bg-red/15 mt-3" />
        </div>

        {['scene.1','scene.2','scene.3','scene.4'].map((k, i) => (
          <div key={k} data-p={i} className={'mb-10 transition-all duration-[1500ms] ' + (s(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <p className={'font-typewriter text-sm md:text-base leading-[1.8] tracking-wide ' +
              (i === 2 ? 'text-red-hot/80 italic' : 'text-paper/70')}>{t(k)}</p>
          </div>
        ))}

        {/* Clue cards */}
        <div className="space-y-5 mt-12 pb-24">
          {clues.map((c, i) => (
            <div key={i} data-p={4 + i}
              className={'transition-all duration-700 ' + (s(4 + i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
              style={{ transitionDelay: (i * 150) + 'ms' }}>
              <div onClick={() => setExp(exp === i ? null : i)}
                className="relative border border-red/8 rounded-lg p-5 bg-surface/30 cursor-pointer hover:border-red/15 transition-all">
                <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-red/15" />
                <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-red/15" />
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{['📓','📸','📱'][i]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base text-ink truncate">{t(c.tk)}</h3>
                      <span className="font-mono text-dim/30 text-xs flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <p className="font-typewriter text-paper/50 text-xs leading-[1.7] mt-1.5 tracking-wide">{t(c.dk)}</p>
                    {c.xk && exp === i && (
                      <p className="font-typewriter text-paper/60 text-xs leading-[1.7] mt-3 pt-3 border-t border-red/5 tracking-wide italic">
                        {t(c.xk)}
                      </p>
                    )}
                    {c.fk && exp === i && (
                      <p className="font-body text-dim text-xs leading-relaxed mt-3 pt-3 border-t border-red/5">
                        <span className="text-red/50 font-semibold">FINDING: </span>{t(c.fk)}
                      </p>
                    )}
                    <p className="font-mono text-dim/25 text-[10px] mt-2">{exp === i ? '▲ collapse' : '▼ reveal'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
