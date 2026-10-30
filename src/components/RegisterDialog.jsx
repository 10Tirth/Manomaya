import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Copy, Check, Loader2, AlertCircle, CheckCircle2, Download, Share2 } from 'lucide-react'
import { ACTIVITIES, DAYS, EVENT } from '../data/event.js'
import { formatDayDate, formatTimeRange } from '../lib/format.js'
import { submitRegistration, isConfigured } from '../lib/registration.js'
import { saveRegistration, getRegisteredActivityIds } from '../lib/storage.js'
import { downloadICS } from '../lib/calendar.js'

// Registration ID generator — unambiguous character set
const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
function genId() {
  let id = 'MMF-'
  for (let i = 0; i < 6; i++) id += CHARS[Math.floor(Math.random() * CHARS.length)]
  return id
}

// Phone validator — strip spaces, dashes, parens, then check digits
function validatePhone(v) {
  return /^\+?[0-9]{10,15}$/.test(v.replace(/[\s\-()]/g, ''))
}

function Field({ label, error, required, children, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-danger ml-0.5" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="text-xs text-slate -mt-0.5">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-danger" role="alert" aria-live="assertive">{error}</p>
      )}
    </div>
  )
}

function ActivityCheckboxes({ selected, onChange, registeredIds }) {
  // Group activities by day
  const byDay = DAYS.map((d) => ({
    ...d,
    activities: ACTIVITIES.filter((a) => a.day === d.day),
  }))

  const toggleAll = (dayActivities) => {
    const ids = dayActivities.map((a) => a.id).filter((id) => !registeredIds.has(id))
    const allSelected = ids.every((id) => selected.has(id))
    const next = new Set(selected)
    ids.forEach((id) => (allSelected ? next.delete(id) : next.add(id)))
    onChange(next)
  }

  const toggle = (id) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-4">
      {byDay.map((d) => {
        const available = d.activities.filter((a) => !registeredIds.has(a.id))
        const allChosen = available.length > 0 && available.every((a) => selected.has(a.id))
        return (
          <div key={d.day} className="rounded-2xl border border-line overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-cream">
              <span className="text-sm font-semibold text-ink">
                Day {d.day} — {d.theme} <span className="text-slate font-normal">({formatDayDate(d.date)})</span>
              </span>
              {available.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleAll(available)}
                  className="text-xs text-sage-deep font-semibold hover:underline focus-visible:ring-1 focus-visible:ring-sage-deep rounded"
                >
                  {allChosen ? 'Deselect all' : 'Select all'}
                </button>
              )}
            </div>
            <div className="divide-y divide-line">
              {d.activities.map((a) => {
                const alreadyRegistered = registeredIds.has(a.id)
                const checked = alreadyRegistered || selected.has(a.id)
                return (
                  <label
                    key={a.id}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                      alreadyRegistered
                        ? 'bg-cream/60 cursor-not-allowed opacity-70'
                        : 'hover:bg-cream/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={alreadyRegistered}
                      onChange={() => !alreadyRegistered && toggle(a.id)}
                      className="mt-0.5 w-4 h-4 rounded accent-sage-deep flex-shrink-0"
                      aria-label={a.title}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink leading-snug">{a.title}</p>
                      <p className="text-xs text-slate">{formatTimeRange(a.start, a.end)} · {a.venue}</p>
                      {alreadyRegistered && (
                        <span className="text-xs text-sage-deep font-semibold">Registered ✓</span>
                      )}
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SuccessView({ registrationId, chosenActivities, onClose, onRegisterMore }) {
  const [copied, setCopied] = useState(false)
  const firstName = '' // not stored from form after success for privacy — use generic greeting

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(registrationId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available
    }
  }

  const handleDownloadICS = () => {
    const icsActivities = chosenActivities.map((a) => ({
      title: a.title,
      description: a.description || '',
      venue: a.venue,
      date: DAYS.find((d) => d.day === a.day)?.date || '',
      start: a.start,
      end: a.end,
    }))
    downloadICS(icsActivities)
  }

  const handleShare = () => {
    const text = `I just registered for Mind Matters Fest 2026 — a free student mental health festival 2–6 Nov! Join me 🌿 #MindMattersFest`
    if (navigator.share) {
      navigator.share({ title: 'Mind Matters Fest 2026', text }).catch(() => {})
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    }
  }

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 gap-6">
      <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
        <CheckCircle2 size={36} className="text-sage-deep" aria-hidden="true" />
      </div>

      <div>
        <h2 className="font-display font-bold text-ink text-2xl mb-1">You're in!</h2>
        <p className="text-slate text-sm max-w-[40ch]">
          Keep this registration ID handy. The organising team will reach out on the email or phone you
          shared if anything changes.
        </p>
      </div>

      {/* Registration ID chip */}
      <div className="flex items-center gap-2 rounded-full bg-cream border border-line px-4 py-2">
        <code className="font-mono font-bold text-ink text-base">{registrationId}</code>
        <button
          onClick={copyId}
          className="w-8 h-8 rounded-full hover:bg-line flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-sage-deep"
          aria-label="Copy registration ID"
        >
          {copied ? <Check size={15} className="text-sage-deep" /> : <Copy size={15} className="text-slate" />}
        </button>
      </div>

      {/* Activity list */}
      <div className="w-full text-left rounded-2xl border border-line overflow-hidden">
        <div className="px-4 py-2.5 bg-cream">
          <p className="text-sm font-semibold text-ink">Your registered activities</p>
        </div>
        <div className="divide-y divide-line">
          {chosenActivities.map((a) => {
            const dateStr = DAYS.find((d) => d.day === a.day)?.date || ''
            return (
              <div key={a.id} className="px-4 py-3">
                <p className="text-sm font-medium text-ink">{a.title}</p>
                <p className="text-xs text-slate">{formatDayDate(dateStr)} · {formatTimeRange(a.start, a.end)} · {a.venue}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2.5 w-full">
        <button
          onClick={handleDownloadICS}
          className="flex items-center justify-center gap-2 h-11 rounded-full bg-sage-deep text-white font-semibold text-sm hover:shadow-lift transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
        >
          <Download size={16} aria-hidden="true" /> Add to calendar
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 h-11 rounded-full bg-white border border-line text-ink font-semibold text-sm hover:shadow-soft transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
        >
          <Share2 size={16} aria-hidden="true" /> Invite a friend
        </button>
        <button
          onClick={onRegisterMore}
          className="h-11 rounded-full bg-white border border-line text-ink font-semibold text-sm hover:shadow-soft transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
        >
          Register for more activities
        </button>
        <button
          onClick={onClose}
          className="h-11 rounded-full text-slate text-sm hover:text-ink transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function RegisterDialog({ open, preselectedIds, onClose, onSuccess }) {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const registeredIds = getRegisteredActivityIds()

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [college, setCollege] = useState(EVENT.college)
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [dept, setDept] = useState('')
  const [studentId, setStudentId] = useState('')
  const [selectedActivities, setSelectedActivities] = useState(new Set())
  const [needs, setNeeds] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  // UI state
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [success, setSuccess] = useState(null) // { registrationId, activities }

  // Open/close dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) {
        dialog.showModal()
        document.body.style.overflow = 'hidden'
        // Store trigger to restore focus
        triggerRef.current = document.activeElement
      }
    } else {
      if (dialog.open) {
        dialog.close()
        document.body.style.overflow = ''
        if (triggerRef.current?.focus) triggerRef.current.focus()
      }
    }
  }, [open])

  // Reset success view when preselectedIds changes
  useEffect(() => {
    if (open && success) {
      // keep success view unless explicitly registerMore
    }
  }, [open])

  // Pre-select activities
  useEffect(() => {
    if (open) {
      setSelectedActivities(new Set(preselectedIds.filter((id) => !registeredIds.has(id))))
      if (!success) setErrors({})
    }
  }, [open, preselectedIds.join(',')])

  const handleDialogClose = useCallback(() => {
    onClose()
    setSubmitError(null)
  }, [onClose])

  // Backdrop click closes
  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) handleDialogClose()
  }

  // Validation
  const validate = () => {
    const e = {}
    if (!name.trim() || name.trim().length < 2) e.name = 'Please enter your full name (at least 2 characters).'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Please enter a valid email address.'
    if (!phone.trim() || !validatePhone(phone)) e.phone = 'Please enter a valid phone number (10–15 digits).'
    if (!college.trim()) e.college = 'Please enter your college or institution.'
    if (!course.trim()) e.course = 'Please enter your course or programme.'
    if (!year) e.year = 'Please select your year of study.'
    if (selectedActivities.size === 0) e.activities = 'Please select at least one activity.'
    if (!consent) e.consent = 'Please give your consent to continue.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      // Focus first invalid field
      const firstKey = Object.keys(errs)[0]
      const el = document.getElementById(`reg-${firstKey}`)
      if (el) el.focus()
      return
    }

    // Honeypot check — if filled, fake success and do nothing
    if (honeypot) {
      setSuccess({ registrationId: genId(), activities: [] })
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    const registrationId = genId()
    const chosenActivities = ACTIVITIES.filter((a) => selectedActivities.has(a.id))
    const dayDates = Object.fromEntries(DAYS.map((d) => [d.day, d.date]))

    const payload = {
      registrationId,
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      phone: phone.trim().slice(0, 100),
      college: college.trim().slice(0, 100),
      course: course.trim().slice(0, 100),
      year,
      department: dept.trim().slice(0, 100),
      studentId: studentId.trim().slice(0, 100),
      needs: needs.trim().slice(0, 500),
      message: message.trim().slice(0, 500),
      consent: true,
      website: '',
      activities: chosenActivities.map((a) => ({
        id: a.id,
        title: a.title,
        date: dayDates[a.day] || '',
        time: formatTimeRange(a.start, a.end),
      })),
    }

    if (import.meta.env.DEV) {
      console.log('[MMF] Registration payload:', payload)
    }

    const result = await submitRegistration(payload)

    if (result.ok) {
      saveRegistration(registrationId, chosenActivities.map((a) => a.id))
      setSuccess({ registrationId, activities: chosenActivities })
      onSuccess?.()
    } else if (result.permanent) {
      setSubmitError(result.error)
    } else {
      setSubmitError(
        result.error === 'timeout'
          ? 'The request timed out. Please check your connection and try again.'
          : `Something went wrong. Please try again or contact ${EVENT.contactEmail}.`
      )
    }

    setSubmitting(false)
  }

  const handleRegisterMore = () => {
    setSuccess(null)
    setSelectedActivities(new Set())
    setErrors({})
    setSubmitError(null)
  }

  const inputClass = (hasError) =>
    `w-full h-12 rounded-xl border px-4 text-sm text-ink bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep transition-colors ${
      hasError ? 'border-danger' : 'border-line hover:border-slate'
    }`

  const selectClass = (hasError) =>
    `w-full h-12 rounded-xl border px-4 text-sm text-ink bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep transition-colors appearance-none ${
      hasError ? 'border-danger' : 'border-line hover:border-slate'
    }`

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      onClose={handleDialogClose}
      className="w-full max-w-2xl mx-auto rounded-3xl p-0 shadow-lift border-0 bg-paper overflow-hidden max-h-[92svh] m-auto backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
    >
      <div className="flex flex-col max-h-[92svh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line flex-shrink-0 bg-paper/95 backdrop-blur-sm">
          <div>
            <h2 id="dialog-title" className="font-display font-semibold text-ink text-lg">
              {success ? 'Registration confirmed' : 'Register for activities'}
            </h2>
            {!success && (
              <p id="dialog-desc" className="text-xs text-slate mt-0.5">
                Fields marked * are required.
              </p>
            )}
          </div>
          <button
            onClick={handleDialogClose}
            className="w-9 h-9 rounded-full hover:bg-cream flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-sage-deep"
            aria-label="Close dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {success ? (
            <SuccessView
              registrationId={success.registrationId}
              chosenActivities={success.activities}
              onClose={handleDialogClose}
              onRegisterMore={handleRegisterMore}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="px-6 py-6 flex flex-col gap-5">
              {/* Honeypot — hidden from humans */}
              <div aria-hidden="true" style={{ display: 'none' }}>
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Personal info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" required error={errors.name}>
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => {
                      if (!name.trim() || name.trim().length < 2)
                        setErrors((p) => ({ ...p, name: 'Please enter your full name (at least 2 characters).' }))
                      else setErrors((p) => { const n = { ...p }; delete n.name; return n })
                    }}
                    className={inputClass(errors.name)}
                    placeholder="Priya Sharma"
                    aria-required="true"
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                        setErrors((p) => ({ ...p, email: 'Please enter a valid email address.' }))
                      else setErrors((p) => { const n = { ...p }; delete n.email; return n })
                    }}
                    className={inputClass(errors.email)}
                    placeholder="priya@college.edu"
                    aria-required="true"
                  />
                </Field>
                <Field label="Phone / WhatsApp" required error={errors.phone}>
                  <input
                    id="reg-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => {
                      if (!validatePhone(phone))
                        setErrors((p) => ({ ...p, phone: 'Please enter a valid phone number (10–15 digits).' }))
                      else setErrors((p) => { const n = { ...p }; delete n.phone; return n })
                    }}
                    className={inputClass(errors.phone)}
                    placeholder="+91 98765 43210"
                    aria-required="true"
                  />
                </Field>
                <Field label="College / Institution" required error={errors.college}>
                  <input
                    id="reg-college"
                    type="text"
                    autoComplete="organization"
                    maxLength={100}
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className={inputClass(errors.college)}
                    aria-required="true"
                  />
                </Field>
                <Field label="Course / Programme" required error={errors.course}>
                  <input
                    id="reg-course"
                    type="text"
                    maxLength={100}
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className={inputClass(errors.course)}
                    placeholder="B.Tech, BBA, MBBS…"
                    aria-required="true"
                  />
                </Field>
                <Field label="Year of study" required error={errors.year}>
                  <select
                    id="reg-year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={selectClass(errors.year)}
                    aria-required="true"
                  >
                    <option value="">Select year…</option>
                    <option>1st year (Fresher)</option>
                    <option>2nd year</option>
                    <option>3rd year</option>
                    <option>4th year</option>
                    <option>Postgraduate</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Department / Branch" error={errors.dept}>
                  <input
                    id="reg-dept"
                    type="text"
                    maxLength={100}
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className={inputClass(false)}
                    placeholder="Computer Science, Commerce…"
                  />
                </Field>
                <Field label="Student / Enrolment ID">
                  <input
                    id="reg-studentId"
                    type="text"
                    maxLength={100}
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className={inputClass(false)}
                    placeholder="Optional"
                  />
                </Field>
              </div>

              {/* Activities */}
              <Field
                label="Activities"
                required
                error={errors.activities}
              >
                <div className="mt-1">
                  <p className="text-xs text-slate mb-2" aria-live="polite">
                    <strong>{selectedActivities.size}</strong> selected
                  </p>
                  <ActivityCheckboxes
                    selected={selectedActivities}
                    onChange={setSelectedActivities}
                    registeredIds={registeredIds}
                  />
                </div>
              </Field>

              {/* Extra fields */}
              <Field
                label="Accessibility / dietary needs"
                hint="e.g. wheelchair access, vegetarian meal preference"
              >
                <input
                  id="reg-needs"
                  type="text"
                  maxLength={500}
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  className={inputClass(false)}
                />
              </Field>

              <Field
                label="Message to organisers"
                hint="Please don't share sensitive health details here."
              >
                <textarea
                  id="reg-message"
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass(false)} h-24 py-3 resize-none`}
                />
              </Field>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    id="reg-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-sage-deep flex-shrink-0"
                    aria-required="true"
                  />
                  <span className="text-sm text-slate group-hover:text-ink transition-colors">
                    I agree to be contacted about this event and to my details being used only to organise it.
                    <span className="text-danger ml-0.5" aria-hidden="true">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-danger mt-1" role="alert">{errors.consent}</p>
                )}
              </div>

              {/* Submit error */}
              {submitError && (
                <div className="flex items-start gap-3 rounded-2xl bg-danger/8 border border-danger/20 p-4">
                  <AlertCircle size={18} className="text-danger flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-danger">{submitError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-full bg-sage-deep text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lift hover:-translate-y-px active:translate-y-0 transition-all focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Registering…
                  </>
                ) : (
                  'Complete registration'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  )
}
