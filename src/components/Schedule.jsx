import { DAYS, ACTIVITIES } from '../data/event.js';
import { formatDayDate, formatTimeRange } from '../lib/format.js';

export default function Schedule() {
  return (
    <section id="schedule" className="section bg-cream py-12" aria-labelledby="schedule-heading">
      <div className="wrap max-w-6xl mx-auto px-5 md:px-8">
        <h2 id="schedule-heading" className="font-display text-ink text-3xl md:text-4xl mb-8">
          Schedule – day by day
        </h2>
        {DAYS.map((d) => (
          <div key={d.day} className="mb-10">
            <h3 className="text-lg font-semibold text-sage-deep mb-3">
              {formatDayDate(d.date)} – {d.theme}
            </h3>
            <ul className="list-none space-y-4">
              {ACTIVITIES.filter((a) => a.day === d.day).map((a) => (
                <li key={a.id} className="flex flex-col md:flex-row md:items-center text-sm text-ink py-2">
                  <span className="w-48 md:w-auto font-medium text-sage-deep">
                    {formatTimeRange(a.start, a.end)}
                  </span>
                  <span className="flex-1 md:ml-4">
                    {a.title} ({a.venue})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
