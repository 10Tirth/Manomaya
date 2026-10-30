import { useState } from 'react'

const MOODS = [
  {
    emoji: '😔', label: 'Rough', level: 0,
    message: "That's okay. Hard days are part of the human experience.",
    suggestion: 'Try five slow breaths, or step outside for a moment.',
    supportLink: true,
  },
  {
    emoji: '😕', label: 'Low', level: 1,
    message: 'You noticed, and that matters.',
    suggestion: 'A short walk, a glass of water, or a kind word to yourself can help.',
    supportLink: true,
  },
  {
    emoji: '😐', label: 'Okay', level: 2,
    message: "Okay is a perfectly valid place to be.",
    suggestion: "The breathing exercise next door might help you reset.",
    supportLink: false,
  },
  {
    emoji: '🙂', label: 'Good', level: 3,
    message: 'Good energy — keep it going.',
    suggestion: 'Share that feeling with someone today.',
    supportLink: false,
  },
  {
    emoji: '😊', label: 'Great', level: 4,
    message: "That's wonderful. Savour it.",
    suggestion: 'Spread a little of that warmth to someone around you.',
    supportLink: false,
  },
]

export default function MoodCheckIn() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm text-slate text-center">How are you feeling right now?</p>

      <div className="flex gap-2" role="group" aria-label="Mood check-in">
        {MOODS.map((m) => (
          <button
            key={m.label}
            onClick={() => setSelected(m)}
            aria-pressed={selected?.label === m.label}
            title={m.label}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all min-w-[52px] min-h-[52px] focus-visible:ring-2 focus-visible:ring-sage-deep ${
              selected?.label === m.label
                ? 'bg-sage/20 scale-110 shadow-soft'
                : 'hover:bg-cream hover:scale-105'
            }`}
            aria-label={m.label}
          >
            <span className="text-2xl" aria-hidden="true">{m.emoji}</span>
            <span className="text-xs text-slate">{m.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="w-full rounded-2xl bg-cream border border-line p-4 text-center space-y-1.5 animate-fade-in">
          <p className="text-ink font-medium text-sm">{selected.message}</p>
          <p className="text-slate text-sm">{selected.suggestion}</p>
          {selected.supportLink && (
            <p className="text-sm">
              <a
                href="#support"
                className="text-sage-deep font-semibold underline underline-offset-2 hover:text-sage-deep/80"
              >
                Find support →
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
