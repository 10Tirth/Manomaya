const STORAGE_KEY = 'mmf:registrations:v1'

/** Load persisted registration data (only IDs, never PII). */
export function loadRegistrations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

/** Save a registration record (id + activityIds only). */
export function saveRegistration(registrationId, activityIds) {
  try {
    const existing = loadRegistrations()
    existing.push({ registrationId, activityIds, timestamp: Date.now() })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch {
    // localStorage unavailable — silently continue
  }
}

/** Get all activity IDs that this device has registered for. */
export function getRegisteredActivityIds() {
  const registrations = loadRegistrations()
  const ids = new Set()
  registrations.forEach((r) => {
    if (Array.isArray(r.activityIds)) {
      r.activityIds.forEach((id) => ids.add(id))
    }
  })
  return ids
}
