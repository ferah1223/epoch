import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface ScrollCtx {
  scrollY: number
  scrollProgress: number // 0-1 total page scroll
  velocity: number
  direction: 'up' | 'down'
  // Get scroll progress within a specific element (0-1)
  elementProgress: (el: HTMLElement) => number
  // Get smooth 0-1 value based on element visibility
  elementVisibility: (el: HTMLElement, offset?: number) => number
}

const Ctx = createContext<ScrollCtx>({
  scrollY: 0,
  scrollProgress: 0,
  velocity: 0,
  direction: 'down',
  elementProgress: () => 0,
  elementVisibility: () => 0,
})

export const useScroll = () => useContext(Ctx)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const lastY = useRef(0)
  const lastTime = useRef(Date.now())
  const rafRef = useRef<number>(0)

  const tick = useCallback(() => {
    const y = window.scrollY
    const now = Date.now()
    const dt = now - lastTime.current
    const dy = y - lastY.current

    if (dt > 0) {
      const v = Math.abs(dy / dt) * 1000 // px/s
      setVelocity(v)
    }

    setDirection(dy >= 0 ? 'down' : 'up')
    setScrollY(y)

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress(maxScroll > 0 ? y / maxScroll : 0)

    lastY.current = y
    lastTime.current = now
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const elementProgress = useCallback((el: HTMLElement): number => {
    const rect = el.getBoundingClientRect()
    const start = rect.top + window.scrollY - window.innerHeight
    const end = rect.bottom + window.scrollY
    const range = end - start
    if (range <= 0) return 0
    return Math.max(0, Math.min(1, (scrollY - start) / range))
  }, [scrollY])

  const elementVisibility = useCallback((el: HTMLElement, offset = 0): number => {
    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight
    const center = rect.top + rect.height / 2
    const dist = Math.abs(center - viewH / 2)
    const maxDist = viewH / 2 + rect.height / 2 + offset
    return Math.max(0, Math.min(1, 1 - dist / maxDist))
  }, [scrollY])

  return (
    <Ctx.Provider value={{ scrollY, scrollProgress, velocity, direction, elementProgress, elementVisibility }}>
      {children}
    </Ctx.Provider>
  )
}
