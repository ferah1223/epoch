type SceneType = 'window' | 'apartment' | 'bar' | 'office' | 'pier' | 'car' | 'fin'

interface SceneBgProps {
  scene: SceneType
  scrollY: number
  opacity?: number
}

export function SceneBackground({ scene, scrollY, opacity = 1 }: SceneBgProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity }}>
      {scene === 'window' && <WindowScene scrollY={scrollY} />}
      {scene === 'apartment' && <ApartmentScene scrollY={scrollY} />}
      {scene === 'bar' && <BarScene scrollY={scrollY} />}
      {scene === 'office' && <OfficeScene scrollY={scrollY} />}
      {scene === 'pier' && <PierScene scrollY={scrollY} />}
      {scene === 'car' && <CarScene scrollY={scrollY} />}
      {scene === 'fin' && <FinScene />}
    </div>
  )
}

/* ====== WINDOW SCENE ====== */
function WindowScene({ scrollY }: { scrollY: number }) {
  const parallax = scrollY * 0.02
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-void to-void" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#060610" />

        {/* Room dark walls with texture */}
        <rect x="0" y="0" width="180" height="600" fill="#060610" />
        <rect x="620" y="0" width="180" height="600" fill="#060610" />
        {/* Wall texture */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 60} x2="180" y2={i * 60} stroke="rgba(255,255,255,0.005)" strokeWidth="0.5" />
        ))}

        {/* Window frame - deeper */}
        <rect x="175" y="55" width="450" height="350" rx="1" fill="#0e0e18" />
        <rect x="180" y="60" width="440" height="340" fill="#0a1428" />

        {/* Night sky with depth layers */}
        <rect x="182" y="62" width="436" height="336" fill="url(#night-sky)" />

        {/* Distant city - furthest layer (slowest parallax) */}
        <g style={{ transform: `translateY(${parallax * 0.2}px)` }}>
          <path d="M 182 360 L 200 330 L 215 340 L 240 310 L 260 325 L 290 295 L 320 315 L 350 285 L 380 305 L 410 280 L 440 300 L 470 275 L 500 295 L 530 280 L 560 300 L 590 285 L 618 340 L 618 398 L 182 398"
            fill="#080810" />
        </g>

        {/* Mid-city - middle layer */}
        <g style={{ transform: `translateY(${parallax * 0.5}px)` }}>
          <path d="M 182 380 L 210 350 L 230 360 L 260 335 L 290 355 L 330 330 L 360 350 L 400 325 L 430 345 L 470 320 L 510 340 L 550 325 L 580 345 L 618 360 L 618 398 L 182 398"
            fill="#0a0a14" />
        </g>

        {/* Building windows - blinking lights */}
        {[220, 250, 280, 310, 350, 380, 420, 450, 490, 520, 560].map((x, i) => (
          <g key={i}>
            <rect x={x} y={340 + (i % 4) * 10} width="3" height="4" fill={`rgba(180,140,60,${0.08 + (i % 3) * 0.04})`}
              style={{ animation: `glow-pulse ${3 + i * 0.5}s ease-in-out infinite` }} />
            {i % 2 === 0 && (
              <rect x={x + 6} y={345 + (i % 3) * 8} width="3" height="4" fill={`rgba(180,140,60,${0.05 + (i % 2) * 0.03})`}
                style={{ animation: `glow-pulse ${4 + i * 0.3}s ease-in-out infinite` }} />
            )}
          </g>
        ))}

        {/* Rain on window - more drops with streaks */}
        {Array.from({ length: 30 }).map((_, i) => (
          <g key={i}>
            <line
              x1={190 + i * 14} y1={65 + (i * 11) % 330}
              x2={188 + i * 14} y2={80 + (i * 11) % 330}
              stroke="rgba(120,150,200,0.12)" strokeWidth="1"
              className="rain-drop"
              style={{ animationDuration: (0.5 + (i % 4) * 0.15) + 's', animationDelay: (i * 0.07) + 's' }}
            />
            {/* Rain streak */}
            <line
              x1={189 + i * 14} y1={62 + (i * 11) % 330}
              x2={189 + i * 14} y2={65 + (i * 11) % 330}
              stroke="rgba(150,180,220,0.06)" strokeWidth="2"
              className="rain-drop"
              style={{ animationDuration: (0.5 + (i % 4) * 0.15) + 's', animationDelay: (i * 0.07) + 's' }}
            />
          </g>
        ))}

        {/* Window condensation patches */}
        <ellipse cx="250" cy="150" rx="30" ry="20" fill="rgba(100,120,150,0.03)" />
        <ellipse cx="500" cy="200" rx="25" ry="15" fill="rgba(100,120,150,0.025)" />
        <ellipse cx="350" cy="300" rx="20" ry="12" fill="rgba(100,120,150,0.02)" />

        {/* Window frame dividers - 3D */}
        <rect x="398" y="58" width="5" height="342" fill="#12121e" />
        <rect x="400" y="58" width="1" height="342" fill="rgba(255,255,255,0.02)" />
        <rect x="178" y="228" width="444" height="5" fill="#12121e" />
        <rect x="178" y="230" width="444" height="1" fill="rgba(255,255,255,0.02)" />

        {/* Window sill - 3D */}
        <rect x="170" y="398" width="460" height="14" fill="#14141e" />
        <rect x="170" y="398" width="460" height="2" fill="rgba(255,255,255,0.03)" />
        {/* Objects on sill */}
        <rect x="560" y="392" width="20" height="8" rx="1" fill="#1a1a24" />

        {/* Desk lamp - warm glow */}
        <ellipse cx="680" cy="460" rx="100" ry="120" fill="url(#lamp-glow)" opacity="0.7" />
        {/* Lamp body */}
        <rect x="660" y="420" width="8" height="40" fill="#1a1a24" />
        <path d="M 650 420 Q 664 410 678 420" fill="#2a2a34" />

        <defs>
          <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1428" />
            <stop offset="30%" stopColor="#0c1020" />
            <stop offset="70%" stopColor="#080810" />
            <stop offset="100%" stopColor="#060608" />
          </linearGradient>
          <radialGradient id="lamp-glow">
            <stop offset="0%" stopColor="rgba(180,140,60,0.12)" />
            <stop offset="50%" stopColor="rgba(180,140,60,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ====== APARTMENT SCENE ====== */
function ApartmentScene({ scrollY }: { scrollY: number }) {
  const parallax = scrollY * 0.015
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#080810]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#0c0c16" />

        {/* Wall with subtle texture */}
        <rect x="40" y="20" width="720" height="420" fill="#10101c" />
        {/* Wall pattern */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="40" y1={80 + i * 80} x2="760" y2={80 + i * 80} stroke="rgba(255,255,255,0.008)" strokeWidth="0.5" />
        ))}
        <line x1="40" y1="440" x2="760" y2="440" stroke="#16162a" strokeWidth="2" />

        {/* Bookshelf with depth */}
        <g style={{ transform: `translateY(${parallax * 0.3}px)` }}>
          <rect x="80" y="60" width="160" height="280" fill="#0e0e1a" stroke="#16162a" strokeWidth="1" />
          {/* Shelves */}
          {[60, 140, 220].map((y, i) => (
            <g key={i}>
              <rect x="85" y={y} width="150" height="8" fill="#12121e" />
              {/* Books */}
              <rect x="90" y={y - 42} width="14" height="40" rx="1" fill="#2a1a1a" />
              <rect x="107" y={y - 38} width="12" height="36" rx="1" fill="#1a2a1a" />
              <rect x="122" y={y - 44} width="16" height="42" rx="1" fill="#1a1a2a" />
              <rect x="141" y={y - 35} width="10" height="33" rx="1" fill="#2a2a1a" />
              <rect x="154" y={y - 40} width="13" height="38" rx="1" fill="#2a1a2a" />
              <rect x="170" y={y - 36} width="11" height="34" rx="1" fill="#1a2a2a" />
              <rect x="184" y={y - 42} width="15" height="40" rx="1" fill="#2a2020" />
              {/* Book spines detail */}
              <line x1="95" y1={y - 38} x2="95" y2={y - 8} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="128" y1={y - 40} x2="128" y2={y - 6} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* Table with items */}
        <g style={{ transform: `translateY(${parallax * 0.5}px)` }}>
          <rect x="300" y="340" width="220" height="12" fill="#16161e" />
          <rect x="310" y="352" width="8" height="88" fill="#12121a" />
          <rect x="502" y="352" width="8" height="88" fill="#12121a" />
          {/* Textbooks */}
          <rect x="320" y="298" width="65" height="42" rx="1" fill="#1a1a2a" transform="rotate(-2 352 319)" />
          <rect x="395" y="302" width="55" height="38" rx="1" fill="#2a1a2a" transform="rotate(1 422 321)" />
          {/* Notebook */}
          <rect x="460" y="305" width="45" height="35" rx="1" fill="#1a2a1a" transform="rotate(-1 482 322)" />
          {/* Pen */}
          <line x1="510" y1="310" x2="525" y2="335" stroke="#2a2a3a" strokeWidth="1.5" />
          {/* Sandwich plate */}
          <ellipse cx="490" cy="336" rx="20" ry="8" fill="#1a1816" />
          <ellipse cx="490" cy="333" rx="18" ry="6" fill="#2a2218" />
          <ellipse cx="490" cy="330" rx="16" ry="5" fill="#3a3228" />
          {/* Coffee mug */}
          <rect x="530" y="322" width="14" height="16" rx="2" fill="#1a1a24" />
          <path d="M 544 326 Q 550 330 544 336" fill="none" stroke="#1a1a24" strokeWidth="2" />
          {/* Steam */}
          <path d="M 534 320 Q 536 315 534 310" fill="none" stroke="rgba(200,180,140,0.05)" strokeWidth="1"
            style={{ animation: 'scene-drift 4s ease-in-out infinite' }} />
        </g>

        {/* Jacket on chair */}
        <g style={{ transform: `translateY(${parallax * 0.4}px)` }}>
          <path d="M 600 280 Q 588 310 582 360 L 640 360 Q 632 310 620 280 Q 610 275 600 280"
            fill="#1a1a28" />
          {/* Jacket collar */}
          <path d="M 598 282 Q 610 278 622 282" fill="none" stroke="#2a2a3a" strokeWidth="1.5" />
          {/* Jacket pocket */}
          <path d="M 592 320 L 595 320 L 597 335 L 590 335 Z" fill="rgba(0,0,0,0.2)" />
        </g>

        {/* Door (ajar) */}
        <rect x="660" y="80" width="90" height="320" fill="#060608" />
        <rect x="664" y="84" width="82" height="312" fill="#040406" />
        {/* Door handle */}
        <circle cx="740" cy="240" r="3" fill="#1a1a24" />
        {/* Light from hallway */}
        <path d="M 664 84 L 746 84 L 760 400 L 664 400" fill="rgba(100,90,70,0.015)" />

        {/* Floor */}
        <rect x="40" y="440" width="720" height="160" fill="#0a0a14" />
        {/* Floor boards */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="40" y1={450 + i * 18} x2="760" y2={450 + i * 18}
            stroke="rgba(255,255,255,0.008)" strokeWidth="0.5" />
        ))}

        {/* Dim overhead light */}
        <ellipse cx="400" cy="250" rx="220" ry="200" fill="rgba(180,160,120,0.025)"
          style={{ animation: 'glow-pulse 5s ease-in-out infinite' }} />
      </svg>
    </div>
  )
}

/* ====== BAR SCENE ====== */
function BarScene({ scrollY }: { scrollY: number }) {
  const parallax = scrollY * 0.01
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#08080e" />

        {/* Bar counter - 3D */}
        <g style={{ transform: `translateY(${parallax * 0.3}px)` }}>
          <rect x="30" y="340" width="740" height="18" fill="#1a1410" />
          <rect x="30" y="340" width="740" height="3" fill="rgba(255,255,255,0.03)" />
          <rect x="30" y="358" width="740" height="242" fill="#0e0c08" />
          {/* Bar footrest */}
          <rect x="40" y="580" width="720" height="4" rx="2" fill="#1a1410" />
          {/* Counter edge highlight */}
          <line x1="30" y1="340" x2="770" y2="340" stroke="rgba(180,140,80,0.08)" strokeWidth="1" />
        </g>

        {/* Bottles on shelf - detailed */}
        <g style={{ transform: `translateY(${parallax * 0.2}px)` }}>
          {[80, 120, 160, 210, 260, 320, 380, 440, 500, 560, 620, 680].map((x, i) => (
            <g key={i}>
              {/* Bottle */}
              <rect x={x} y={190 + (i % 4) * 12} width={12 + (i % 3) * 3} height={55 - (i % 2) * 8} rx="2"
                fill={`rgba(${50 + i * 8},${25 + i * 4},${15 + i * 6},0.6)`} />
              {/* Bottle neck */}
              <rect x={x + 3} y={183 + (i % 4) * 12} width={6 + (i % 3) * 2} height="10" rx="1"
                fill={`rgba(${40 + i * 6},${18 + i * 3},${12 + i * 4},0.8)`} />
              {/* Bottle label */}
              <rect x={x + 2} y={210 + (i % 4) * 12} width={8 + (i % 3) * 2} height="12" fill="rgba(200,180,140,0.06)" />
              {/* Bottle reflection */}
              <line x1={x + 2} y1={195 + (i % 4) * 12} x2={x + 2} y2={220 + (i % 4) * 12}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </g>
          ))}
          {/* Shelf */}
          <rect x="60" y="250" width="660" height="6" fill="#12100e" />
          <rect x="60" y="250" width="660" height="1" fill="rgba(255,255,255,0.02)" />
        </g>

        {/* Piano in corner */}
        <g style={{ transform: `translateY(${parallax * 0.4}px)` }}>
          <rect x="580" y="270" width="170" height="90" fill="#0e0e14" rx="2" />
          {/* Piano lid */}
          <path d="M 580 270 L 580 260 Q 665 250 750 260 L 750 270" fill="#12121a" />
          {/* Piano legs */}
          <rect x="590" y="360" width="6" height="40" fill="#0c0c12" />
          <rect x="734" y="360" width="6" height="40" fill="#0c0c12" />
          {/* Piano keys */}
          {Array.from({ length: 15 }).map((_, i) => (
            <rect key={i} x={590 + i * 10.5} y={350} width="8" height="18"
              fill={i % 2 === 0 ? '#1a1a22' : '#0e0e14'} />
          ))}
          {/* Black keys */}
          {[0, 1, 3, 4, 5].map(i => (
            <rect key={i} x={596 + i * 14} y={350} width="6" height="11" fill="#0a0a10" />
          ))}
        </g>

        {/* Amber light pools - warmer */}
        <ellipse cx="180" cy="300" rx="140" ry="120" fill="rgba(180,140,60,0.035)" />
        <ellipse cx="620" cy="300" rx="120" ry="100" fill="rgba(180,140,60,0.025)" />
        {/* Neon glow */}
        <ellipse cx="400" cy="100" rx="80" ry="30" fill="rgba(100,60,120,0.02)"
          style={{ animation: 'glow-pulse 4s ease-in-out infinite' }} />

        {/* Smoky haze */}
        <ellipse cx="400" cy="200" rx="400" ry="180" fill="rgba(100,80,60,0.015)"
          style={{ animation: 'scene-drift 10s ease-in-out infinite' }} />
      </svg>
    </div>
  )
}

/* ====== OFFICE SCENE ====== */
function OfficeScene({ scrollY }: { scrollY: number }) {
  const parallax = scrollY * 0.012
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#080810" />

        {/* Filing cabinets - 3D */}
        <g style={{ transform: `translateY(${parallax * 0.3}px)` }}>
          {[60, 190, 320].map((x, ci) => (
            <g key={ci}>
              <rect x={x} y={130} width="90" height="300" fill="#0e0e18" stroke="#16162a" strokeWidth="0.5" />
              {/* Cabinet drawers */}
              {[0, 1, 2, 3].map(j => (
                <g key={j}>
                  <rect x={x + 4} y={138 + j * 73} width="82" height="65" fill="#0c0c14" />
                  {/* Drawer handle */}
                  <rect x={x + 32} y={168 + j * 73} width="26" height="5" rx="1.5" fill="#1a1a24" />
                  {/* Drawer label */}
                  <rect x={x + 30} y={145 + j * 73} width="30" height="10" fill="rgba(200,180,140,0.04)" />
                  {/* Cabinet edge highlight */}
                  <line x1={x + 4} y1={138 + j * 73} x2={x + 86} y2={138 + j * 73}
                    stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                </g>
              ))}
              {/* Cabinet top shadow */}
              <rect x={x} y={130} width="90" height="3" fill="rgba(0,0,0,0.3)" />
            </g>
          ))}
        </g>

        {/* Desk with files */}
        <g style={{ transform: `translateY(${parallax * 0.5}px)` }}>
          <rect x="450" y="270" width="300" height="14" fill="#12121c" />
          <rect x="460" y="284" width="10" height="156" fill="#0e0e16" />
          <rect x="730" y="284" width="10" height="156" fill="#0e0e16" />
          {/* Open files */}
          <rect x="470" y="250" width="90" height="110" fill="#1a1a24" transform="rotate(-2 515 305)" />
          <rect x="570" y="255" width="80" height="100" fill="#1a1a24" transform="rotate(1 610 305)" />
          <rect x="660" y="252" width="70" height="105" fill="#1a1a24" transform="rotate(-1 695 305)" />

          {/* File #23 label */}
          <rect x="475" y="255" width="80" height="14" fill="#2a1a1a" />
          <text x="485" y="265" fill="rgba(200,60,60,0.5)" fontSize="9" fontFamily="Special Elite">FILE #23</text>
          {/* File lines */}
          {[275, 285, 295, 305, 315, 325].map((y, i) => (
            <line key={i} x1="480" y1={y} x2={540 - i * 3} y2={y}
              stroke="rgba(200,180,140,0.06)" strokeWidth="0.5" />
          ))}

          {/* File #47 label */}
          <rect x="575" y="260" width="70" height="14" fill="#2a1a1a" />
          <text x="583" y="270" fill="rgba(200,60,60,0.5)" fontSize="9" fontFamily="Special Elite">FILE #47</text>

          {/* Desk lamp */}
          <rect x="700" y="240" width="6" height="32" fill="#1a1a24" />
          <path d="M 690 240 Q 703 230 716 240" fill="#2a2a34" />
          <ellipse cx="703" cy="235" rx="15" ry="10" fill="rgba(180,140,60,0.06)" />
        </g>

        {/* Dust particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <circle key={i} cx={100 + i * 45} cy={180 + (i * 37) % 200} r="0.6" fill="rgba(200,180,140,0.08)"
            style={{ animation: `scene-drift ${6 + i}s ease-in-out infinite` }} />
        ))}

        {/* Single dim light */}
        <ellipse cx="550" cy="300" rx="180" ry="150" fill="rgba(180,160,120,0.02)" />
      </svg>
    </div>
  )
}

/* ====== PIER SCENE ====== */
function PierScene({ scrollY }: { scrollY: number }) {
  const parallax = scrollY * 0.008
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1428" />
            <stop offset="25%" stopColor="#121828" />
            <stop offset="50%" stopColor="#181420" />
            <stop offset="100%" stopColor="#0c0c14" />
          </linearGradient>
          <linearGradient id="fog-layer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(80,80,100,0.06)" />
            <stop offset="50%" stopColor="rgba(80,80,100,0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="600" fill="url(#dawn-sky)" />

        {/* Horizon glow - dawn */}
        <ellipse cx="400" cy="510" rx="500" ry="80" fill="rgba(180,120,60,0.03)" />
        <ellipse cx="400" cy="510" rx="300" ry="40" fill="rgba(200,140,80,0.04)" />

        {/* Container ships - furthest layer */}
        <g style={{ transform: `translateX(${parallax * 0.3}px)` }}>
          <rect x="60" y="440" width="200" height="55" fill="#0a0a12" />
          <rect x="80" y="418" width="45" height="22" fill="#0a0a12" />
          <rect x="150" y="422" width="70" height="18" fill="#0a0a12" />
          {/* Ship windows */}
          {[90, 110, 130, 150, 170, 190, 210, 230].map((x, i) => (
            <rect key={i} x={x} y={455} width="3" height="3" fill={`rgba(180,140,60,${0.06 + (i % 3) * 0.02})`} />
          ))}
        </g>
        <g style={{ transform: `translateX(${parallax * -0.2}px)` }}>
          <rect x="540" y="450" width="170" height="45" fill="#080810" />
          <rect x="570" y="432" width="35" height="18" fill="#080810" />
          <rect x="620" y="438" width="50" height="12" fill="#080810" />
        </g>

        {/* Fog layers - multiple for depth */}
        <rect x="0" y="380" width="800" height="220" fill="url(#fog-layer)" />
        <ellipse cx="250" cy="460" rx="250" ry="50" fill="rgba(80,80,100,0.04)"
          style={{ animation: 'scene-drift 12s ease-in-out infinite' }} />
        <ellipse cx="550" cy="440" rx="200" ry="40" fill="rgba(80,80,100,0.03)"
          style={{ animation: 'scene-drift 15s ease-in-out infinite reverse' }} />

        {/* Pier / Dock - detailed */}
        <rect x="280" y="480" width="240" height="120" fill="#0c0c14" />
        {/* Pier planks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="280" y1={490 + i * 20} x2="520" y2={490 + i * 20}
            stroke="#101018" strokeWidth="1" />
        ))}
        {/* Plank gaps */}
        {[320, 360, 400, 440, 480].map((x, i) => (
          <line key={i} x1={x} y1="480" x2={x} y2="600" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
        ))}
        {/* Pier posts */}
        <rect x="284" y="478" width="8" height="122" fill="#0e0e16" />
        <rect x="508" y="478" width="8" height="122" fill="#0e0e16" />
        {/* Ropes */}
        <path d="M 288 490 Q 300 495 288 510" fill="none" stroke="#1a1a24" strokeWidth="1" />
        <path d="M 512 490 Q 500 495 512 510" fill="none" stroke="#1a1a24" strokeWidth="1" />

        {/* Harbor water */}
        <rect x="0" y="500" width="280" height="100" fill="#060810" />
        <rect x="520" y="500" width="280" height="100" fill="#060810" />
        {/* Water reflections - shimmer */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i}>
            <line x1={20 + i * 22} y1={515 + (i % 4) * 12} x2={50 + i * 22} y2={515 + (i % 4) * 12}
              stroke="rgba(100,120,160,0.05)" strokeWidth="1"
              style={{ animation: `scene-drift ${3 + i * 0.5}s ease-in-out infinite` }} />
            <line x1={540 + i * 20} y1={520 + (i % 3) * 10} x2={565 + i * 20} y2={520 + (i % 3) * 10}
              stroke="rgba(100,120,160,0.04)" strokeWidth="1"
              style={{ animation: `scene-drift ${4 + i * 0.3}s ease-in-out infinite` }} />
          </g>
        ))}

        {/* Dawn light on horizon */}
        <ellipse cx="400" cy="505" rx="120" ry="20" fill="rgba(200,140,80,0.04)" />
      </svg>
    </div>
  )
}

/* ====== CAR SCENE ====== */
function CarScene({ }: { scrollY: number }) {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="600" fill="#060610" />

        {/* Car interior frame - darker */}
        <path d="M 0 190 Q 120 170 220 185 L 220 0 L 0 0 Z" fill="#08080e" />
        <path d="M 800 190 Q 680 170 580 185 L 580 0 L 800 0 Z" fill="#08080e" />
        {/* A-pillar detail */}
        <path d="M 220 0 L 230 0 L 235 185 L 220 185" fill="#0a0a14" />
        <path d="M 580 0 L 570 0 L 565 185 L 580 185" fill="#0a0a14" />

        {/* Dashboard - 3D */}
        <path d="M 0 440 L 0 600 L 800 600 L 800 440 Q 600 410 400 420 Q 200 410 0 440" fill="#0a0a12" />
        <path d="M 0 440 Q 200 415 400 425 Q 600 415 800 440" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        {/* Dashboard vents */}
        <rect x="200" y="425" width="40" height="8" rx="2" fill="#0e0e18" />
        <rect x="260" y="425" width="40" height="8" rx="2" fill="#0e0e18" />
        <rect x="500" y="425" width="40" height="8" rx="2" fill="#0e0e18" />
        <rect x="560" y="425" width="40" height="8" rx="2" fill="#0e0e18" />

        {/* Steering wheel */}
        <circle cx="280" cy="475" rx="45" ry="42" fill="none" stroke="#12121c" strokeWidth="7" />
        <circle cx="280" cy="475" rx="38" ry="35" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
        {/* Steering column */}
        <rect x="275" y="465" width="10" height="35" fill="#101018" />
        {/* Steering center */}
        <circle cx="280" cy="475" r="12" fill="#0e0e18" />

        {/* Windshield rain - more drops with streaks */}
        {Array.from({ length: 35 }).map((_, i) => (
          <g key={i}>
            <line
              x1={230 + i * 10} y1={5 + (i * 7) % 180}
              x2={228 + i * 10} y2={18 + (i * 7) % 180}
              stroke="rgba(120,150,200,0.1)" strokeWidth="1"
              className="rain-drop"
              style={{ animationDuration: (0.4 + (i % 3) * 0.12) + 's', animationDelay: (i * 0.05) + 's' }}
            />
            {/* Wiper trail */}
            {i % 5 === 0 && (
              <line
                x1={230 + i * 10} y1={3 + (i * 7) % 180}
                x2={230 + i * 10} y2={6 + (i * 7) % 180}
                stroke="rgba(150,180,220,0.04)" strokeWidth="3"
                className="rain-drop"
                style={{ animationDuration: (0.4 + (i % 3) * 0.12) + 's', animationDelay: (i * 0.05) + 's' }}
              />
            )}
          </g>
        ))}

        {/* Wiper marks on windshield */}
        <path d="M 260 195 Q 400 188 540 195" fill="none" stroke="rgba(120,150,200,0.03)" strokeWidth="50" />

        {/* Rearview mirror */}
        <rect x="378" y="155" width="44" height="28" rx="4" fill="#0a0a14" />
        <rect x="381" y="158" width="38" height="22" rx="3" fill="rgba(60,60,80,0.25)" />
        {/* Mirror reflection */}
        <line x1="383" y1="160" x2="383" y2="178" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

        {/* Instrument cluster glow */}
        <ellipse cx="320" cy="450" rx="60" ry="15" fill="rgba(60,80,120,0.03)" />
        <ellipse cx="480" cy="450" rx="60" ry="15" fill="rgba(60,80,120,0.03)" />
      </svg>
    </div>
  )
}

/* ====== FIN SCENE ====== */
function FinScene() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(122,24,24,0.04)_0%,transparent_60%)]" />
      </div>
    </div>
  )
}
