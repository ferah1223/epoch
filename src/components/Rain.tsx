import { useMemo } from 'react'

export function Rain() {
  const drops = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      left: `${(i * 2.5) + (i % 3) * 0.8}%`,
      height: `${60 + (i % 5) * 8}vh`,
      duration: `${0.6 + (i % 4) * 0.15}s`,
      delay: `${i * 0.08}s`,
      opacity: 0.08 + (i % 3) * 0.04,
    }))
    , [])

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="rain-drop absolute w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent"
          style={{
            left: drop.left,
            height: drop.height,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  )
}
