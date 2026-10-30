const WORDS = [
  'Breathe', 'Reflect', 'Bloom', 'Connect', 'Create', 'Celebrate',
  'You are not alone', 'Talk it out',
]

const TRACK = [...WORDS, ...WORDS]

export default function Marquee() {
  return (
    <div
      className="marquee-wrap overflow-hidden bg-sage-deep py-4 select-none"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap">
        <div className="marquee-track flex gap-0 shrink-0">
          {TRACK.map((word, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-white font-semibold text-sm tracking-wide">{word}</span>
              <span className="text-white/40 text-xs">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
