import { useState, useEffect } from 'react'

/**
 * Countdown hook. Returns { days, hours, mins, secs, state }
 * state: 'before' | 'during' | 'after'
 */
export function useCountdown(targetISO, endISO) {
  const target = new Date(targetISO).getTime()
  const end = endISO ? new Date(endISO).getTime() : null

  const getSnapshot = () => {
    const now = Date.now()
    if (end && now > end) return { days: 0, hours: 0, mins: 0, secs: 0, state: 'after' }
    if (now >= target) return { days: 0, hours: 0, mins: 0, secs: 0, state: 'during' }
    const diff = target - now
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    const secs = Math.floor((diff % 60000) / 1000)
    return { days, hours, mins, secs, state: 'before' }
  }

  const [snapshot, setSnapshot] = useState(getSnapshot)

  useEffect(() => {
    const id = setInterval(() => setSnapshot(getSnapshot()), 1000)
    return () => clearInterval(id)
  }, [targetISO, endISO])

  return snapshot
}
