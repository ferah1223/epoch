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

    const render = () => {
      frame++
      if (frame % 3 !== 0) { // Only render every 3rd frame for performance
        raf = requestAnimationFrame(render)
        return
      }

      canvas.width = window.innerWidth / 4
      canvas.height = window.innerHeight / 4

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 25
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 12 // Very subtle
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
