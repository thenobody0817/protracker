# Pro Tracker

An installable, single-page workout tracker: five built-in training sessions,
per-set logging, work/rest timers, a fullscreen focus mode and an exercise
reference — with all progress kept in the browser's `localStorage`.

## What it does

- Five sessions, selectable from the tab bar: **A** (6 strength exercises),
  **X** (7 mobility, core and breathing exercises), **B** (8 pull and upper-body
  exercises), **Y** (6 shoulder-health and bodyweight exercises) and **C** (8
  machine and variation exercises) — 35 exercises in total.
- Every exercise card shows the target reps, number of sets, the load, the rest
  interval and a row of set dots that you tap to tick off a set.
- The **Mechanics Hub** (tap the load strip) shows the hardware to use — pin
  selector, dumbbell pair, bodyweight protocol, or the plate breakdown per side
  for barbell work — and lets you adjust the load, the rep target and the
  number of sets.
- The **Technical Intelligence Hub** (tap the ⓘ button) shows the start and
  finish position, a step-by-step execution protocol, the list of errors to
  avoid and a *Video Masterclass* button that opens a YouTube search for the
  exercise.
- Timers: a work timer for the set and a rest timer that runs from the
  exercise's rest value, with a browser notification and vibration when the
  rest period ends.
- **Focus mode**: a fullscreen view with a large progress ring, the current
  exercise, load, set counter and *Prev* / *Next Set* / *Skip* controls.
- A footer coach bar that follows the active exercise and shows the current
  load and set number.
- Four visual themes: Original (light), Midnight (dark), Glass and Matrix.
- Data management: export everything to JSON (copy to clipboard or save to a
  file) and restore it by pasting or importing the JSON.

## Requirements

- A modern browser.
- Internet access on the first load: Tailwind CSS is loaded from
  `cdn.tailwindcss.com` and the Inter font from `fonts.googleapis.com`. The
  service worker caches the Tailwind CDN afterwards.
- An `http://` or `https://` origin to use the service worker and the PWA
  install prompt.

## Install

Serve the repository over HTTP and open it in the browser:

```bash
git clone https://github.com/thenobody0817/protracker.git
cd protracker
python3 -m http.server 8000
```

Then open <http://localhost:8000/index.html>.

The app is also a PWA: `manifest.json` and `sw.js` let you install it as an app
("Pro Tracker", short name "ProTrack") from the browser's install menu. The
manifest's icons are hosted on the Flaticon CDN.

A GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes the whole
repository to GitHub Pages on every push to `main`.

## Usage

1. Pick a session tab (**A**, **X**, **B**, **Y** or **C**).
2. Tap a set dot to tick a set off; tap it again to undo.
3. Tap the load strip to open the Mechanics Hub and adjust the load, reps and
   set count. Tap ⓘ for the execution protocol and the mistakes to avoid.
4. Start a set to run the work timer; the rest timer follows and a
   notification fires when the rest is over.
5. Use the **⛶** button for focus mode when you want a big timer and minimal
   distractions.
6. Open the settings sheet (⚙) for the theme, the notification test and the
   data manager.

## Configuration

- The program is hard-coded in the `WORKOUTS` object inside
  [`index.html`](index.html). Each exercise has `name`, `type`, `reps`,
  `setsTarget`, `load`, `rest`, `q` (YouTube search keywords), `mech`
  (`stack`, `db` or `plates`), optional `startImg`/`endImg` (files in
  `assets/images/`), `instructions` and `avoid` (list of common errors), and
  `isTime` for timed holds.
- Progress is stored in `localStorage` under these keys:
  `activeTab`, `activeIdx`, `scrollPos`, `appTheme`, `customWorkouts`,
  `notification_prompted`, plus per exercise `load-<tab>-<index>`,
  `target-sets-<tab>-<index>`, `target-reps-<tab>-<index>`,
  `set-<tab>-<index>-<n>` and `last-<tab>-<index>`.
- Theme ids are `light` (Original), `dark` (Midnight), `glass` and `cyber`
  (Matrix); the choice is saved in `appTheme`.
- The service worker cache name is `protracker-v9.4`. Bumping it makes the
  worker delete the older caches on activation.

## Repository layout

| Path | Purpose |
| --- | --- |
| `index.html` | The complete app: markup, styles, program data and logic. |
| `sw.js` | Service worker: network-first fetching with a cache fallback, plus the rest-period notification handler. |
| `manifest.json` | PWA manifest. |
| `assets/images/` | Start and finish position images for the strength exercises. |
| `.github/workflows/deploy.yml` | Deploys the repository to GitHub Pages. |
| `*_gallery.html`, `design_preview.html`, `reference.html` | Standalone design prototypes for buttons, icons, logos, rings, timers and the focus mode. |
| `github.vscode-github-actions-0.28.2.vsix` | An unrelated VS Code extension archive that is checked into the repository root. |

## Limitations

- Everything lives in the browser's `localStorage`: there is no account and no
  sync between devices, and clearing the site data wipes all progress.
- Tailwind CSS and the fonts come from CDNs, so the first load needs an
  internet connection.
- The exercise images are large PNGs (roughly 0.4–0.5 MB each), which makes the
  first page load noticeably heavy.
- The program can only be changed by editing `index.html`. Importing data
  replaces the whole program with the imported `workouts` object, which is then
  stored under the `customWorkouts` key.
- The plate breakdown assumes an 8 kg bar and shows the plates for one side.
- Notifications are only used to signal the end of a rest period, and require
  permission.
- The app is a single-file client-side tool; there is no backend.

## License

MIT — see [LICENSE](LICENSE).

Copyright (c) 2026 thenobody0817.
