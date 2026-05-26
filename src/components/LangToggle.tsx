import { useLang } from '../context/Language'

export function LangToggle() {
  const { lang, toggle } = useLang()

  return (
    <button
      onClick={toggle}
      className="fixed top-4 left-4 z-50 px-3 py-1.5 rounded-md bg-surface/40 border border-faint/15
        hover:border-red/20 transition-all duration-300 font-typewriter text-xs tracking-wider cursor-pointer"
      aria-label={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
      title={`Switch to ${lang === 'en' ? 'Bahasa Indonesia' : 'English'}`}
    >
      <span className={lang === 'en' ? 'text-ink/70' : 'text-dim/40'}>EN</span>
      <span className="text-dim/20 mx-1">/</span>
      <span className={lang === 'id' ? 'text-ink/70' : 'text-dim/40'}>ID</span>
    </button>
  )
}
