export function Rain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden" style={{ opacity: 0.12 }}>
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i}
          className="rain-drop absolute w-px bg-gradient-to-b from-transparent via-ink/15 to-transparent"
          style={{
            left: (i * 2) + '%',
            height: (12 + (i % 4) * 6) + 'px',
            animationDuration: (0.5 + (i % 3) * 0.15) + 's',
            animationDelay: ((i * 0.08) % 1.5) + 's',
          }}
        />
      ))}
    </div>
  )
}
