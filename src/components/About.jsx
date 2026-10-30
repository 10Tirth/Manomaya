import { BookOpen, Mic2, Users } from 'lucide-react'
import Reveal from './Reveal.jsx'

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Awareness',
    body: 'Talks, panels and a campus walk that turn silence into conversation — making mental health a topic we can all speak about openly.',
  },
  {
    icon: Mic2,
    title: 'Skills',
    body: 'Hands-on sessions in breathwork, journaling and active listening you can use long after the fest. Small tools, big difference.',
  },
  {
    icon: Users,
    title: 'Support',
    body: 'Counsellors, peer listeners and a judgement-free space where asking for help is celebrated, not stigmatised.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-cream" aria-labelledby="about-heading">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-deep mb-3">
            About the fest
          </p>
          <h2
            className="font-display font-bold text-ink mb-6 max-w-[22ch]"
            id="about-heading"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Mental health is health.
          </h2>
          <p className="text-slate max-w-[65ch] mb-14 leading-relaxed" style={{ fontSize: '1.0625rem' }}>
            Student life is a lot — deadlines, new places, new people, and the quiet pressure to be fine.
            Mind Matters Fest is five days to slow down, talk openly, and pick up simple tools that actually
            help. For every student. For freshers especially.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="rounded-3xl bg-paper border border-line p-7 shadow-soft h-full hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-sage/20 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-sage-deep" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-ink text-xl mb-2">{title}</h3>
                <p className="text-slate text-sm leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
