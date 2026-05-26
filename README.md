<p align="center">
  <img src="https://img.shields.io/badge/EPOCH-v5-Noir?style=for-the-badge&color=040406&labelColor=7a1818" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

<h1 align="center">EPOCH — The Vanishing</h1>
<p align="center">A cinematic noir detective story, told through scrolling.</p>

<p align="center">
  <img src="https://img.shields.io/badge/bundle-76KB_gzipped-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/characters-2_SVG-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/scenes-6_cinematic-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/languages-EN_|_ID-yellow?style=flat-square" />
</p>

---

## The Story

Kael is a 28-year-old private detective who has spent three years searching for his sister Lina, who vanished at age 19. One night, a frantic mother calls — her daughter Mira, also 19, has disappeared after investigating Lina's case.

As Kael traces Mira's steps through jazz bars, dark offices, and fog-covered docks, he discovers the truth he feared most: Lina is gone. But her courage saved twelve other lives.

> *"Tell my brother I am sorry. Tell him I tried."*

## Features

### Animated Characters
- **Kael** — SVG detective character with 5 poses (stand, walk, sit, cry, kneel) and 5 expressions (neutral, sad, shock, cry, determined)
- **Mira** — SVG character with 4 poses and 5 expressions
- Characters appear at key story moments, moving with the narrative

### Cinematic Backgrounds
Six unique SVG scene backgrounds that shift as you scroll:
- **Window** — Rain-streaked window with city silhouette
- **Apartment** — Mira's room with bookshelf, table, jacket
- **Bar** — The Blue Note jazz bar with bottles and piano
- **Office** — Viktor's file-filled office with filing cabinets
- **Pier** — Dawn harbor with container ships and fog
- **Car** — Interior with windshield rain

### Story Structure
| Act | Title | Duration | Elements |
|-----|-------|----------|----------|
| Prologue | The Vanishing | 5 min | Window rain, typewriter, title reveal |
| Act I | The Call | 5 min | Phone call, Kael character, typewriter |
| Act II | The Scene | 5 min | Apartment, 3 interactive clue cards |
| Act III | The Hunt | 5 min | 3 locations, scene switching, Kael walking |
| Act IV | The Truth | 5 min | Car scene, Mira character, emotional climax |
| Act V | After | 5 min | Lina's letter, Kael crying, credits |

### Cinematic Effects
- **Rain** — 40 CSS particle raindrops
- **Film Grain** — Canvas noise at 12fps
- **Vignette** — Radial gradient darkening
- **Parallax** — Subtle drift on scene backgrounds
- **Scroll Transitions** — IntersectionObserver-driven reveal animations

### Accessibility
- Full keyboard navigation
- ARIA labels on all interactive elements
- `prefers-reduced-motion` respected
- Screen reader landmarks

### Bilingual
- Full English + Indonesian (80+ translation keys)
- Toggle button in top-left corner

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Pure SVG characters (no images)
- Web Audio API ambient sound
- Zero dependencies beyond React

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output: ~260KB JS (76KB gzipped), ~35KB CSS (6.6KB gzipped)

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/ferah1223">ferah1223</a></sub>
  <br/>
  <sub>Powered by <a href="https://github.com/nousresearch/hermes-agent">Hermes Agent</a> + Xiaomi MiMo V2.5</sub>
</p>
