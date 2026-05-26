import { useLang } from '../context/Language'

interface Props {
  act: number
}

const ACTS = ['tl.prologue', 'tl.call', 'tl.scene', 'tl.hunt', 'tl.truth', 'tl.end']

export function Timeline({ act }: Props) {
  const { t } = useLang()

  const scrollToAct = (idx: number) => {
    const el = document.querySelector(`[data-act="${idx}"]`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-2"
      aria-label="Story navigation"
    >
      {ACTS.map((key, i) => (
        <button
          key={key}
          onClick={() => scrollToAct(i)}
          className="group flex items-center gap-2 cursor-pointer"
          aria-label={t(key)}
          aria-current={act === i ? 'step' : undefined}
        >
          <span className={`font-typewriter text-[10px] tracking-wider transition-all duration-300
            ${act === i ? 'text-ink/70 opacity-100 translate-x-0' : 'text-dim/30 opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'}`}>
            {t(key)}
          </span>
          <div className={`transition-all duration-300 rounded-full
            ${act === i ? 'w-3 h-3 bg-red-hot shadow-[0_0_8px_rgba(196,40,40,0.3)]' : 'w-1.5 h-1.5 bg-dim/30 group-hover:bg-dim/50'}`} />
        </button>
      ))}
    </nav>
  )
}
