import { DAYS, ACTIVITIES } from '../data/event.js';
import { formatDayDate, formatTimeRange } from '../lib/format.js';

export default function Schedule() {
  return (
    <section id="schedule" className="section">
      <div className="wrap">
        <h2 className="section-title">Schedule – day by day</h2>
        {DAYS.map((d) => (
          <div key={d.day} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{formatDayDate(d.date)} – {d.theme}</h3>
            <ol className="list-disc pl-5 space-y-2">
              {ACTIVITIES.filter((a) => a.day === d.day).map((a) => (
                <li key={a.id}>
                  <span className="font-medium">{formatTimeRange(a.start, a.end)}</span> – {a.title} ({a.venue})
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
