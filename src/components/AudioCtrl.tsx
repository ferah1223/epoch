import { useAudio } from '../hooks/useAudio'
import { useLang } from '../context/Language'
import { useState } from 'react'

interface AudioCtrlProps {
  act: number
}

export function AudioCtrl({ act }: AudioCtrlProps) {
  const { muted, toggle, playNarration, stopNarration, narrationPlaying, setVolume } = useAudio(act)
  const { t } = useLang()
  const [showPanel, setShowPanel] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50 flex items-start gap-2">
      {/* Volume Panel */}
      {showPanel && (
        <div className="bg-surface/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[180px] animate-fade-in">
          <div className="space-y-3">
            {/* Ambient */}
            <div>
              <label className="text-xs text-paper/60 font-typewriter uppercase tracking-wider">
                {t('audio.ambient') || 'Ambient'}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                onChange={(e) => setVolume('ambient', parseInt(e.target.value) / 100)}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-hot mt-1"
              />
            </div>
            {/* SFX */}
            <div>
              <label className="text-xs text-paper/60 font-typewriter uppercase tracking-wider">
                {t('audio.sfx') || 'Effects'}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                onChange={(e) => setVolume('sfx', parseInt(e.target.value) / 100)}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-hot mt-1"
              />
            </div>
            {/* Narration */}
            <div>
              <label className="text-xs text-paper/60 font-typewriter uppercase tracking-wider">
                {t('audio.narration') || 'Voice'}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                onChange={(e) => setVolume('narration', parseInt(e.target.value) / 100)}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-hot mt-1"
              />
            </div>
            {/* Narration button */}
            {act >= 0 && (
              <button
                onClick={() => narrationPlaying ? stopNarration() : playNarration(act)}
                className="w-full mt-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10
                           rounded-lg text-xs text-ink font-typewriter transition-all cursor-pointer"
              >
                {narrationPlaying
                  ? (t('audio.stop_narration') || '■ Stop Voice')
                  : (t('audio.play_narration') || '▶ Play Voice')
                }
              </button>
            )}
          </div>
        </div>
      )}

      {/* Settings Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface/60 backdrop-blur-sm
                   border border-white/10 text-paper/50 hover:text-ink transition-colors cursor-pointer"
        aria-label="Audio settings"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Mute Toggle */}
      <button
        onClick={toggle}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface/60 backdrop-blur-sm
                   border border-white/10 hover:bg-surface/80 transition-all cursor-pointer"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          // Muted icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-paper/40">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // Sound on icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  )
}
