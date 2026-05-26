import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  // Transition type
  type?: 'fade' | 'wipe' | 'iris'
}

export function CinematicTransition({ children, type = 'fade' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'hidden') {
          setPhase('entering')
          // Animate entering
          let p = 0
          const animate = () => {
            p += 0.02
            setProgress(Math.min(1, p))
            if (p < 1) {
              requestAnimationFrame(animate)
            } else {
              setPhase('visible')
            }
          }
          requestAnimationFrame(animate)
        } else if (!entry.isIntersecting && phase === 'visible') {
          setPhase('exiting')
          let p = 1
          const animate = () => {
            p -= 0.03
            setProgress(Math.max(0, p))
            if (p > 0) {
              requestAnimationFrame(animate)
            } else {
              setPhase('hidden')
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [phase])

  const getStyle = () => {
    switch (type) {
      case 'fade':
        return {
          opacity: progress,
          transform: `translateY(${(1 - progress) * 20}px)`,
        }
      case 'wipe':
        return {
          clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
        }
      case 'iris':
        return {
          clipPath: `circle(${progress * 100}% at 50% 50%)`,
        }
      default:
        return { opacity: progress }
    }
  }

  return (
    <div ref={ref} style={getStyle()} className="transition-none">
      {children}
    </div>
  )
}
