import { Megaphone, Leaf, Palette, HeartHandshake, Smile, MapPin, Clock } from 'lucide-react'
import { formatDayDate, formatTimeRange } from '../lib/format.js'
import { DAYS } from '../data/event.js'
import { motion } from 'framer-motion'

// Static colour lookup — NEVER use template literals for Tailwind classes
const COLOR_MAP = {
  sky: {
    tile: 'bg-sky',
    icon: 'text-sky-deep',
    pill: 'bg-sky text-sky-deep',
    badge: 'bg-sky/60 text-sky-deep',
  },
  sage: {
    tile: 'bg-sage/30',
    icon: 'text-sage-deep',
    pill: 'bg-sage/30 text-sage-deep',
    badge: 'bg-sage/20 text-sage-deep',
  },
  lavender: {
    tile: 'bg-lavender',
    icon: 'text-lavender-deep',
    pill: 'bg-lavender text-lavender-deep',
    badge: 'bg-lavender/60 text-lavender-deep',
  },
  peach: {
    tile: 'bg-peach',
    icon: 'text-peach-deep',
    pill: 'bg-peach text-peach-deep',
    badge: 'bg-peach/60 text-peach-deep',
  },
  butter: {
    tile: 'bg-butter',
    icon: 'text-butter-deep',
    pill: 'bg-butter text-butter-deep',
    badge: 'bg-butter/60 text-butter-deep',
  },
}

const ICON_MAP = {
  awareness: Megaphone,
  mindfulness: Leaf,
  creative: Palette,
  support: HeartHandshake,
  fun: Smile,
}

const CATEGORY_COLOR = {
  awareness: 'sky',
  mindfulness: 'sage',
  creative: 'lavender',
  support: 'peach',
  fun: 'butter',
}

const CATEGORY_LABEL = {
  awareness: 'Awareness',
  mindfulness: 'Mindfulness',
  creative: 'Creative',
  support: 'Support',
  fun: 'Fun',
}

export default function ActivityCard({ activity, onRegister, isRegistered }) {
  const { id, day, start, end, category, title, venue, dropIn, description } = activity
  const color = CATEGORY_COLOR[category] || 'sage'
  const colors = COLOR_MAP[color]
  const Icon = ICON_MAP[category] || Smile

  const dayData = DAYS.find((d) => d.day === day)
  const dateLabel = dayData ? formatDayDate(dayData.date) : ''
  const timeLabel = formatTimeRange(start, end)

  return (
    <motion.article
      className="rounded-3xl bg-paper border border-line shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden"
      aria-label={`${title}, ${dateLabel}, ${timeLabel}`}
    >
      {/* Top colour strip with icon */}
      <div className={`${colors.tile} px-5 pt-5 pb-4 flex items-start gap-3`}>
        <div className={`w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} className={colors.icon} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block rounded-full text-xs font-semibold px-2.5 py-0.5 ${colors.pill}`}>
            {CATEGORY_LABEL[category]}
          </span>
          {dropIn && (
            <span className={`ml-1.5 inline-block rounded-full text-xs font-semibold px-2.5 py-0.5 ${colors.badge}`}>
              Drop-in welcome
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-ink text-lg leading-snug mb-3">{title}</h3>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate">
            <Clock size={13} className="text-sage-deep flex-shrink-0" aria-hidden="true" />
            <span>{dateLabel} · {timeLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate">
            <MapPin size={13} className="text-sage-deep flex-shrink-0" aria-hidden="true" />
            <span>{venue}</span>
          </div>
        </div>

        <p className="text-slate text-sm leading-relaxed flex-1 mb-5">{description}</p>

        {/* Register / Registered button */}
        <div className="mt-auto">
          {isRegistered ? (
            <button
              disabled
              className="w-full h-11 rounded-full bg-cream border border-line text-slate text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-1.5"
              aria-label="Already registered for this activity"
            >
              <span>Registered</span>
              <span aria-hidden="true">✓</span>
            </button>
          ) : (
            <button
              onClick={() => onRegister({ open: true, preselectedIds: [id] })}
              className="w-full h-11 rounded-full bg-sage-deep text-white text-sm font-semibold hover:shadow-lift hover:-translate-y-px active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
