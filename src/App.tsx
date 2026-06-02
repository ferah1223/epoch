import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollProvider, useScroll } from './context/Scroll'
import { Preloader } from './components/Preloader'
import { Rain } from './components/Rain'
import { FilmGrain } from './components/FilmGrain'
import { Vignette } from './components/Vignette'
import { Timeline } from './components/Timeline'
import { AudioCtrl } from './components/AudioCtrl'
import { LangToggle } from './components/LangToggle'
import { Prologue } from './scenes/Prologue'
import { ActCall } from './scenes/ActCall'
import { ActScene } from './scenes/ActScene'
import { ActHunt } from './scenes/ActHunt'
import { ActTruth } from './scenes/ActTruth'
import { ActEnd } from './scenes/ActEnd'
import { useAudio } from './hooks/useAudio'

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const { currentAct } = useScroll()
  const audio = useAudio(currentAct)
  const mainRef = useRef<HTMLDivElement>(null)

  // GSAP-powered scroll animations for reveal elements
  useEffect(() => {
    if (!mainRef.current) return

    const ctx = gsap.context(() => {
      // Fade-in-up reveals on scroll
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // Parallax backgrounds
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const depth = parseFloat(el.dataset.parallax || '0.2')
        gsap.to(el, {
          yPercent: depth * -30,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })

      // Scale-in reveals
      gsap.utils.toArray<HTMLElement>('[data-scale-reveal]').forEach((el) => {
        gsap.from(el, {
          scale: 0.85,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  // Trigger SFX on act changes
  useEffect(() => {
    if (currentAct < 0 || audio.muted) return

    // Trigger appropriate SFX per act
    const sfxMap: Record<number, () => void> = {
      0: () => audio.playSfx('rain_start'),
      1: () => audio.playSfx('phone'),
      2: () => audio.playSfx('door'),
      3: () => {}, // Hunt — no specific SFX
      4: () => audio.playSfx('thunder'),
      5: () => {},
    }

    sfxMap[currentAct]?.()
  }, [currentAct])

  return (
    <div className="relative bg-void" ref={mainRef}>
      <Rain />
      <FilmGrain />
      <Vignette />
      <Timeline act={currentAct} />
      <AudioCtrl act={currentAct} />
      <LangToggle />
      <main>
        <Prologue scrollY={0} />
        <ActCall scrollY={0} />
        <ActScene scrollY={0} />
        <ActHunt scrollY={0} />
        <ActTruth scrollY={0} />
        <ActEnd scrollY={0} />
      </main>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Real loading: wait for fonts + critical resources
  useEffect(() => {
    const load = async () => {
      try {
        // Wait for fonts
        await document.fonts.ready
        // Minimum 1.5s for the preloader animation, max 3s
        await new Promise(r => setTimeout(r, 1800))
      } catch {}
      setLoaded(true)
    }
    load()
  }, [])

  if (!loaded) return <Preloader />

  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  )
}
