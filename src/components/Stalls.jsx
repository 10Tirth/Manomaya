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
    <section id="stalls" className="section bg-cream py-12" aria-labelledby="stalls-heading">
      <div className="wrap max-w-6xl mx-auto px-5 md:px-8">
        <h2 id="stalls-heading" className="font-display text-ink text-3xl md:text-4xl mb-8">
          Garden stalls to shop &amp; munch
        </h2>
        <div className="filters mb-6" role="tablist" aria-label="Filter stalls">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div key={s.id} className="p-5 border rounded-xl bg-paper shadow-soft">
              <h3 className="font-medium text-sage-deep mb-1">{s.name}</h3>
              <p className="text-sm text-slate mb-2">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
