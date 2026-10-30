import { useRef, useState, lazy, Suspense, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Zap } from 'lucide-react'
import { EVENT, ACTIVITIES } from '../data/event.js'
import { useCountdown } from '../hooks/useCountdown.js'
import { formatShortDate, totalActivityCount } from '../lib/format.js'
import HeroFallback from './HeroFallback.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

function CountdownCard({ target, endISO }) {
  const { days, hours, mins, secs, state } = useCountdown(target, endISO)

  if (state === 'during') {
    return (
      <div className="inline-block rounded-2xl px-5 py-3 text-sm font-semibold text-sage-deep bg-white/70 backdrop-blur-sm border border-line shadow-soft">
        🌸 The fest is on — join us today!
      </div>
    )
  }
  if (state === 'after') {
    return (
      <div className="inline-block rounded-2xl px-5 py-3 text-sm font-semibold text-slate bg-white/70 backdrop-blur-sm border border-line shadow-soft">
        Thank you for being part of Mind Matters. See you next year!
      </div>
    )
  }

  return (
    <div className="inline-flex gap-3 rounded-2xl px-5 py-3 bg-white/70 backdrop-blur-sm border border-line shadow-soft" role="timer" aria-label="Countdown to Mind Matters Fest 2026">
      {[
        { val: days, label: 'Days' },
        { val: hours, label: 'Hours' },
        { val: mins, label: 'Mins' },
        { val: secs, label: 'Secs' },
      ].map(({ val, label }) => (
        <div key={label} className="text-center min-w-[44px]">
          <div className="text-2xl font-bold font-display text-ink leading-none">
            {String(val).padStart(2, '0')}
          </div>
          <div className="text-xs text-slate mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Hero({ onRegister }) {
  const containerRef = useRef(null)
  const [sceneLoaded, setSceneLoaded] = useState(false)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const activityCount = totalActivityCount(ACTIVITIES)
  const startFmt = formatShortDate(EVENT.startDate)
  const endFmt = formatShortDate(EVENT.endDate)

  // Load 3D scene after first paint via requestIdleCallback
  useEffect(() => {
    const load = () => setSceneLoaded(true)
    if (prefersReducedMotion) return // skip WebGL under reduced motion
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(load, { timeout: 2000 })
      return () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(load, 300)
      return () => clearTimeout(id)
    }
  }, [prefersReducedMotion])

  const chips = [
    { icon: Calendar, text: `${startFmt} – ${endFmt} 2026` },
    { icon: MapPin, text: EVENT.venue },
    { icon: Users, text: `${activityCount} activities` },
    { icon: Zap, text: EVENT.entryNote },
  ]

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col lg:flex-row overflow-hidden bg-cream"
      aria-label="Hero"
    >
      {/* Background blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute blob-float"
          style={{
            top: '-10%', left: '-8%', width: 520, height: 520,
            background: 'radial-gradient(circle, #D8D2F7 0%, transparent 70%)',
            opacity: 0.5, filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute blob-float-slow"
          style={{
            bottom: '5%', right: '5%', width: 420, height: 420,
            background: 'radial-gradient(circle, #D5EAF8 0%, transparent 70%)',
            opacity: 0.55, filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute blob-float-fast"
          style={{
            top: '40%', left: '30%', width: 280, height: 280,
            background: 'radial-gradient(circle, #8CC3B1 0%, transparent 70%)',
            opacity: 0.3, filter: 'blur(48px)',
          }}
        />
      </div>

      {/* Text column */}
      <div className="relative z-10 flex flex-col justify-center px-5 md:px-10 lg:px-16 pt-28 pb-12 lg:py-0 lg:w-1/2 xl:w-[52%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-line px-4 py-1.5 mb-6 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-sage-deep animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-deep">
              A student mental health festival · 2–6 Nov 2026
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display font-bold leading-[1.04] tracking-[-0.02em] text-ink mb-5"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.2rem)' }}
          >
            Your mind{' '}
            <span className="gradient-text">matters.</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-slate mb-8 max-w-[60ch]"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.125rem)', lineHeight: 1.65 }}
          >
            Five days of calm, creativity and connection: yoga, art, open mics, peer support and more.
            Made for students, freshers especially.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => onRegister({ open: true, preselectedIds: [] })}
              className="h-12 px-7 rounded-full bg-sage-deep text-white font-semibold text-sm hover:shadow-lift hover:-translate-y-px active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Register now
            </button>
            <a
              href="#activities"
              className="h-12 px-7 rounded-full bg-white border border-line text-ink font-semibold text-sm hover:bg-cream hover:shadow-soft active:translate-y-px transition-all inline-flex items-center focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Explore activities
            </a>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {chips.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 rounded-full bg-white/80 border border-line px-3 py-1 text-xs text-slate"
              >
                <Icon size={13} className="text-sage-deep flex-shrink-0" aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <CountdownCard target={EVENT.countdownTarget} endISO={`${EVENT.endDate}T23:59:59+05:30`} />
        </motion.div>
      </div>

      {/* 3D canvas column */}
      <div
        className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[52%] pointer-events-none"
        style={{ minHeight: '320px', height: 'clamp(320px, 50vw, 640px)' }}
        aria-hidden="true"
      >
        <ErrorBoundary fallback={<HeroFallback />}>
          {sceneLoaded && !prefersReducedMotion ? (
            <Suspense fallback={<HeroFallback />}>
              <HeroScene containerRef={containerRef} />
            </Suspense>
          ) : (
            <HeroFallback />
          )}
        </ErrorBoundary>
      </div>
    </section>
  )
}
