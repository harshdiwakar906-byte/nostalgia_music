# Rickshaw Wala — nostalgia music site

Single-page Next.js jukebox: YouTube IFrame API for playback, no audio files,
no downloaded thumbnails — the live YouTube player *is* the cover art.

## Setup

```bash
npm install
npm run dev
```

## Two things only you can finish

**1. `lib/tracks.ts` — the actual playlist.**
Every entry is a placeholder on purpose (`REPLACE_ME_...` videoIds). This repo
doesn't ship real song picks because that's a rights decision, not a design
one. For each track:

1. Confirm you have the right to use it, or it's the rights holder's own
   YouTube upload with embedding enabled.
2. Copy the 11-character ID from `youtube.com/watch?v=XXXXXXXXXXX`.
3. Fill in `title`, `artist`, `film`, `year`, `duration`, `videoId`.

**2. `public/bg/scene-tall.png` — the portrait background.**
`public/bg/scene-wide.jpg` is your uploaded artwork, already wired up as the
landscape hero. The CSS in `app/globals.css` swaps to `scene-tall.png` under
`@media (orientation: portrait)`, but that file doesn't exist yet — drop in
a separately-composed portrait version (not a crop of the wide one) at that
path.

## How the player is wired

- `lib/useYouTubePlayer.ts` loads the IFrame API once, creates a single
  `YT.Player`, and polls `getCurrentTime()` every 250ms while playing (the API
  has no timeupdate event).
- There's exactly **one** live YouTube iframe in the DOM (`#yt-player`) at all
  times — `components/Player.tsx` measures whichever of the desktop pill or
  mobile card is currently visible (via `matchMedia`/`ResizeObserver`) and
  repositions that single iframe on top of it. This avoids ever hiding a
  playing video behind `display: none`, and avoids running two players for
  one track.
- The "vinyl" is two layers (`components/Vinyl.tsx`): a purely decorative
  spinning groove ring, and a small **unclipped**, non-rotating 16:9 window
  in the middle where the real iframe sits. A literal 80px circular crop of
  the live video would hide YouTube's ad-skip control — the brief's own
  embedding rules (visible player, no crop) take priority over the literal
  vinyl geometry, so the crop was dropped in favor of the ring-plus-window
  design.
- `onError` (deleted video / embedding switched off after ship) auto-skips to
  the next track and fires a `track_playback_error` Vercel Analytics event
  with the error code and videoId.

## Design tokens

Palette and type are in `app/globals.css` (`@theme` block) — pulled from the
reference photo itself: meter-red, cab marigold, monsoon-dusk indigo, canopy
green. Display face is Baloo 2, body is IBM Plex Sans, numeric readouts
(clock, elapsed/duration) are IBM Plex Mono, echoing the fare meter's LED
digits in the photo.
