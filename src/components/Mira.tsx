import { useMemo } from 'react'

type CharPose = 'stand' | 'sit' | 'cry' | 'kneel' | 'wrap'
type CharExpression = 'neutral' | 'sad' | 'scared' | 'cry' | 'relieved'

interface CharProps {
  pose?: CharPose
  expression?: CharExpression
  animated?: boolean
  size?: number
  flip?: boolean
  className?: string
}

export function Mira({
  pose = 'stand',
  expression = 'neutral',
  animated = true,
  size = 180,
  flip = false,
  className = '',
}: CharProps) {
  const animClass = useMemo(() => {
    if (!animated) return ''
    switch (pose) {
      case 'sit': case 'cry': return 'animate-[char-cry_2.5s_ease-in-out_infinite]'
      case 'wrap': return 'animate-[char-breathe_3s_ease-in-out_infinite]'
      default: return 'animate-[char-idle_3.5s_ease-in-out_infinite]'
    }
  }, [pose, animated])

  const eyePath = useMemo(() => {
    switch (expression) {
      case 'sad': return { left: 'M 76 80 Q 79 83 83 80', right: 'M 95 80 Q 98 83 101 80' }
      case 'scared': return { left: 'M 76 79 Q 79 75 83 79 Q 79 83 76 79', right: 'M 95 79 Q 98 75 101 79 Q 98 83 95 79' }
      case 'cry': return { left: 'M 75 81 Q 79 85 83 81', right: 'M 95 81 Q 99 85 103 81' }
      case 'relieved': return { left: 'M 76 80 L 83 80', right: 'M 95 80 L 101 80' }
      default: return { left: 'M 76 80 Q 79 78 83 80', right: 'M 95 80 Q 98 78 101 80' }
    }
  }, [expression])

  const mouthPath = useMemo(() => {
    switch (expression) {
      case 'sad': return 'M 84 94 Q 89 91 94 94'
      case 'scared': return 'M 85 93 Q 89 97 93 93'
      case 'cry': return 'M 83 93 Q 89 99 95 93'
      case 'relieved': return 'M 84 94 Q 89 96 94 94'
      default: return 'M 85 94 Q 89 95 93 94'
    }
  }, [expression])

  const bodyTransform = useMemo(() => {
    switch (pose) {
      case 'sit': return 'translate(0, 25)'
      case 'kneel': return 'translate(0, 40) scale(0.9)'
      case 'wrap': return 'translate(0, 5)'
      default: return ''
    }
  }, [pose])

  return (
    <svg
      viewBox="55 40 70 160"
      width={size}
      height={size * 1.7}
      className={`${animClass} ${flip ? '-scale-x-100' : ''} ${className}`}
      style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))' }}
      role="img"
      aria-label="Mira, a young woman"
    >
      <defs>
        <linearGradient id="mira-sweater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2520" />
          <stop offset="100%" stopColor="#1a1815" />
        </linearGradient>
        <linearGradient id="mira-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4b896" />
          <stop offset="100%" stopColor="#b09070" />
        </linearGradient>
        <linearGradient id="mira-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="100%" stopColor="#1a0e08" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="90" cy="198" rx="28" ry="4" fill="rgba(0,0,0,0.4)" />

      <g transform={bodyTransform}>
        {/* Blanket (for wrap pose) */}
        {pose === 'wrap' && (
          <path d="M 62 115 Q 60 150 65 190 L 115 190 Q 120 150 118 115 Q 90 108 62 115"
            fill="#3a2a1a" opacity="0.8" />
        )}

        {/* Sweater */}
        <path d="M 70 118 L 68 165 L 112 165 L 110 118 Q 90 108 70 118"
          fill="url(#mira-sweater)" />
        {/* Sweater texture */}
        <path d="M 72 125 Q 90 122 108 125" stroke="rgba(255,255,255,0.05)" fill="none" strokeWidth="0.5" />
        <path d="M 71 135 Q 90 132 109 135" stroke="rgba(255,255,255,0.05)" fill="none" strokeWidth="0.5" />
        <path d="M 70 145 Q 90 142 110 145" stroke="rgba(255,255,255,0.05)" fill="none" strokeWidth="0.5" />

        {/* Arms */}
        {pose === 'wrap' ? (
          <>
            <path d="M 70 120 L 65 140 L 72 145 L 78 128" fill="url(#mira-sweater)" />
            <path d="M 110 120 L 115 140 L 108 145 L 102 128" fill="url(#mira-sweater)" />
          </>
        ) : pose === 'cry' || pose === 'sit' ? (
          <>
            <path d="M 70 120 L 60 140 L 63 155 L 70 153 L 68 140 L 75 125" fill="url(#mira-sweater)" />
            <path d="M 110 120 L 120 140 L 117 155 L 110 153 L 112 140 L 105 125" fill="url(#mira-sweater)" />
          </>
        ) : (
          <>
            <path d="M 70 120 L 60 150 L 63 165 L 70 163 L 68 150 L 75 125" fill="url(#mira-sweater)" />
            <path d="M 110 120 L 120 150 L 117 165 L 110 163 L 112 150 L 105 125" fill="url(#mira-sweater)" />
          </>
        )}

        {/* Jeans */}
        {pose === 'sit' || pose === 'cry' ? (
          <>
            <path d="M 78 163 L 68 180 L 65 190 L 72 192 L 78 178 L 85 166" fill="#1a1a2a" />
            <path d="M 102 163 L 112 180 L 115 190 L 108 192 L 102 178 L 95 166" fill="#1a1a2a" />
            <ellipse cx="68" cy="191" rx="6" ry="3" fill="#0a0a12" />
            <ellipse cx="112" cy="191" rx="6" ry="3" fill="#0a0a12" />
          </>
        ) : (
          <>
            <rect x="78" y="163" width="7" height="30" rx="2" fill="#1a1a2a" />
            <rect x="95" y="163" width="7" height="30" rx="2" fill="#1a1a2a" />
            <rect x="76" y="191" width="11" height="4" rx="2" fill="#0a0a12" />
            <rect x="93" y="191" width="11" height="4" rx="2" fill="#0a0a12" />
          </>
        )}

        {/* Neck */}
        <rect x="86" y="108" width="8" height="10" rx="3" fill="url(#mira-skin)" />

        {/* Hair - long */}
        <path d="M 70 75 Q 65 55 78 50 Q 90 46 102 50 Q 115 55 110 75 L 112 100 Q 113 115 110 120 L 108 120 Q 110 110 108 95 L 108 80 Q 90 72 72 80 L 72 95 Q 70 110 72 120 L 70 120 Q 67 115 68 100 Z"
          fill="url(#mira-hair)" />
        {/* Hair strands */}
        <path d="M 70 85 Q 65 100 67 115" stroke="rgba(60,30,15,0.3)" fill="none" strokeWidth="0.8" />
        <path d="M 110 85 Q 115 100 113 115" stroke="rgba(60,30,15,0.3)" fill="none" strokeWidth="0.8" />

        {/* Face */}
        <ellipse cx="90" cy="85" rx="14" ry="16" fill="url(#mira-skin)" />

        {/* Eyebrows */}
        <path d="M 75 76 Q 79 74 83 76" fill="none" stroke="#3a2010" strokeWidth="1" strokeLinecap="round" />
        <path d="M 95 76 Q 99 74 103 76" fill="none" stroke="#3a2010" strokeWidth="1" strokeLinecap="round" />

        {/* Eyes */}
        <path d={eyePath.left} fill="none" stroke="#1a1210" strokeWidth="1.5" strokeLinecap="round" />
        <path d={eyePath.right} fill="none" stroke="#1a1210" strokeWidth="1.5" strokeLinecap="round" />

        {/* Nose */}
        <path d="M 90 83 L 88 90 L 90 91 L 92 90" fill="none" stroke="#a08060" strokeWidth="0.8" strokeLinecap="round" />

        {/* Mouth */}
        <path d={mouthPath} fill="none" stroke="#8a5a4a" strokeWidth="1" strokeLinecap="round" />

        {/* Lip color */}
        <path d={mouthPath} fill="none" stroke="rgba(140,60,60,0.3)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Cry tears */}
        {expression === 'cry' && (
          <>
            <path d="M 79 84 Q 78 90 79 96" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1" className="animate-[rain-fall_1.8s_linear_infinite]" />
            <path d="M 99 84 Q 100 90 99 96" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1" className="animate-[rain-fall_2.2s_linear_infinite]" />
          </>
        )}
      </g>
    </svg>
  )
}
