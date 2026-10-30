import { EVENT } from '../data/event.js'

const ENDPOINT = import.meta.env.VITE_SHEETS_WEBHOOK_URL || EVENT.registrationEndpoint

const ENDPOINT_REGEX = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/

export const isConfigured = ENDPOINT_REGEX.test(ENDPOINT)

/**
 * Submit registration payload to Google Sheets via Apps Script.
 * Uses no-cors POST with text/plain content-type (Apps Script CORS limitation).
 * Fetch resolving = success; rejection/timeout = failure.
 */
export async function submitRegistration(payload) {
  if (isConfigured) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      // no-cors response is opaque; fetch resolving = success
      return { ok: true }
    } catch (err) {
      if (err.name === 'AbortError') {
        return { ok: false, error: 'timeout' }
      }
      return { ok: false, error: err.message }
    } finally {
      clearTimeout(timer)
    }
  }

  // Not configured
  if (import.meta.env.DEV) {
    // Demo mode in development
    console.warn('Registration endpoint not configured: demo mode, nothing was saved.')
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, demo: true }
  }

  // Production with no endpoint configured
  return {
    ok: false,
    error: `Registration is temporarily unavailable. Please contact ${EVENT.contactEmail}.`,
    permanent: true,
  }
}
