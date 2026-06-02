import { useEffect, useRef } from 'react'

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let frame = 0
    let imageData: ImageData | null = null
    let lastW = 0
    let lastH = 0

    const render = () => {
      frame++
      if (frame % 3 !== 0) {
        raf = requestAnimationFrame(render)
        return
      }

      const w = window.innerWidth / 4
      const h = window.innerHeight / 4

      // Only recreate buffer when size changes
      if (w !== lastW || h !== lastH || !imageData) {
        canvas.width = w
        canvas.height = h
        imageData = ctx.createImageData(w, h)
        lastW = w
        lastH = h
      }

      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 25
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 12
      }

      ctx.putImageData(imageData, 0, 0)
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[3] pointer-events-none opacity-[0.06] mix-blend-overlay"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
    />
  )
}
