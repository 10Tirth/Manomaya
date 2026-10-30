import Reveal from './Reveal.jsx'
import BreathingBubble from './BreathingBubble.jsx'
import MoodCheckIn from './MoodCheckIn.jsx'

export default function Wellness() {
  return (
    <section id="wellness" className="py-20 md:py-28 bg-paper" aria-labelledby="wellness-heading">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-deep mb-3">
            Just for you
          </p>
          <h2
            id="wellness-heading"
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Take a minute for yourself.
          </h2>
          <p className="text-slate max-w-[60ch] mb-12 leading-relaxed text-sm italic">
            A gentle break, not a substitute for professional help.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Box breathing */}
          <Reveal delay={0}>
            <div className="rounded-3xl bg-sky/20 border border-sky/40 p-8 flex flex-col items-center text-center shadow-soft h-full">
              <h3 className="font-display font-semibold text-ink text-xl mb-2">Box Breathing</h3>
              <p className="text-slate text-sm mb-6 max-w-[40ch]">
                Breathe in · Hold · Breathe out · Hold — four seconds each. A simple reset for a
                busy mind.
              </p>
              <BreathingBubble />
            </div>
          </Reveal>

          {/* Mood check-in */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl bg-lavender/30 border border-lavender/50 p-8 flex flex-col items-center text-center shadow-soft h-full">
              <h3 className="font-display font-semibold text-ink text-xl mb-2">Mood Check-In</h3>
              <p className="text-slate text-sm mb-6 max-w-[40ch]">
                Just a moment of self-awareness. Nothing is stored or sent anywhere.
              </p>
              <MoodCheckIn />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
