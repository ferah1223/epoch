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
      case 'sad': return { left: 'M 76 82 Q 79 86 83 82', right: 'M 97 82 Q 100 86 104 82' }
      case 'shock': return { left: 'M 75 82 Q 79 76 83 82 Q 79 88 75 82', right: 'M 97 82 Q 101 76 105 82 Q 101 88 97 82' }
      case 'cry': return { left: 'M 75 83 Q 79 89 83 83', right: 'M 97 83 Q 101 89 105 83' }
      case 'determined': return { left: 'M 76 83 L 83 81', right: 'M 97 81 L 104 83' }
      default: return { left: 'M 76 83 L 83 83', right: 'M 97 83 L 104 83' }
    }
  }, [expression])

  const mouthPath = useMemo(() => {
    switch (expression) {
      case 'sad': return 'M 84 97 Q 90 94 96 97'
      case 'shock': return 'M 85 96 Q 90 101 95 96'
      case 'cry': return 'M 83 96 Q 90 103 97 96'
      case 'determined': return 'M 84 97 L 96 97'
      default: return 'M 84 97 Q 90 98 96 97'
    }
  }, [expression])

  const bodyTransform = useMemo(() => {
    switch (pose) {
      case 'sit': return 'translate(0, 35)'
      case 'kneel': return 'translate(0, 50) scale(0.9)'
      case 'lean': return 'rotate(-5 90 150)'
      case 'phone': return 'translate(5, 0)'
      default: return ''
    }
  }, [pose])

  return (
    <svg
      viewBox="40 30 100 175"
      width={size}
      height={size * 1.55}
      className={`${animClass} ${flip ? '-scale-x-100' : ''} ${className}`}
      style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.9))' }}
      role="img"
      aria-label="Kael, a young male detective"
    >
      <defs>
        {/* Multi-stop gradients for depth */}
        <linearGradient id="k-coat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e2a" />
          <stop offset="50%" stopColor="#14141e" />
          <stop offset="100%" stopColor="#0c0c14" />
        </linearGradient>
        <linearGradient id="k-coat-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a12" />
          <stop offset="100%" stopColor="#060610" />
        </linearGradient>
        <linearGradient id="k-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8a882" />
          <stop offset="40%" stopColor="#b89872" />
          <stop offset="100%" stopColor="#a08060" />
        </linearGradient>
        <linearGradient id="k-skin-shadow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#907050" />
          <stop offset="100%" stopColor="#806040" />
        </linearGradient>
        <linearGradient id="k-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221820" />
          <stop offset="50%" stopColor="#1a1018" />
          <stop offset="100%" stopColor="#140c14" />
        </linearGradient>
        <linearGradient id="k-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#262632" />
          <stop offset="100%" stopColor="#1c1c28" />
        </linearGradient>
        <linearGradient id="k-pants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12121a" />
          <stop offset="100%" stopColor="#0a0a12" />
        </linearGradient>
        <radialGradient id="k-face-light" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="rgba(200,170,130,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="k-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="90" cy="202" rx="32" ry="5" fill="rgba(0,0,0,0.6)" />

      <g transform={bodyTransform}>
        {/* === COAT / TRENCH COAT === */}
        <path d="M 64 118 L 58 198 L 122 198 L 116 118 Q 90 100 64 118"
          fill="url(#k-coat)" />
        {/* Coat fold shadow */}
        <path d="M 88 118 L 85 198" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
        <path d="M 92 118 L 95 198" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        {/* Coat bottom edge */}
        <path d="M 58 195 L 122 195 L 122 198 L 58 198" fill="rgba(0,0,0,0.3)" />

        {/* Coat collar - detailed */}
        <path d="M 72 112 L 78 122 L 85 115 L 90 110 L 95 115 L 102 122 L 108 112"
          fill="none" stroke="#2a2a3a" strokeWidth="2.5" strokeLinecap="round" />
        {/* Collar inner shadow */}
        <path d="M 74 114 L 80 120 L 86 116" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <path d="M 106 114 L 100 120 L 94 116" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

        {/* Coat lapels - 3D */}
        <path d="M 76 118 L 82 145 L 88 145 L 80 118" fill="#18182a" />
        <path d="M 104 118 L 98 145 L 92 145 L 100 118" fill="#18182a" />
        {/* Lapel highlight */}
        <path d="M 77 120 L 81 140" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <path d="M 103 120 L 99 140" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

        {/* Coat buttons */}
        <circle cx="90" cy="140" r="2" fill="#2a2a38" stroke="#3a3a4a" strokeWidth="0.5" />
        <circle cx="90" cy="155" r="2" fill="#2a2a38" stroke="#3a3a4a" strokeWidth="0.5" />
        <circle cx="90" cy="170" r="2" fill="#2a2a38" stroke="#3a3a4a" strokeWidth="0.5" />
        {/* Button thread */}
        <line x1="90" y1="138" x2="90" y2="142" stroke="#3a3a4a" strokeWidth="0.3" />
        <line x1="90" y1="153" x2="90" y2="157" stroke="#3a3a4a" strokeWidth="0.3" />

        {/* Coat pocket */}
        <path d="M 70 155 L 72 155 L 74 165 L 68 165 Z" fill="rgba(0,0,0,0.2)" />

        {/* === SHIRT === */}
        <path d="M 82 122 L 80 160 L 100 160 L 98 122" fill="url(#k-shirt)" />
        {/* Shirt collar */}
        <path d="M 84 120 L 88 126 L 90 122 L 92 126 L 96 120" fill="#22222e" />
        {/* Shirt wrinkle */}
        <path d="M 88 130 Q 90 135 92 130" stroke="rgba(255,255,255,0.03)" fill="none" strokeWidth="0.5" />

        {/* === BELT === */}
        <rect x="77" y="158" width="26" height="5" rx="1" fill="#1a1a26" />
        {/* Belt buckle */}
        <rect x="87" y="157" width="6" height="7" rx="1" fill="#4a4a3a" stroke="#5a5a4a" strokeWidth="0.5" />
        {/* Belt holes */}
        <circle cx="82" cy="160.5" r="0.5" fill="rgba(0,0,0,0.4)" />
        <circle cx="84" cy="160.5" r="0.5" fill="rgba(0,0,0,0.4)" />

        {/* === ARMS === */}
        {pose === 'phone' ? (
          <>
            {/* Left arm - holding phone up */}
            <path d="M 64 120 L 52 140 L 48 130 L 58 115" fill="url(#k-coat)" />
            {/* Right arm - at side */}
            <path d="M 116 120 L 126 155 L 130 168 L 123 170 L 120 157 L 112 128" fill="url(#k-coat)" />
            {/* Arm seam */}
            <path d="M 58 125 L 50 138" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
            {/* Phone */}
            <rect x="46" y="126" width="9" height="16" rx="2" fill="#0e0e1a" stroke="#2a2a3a" strokeWidth="0.5" />
            <rect x="47.5" y="128" width="6" height="10" rx="1" fill="#0a1a2a" />
            <circle cx="50.5" cy="140" r="1" fill="#1a1a2a" />
          </>
        ) : pose === 'sit' || pose === 'cry' ? (
          <>
            {/* Arms on lap / face */}
            <path d="M 64 120 L 54 148 L 50 165 L 57 167 L 60 152 L 68 128" fill="url(#k-coat)" />
            <path d="M 116 120 L 126 148 L 130 165 L 123 167 L 120 152 L 112 128" fill="url(#k-coat)" />
            {/* Arm seam shadows */}
            <path d="M 60 130 L 54 150" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
            <path d="M 120 130 L 126 150" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
          </>
        ) : (
          <>
            {/* Arms at sides */}
            <path d="M 64 120 L 54 155 L 50 172 L 57 174 L 60 158 L 68 128" fill="url(#k-coat)" />
            <path d="M 116 120 L 126 155 L 130 172 L 123 174 L 120 158 L 112 128" fill="url(#k-coat)" />
            {/* Arm seam shadows */}
            <path d="M 60 130 L 54 158" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
            <path d="M 120 130 L 126 158" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
            {/* Hands */}
            <ellipse cx="52" cy="173" rx="4" ry="3" fill="url(#k-skin)" />
            <ellipse cx="128" cy="173" rx="4" ry="3" fill="url(#k-skin)" />
          </>
        )}

        {/* === LEGS === */}
        {pose === 'sit' || pose === 'cry' ? (
          <>
            <path d="M 78 163 L 66 182 L 62 198 L 70 200 L 76 185 L 85 166" fill="url(#k-pants)" />
            <path d="M 102 163 L 114 182 L 118 198 L 110 200 L 104 185 L 95 166" fill="url(#k-pants)" />
            {/* Shoes */}
            <path d="M 60 196 L 58 202 L 72 202 L 70 196" fill="#08080e" rx="2" />
            <path d="M 110 196 L 108 202 L 122 202 L 120 196" fill="#08080e" rx="2" />
          </>
        ) : (
          <>
            <rect x="77" y="163" width="9" height="38" rx="2" fill="url(#k-pants)" />
            <rect x="94" y="163" width="9" height="38" rx="2" fill="url(#k-pants)" />
            {/* Pants crease */}
            <line x1="81.5" y1="165" x2="81.5" y2="198" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            <line x1="98.5" y1="165" x2="98.5" y2="198" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            {/* Shoes */}
            <path d="M 75 199 L 73 204 L 88 204 L 86 199" fill="#08080e" />
            <path d="M 92 199 L 90 204 L 105 204 L 103 199" fill="#08080e" />
            {/* Shoe sole */}
            <rect x="73" y="203" width="15" height="1.5" rx="0.5" fill="#060608" />
            <rect x="90" y="203" width="15" height="1.5" rx="0.5" fill="#060608" />
          </>
        )}

        {/* === NECK === */}
        <rect x="85" y="106" width="10" height="14" rx="4" fill="url(#k-skin)" />
        {/* Neck shadow */}
        <rect x="86" y="112" width="8" height="6" rx="2" fill="url(#k-skin-shadow)" opacity="0.3" />

        {/* === HEAD === */}
        <g filter="url(#k-shadow)">
          {/* Hair - messy noir detective style */}
          <path d="M 70 76 Q 66 52 80 46 Q 92 42 104 48 Q 114 54 112 76 L 110 80 Q 100 72 90 72 Q 80 72 72 80 Z"
            fill="url(#k-hair)" />
          {/* Hair highlights */}
          <path d="M 75 60 Q 82 50 95 48" stroke="rgba(60,40,50,0.4)" fill="none" strokeWidth="1.5" />
          <path d="M 72 68 Q 78 58 90 55" stroke="rgba(50,35,45,0.3)" fill="none" strokeWidth="1" />
          {/* Messy hair strands */}
          <path d="M 68 72 Q 65 65 70 60" fill="url(#k-hair)" />
          <path d="M 112 72 Q 115 65 110 60" fill="url(#k-hair)" />

          {/* Face */}
          <ellipse cx="90" cy="87" rx="18" ry="20" fill="url(#k-skin)" />
          {/* Face lighting */}
          <ellipse cx="90" cy="87" rx="18" ry="20" fill="url(#k-face-light)" />

          {/* Eyebrows - expressive */}
          <path d="M 74 77 Q 79 74 85 77" fill="none" stroke="#2a1a10" strokeWidth="2" strokeLinecap="round" />
          <path d="M 95 77 Q 101 74 106 77" fill="none" stroke="#2a1a10" strokeWidth="2" strokeLinecap="round" />

          {/* Eyes - detailed */}
          {/* Eye whites */}
          <ellipse cx="80" cy="83" rx="5" ry="3" fill="#1a1410" />
          <ellipse cx="100" cy="83" rx="5" ry="3" fill="#1a1410" />
          {/* Iris */}
          <circle cx="80" cy="83" r="2.5" fill="#2a2018" />
          <circle cx="100" cy="83" r="2.5" fill="#2a2018" />
          {/* Pupil */}
          <circle cx="80" cy="83" r="1.2" fill="#0a0808" />
          <circle cx="100" cy="83" r="1.2" fill="#0a0808" />
          {/* Eye shine */}
          <circle cx="79" cy="82" r="0.6" fill="rgba(255,255,255,0.4)" />
          <circle cx="99" cy="82" r="0.6" fill="rgba(255,255,255,0.4)" />
          {/* Eye outline */}
          <path d={eyePath.left} fill="none" stroke="#1a1210" strokeWidth="0.8" strokeLinecap="round" />
          <path d={eyePath.right} fill="none" stroke="#1a1210" strokeWidth="0.8" strokeLinecap="round" />

          {/* Eye bags (tired detective) */}
          <path d="M 76 87 Q 80 89 84 87" fill="none" stroke="rgba(100,70,50,0.25)" strokeWidth="0.8" />
          <path d="M 96 87 Q 100 89 104 87" fill="none" stroke="rgba(100,70,50,0.25)" strokeWidth="0.8" />

          {/* Nose - more defined */}
          <path d="M 90 85 L 87 94 L 90 96 L 93 94" fill="none" stroke="#906a4a" strokeWidth="1.2" strokeLinecap="round" />
          {/* Nose shadow */}
          <path d="M 88 93 Q 90 95 92 93" fill="rgba(120,80,50,0.15)" />

          {/* Mouth */}
          <path d={mouthPath} fill="none" stroke="#6a4a3a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Lip shadow */}
          <path d={mouthPath} fill="none" stroke="rgba(100,50,40,0.2)" strokeWidth="2" strokeLinecap="round" />

          {/* Jaw line */}
          <path d="M 74 98 Q 90 108 106 98" fill="none" stroke="rgba(100,70,50,0.12)" strokeWidth="1" />

          {/* Stubble - more detailed */}
          {[74, 77, 80, 83, 86, 89, 92, 95, 98, 101, 104, 107].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={99 + (i % 3) * 1.5} x2={x + 0.3} y2={101 + (i % 3) * 1.5}
                stroke="rgba(30,20,15,0.25)" strokeWidth="0.4" />
              <line x1={x + 1.5} y1={100 + (i % 2) * 2} x2={x + 1.8} y2={102 + (i % 2) * 2}
                stroke="rgba(30,20,15,0.15)" strokeWidth="0.3" />
            </g>
          ))}

          {/* Ear */}
          <path d="M 70 80 Q 68 86 70 92" fill="none" stroke="url(#k-skin-shadow)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Cry tears */}
        {expression === 'cry' && (
          <>
            <path d="M 79 87 Q 78 94 79 102" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1.2"
              className="animate-[rain-fall_1.8s_linear_infinite]" />
            <path d="M 101 87 Q 102 94 101 102" fill="none" stroke="rgba(100,150,200,0.5)" strokeWidth="1.2"
              className="animate-[rain-fall_2.2s_linear_infinite]" />
            {/* Tear shine */}
            <circle cx="79" cy="95" r="0.8" fill="rgba(150,200,255,0.3)"
              className="animate-[rain-fall_1.8s_linear_infinite]" />
            <circle cx="101" cy="95" r="0.8" fill="rgba(150,200,255,0.3)"
              className="animate-[rain-fall_2.2s_linear_infinite]" />
          </>
        )}
      </g>
    </svg>
  )
}
