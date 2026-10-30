import { Phone } from 'lucide-react'
import { SUPPORT } from '../data/event.js'
import Reveal from './Reveal.jsx'

export default function Support() {
  const { helplines, campus } = SUPPORT
  const allLines = [...helplines]
  if (campus?.value) allLines.push(campus)

  return (
    <section id="support" className="py-20 md:py-28 bg-cream" aria-labelledby="support-heading">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-peach/50 to-lavender/40 border border-peach/40 p-8 md:p-12 max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-peach-deep mb-3">
              You matter
            </p>
            <h2
              id="support-heading"
              className="font-display font-bold text-ink mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.1 }}
            >
              You're not alone.
            </h2>
            <p className="text-slate max-w-[55ch] mx-auto mb-8 leading-relaxed">
              If you're going through a tough time, reaching out is a sign of strength — not
              weakness. Talk to someone you trust, or call a helpline anytime.
            </p>

            {allLines.length > 0 && (
              <div className="flex flex-col gap-3 mb-8">
                {allLines.map((line) => (
                  <a
                    key={line.label}
                    href={line.href}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 border border-peach/30 px-5 py-4 hover:shadow-soft hover:-translate-y-px transition-all group focus-visible:ring-2 focus-visible:ring-sage-deep"
                    aria-label={`${line.label}: ${line.value}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-peach/60 flex items-center justify-center flex-shrink-0">
                        <Phone size={16} className="text-peach-deep" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium text-ink text-left">{line.label}</span>
                    </div>
                    <span className="text-sage-deep font-bold text-lg group-hover:underline">
                      {line.value}
                    </span>
                  </a>
                ))}
              </div>
            )}

            <p className="text-sm text-slate mb-2">
              On <strong className="text-ink">Day 5 (Fri 6 Nov)</strong>, our{' '}
              <a href="#activities" className="text-sage-deep font-semibold underline underline-offset-2">
                Counsellor Connect
              </a>{' '}
              offers free, confidential 15-minute 1:1 chats.
            </p>

            <p className="text-xs text-slate/80 mt-6 border-t border-peach/30 pt-4">
              This website and festival do not provide medical advice or emergency services.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
