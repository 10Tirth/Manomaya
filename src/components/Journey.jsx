import { DAYS, ACTIVITIES } from '../data/event.js'
import { formatDayDate, activityCountByDay } from '../lib/format.js'
import { useTilt } from '../hooks/useTilt.js'
import Reveal from './Reveal.jsx'

const DAY_COLORS = {
  1: { bg: 'bg-sky', text: 'text-sky-deep', border: 'border-sky' },
  2: { bg: 'bg-sage/30', text: 'text-sage-deep', border: 'border-sage' },
  3: { bg: 'bg-lavender', text: 'text-lavender-deep', border: 'border-lavender' },
  4: { bg: 'bg-peach', text: 'text-peach-deep', border: 'border-peach' },
  5: { bg: 'bg-butter', text: 'text-butter-deep', border: 'border-butter' },
}

function DayCard({ dayData, activityCount, onSelectDay }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(5)
  const { day, date, theme, blurb } = dayData
  const colors = DAY_COLORS[day]
  const dateLabel = formatDayDate(date)

  const handleClick = () => {
    onSelectDay(day)
    document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      className={`text-left rounded-3xl ${colors.bg} border ${colors.border}/40 p-6 shadow-soft hover:shadow-lift transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 w-full`}
      aria-label={`Day ${day}: ${theme}. ${dateLabel}. ${activityCount} activities. Click to filter.`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate mb-1">{dateLabel}</p>
      <p className={`text-4xl font-display font-bold ${colors.text} mb-1`}>Day {day}</p>
      <p className="font-semibold text-ink text-lg mb-2">{theme}</p>
      <p className="text-sm text-slate leading-relaxed mb-4">{blurb}</p>
      <div className={`inline-flex items-center gap-1.5 rounded-full ${colors.bg} border ${colors.border}/60 px-3 py-1 text-xs font-semibold ${colors.text}`}>
        {activityCount} {activityCount === 1 ? 'activity' : 'activities'} →
      </div>
    </button>
  )
}

export default function Journey({ onSelectDay }) {
  const counts = activityCountByDay(ACTIVITIES)

  return (
    <section id="journey" className="py-20 md:py-28 bg-paper" aria-labelledby="journey-heading">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-deep mb-3">
            The programme
          </p>
          <h2
            id="journey-heading"
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            The five-day journey.
          </h2>
          <p className="text-slate max-w-[60ch] mb-12 leading-relaxed">
            Each day has its own theme. Click a day to jump straight to those activities.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DAYS.map((d, i) => (
            <Reveal key={d.day} delay={i * 0.07}>
              <DayCard
                dayData={d}
                activityCount={counts[d.day] || 0}
                onSelectDay={onSelectDay}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
