import { useEffect, useState } from 'react'

type SceneType = 'window' | 'apartment' | 'bar' | 'office' | 'pier' | 'car' | 'fin'

interface SceneBgProps {
  scene: SceneType
  opacity?: number
}

export function SceneBackground({ scene, opacity = 1 }: SceneBgProps) {
  const [drift, setDrift] = useState(0)
  useEffect(() => {
    let raf: number
    let t = 0
    const tick = () => {
      t += 0.002
      setDrift(Math.sin(t) * 5)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity }}>
      {scene === 'window' && <WindowScene drift={drift} />}
      {scene === 'apartment' && <ApartmentScene drift={drift} />}
      {scene === 'bar' && <BarScene drift={drift} />}
      {scene === 'office' && <OfficeScene drift={drift} />}
      {scene === 'pier' && <PierScene drift={drift} />}
      {scene === 'car' && <CarScene drift={drift} />}
      {scene === 'fin' && <FinScene />}
    </div>
  )
}

function WindowScene({ drift }: { drift: number }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-void to-void" />
      {/* Window frame */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {/* Room dark walls */}
        <rect x="0" y="0" width="800" height="600" fill="#060610" />

        {/* Window */}
        <rect x="180" y="60" width="440" height="340" rx="2" fill="#0a1428" />
        {/* Window sky */}
        <rect x="185" y="65" width="430" height="330" fill="url(#night-sky)" />

        {/* Rain on window */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={i}
            x1={200 + i * 17} y1={70 + (i * 13) % 320}
            x2={198 + i * 17} y2={90 + (i * 13) % 320}
            stroke="rgba(120,150,200,0.15)" strokeWidth="1"
            className="rain-drop"
            style={{ animationDuration: (0.6 + (i % 4) * 0.2) + 's', animationDelay: (i * 0.08) + 's' }}
          />
        ))}

        {/* Window frame dividers */}
        <rect x="398" y="62" width="4" height="336" fill="#12121e" />
        <rect x="182" y="228" width="436" height="4" fill="#12121e" />

        {/* Distant buildings silhouette */}
        <path d={`M 185 320 L 220 280 L 250 300 L 290 250 L 320 270 L 360 230 L 400 260 L 440 240 L 480 270 L 520 250 L 560 290 L 600 270 L 615 330`}
          fill="#080810" style={{ transform: `translateX(${drift * 0.3}px)` }} />

        {/* Building windows */}
        {[230, 280, 340, 380, 430, 470, 530].map((x, i) => (
          <g key={i}>
            <rect x={x} y={270 + (i % 3) * 15} width="4" height="5" fill="rgba(180,140,60,0.15)" />
            <rect x={x + 8} y={275 + (i % 3) * 15} width="4" height="5" fill="rgba(180,140,60,0.08)" />
          </g>
        ))}

        {/* Window sill */}
        <rect x="175" y="398" width="450" height="12" fill="#14141e" rx="1" />

        {/* Room ambient */}
        <rect x="0" y="0" width="180" height="600" fill="#060610" opacity="0.9" />
        <rect x="620" y="0" width="180" height="600" fill="#060610" opacity="0.9" />

        {/* Desk lamp glow */}
        <ellipse cx="680" cy="450" rx="80" ry="100" fill="url(#lamp-glow)" opacity="0.6" />

        <defs>
          <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1428" />
            <stop offset="60%" stopColor="#0c1020" />
            <stop offset="100%" stopColor="#080810" />
          </linearGradient>
          <radialGradient id="lamp-glow">
            <stop offset="0%" stopColor="rgba(180,140,60,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

function ApartmentScene({ }: { drift: number }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#080810]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {/* Room */}
        <rect x="0" y="0" width="800" height="600" fill="#0c0c16" />

        {/* Wall */}
        <rect x="50" y="30" width="700" height="400" fill="#10101c" />
        <line x1="50" y1="430" x2="750" y2="430" stroke="#16162a" strokeWidth="2" />

        {/* Bookshelf */}
        <rect x="100" y="80" width="150" height="250" fill="#0e0e1a" stroke="#16162a" strokeWidth="1" />
        {[100, 155, 210].map((y, i) => (
          <g key={i}>
            <rect x="108" y={y + 8} width="12" height={40 - i * 3} fill="#1a1a28" />
            <rect x="123" y={y + 12} width="10" height={35 - i * 3} fill="#2a1a1a" />
            <rect x="136" y={y + 6} width="14" height={42 - i * 3} fill="#1a2a1a" />
          </g>
        ))}

        {/* Table with textbooks */}
        <rect x="320" y="340" width="200" height="10" fill="#16161e" />
        <rect x="330" y="300" width="60" height="40" rx="1" fill="#1a1a2a" transform={`rotate(-3 360 320)`} />
        <rect x="400" y="305" width="50" height="35" rx="1" fill="#2a1a2a" transform={`rotate(2 425 322)`} />
        {/* Sandwich */}
        <ellipse cx="480" cy="335" rx="18" ry="8" fill="#2a2218" />
        <ellipse cx="480" cy="332" rx="16" ry="6" fill="#3a3228" />

        {/* Jacket on chair */}
        <path d="M 580 290 Q 570 310 565 350 L 620 350 Q 615 310 605 290 Q 592 285 580 290" fill="#1a1a28" />

        {/* Door (open, dark hallway beyond) */}
        <rect x="650" y="100" width="80" height="300" fill="#060608" />
        <rect x="652" y="102" width="76" height="296" fill="#040406" />

        {/* Floor */}
        <rect x="50" y="430" width="700" height="170" fill="#0a0a14" />

        {/* Dim overhead light */}
        <ellipse cx="400" cy="250" rx="200" ry="180" fill="rgba(180,160,120,0.03)" style={{ animation: 'glow-pulse 4s ease-in-out infinite' }} />

        <defs>
          <radialGradient id="apartment-light">
            <stop offset="0%" stopColor="rgba(180,160,120,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

function BarScene({ }: { drift: number }) {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#08080e" />

        {/* Bar counter */}
        <rect x="50" y="350" width="700" height="15" fill="#1a1410" />
        <rect x="50" y="365" width="700" height="200" fill="#0e0c08" />

        {/* Bottles on shelf */}
        {[100, 140, 180, 230, 280, 340, 400, 460].map((x, i) => (
          <g key={i}>
            <rect x={x} y={200 + (i % 3) * 15} width={10 + (i % 3) * 3} height={50 - (i % 2) * 10} rx="2"
              fill={`rgba(${60 + i * 10},${30 + i * 5},${20 + i * 8},0.6)`} />
            <rect x={x + 2} y={195 + (i % 3) * 15} width={6 + (i % 3) * 2} height="5" rx="1"
              fill={`rgba(${40 + i * 8},${20 + i * 3},${15 + i * 5},0.8)`} />
          </g>
        ))}

        {/* Piano in corner */}
        <rect x="580" y="280" width="150" height="80" fill="#0e0e14" rx="2" />
        <rect x="585" y="360" width="140" height="6" fill="#16161e" />
        {/* Piano keys hint */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={590 + i * 11} y={350} width="8" height="15" fill={i % 2 === 0 ? '#1a1a22' : '#0e0e14'} />
        ))}

        {/* Amber light pools */}
        <ellipse cx="200" cy="300" rx="120" ry="100" fill="rgba(180,140,60,0.04)" />
        <ellipse cx="600" cy="300" rx="100" ry="80" fill="rgba(180,140,60,0.03)" />

        {/* Smoky haze */}
        <ellipse cx="400" cy="200" rx="350" ry="150" fill="rgba(100,80,60,0.02)" style={{ animation: 'scene-drift 8s ease-in-out infinite' }} />
      </svg>
    </div>
  )
}

function OfficeScene({ }: { drift: number }) {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#080810" />

        {/* Filing cabinets */}
        {[80, 200, 320].map((x, i) => (
          <g key={i}>
            <rect x={x} y={150} width="80" height="280" fill="#0e0e18" stroke="#16162a" strokeWidth="0.5" />
            {[0, 1, 2].map(j => (
              <rect key={j} x={x + 5} y={160 + j * 90} width="70" height="80" fill="#0c0c14" />
            ))}
            {[0, 1, 2].map(j => (
              <rect key={j} x={x + 30} y={195 + j * 90} width="20" height="4" rx="1" fill="#1a1a24" />
            ))}
          </g>
        ))}

        {/* Open files on desk */}
        <rect x="480" y="280" width="250" height="150" fill="#12121c" rx="1" />
        {/* Papers */}
        <rect x="490" y="270" width="80" height="100" fill="#1a1a24" transform={`rotate(-2 530 320)`} />
        <rect x="580" y="275" width="70" height="90" fill="#1a1a24" transform={`rotate(1 615 320)`} />
        {/* File #23 label */}
        <rect x="495" y="275" width="70" height="12" fill="#2a1a1a" />
        <line x1="500" y1="295" x2="555" y2="295" stroke="rgba(200,180,140,0.1)" strokeWidth="0.5" />
        <line x1="500" y1="305" x2="545" y2="305" stroke="rgba(200,180,140,0.1)" strokeWidth="0.5" />
        <text x="505" y="284" fill="rgba(200,60,60,0.5)" fontSize="8" fontFamily="Special Elite">FILE #23</text>

        {/* Single dim light */}
        <ellipse cx="600" cy="300" rx="150" ry="120" fill="rgba(180,160,120,0.03)" />

        {/* Dust particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={200 + i * 50} cy={200 + (i * 37) % 200} r="0.5" fill="rgba(200,180,140,0.1)"
            style={{ animation: `scene-drift ${6 + i}s ease-in-out infinite` }} />
        ))}
      </svg>
    </div>
  )
}

function PierScene({ drift }: { drift: number }) {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {/* Dawn sky gradient */}
        <defs>
          <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1428" />
            <stop offset="40%" stopColor="#141828" />
            <stop offset="70%" stopColor="#1a1420" />
            <stop offset="100%" stopColor="#0c0c14" />
          </linearGradient>
          <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(100,100,120,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="600" fill="url(#dawn-sky)" />

        {/* Distant horizon glow */}
        <ellipse cx="400" cy="500" rx="400" ry="60" fill="rgba(180,120,60,0.04)" />

        {/* Container ships silhouettes */}
        <g style={{ transform: `translateX(${drift * 0.5}px)` }}>
          <rect x="100" y="440" width="180" height="50" fill="#0a0a12" />
          <rect x="120" y="420" width="40" height="20" fill="#0a0a12" />
          <rect x="200" y="425" width="60" height="15" fill="#0a0a12" />
        </g>
        <g style={{ transform: `translateX(${drift * -0.3}px)` }}>
          <rect x="520" y="450" width="150" height="40" fill="#080810" />
          <rect x="560" y="435" width="30" height="15" fill="#080810" />
        </g>

        {/* Fog layer */}
        <rect x="0" y="380" width="800" height="220" fill="url(#fog)" />
        <ellipse cx="300" cy="450" rx="200" ry="40" fill="rgba(80,80,100,0.06)" style={{ animation: 'scene-drift 10s ease-in-out infinite' }} />

        {/* Pier / Dock */}
        <rect x="300" y="480" width="200" height="120" fill="#0c0c14" />
        {/* Pier planks */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="300" y1={490 + i * 24} x2="500" y2={490 + i * 24} stroke="#101018" strokeWidth="1" />
        ))}
        {/* Pier posts */}
        <rect x="305" y="480" width="6" height="120" fill="#0e0e16" />
        <rect x="495" y="480" width="6" height="120" fill="#0e0e16" />

        {/* Harbor water */}
        <rect x="0" y="500" width="300" height="100" fill="#060810" />
        <rect x="500" y="500" width="300" height="100" fill="#060810" />
        {/* Water reflections */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={50 + i * 30} y1={520 + (i % 3) * 15} x2={80 + i * 30} y2={520 + (i % 3) * 15}
            stroke="rgba(100,120,160,0.06)" strokeWidth="1"
            style={{ animation: `scene-drift ${4 + i}s ease-in-out infinite` }} />
        ))}

        {/* Dawn light on horizon */}
        <ellipse cx="400" cy="500" rx="100" ry="15" fill="rgba(200,140,80,0.05)" />
      </svg>
    </div>
  )
}

function CarScene({ }: { drift: number }) {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#060610" />

        {/* Car interior frame */}
        <path d="M 0 200 Q 100 180 200 190 L 200 0 L 0 0 Z" fill="#08080e" />
        <path d="M 800 200 Q 700 180 600 190 L 600 0 L 800 0 Z" fill="#08080e" />

        {/* Dashboard */}
        <path d="M 0 450 L 0 600 L 800 600 L 800 450 Q 600 420 400 430 Q 200 420 0 450" fill="#0a0a12" />

        {/* Steering wheel */}
        <circle cx="280" cy="480" r="40" fill="none" stroke="#12121c" strokeWidth="6" />
        <rect x="275" y="470" width="10" height="30" fill="#12121c" />

        {/* Windshield rain */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i}
            x1={220 + i * 12} y1={10 + (i * 7) % 180}
            x2={218 + i * 12} y2={25 + (i * 7) % 180}
            stroke="rgba(120,150,200,0.12)" strokeWidth="1"
            className="rain-drop"
            style={{ animationDuration: (0.5 + (i % 3) * 0.15) + 's', animationDelay: (i * 0.06) + 's' }}
          />
        ))}

        {/* Wiper marks */}
        <path d="M 250 200 Q 400 195 550 200" fill="none" stroke="rgba(120,150,200,0.04)" strokeWidth="40" />
        <path d="M 260 198 Q 400 193 540 198" fill="none" stroke="rgba(120,150,200,0.03)" strokeWidth="30" />

        {/* Dashboard glow */}
        <ellipse cx="400" cy="450" rx="200" ry="30" fill="rgba(60,80,120,0.04)" />

        {/* Rearview mirror */}
        <rect x="380" y="160" width="40" height="25" rx="3" fill="#0a0a14" />
        <rect x="383" y="163" width="34" height="19" rx="2" fill="rgba(60,60,80,0.3)" />
      </svg>
    </div>
  )
}

function FinScene() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-void" />
      {/* Subtle red glow in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(122,24,24,0.03)_0%,transparent_70%)]" />
      </div>
    </div>
  )
}
