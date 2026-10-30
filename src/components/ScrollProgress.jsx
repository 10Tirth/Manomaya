import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const width = useMotionValue('0%')
  const smooth = useSpring(width, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      width.set(`${pct}%`)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [width])

  return (
    <motion.div
      className="scroll-progress"
      style={{ width: smooth }}
      aria-hidden="true"
    />
  )
}
