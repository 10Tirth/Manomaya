import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '../data/event.js'
import Reveal from './Reveal.jsx'

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const id = `faq-answer-${index}`
  const btnId = `faq-btn-${index}`

  return (
    <div className="border-b border-line last:border-0">
      <h3>
        <button
          id={btnId}
          className="w-full flex items-center justify-between gap-4 py-5 text-left font-medium text-ink hover:text-sage-deep transition-colors focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-inset min-h-[56px]"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{q}</span>
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cream flex items-center justify-center" aria-hidden="true">
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </span>
        </button>
      </h3>
      <div
        id={id}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
      >
        <p className="pb-5 text-slate text-sm leading-relaxed max-w-[65ch]">{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-paper" aria-labelledby="faq-heading">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-deep mb-3">
            Questions
          </p>
          <h2
            id="faq-heading"
            className="font-display font-bold text-ink mb-10"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Good to know.
          </h2>
        </Reveal>

        <div className="max-w-2xl">
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FaqItem q={item.q} a={item.a} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
