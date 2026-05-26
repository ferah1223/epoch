import { useLang } from '../context/Language'

export function Timeline({ act }: { act: number }) {
  const { t } = useLang()
  const items = [
    { k: 'tl.prologue', i: 0 }, { k: 'tl.call', i: 1 }, { k: 'tl.scene', i: 2 },
    { k: 'tl.hunt', i: 3 }, { k: 'tl.truth', i: 4 }, { k: 'tl.end', i: 5 },
  ]
  const go = (i: number) => document.querySelector('[data-act="' + i + '"]')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4">
      {items.map((it, idx) => (
        <button key={idx} onClick={() => go(it.i)} className="group flex items-center gap-2.5 cursor-pointer">
          <span className={'font-typewriter text-xs tracking-wider transition-all duration-500 whitespace-nowrap ' +
            (act === it.i ? 'opacity-100 text-red-hot' : 'opacity-0 group-hover:opacity-50 text-dim')}>
            {t(it.k)}
          </span>
          <div className={'w-2 h-2 rounded-full transition-all duration-500 ' +
            (act === it.i ? 'bg-red-hot shadow-[0_0_8px_rgba(196,40,40,0.5)] scale-150' : 'bg-faint group-hover:bg-dim/50')} />
        </button>
      ))}
    </nav>
  )
}
