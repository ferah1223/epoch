import { useEffect, useState } from 'react'
import { useLang } from '../context/Language'

export function Preloader() {
  const { t } = useLang()
  const [p, setP] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setP((v) => Math.min(v + 1.2, 100)), 20)
    return () => clearInterval(i)
  }, [])
  return (
    <div className="fixed inset-0 bg-void flex flex-col items-center justify-center z-[100]">
      <p className="font-typewriter text-dim/50 text-xs tracking-[0.3em] uppercase mb-8">{t('pre.title')}</p>
      <div className="w-40 h-px bg-surface rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gradient-to-r from-red to-red-hot transition-all duration-75" style={{ width: p + '%' }} />
      </div>
      <p className="font-display text-ink/30 text-sm italic">{t('pre.sub')}</p>
    </div>
  )
}
