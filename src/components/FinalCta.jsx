import Reveal from './Reveal.jsx'

export default function FinalCta({ onRegister }) {
  return (
    <section className="py-20 md:py-28 bg-cream" aria-label="Final call to action">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-deep to-lavender-deep p-10 md:p-16 text-center">
            {/* Decorative CSS-only floating shapes — NO additional WebGL canvas */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="float-shape absolute"
                style={{
                  top: '-20px', left: '8%', width: 80, height: 80, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
              <div
                className="float-shape-2 absolute"
                style={{
                  bottom: '-10px', right: '12%', width: 120, height: 120, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <div
                className="float-shape-3 absolute"
                style={{
                  top: '30%', right: '4%', width: 50, height: 50,
                  borderRadius: '12px', transform: 'rotate(20deg)',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
              <div
                className="float-shape absolute"
                style={{
                  bottom: '20%', left: '2%', width: 60, height: 60,
                  borderRadius: '50%',
                  background: 'rgba(255,220,203,0.25)',
                }}
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
              2 – 6 November 2026
            </p>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.1 }}
            >
              Ready to bloom?
            </h2>
            <p className="text-white/80 max-w-[50ch] mx-auto mb-8 leading-relaxed">
              Five days. Eighteen activities. One campus, together. Reserve your spot — it's free.
            </p>

            <button
              onClick={() => onRegister({ open: true, preselectedIds: [] })}
              className="h-12 px-8 rounded-full bg-white text-sage-deep font-bold text-base hover:shadow-lift hover:-translate-y-px active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sage-deep"
            >
              Register now — it's free
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
