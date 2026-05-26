import { useState, useEffect } from 'react'
import { ScrollProvider } from './context/Scroll'
import { useScroll } from './context/Scroll'
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

function AppContent() {
  const { scrollY } = useScroll()
  const [act, setAct] = useState(-1)

  useEffect(() => {
    const els = document.querySelectorAll('[data-act]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const actNum = parseInt(e.target.getAttribute('data-act') || '0')
            setAct(actNum)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Update audio when act changes
  useEffect(() => {
    if (act >= 0) {
      // The audio system will handle act changes internally
    }
  }, [act])

  return (
    <div className="relative bg-void">
      <Rain />
      <FilmGrain />
      <Vignette />
      <Timeline act={act} />
      <AudioCtrl act={act} />
      <LangToggle />
      <main>
        <Prologue scrollY={scrollY} />
        <ActCall scrollY={scrollY} />
        <ActScene scrollY={scrollY} />
        <ActHunt scrollY={scrollY} />
        <ActTruth scrollY={scrollY} />
        <ActEnd scrollY={scrollY} />
      </main>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2500)
    return () => clearTimeout(t)
  }, [])

  if (!loaded) return <Preloader />

  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  )
}
