import { EVENT } from '../data/event.js'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Activities', href: '#activities' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Support', href: '#support' },
  { label: 'FAQ', href: '#faq' },
]

function LeafMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#3E7C6D" />
      <path d="M16 7C16 7 9 11 9 18C9 22.4 12.1 25 16 25C19.9 25 23 22.4 23 18C23 11 16 7 16 7Z" fill="#FBFAF7" opacity="0.9" />
      <path d="M16 25V14" stroke="#3E7C6D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Footer() {
  const hasSocials = EVENT.socials.instagram || EVENT.socials.linkedin

  return (
    <footer className="bg-ink text-white/80 py-12 md:py-16 pb-24 md:pb-16" role="contentinfo">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LeafMark />
              <span className="font-display font-semibold text-white text-base">{EVENT.shortName}</span>
            </div>
            <p className="text-sm text-white/60 italic mb-2">{EVENT.tagline}</p>
            <p className="text-xs text-white/50">{EVENT.college}</p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Quick links
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:rounded focus-visible:ring-1 focus-visible:ring-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Contact
            </p>
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="text-sm text-white/70 hover:text-white transition-colors break-all focus-visible:rounded focus-visible:ring-1 focus-visible:ring-white"
            >
              {EVENT.contactEmail}
            </a>

            {hasSocials && (
              <div className="mt-4 flex gap-3">
                {EVENT.socials.instagram && (
                  <a
                    href={EVENT.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:rounded focus-visible:ring-1 focus-visible:ring-white"
                  >
                    Instagram
                  </a>
                )}
                {EVENT.socials.linkedin && (
                  <a
                    href={EVENT.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:rounded focus-visible:ring-1 focus-visible:ring-white"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-2 items-center text-xs text-white/40">
          <p>Made with care for students · 2026</p>
          <p>Built with Google Antigravity</p>
        </div>
      </div>
    </footer>
  )
}
