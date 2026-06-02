import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollCtx {
  scrollY: number
  scrollProgress: number
  velocity: number
  direction: 'up' | 'down'
  currentAct: number
  elementProgress: (el: HTMLElement) => number
  elementVisibility: (el: HTMLElement, offset?: number) => number
}

const Ctx = createContext<ScrollCtx>({
  scrollY: 0,
  scrollProgress: 0,
  velocity: 0,
  direction: 'down',
  currentAct: -1,
  elementProgress: () => 0,
  elementVisibility: () => 0,
})

export const useScroll = () => useContext(Ctx)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [currentAct, setCurrentAct] = useState(-1)
  const lastY = useRef(0)
  const lastTime = useRef(Date.now())

  // GSAP ScrollTrigger for global scroll tracking
  useEffect(() => {
    // Main scroll progress tracker
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const y = self.scroll()
        const now = Date.now()
        const dt = now - lastTime.current
        const dy = y - lastY.current

        if (dt > 0) {
          setVelocity(Math.abs(dy / dt) * 1000)
        }
        setDirection(dy >= 0 ? 'down' : 'up')
        setScrollY(y)
        setScrollProgress(self.progress)

        lastY.current = y
        lastTime.current = now
      },
    })

    // Act detection via GSAP ScrollTrigger
    document.querySelectorAll('[data-act]').forEach((el) => {
      const actNum = parseInt(el.getAttribute('data-act') || '0')
      ScrollTrigger.create({
        trigger: el as HTMLElement,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setCurrentAct(actNum),
        onEnterBack: () => setCurrentAct(actNum),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

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
    <Ctx.Provider value={{ scrollY, scrollProgress, velocity, direction, currentAct, elementProgress, elementVisibility }}>
      {children}
    </Ctx.Provider>
  )
}
