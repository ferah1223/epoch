export function Vignette() {
  return (
    <div
      className="fixed inset-0 z-[4] pointer-events-none"
      aria-hidden="true"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(4,4,6,0.6) 100%)',
      }}
    />
  )
}
