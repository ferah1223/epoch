import { useLang } from '../context/Language'

export function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button onClick={toggle}
      className="fixed top-5 right-16 z-50 px-2.5 py-1 rounded-full border border-faint bg-void/60 backdrop-blur-sm hover:border-dim/40 transition-all cursor-pointer"
      aria-label="Toggle language">
      <span className="font-mono text-dim text-xs tracking-wider">{lang === 'en' ? 'ID' : 'EN'}</span>
    </button>
  )
}
