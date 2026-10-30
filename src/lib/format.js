/**
 * Format helpers — all date math uses UTC noon to prevent timezone day-shifts.
 */

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SHORT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Parse a YYYY-MM-DD string safely using UTC noon. */
export function parseDate(str) {
  return new Date(`${str}T12:00:00Z`)
}

/** e.g. "Monday" */
export function weekdayLong(str) {
  return WEEKDAYS[parseDate(str).getUTCDay()]
}

/** e.g. "Mon" */
export function weekdayShort(str) {
  return SHORT_WEEKDAYS[parseDate(str).getUTCDay()]
}

/** e.g. "2 Nov" */
export function formatShortDate(str) {
  const d = parseDate(str)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`
}

/** e.g. "Mon 2 Nov" */
export function formatDayDate(str) {
  const d = parseDate(str)
  return `${SHORT_WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`
}

/** e.g. "Monday, 2 November 2026" */
export function formatLongDate(str) {
  const d = parseDate(str)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** Convert 24-hour "HH:MM" to "h:MM AM/PM" */
export function to12h(time) {
  const [hStr, mStr] = time.split(':')
  let h = parseInt(hStr, 10)
  const m = mStr
  const ampm = h >= 12 ? 'PM' : 'AM'
  if (h === 0) h = 12
  else if (h > 12) h -= 12
  return `${h}:${m} ${ampm}`
}

/** "10:00 AM - 10:45 AM" */
export function formatTimeRange(start, end) {
  return `${to12h(start)} - ${to12h(end)}`
}

/** Total activity count */
export function totalActivityCount(activities) {
  return activities.length
}

/** Activities per day (returns object { 1: N, 2: N, ... }) */
export function activityCountByDay(activities) {
  return activities.reduce((acc, a) => {
    acc[a.day] = (acc[a.day] || 0) + 1
    return acc
  }, {})
}
