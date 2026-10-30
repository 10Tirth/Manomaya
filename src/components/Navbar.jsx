import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { EVENT } from '../data/event.js'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Activities', href: '#activities' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Support', href: '#support' },
  { label: 'FAQ', href: '#faq' },
]

function LeafMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#3E7C6D" />
      <path
        d="M16 7C16 7 9 11 9 18C9 22.4 12.1 25 16 25C19.9 25 23 22.4 23 18C23 11 16 7 16 7Z"
        fill="#FBFAF7"
        opacity="0.9"
      />
      <path d="M16 25V14" stroke="#3E7C6D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 18L20 14" stroke="#FBFAF7" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M16 21L12 17" stroke="#FBFAF7" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export default function Navbar({ onRegister }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'top-0' : 'top-0'}`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-6xl px-4"
        aria-label="Main navigation"
      >
        <div className={`flex items-center justify-between h-16 px-4 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-soft border border-line/60' : 'bg-white/60 backdrop-blur-md'}`}>
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 focus-visible:rounded-lg" aria-label="Mind Matters — back to top">
            <LeafMark />
            <span className="font-display font-semibold text-ink text-base leading-tight">
              {EVENT.shortName}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-3 py-2 rounded-full text-sm font-medium text-slate hover:text-ink hover:bg-cream transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Register button + hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRegister({ open: true, preselectedIds: [] })}
              className="hidden md:flex h-10 px-5 rounded-full bg-sage-deep text-white font-semibold text-sm items-center hover:shadow-lift hover:-translate-y-px active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
            >
              Register
            </button>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-cream transition-colors focus-visible:ring-2 focus-visible:ring-sage-deep"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-line shadow-lift p-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={handleNavClick}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-ink hover:bg-cream transition-colors min-h-[44px] flex items-center"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-line">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onRegister({ open: true, preselectedIds: [] })
                  }}
                  className="w-full h-12 rounded-full bg-sage-deep text-white font-semibold text-sm hover:shadow-lift transition-all"
                >
                  Register now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
