# Mind Matters Fest 2026 🌿

> **Breathe. Reflect. Bloom.**

A complete, production-ready website for a college student mental health festival — built with Vite + React, Tailwind CSS v4, Three.js 3D hero, and a Google Sheets registration backend. Deployed as a free static site on Vercel or GitHub Pages.

---

## Features

- **3D Interactive Hero** — animated calm orb + orbiting satellite spheres (Three.js / React Three Fiber), with pointer parallax, scroll drift, and a graceful CSS fallback
- **18 Activities across 5 Days** — fully filterable by day and category, live result counts
- **Registration Dialog** — native `<dialog>`, full validation, Google Sheets backend via Apps Script, `.ics` calendar download, local-only registration tracking (no PII stored in browser)
- **Wellness Widgets** — box-breathing bubble and mood check-in (P1)
- **Support Section** — tap-to-call helplines, Counsellor Connect highlight
- **Accessible & Responsive** — WCAG AA colour contrast, keyboard navigation, focus management, reduced-motion support, mobile bottom sheet, sticky CTA bar
- **Performance** — hero text paints before 3D loads (lazy + IdleCallback), rendering paused off-screen, no images (CSS/SVG/3D only)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite 6 + React 18 |
| Styling | Tailwind CSS v4 (no config file) |
| 3D | Three.js · @react-three/fiber · @react-three/drei |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Google Apps Script web app → Google Sheet |
| Deploy | Vercel (primary) / GitHub Pages (workflow included) |

---

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server (demo mode — no sheet needed)
npm run dev

# 3. Production build
npm run build

# 4. Preview the build locally
npm run preview
```

> In **dev mode** without a configured endpoint, the registration form simulates success after ~0.9 s and logs the payload to the console. Nothing is saved.

---

## Edit the Content

Everything lives in one file: **[`src/data/event.js`](src/data/event.js)**

| Field | What to change |
|---|---|
| `EVENT.college` | Your institution's name |
| `EVENT.venue` | Campus or venue name |
| `EVENT.contactEmail` | Organiser contact email |
| `EVENT.socials.instagram / linkedin` | Social URLs (leave `''` to hide) |
| `EVENT.registrationEndpoint` | Paste the Apps Script web app URL here after setup |
| `ACTIVITIES` | Add, remove or edit activities |
| `SUPPORT.helplines` | Add campus helpline numbers |

---

## Registration Backend (Google Sheets)

> **Why Google Sheets instead of a local `.xlsx`?**
> Free static hosts (Vercel, GitHub Pages, Netlify) serve files but cannot write to disk. A local Excel file would reset on every deploy. Google Sheets, written to by a free Google Apps Script web app, persists indefinitely and opens like Excel (File → Download → Microsoft Excel `.xlsx`).

### One-time setup (5 minutes)

1. Using a **personal @gmail.com** account (college Google accounts often block "Anyone" access), create a new Google Sheet named **"Mind Matters Fest 2026 - Registrations"**.
2. In the Sheet: **Extensions → Apps Script**. Delete the default code, paste the contents of [`apps-script/Code.gs`](apps-script/Code.gs), then **Save**.
3. Pick function **`setup`** → **Run** → Review permissions → choose your account → Advanced → "Go to project (unsafe)" → **Allow**. (This creates the header row.)
4. **Deploy → New deployment → gear icon → Web app → Execute as: Me → Who has access: Anyone → Deploy**. Copy the Web app URL (ends with `/exec`).
5. Open the URL in a browser — you should see `{"ok":true,...}`. Paste the URL into `EVENT.registrationEndpoint` in `src/data/event.js`.

After any later script edit: **Deploy → Manage deployments → pencil → Version: New version → Deploy** (URL stays the same).

**Excel export:** Google Sheet → File → Download → Microsoft Excel (.xlsx).

---

## Deploy

### Vercel (recommended, ~1 minute)
1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project → Import** the repo.
3. Framework preset is auto-detected as **Vite**. Click **Deploy**.

Optional: add `VITE_SHEETS_WEBHOOK_URL` as an environment variable in Vercel project settings (overrides the value in `event.js` without code changes).

### GitHub Pages
1. In the repo: **Settings → Pages → Source: GitHub Actions**.
2. Manually trigger the **"Deploy to GitHub Pages"** workflow from the **Actions** tab.

### Netlify
Drag and drop the `dist/` folder (after `npm run build`) onto [netlify.com/drop](https://app.netlify.com/drop).

---

## Project Structure

```
mind-matters-fest-2026/
├── index.html                  # Entry point, Google Fonts, meta tags
├── vite.config.js
├── apps-script/Code.gs         # Google Apps Script registration backend
├── .github/workflows/
│   └── deploy-pages.yml        # GitHub Pages deployment workflow
├── public/favicon.svg
└── src/
    ├── main.jsx                # React root, MotionConfig
    ├── App.jsx                 # Top-level state, dialog wiring
    ├── index.css               # Tailwind v4 @theme tokens + global styles
    ├── data/event.js           # ← EDIT THIS to customise the event
    ├── lib/
    │   ├── registration.js     # Fetch to Apps Script (no-cors)
    │   ├── calendar.js         # .ics generation
    │   ├── format.js           # Date/time helpers
    │   └── storage.js          # localStorage (IDs only, no PII)
    ├── hooks/
    │   ├── useCountdown.js
    │   └── useTilt.js
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx            # Layout + countdown
        ├── HeroScene.jsx       # Three.js 3D scene (lazy-loaded)
        ├── HeroFallback.jsx    # CSS fallback
        ├── Marquee.jsx
        ├── About.jsx
        ├── Journey.jsx
        ├── Activities.jsx      # Filters + grid
        ├── ActivityCard.jsx
        ├── Wellness.jsx
        ├── BreathingBubble.jsx
        ├── MoodCheckIn.jsx
        ├── Support.jsx
        ├── Faq.jsx
        ├── FinalCta.jsx
        ├── Footer.jsx
        ├── RegisterDialog.jsx  # Native <dialog> registration form
        ├── StickyCta.jsx       # Mobile sticky register bar
        ├── ScrollProgress.jsx
        ├── Reveal.jsx          # Scroll-reveal animation wrapper
        └── ErrorBoundary.jsx
```

---

## Credits

Built with [Google Antigravity](https://antigravity.google.com) · Made with care for students · 2026
