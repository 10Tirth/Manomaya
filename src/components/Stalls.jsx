import { useState } from 'react';

const STALLS = [
  { id: 's1', type: 'food', name: 'Cafe Bliss', description: 'Coffee, snacks, smoothies' },
  { id: 's2', type: 'food', name: 'Green Bites', description: 'Salads, fresh fruits' },
  { id: 's3', type: 'shop', name: 'Mindful Merch', description: 'Posters, journals, eco‑goods' },
  { id: 's4', type: 'shop', name: 'Artisan Corner', description: 'Handmade crafts, jewelry' },
];

export default function Stalls() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? STALLS : STALLS.filter((s) => s.type === filter);

  return (
    <section id="stalls" className="section">
      <div className="wrap">
        <h2 className="section-title">Garden stalls <span className="soft">to shop &amp; munch</span></h2>
        <div className="filters mb-4" role="tablist" aria-label="Filter stalls">
          {['all', 'food', 'shop'].map((f) => (
            <button
              key={f}
              className={`chip mr-2 ${filter === f ? 'is-active' : ''}`}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div key={s.id} className="p-4 border rounded-xl bg-paper shadow-soft">
              <h3 className="font-medium mb-1">{s.name}</h3>
              <p className="text-sm text-slate">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
