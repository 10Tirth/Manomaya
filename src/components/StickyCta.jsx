import { useState, useEffect } from 'react'

export default function StickyCta({ onRegister, dialogOpen }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroH = () => {
      const hero = document.getElementById('top')
      return hero ? hero.offsetHeight : window.innerHeight
    }

    const onScroll = () => {
      setVisible(window.scrollY > heroH() * 0.8)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible || dialogOpen) return null

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-line px-4 py-3 shadow-lift"
      role="complementary"
      aria-label="Register prompt"
    >
      <button
        onClick={() => onRegister({ open: true, preselectedIds: [] })}
        className="w-full h-12 rounded-full bg-sage-deep text-white font-bold text-sm hover:shadow-lift transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
      >
        Register now — it's free
      </button>
    </div>
  )
}
