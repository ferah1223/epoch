import { useEffect, useRef } from 'react'

export function FilmGrain() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    let f = 0
    const render = () => {
      f++
      if (f % 10 !== 0) { requestAnimationFrame(render); return }
      const w = c.width, h = c.height
      const img = ctx.createImageData(w, h)
      const d = img.data
      for (let i = 0; i < d.length; i += 24) {
        const v = (Math.random() * 255) | 0
        d[i] = v
        d[i + 1] = v
        d[i + 2] = v
        d[i + 3] = 5
      }
      ctx.putImageData(img, 0, 0)
      requestAnimationFrame(render)
    }
    const id = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[85]" style={{ mixBlendMode: 'overlay' }} />
}
