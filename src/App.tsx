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
import { useAudio, type SfxName } from './hooks/useAudio'

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const { currentAct } = useScroll()
  const audio = useAudio(currentAct)
  const mainRef = useRef<HTMLDivElement>(null)

  // SFX scroll sync: trigger SFX when elements with data-sfx scroll into view
  useEffect(() => {
    if (!mainRef.current || audio.muted) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-sfx]').forEach((el) => {
        const sfxName = el.dataset.sfx as SfxName
        if (!sfxName) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (!audio.muted) audio.playSfx(sfxName)
          }
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [audio.muted])

  // Rain starts automatically when unmuted (handled in useAudio toggle)

  return (
    <>
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                   focus:px-4 focus:py-2 focus:bg-surface focus:text-ink focus:rounded-lg
                   focus:outline-2 focus:outline-red-hot font-typewriter text-sm"
      >
        Skip to content
      </a>

      <div className="relative bg-void" ref={mainRef}>
        {/* Ambient glow blobs */}
        <div className="ambient-glow" aria-hidden="true" />

        <Rain />
        <FilmGrain />
        <Vignette />
        {/* Noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Timeline act={currentAct} />
        <AudioCtrl act={currentAct} />
        <LangToggle />

        <main id="main-content">
          <Prologue />
          <ActCall />
          <ActScene />
          <ActHunt />
          <ActTruth />
          <ActEnd />
        </main>
      </div>
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        await document.fonts.ready
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
