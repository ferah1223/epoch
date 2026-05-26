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
      case 'sad': return { left: 'M 74 80 Q 78 84 82 80', right: 'M 98 80 Q 102 84 106 80' }
      case 'scared': return { left: 'M 74 79 Q 78 74 82 79 Q 78 84 74 79', right: 'M 98 79 Q 102 74 106 79 Q 102 84 98 79' }
      case 'cry': return { left: 'M 73 81 Q 78 87 82 81', right: 'M 98 81 Q 102 87 106 81' }
      case 'relieved': return { left: 'M 74 80 L 82 80', right: 'M 98 80 L 106 80' }
      default: return { left: 'M 74 80 Q 78 77 82 80', right: 'M 98 80 Q 102 77 106 80' }
    }
  }, [expression])

  const mouthPath = useMemo(() => {
    switch (expression) {
      case 'sad': return 'M 83 96 Q 89 93 95 96'
      case 'scared': return 'M 84 95 Q 89 99 94 95'
      case 'cry': return 'M 82 95 Q 89 101 96 95'
      case 'relieved': return 'M 83 96 Q 89 98 95 96'
      default: return 'M 84 96 Q 89 97 94 96'
    }
  }, [expression])

  const bodyTransform = useMemo(() => {
    switch (pose) {
      case 'sit': return 'translate(0, 28)'
      case 'kneel': return 'translate(0, 45) scale(0.9)'
      case 'wrap': return 'translate(0, 5)'
      default: return ''
    }
  }, [pose])

  return (
    <svg
      viewBox="45 30 90 175"
      width={size}
      height={size * 1.65}
      className={`${animClass} ${flip ? '-scale-x-100' : ''} ${className}`}
      style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.9))' }}
      role="img"
      aria-label="Mira, a young woman"
    >
      <defs>
        <linearGradient id="m-sweater" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#322a22" />
          <stop offset="40%" stopColor="#2a2218" />
          <stop offset="100%" stopColor="#1e1a14" />
        </linearGradient>
        <linearGradient id="m-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8bc96" />
          <stop offset="40%" stopColor="#c8a882" />
          <stop offset="100%" stopColor="#b09070" />
        </linearGradient>
        <linearGradient id="m-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e1a12" />
          <stop offset="30%" stopColor="#261410" />
          <stop offset="70%" stopColor="#1e0e0a" />
          <stop offset="100%" stopColor="#180c08" />
        </linearGradient>
        <linearGradient id="m-jeans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1c2a" />
          <stop offset="100%" stopColor="#12121e" />
        </linearGradient>
        <radialGradient id="m-face-light" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="rgba(220,190,150,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="m-blanket" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#2a1a10" />
        </radialGradient>
        <filter id="m-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="90" cy="202" rx="28" ry="4" fill="rgba(0,0,0,0.5)" />

      <g transform={bodyTransform}>
        {/* === BLANKET (wrap pose) === */}
        {pose === 'wrap' && (
          <g>
            <path d="M 58 112 Q 54 150 58 198 L 122 198 Q 126 150 122 112 Q 90 102 58 112"
              fill="url(#m-blanket)" />
            {/* Blanket folds */}
            <path d="M 62 130 Q 90 125 118 130" stroke="rgba(0,0,0,0.15)" fill="none" strokeWidth="1" />
            <path d="M 60 155 Q 90 150 120 155" stroke="rgba(0,0,0,0.1)" fill="none" strokeWidth="0.8" />
            <path d="M 59 180 Q 90 175 121 180" stroke="rgba(0,0,0,0.08)" fill="none" strokeWidth="0.6" />
            {/* Blanket edge */}
            <path d="M 58 112 Q 54 150 58 198" fill="none" stroke="rgba(60,40,20,0.3)" strokeWidth="1.5" />
            <path d="M 122 112 Q 126 150 122 198" fill="none" stroke="rgba(60,40,20,0.3)" strokeWidth="1.5" />
          </g>
        )}

        {/* === SWEATER === */}
        <path d="M 68 116 L 65 168 L 115 168 L 112 116 Q 90 105 68 116"
          fill="url(#m-sweater)" />
        {/* Sweater knit texture */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M 69 ${122 + i * 6} Q 90 ${119 + i * 6} 111 ${122 + i * 6}`}
            stroke="rgba(255,255,255,0.025)" fill="none" strokeWidth="0.5" />
        ))}
        {/* Sweater neckline */}
        <path d="M 78 112 Q 90 118 102 112" fill="none" stroke="#3a3228" strokeWidth="2" />
        {/* Sweater collar fold */}
        <path d="M 80 113 Q 85 116 90 114 Q 95 116 100 113" fill="rgba(0,0,0,0.1)" />

        {/* === ARMS === */}
        {pose === 'wrap' ? (
          <>
            <path d="M 68 118 L 62 140 L 68 144 L 75 126" fill="url(#m-sweater)" />
            <path d="M 112 118 L 118 140 L 112 144 L 105 126" fill="url(#m-sweater)" />
            {/* Hands visible at blanket edge */}
            <ellipse cx="70" cy="142" rx="4" ry="3" fill="url(#m-skin)" />
            <ellipse cx="110" cy="142" rx="4" ry="3" fill="url(#m-skin)" />
          </>
        ) : pose === 'cry' || pose === 'sit' ? (
          <>
            <path d="M 68 118 L 58 142 L 60 158 L 68 156 L 66 142 L 72 124" fill="url(#m-sweater)" />
            <path d="M 112 118 L 122 142 L 120 158 L 112 156 L 114 142 L 108 124" fill="url(#m-sweater)" />
            {/* Hands */}
            <ellipse cx="62" cy="158" rx="3.5" ry="2.5" fill="url(#m-skin)" />
            <ellipse cx="118" cy="158" rx="3.5" ry="2.5" fill="url(#m-skin)" />
          </>
        ) : (
          <>
            <path d="M 68 118 L 56 152 L 58 170 L 66 168 L 64 152 L 72 124" fill="url(#m-sweater)" />
            <path d="M 112 118 L 124 152 L 122 170 L 114 168 L 116 152 L 108 124" fill="url(#m-sweater)" />
            {/* Arm seam */}
            <path d="M 62 128 L 58 155" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
            <path d="M 118 128 L 122 155" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
            {/* Hands */}
            <ellipse cx="58" cy="171" rx="3.5" ry="2.5" fill="url(#m-skin)" />
            <ellipse cx="122" cy="171" rx="3.5" ry="2.5" fill="url(#m-skin)" />
          </>
        )}

        {/* === JEANS === */}
        {pose === 'sit' || pose === 'cry' ? (
          <>
            <path d="M 76 166 L 64 184 L 60 198 L 68 200 L 74 186 L 84 169" fill="url(#m-jeans)" />
            <path d="M 104 166 L 116 184 L 120 198 L 112 200 L 106 186 L 96 169" fill="url(#m-jeans)" />
            {/* Shoes */}
            <ellipse cx="63" cy="200" rx="6" ry="3" fill="#08080e" />
            <ellipse cx="117" cy="200" rx="6" ry="3" fill="#08080e" />
          </>
        ) : (
          <>
            <rect x="76" y="166" width="8" height="34" rx="2" fill="url(#m-jeans)" />
            <rect x="96" y="166" width="8" height="34" rx="2" fill="url(#m-jeans)" />
            {/* Jeans stitching */}
            <line x1="80" y1="168" x2="80" y2="198" stroke="rgba(100,100,140,0.15)" strokeWidth="0.5" />
            <line x1="100" y1="168" x2="100" y2="198" stroke="rgba(100,100,140,0.15)" strokeWidth="0.5" />
            {/* Shoes */}
            <ellipse cx="80" cy="201" rx="7" ry="3" fill="#08080e" />
            <ellipse cx="100" cy="201" rx="7" ry="3" fill="#08080e" />
            {/* Shoe detail */}
            <line x1="74" y1="201" x2="86" y2="201" stroke="rgba(40,40,50,0.3)" strokeWidth="0.5" />
            <line x1="94" y1="201" x2="106" y2="201" stroke="rgba(40,40,50,0.3)" strokeWidth="0.5" />
          </>
        )}

        {/* === NECK === */}
        <rect x="85" y="106" width="10" height="12" rx="4" fill="url(#m-skin)" />
        {/* Neck shadow */}
        <rect x="86" y="112" width="8" height="5" rx="2" fill="rgba(140,100,70,0.2)" />

        {/* === HAIR - long flowing === */}
        <g filter="url(#m-shadow)">
          {/* Hair back - flowing down */}
          <path d="M 66 72 Q 60 50 76 44 Q 90 38 104 44 Q 120 50 114 72 L 116 100 Q 118 120 115 135 L 112 135 Q 115 115 112 95 L 112 78 Q 90 68 68 78 L 68 95 Q 65 115 68 135 L 65 135 Q 62 120 64 100 Z"
            fill="url(#m-hair)" />
          {/* Hair front strands */}
          <path d="M 68 78 Q 64 90 66 105" stroke="rgba(60,30,15,0.3)" fill="none" strokeWidth="1" />
          <path d="M 112 78 Q 116 90 114 105" stroke="rgba(60,30,15,0.3)" fill="none" strokeWidth="1" />
          {/* Hair highlights */}
          <path d="M 72 55 Q 82 48 95 46" stroke="rgba(70,40,20,0.3)" fill="none" strokeWidth="1.5" />
          <path d="M 70 65 Q 78 58 90 56" stroke="rgba(60,35,18,0.2)" fill="none" strokeWidth="1" />
          {/* Hair flowing strands */}
          <path d="M 66 90 Q 63 105 65 120" stroke="rgba(50,25,12,0.2)" fill="none" strokeWidth="0.8" />
          <path d="M 114 90 Q 117 105 115 120" stroke="rgba(50,25,12,0.2)" fill="none" strokeWidth="0.8" />
          {/* Bangs */}
          <path d="M 75 72 Q 78 68 82 72 Q 86 68 90 72 Q 94 68 98 72 Q 102 68 105 72"
            fill="url(#m-hair)" />

          {/* Face */}
          <ellipse cx="90" cy="84" rx="16" ry="18" fill="url(#m-skin)" />
          <ellipse cx="90" cy="84" rx="16" ry="18" fill="url(#m-face-light)" />

          {/* Eyebrows - delicate */}
          <path d="M 73 75 Q 78 73 83 75" fill="none" stroke="#3a2010" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 97 75 Q 102 73 107 75" fill="none" stroke="#3a2010" strokeWidth="1.2" strokeLinecap="round" />

          {/* Eyes - detailed */}
          {/* Eye whites */}
          <ellipse cx="78" cy="80" rx="5" ry="3.5" fill="#1a1410" />
          <ellipse cx="102" cy="80" rx="5" ry="3.5" fill="#1a1410" />
          {/* Iris - warmer brown */}
          <circle cx="78" cy="80" r="2.8" fill="#3a2818" />
          <circle cx="102" cy="80" r="2.8" fill="#3a2818" />
          {/* Pupil */}
          <circle cx="78" cy="80" r="1.3" fill="#0a0606" />
          <circle cx="102" cy="80" r="1.3" fill="#0a0606" />
          {/* Eye shine */}
          <circle cx="77" cy="79" r="0.7" fill="rgba(255,255,255,0.4)" />
          <circle cx="101" cy="79" r="0.7" fill="rgba(255,255,255,0.4)" />
          {/* Eye outline */}
          <path d={eyePath.left} fill="none" stroke="#1a1210" strokeWidth="0.6" strokeLinecap="round" />
          <path d={eyePath.right} fill="none" stroke="#1a1210" strokeWidth="0.6" strokeLinecap="round" />

          {/* Eyelashes */}
          <path d="M 73 79 Q 74 77 75 79" stroke="#1a1010" strokeWidth="0.5" fill="none" />
          <path d="M 81 79 Q 82 77 83 79" stroke="#1a1010" strokeWidth="0.5" fill="none" />
          <path d="M 97 79 Q 98 77 99 79" stroke="#1a1010" strokeWidth="0.5" fill="none" />
          <path d="M 105 79 Q 106 77 107 79" stroke="#1a1010" strokeWidth="0.5" fill="none" />

          {/* Nose - delicate */}
          <path d="M 90 82 L 88 91 L 90 92 L 92 91" fill="none" stroke="#a88868" strokeWidth="0.8" strokeLinecap="round" />

          {/* Mouth */}
          <path d={mouthPath} fill="none" stroke="#8a5a4a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Lip color */}
          <path d={mouthPath} fill="none" stroke="rgba(140,60,60,0.25)" strokeWidth="1.8" strokeLinecap="round" />
          {/* Upper lip */}
          <path d="M 85 95 Q 89 93 95 95" fill="none" stroke="rgba(120,50,50,0.15)" strokeWidth="0.5" />

          {/* Cheek blush */}
          <ellipse cx="74" cy="90" rx="5" ry="3" fill="rgba(180,100,80,0.06)" />
          <ellipse cx="106" cy="90" rx="5" ry="3" fill="rgba(180,100,80,0.06)" />

          {/* Ears */}
          <path d="M 72 78 Q 70 84 72 90" fill="none" stroke="rgba(160,120,80,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 108 78 Q 110 84 108 90" fill="none" stroke="rgba(160,120,80,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Cry tears */}
        {expression === 'cry' && (
          <>
            <path d="M 77 84 Q 76 92 77 100" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1.2"
              className="animate-[rain-fall_1.8s_linear_infinite]" />
            <path d="M 103 84 Q 104 92 103 100" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1.2"
              className="animate-[rain-fall_2.2s_linear_infinite]" />
            {/* Tear shine */}
            <circle cx="77" cy="94" r="0.8" fill="rgba(150,200,255,0.3)"
              className="animate-[rain-fall_1.8s_linear_infinite]" />
            <circle cx="103" cy="94" r="0.8" fill="rgba(150,200,255,0.3)"
              className="animate-[rain-fall_2.2s_linear_infinite]" />
          </>
        )}
      </g>
    </svg>
  )
}
