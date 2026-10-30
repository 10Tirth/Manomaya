import { useState, useEffect, useRef } from 'react'

const PHASES = [
  { label: 'Breathe in', duration: 4000, scale: 1.35 },
  { label: 'Hold', duration: 4000, scale: 1.35 },
  { label: 'Breathe out', duration: 4000, scale: 1 },
  { label: 'Hold', duration: 4000, scale: 1 },
]

export default function BreathingBubble() {
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [seconds, setSeconds] = useState(4)
  const timerRef = useRef(null)
  const secRef = useRef(null)

  useEffect(() => {
    if (!running) return

    const runPhase = (idx) => {
      const phase = PHASES[idx]
      setPhaseIdx(idx)
      setSeconds(phase.duration / 1000)

      let elapsed = 0
      secRef.current = setInterval(() => {
        elapsed += 1000
        const remaining = Math.max(0, Math.round((phase.duration - elapsed) / 1000))
        setSeconds(remaining)
      }, 1000)

      timerRef.current = setTimeout(() => {
        clearInterval(secRef.current)
        runPhase((idx + 1) % PHASES.length)
      }, phase.duration)
    }

    runPhase(0)

    return () => {
      clearTimeout(timerRef.current)
      clearInterval(secRef.current)
    }
  }, [running])

  const phase = PHASES[phaseIdx]

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Bubble */}
      <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
        <div
          className="absolute rounded-full transition-transform ease-in-out"
          style={{
            width: 140,
            height: 140,
            background: 'radial-gradient(circle at 40% 38%, #9fd3c1, #bfe0f5)',
            transform: `scale(${running ? phase.scale : 1})`,
            transitionDuration: running ? `${phase.duration}ms` : '300ms',
            opacity: 0.85,
          }}
          aria-hidden="true"
        />
        <div className="relative text-center z-10">
          <p className="font-display font-semibold text-ink text-base leading-none">
            {running ? phase.label : 'Ready'}
          </p>
          {running && (
            <p className="text-slate text-2xl font-bold mt-1">{seconds}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setRunning((v) => !v)}
        className="h-11 px-7 rounded-full bg-sage-deep text-white font-semibold text-sm hover:shadow-lift hover:-translate-y-px transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
        aria-label={running ? 'Pause breathing exercise' : 'Start breathing exercise'}
      >
        {running ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}
