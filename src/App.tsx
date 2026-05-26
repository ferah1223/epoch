import { useState, useEffect } from 'react'
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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [act, setAct] = useState(-1)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const els = document.querySelectorAll('[data-act]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAct(parseInt(e.target.getAttribute('data-act') || '0'))
        })
      },
      { threshold: 0.2 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [loaded])

  if (!loaded) return <Preloader />

  return (
    <div className="relative min-h-screen">
      <Rain />
      <FilmGrain />
      <Vignette />
      <Timeline act={act} />
      <AudioCtrl act={act} />
      <LangToggle />
      <main>
        <Prologue />
        <ActCall />
        <ActScene />
        <ActHunt />
        <ActTruth />
        <ActEnd />
      </main>
    </div>
  )
}
