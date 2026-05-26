import { useMemo } from 'react'

type CharPose = 'stand' | 'walk' | 'sit' | 'cry' | 'lean' | 'phone' | 'kneel'
type CharExpression = 'neutral' | 'sad' | 'shock' | 'cry' | 'determined'

interface CharProps {
  pose?: CharPose
  expression?: CharExpression
  animated?: boolean
  size?: number
  flip?: boolean
  className?: string
}

export function Kael({
  pose = 'stand',
  expression = 'neutral',
  animated = true,
  size = 200,
  flip = false,
  className = '',
}: CharProps) {
  const animClass = useMemo(() => {
    if (!animated) return ''
    switch (pose) {
      case 'walk': return 'animate-[char-walk_2s_ease-in-out_infinite]'
      case 'sit': case 'cry': return 'animate-[char-cry_3s_ease-in-out_infinite]'
      case 'lean': return 'animate-[char-breathe_4s_ease-in-out_infinite]'
      default: return 'animate-[char-idle_3s_ease-in-out_infinite]'
    }
  }, [pose, animated])

  const eyePath = useMemo(() => {
    switch (expression) {
      case 'sad': return { left: 'M 78 82 Q 80 85 84 82', right: 'M 96 82 Q 98 85 102 82' }
      case 'shock': return { left: 'M 78 82 Q 81 78 84 82 Q 81 86 78 82', right: 'M 96 82 Q 99 78 102 82 Q 99 86 96 82' }
      case 'cry': return { left: 'M 76 83 Q 80 87 84 83', right: 'M 96 83 Q 100 87 104 83' }
      case 'determined': return { left: 'M 78 83 L 84 81', right: 'M 96 81 L 102 83' }
      default: return { left: 'M 78 83 L 84 83', right: 'M 96 83 L 102 83' }
    }
  }, [expression])

  const mouthPath = useMemo(() => {
    switch (expression) {
      case 'sad': return 'M 85 96 Q 90 93 95 96'
      case 'shock': return 'M 86 96 Q 90 100 94 96'
      case 'cry': return 'M 84 96 Q 90 101 96 96'
      case 'determined': return 'M 85 96 L 95 96'
      default: return 'M 85 96 Q 90 97 95 96'
    }
  }, [expression])

  const bodyTransform = useMemo(() => {
    switch (pose) {
      case 'sit': return 'translate(0, 30)'
      case 'kneel': return 'translate(0, 45) scale(0.9)'
      case 'lean': return 'rotate(-5 90 150)'
      case 'phone': return 'translate(5, 0)'
      default: return ''
    }
  }, [pose])

  return (
    <svg
      viewBox="50 40 80 160"
      width={size}
      height={size * 1.6}
      className={`${animClass} ${flip ? '-scale-x-100' : ''} ${className}`}
      style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))' }}
      role="img"
      aria-label="Kael, a young male detective"
    >
      <defs>
        <linearGradient id="kael-coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a26" />
          <stop offset="100%" stopColor="#0e0e18" />
        </linearGradient>
        <linearGradient id="kael-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4a882" />
          <stop offset="100%" stopColor="#a08060" />
        </linearGradient>
        <radialGradient id="kael-shadow">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="90" cy="198" rx="30" ry="4" fill="rgba(0,0,0,0.5)" />

      <g transform={bodyTransform}>
        {/* Coat / Jacket */}
        <path d="M 68 120 L 65 190 L 115 190 L 112 120 Q 90 105 68 120" fill="url(#kael-coat)" />
        {/* Coat collar */}
        <path d="M 75 115 L 82 125 L 90 118 L 98 125 L 105 115" fill="none" stroke="#2a2a36" strokeWidth="1.5" />
        {/* Coat lapel */}
        <path d="M 78 120 L 85 140 L 82 140 L 75 122" fill="#16162a" />
        <path d="M 102 120 L 95 140 L 98 140 L 105 122" fill="#16162a" />

        {/* Shirt */}
        <path d="M 82 125 L 80 155 L 100 155 L 98 125" fill="#22222e" />

        {/* Belt */}
        <rect x="78" y="153" width="24" height="4" rx="1" fill="#1a1a26" />
        <rect x="88" y="152" width="4" height="6" rx="1" fill="#4a4a3a" />

        {/* Arms */}
        <g>
          {pose === 'phone' ? (
            <>
              <path d="M 68 122 L 55 145 L 50 138 L 60 118" fill="url(#kael-coat)" />
              <path d="M 112 122 L 105 130 L 100 125 L 108 120" fill="url(#kael-coat)" />
              {/* Phone */}
              <rect x="48" y="132" width="8" height="14" rx="1.5" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="0.5" />
              <rect x="49.5" y="134" width="5" height="8" rx="0.5" fill="#0a1a2a" />
            </>
          ) : pose === 'sit' || pose === 'cry' ? (
            <>
              <path d="M 68 122 L 58 148 L 55 160 L 62 162 L 65 150 L 72 128" fill="url(#kael-coat)" />
              <path d="M 112 122 L 118 148 L 120 160 L 113 162 L 110 150 L 105 128" fill="url(#kael-coat)" />
            </>
          ) : (
            <>
              <path d="M 68 122 L 58 155 L 55 168 L 62 170 L 65 157 L 72 128" fill="url(#kael-coat)" />
              <path d="M 112 122 L 122 155 L 125 168 L 118 170 L 115 157 L 105 128" fill="url(#kael-coat)" />
            </>
          )}
        </g>

        {/* Legs */}
        {pose === 'sit' || pose === 'cry' ? (
          <>
            <path d="M 80 157 L 70 175 L 65 190 L 72 192 L 78 178 L 85 160" fill="#0e0e18" />
            <path d="M 100 157 L 110 175 L 115 190 L 108 192 L 102 178 L 95 160" fill="#0e0e18" />
            {/* Shoes */}
            <ellipse cx="68" cy="191" rx="6" ry="3" fill="#0a0a12" />
            <ellipse cx="112" cy="191" rx="6" ry="3" fill="#0a0a12" />
          </>
        ) : (
          <>
            <rect x="78" y="157" width="8" height="35" rx="2" fill="#0e0e18" />
            <rect x="94" y="157" width="8" height="35" rx="2" fill="#0e0e18" />
            {/* Shoes */}
            <rect x="76" y="190" width="12" height="5" rx="2" fill="#0a0a12" />
            <rect x="92" y="190" width="12" height="5" rx="2" fill="#0a0a12" />
          </>
        )}

        {/* Neck */}
        <rect x="85" y="108" width="10" height="10" rx="3" fill="url(#kael-skin)" />

        {/* Head */}
        <g>
          {/* Hair - messy noir style */}
          <path d="M 72 78 Q 70 60 80 55 Q 90 50 100 55 Q 110 60 108 78 L 108 82 Q 100 75 90 75 Q 80 75 72 82 Z" fill="#1a1218" />
          <path d="M 72 78 Q 70 70 75 65 Q 78 62 72 78" fill="#1a1218" />

          {/* Face */}
          <ellipse cx="90" cy="88" rx="16" ry="18" fill="url(#kael-skin)" />

          {/* Eyebrows */}
          <path d="M 76 78 Q 81 76 86 78" fill="none" stroke="#2a1a10" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 94 78 Q 99 76 104 78" fill="none" stroke="#2a1a10" strokeWidth="1.5" strokeLinecap="round" />

          {/* Eyes */}
          <path d={eyePath.left} fill="none" stroke="#1a1210" strokeWidth="1.8" strokeLinecap="round" />
          <path d={eyePath.right} fill="none" stroke="#1a1210" strokeWidth="1.8" strokeLinecap="round" />

          {/* Eye bags (tired) */}
          <path d="M 77 86 Q 81 88 85 86" fill="none" stroke="rgba(100,70,50,0.3)" strokeWidth="0.8" />
          <path d="M 95 86 Q 99 88 103 86" fill="none" stroke="rgba(100,70,50,0.3)" strokeWidth="0.8" />

          {/* Nose */}
          <path d="M 90 86 L 88 93 L 90 94 L 92 93" fill="none" stroke="#8a6a4a" strokeWidth="1" strokeLinecap="round" />

          {/* Mouth */}
          <path d={mouthPath} fill="none" stroke="#6a4a3a" strokeWidth="1.2" strokeLinecap="round" />

          {/* Jaw shadow */}
          <path d="M 76 95 Q 90 105 104 95" fill="none" stroke="rgba(100,70,50,0.15)" strokeWidth="1" />

          {/* Stubble */}
          {[78, 82, 86, 90, 94, 98, 102].map((x, i) => (
            <line key={i} x1={x} y1={98 + (i % 2) * 2} x2={x} y2={100 + (i % 2) * 2}
              stroke="rgba(30,20,15,0.2)" strokeWidth="0.5" />
          ))}
        </g>

        {/* Cry tears */}
        {expression === 'cry' && (
          <>
            <path d="M 80 86 Q 79 92 80 98" fill="none" stroke="rgba(100,150,200,0.4)" strokeWidth="1" className="animate-[rain-fall_2s_linear_infinite]" />
            <path d="M 100 86 Q 101 92 100 98" fill="none" stroke="rgba(100,150,200,0.4)" strokeWidth="1" className="animate-[rain-fall_2.5s_linear_infinite]" />
          </>
        )}
      </g>
    </svg>
  )
}
