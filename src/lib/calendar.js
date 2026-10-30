/**
 * Generate a .ics calendar file for one or more activities.
 * Uses floating local times (no Z suffix) as instructed.
 * CRLF line endings as required by RFC 5545.
 */

function escapeICS(str) {
  return String(str || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

function toICSDateTime(dateStr, timeStr) {
  // dateStr: 'YYYY-MM-DD', timeStr: 'HH:MM'
  const [y, m, d] = dateStr.split('-')
  const [h, min] = timeStr.split(':')
  return `${y}${m}${d}T${h}${min}00`
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36) + '@mindmatters2026'
}

export function generateICS(activities) {
  const CRLF = '\r\n'
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mind Matters Fest 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ]

  activities.forEach((a) => {
    // a.date = 'YYYY-MM-DD', a.start = 'HH:MM', a.end = 'HH:MM'
    const dtStart = toICSDateTime(a.date, a.start)
    const dtEnd = toICSDateTime(a.date, a.end)
    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid()}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${escapeICS(a.title)}`,
      `DESCRIPTION:${escapeICS(a.description || '')}`,
      `LOCATION:${escapeICS(a.venue || '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
    )
  })

  lines.push('END:VCALENDAR')
  return lines.join(CRLF) + CRLF
}

export function downloadICS(activities, filename = 'mind-matters-fest-2026.ics') {
  const content = generateICS(activities)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
