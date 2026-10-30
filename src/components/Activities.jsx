import { useState } from 'react'
import { ACTIVITIES, CATEGORIES, DAYS } from '../data/event.js'
import { formatDayDate } from '../lib/format.js'
import ActivityCard from './ActivityCard.jsx'
import Reveal from './Reveal.jsx'

const ALL_DAYS = 'all'
const ALL_CATS = 'all'

export default function Activities({ onRegister, registeredIds, selectedDay, onDayChange }) {
  const [catFilter, setCatFilter] = useState(ALL_CATS)

  const filtered = ACTIVITIES.filter((a) => {
    const dayMatch = selectedDay === ALL_DAYS || a.day === selectedDay
    const catMatch = catFilter === ALL_CATS || a.category === catFilter
    return dayMatch && catMatch
  }).sort((a, b) => a.day - b.day || a.start.localeCompare(b.start))

  const dayOptions = [
    { value: ALL_DAYS, label: 'All days' },
    ...DAYS.map((d) => ({ value: d.day, label: formatDayDate(d.date) })),
  ]

  const catOptions = [
    { value: ALL_CATS, label: 'All' },
    ...CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
  ]

  return (
    <section id="activities" className="py-20 md:py-28 bg-cream" aria-labelledby="activities-heading">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-sage-deep mb-3">
            What's on
          </p>
          <h2
            id="activities-heading"
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Every activity, all in one place.
          </h2>
          <p className="text-slate max-w-[60ch] mb-10 leading-relaxed">
            Register for the ones you want — helps us plan seats and materials. Drop-in activities are open to all.
          </p>
        </Reveal>

        {/* Day filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none"
          role="group"
          aria-label="Filter by day"
        >
          {dayOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onDayChange(value)}
              aria-pressed={selectedDay === value}
              className={`flex-shrink-0 h-10 px-4 rounded-full text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 ${
                selectedDay === value
                  ? 'bg-sage-deep text-white shadow-soft'
                  : 'bg-white border border-line text-slate hover:text-ink hover:border-slate'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none"
          role="group"
          aria-label="Filter by category"
        >
          {catOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCatFilter(value)}
              aria-pressed={catFilter === value}
              className={`flex-shrink-0 h-10 px-4 rounded-full text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 ${
                catFilter === value
                  ? 'bg-ink text-white shadow-soft'
                  : 'bg-white border border-line text-slate hover:text-ink hover:border-slate'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-sm text-slate mb-6" aria-live="polite" aria-atomic="true">
          Showing <strong className="text-ink">{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'activity' : 'activities'}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((activity, i) => (
              <Reveal key={activity.id} delay={Math.min(i, 5) * 0.06}>
                <ActivityCard
                  activity={activity}
                  onRegister={onRegister}
                  isRegistered={registeredIds.has(activity.id)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl bg-paper border border-line">
            <p className="text-slate text-lg mb-4">No activities match these filters.</p>
            <button
              onClick={() => { onDayChange(ALL_DAYS); setCatFilter(ALL_CATS) }}
              className="h-10 px-6 rounded-full bg-sage-deep text-white text-sm font-semibold hover:shadow-lift transition-all"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Multi-register prompt */}
        <Reveal>
          <div className="mt-12 text-center py-8 rounded-3xl bg-paper border border-line">
            <p className="text-slate mb-4">
              Want to join several?{' '}
              <span className="text-ink font-medium">Register for multiple activities in one go.</span>
            </p>
            <button
              onClick={() => onRegister({ open: true, preselectedIds: [] })}
              className="h-11 px-7 rounded-full bg-sage-deep text-white font-semibold text-sm hover:shadow-lift hover:-translate-y-px active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Register for activities
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
