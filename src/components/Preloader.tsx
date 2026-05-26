import { useEffect, useState } from 'react'
import { useLang } from '../context/Language'

export function Preloader() {
  const { t } = useLang()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false
    let total = 3
    let done = 0

    const updateProgress = () => {
      done++
      if (!cancelled) {
        setProgress(Math.min(100, Math.round((done / total) * 100)))
      }
    }

    const load = async () => {
      // 1. Wait for fonts
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready
        } else {
          await new Promise(r => setTimeout(r, 1000))
        }
      } catch {}
      updateProgress()

      // 2. Wait for DOM ready
      if (document.readyState !== 'complete') {
        await new Promise<void>(resolve => {
          if (document.readyState === 'complete') {
            resolve()
          } else {
            window.addEventListener('load', () => resolve(), { once: true })
          }
        })
      }
      updateProgress()

      // 3. Minimum display time (cinematic feel)
      await new Promise(r => setTimeout(r, 600))
      updateProgress()

      // Small delay before hiding
      await new Promise(r => setTimeout(r, 300))
      if (!cancelled) setProgress(100)
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="fixed inset-0 bg-void flex flex-col items-center justify-center z-[100]">
      {/* Status text */}
      <p className="font-typewriter text-dim/50 text-xs tracking-[0.3em] uppercase mb-8">
        {t('pre.title')}
      </p>

      {/* Progress bar - more refined */}
      <div className="w-48 h-px bg-surface/60 rounded-full overflow-hidden mb-4 relative">
        <div
          className="h-full bg-gradient-to-r from-red to-red-hot transition-all duration-200 ease-out"
          style={{ width: progress + '%' }}
        />
        {/* Glow at tip */}
        <div
          className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-red-hot/30 transition-all duration-200"
          style={{ left: Math.max(0, progress - 4) + '%' }}
        />
      </div>

      {/* Percentage */}
      <p className="font-mono text-dim/30 text-[10px] tracking-wider mb-6">
        {progress}%
      </p>

      {/* Status */}
      <p className="font-display text-ink/20 text-sm italic">
        {t('pre.sub')}
      </p>
    </div>
  )
}
