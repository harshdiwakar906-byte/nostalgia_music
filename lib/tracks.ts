import type { Playlist } from "./types";

/**
 * ⚠️  PLACEHOLDER DATA — NOT REAL SONGS.
 *
 * Every videoId below is a dummy string on purpose. This file ships empty of
 * real content because picking actual tracks means picking actual rights —
 * that's your call, not something to auto-fill from a "nostalgia" vibe.
 *
 * To add a real track:
 *   1. Confirm you have the right to use it, OR it's streaming from the
 *      rights holder's own YouTube upload with embedding enabled
 *      (check: open the video on youtube.com — if embedding is off, the
 *      "Watch on YouTube" wall shows up instead of playing inline).
 *   2. Copy the 11-character ID from the watch URL:
 *      youtube.com/watch?v=XXXXXXXXXXX
 *                              ^^^^^^^^^^^ this part
 *   3. Add one line to the relevant playlist below. That's the whole change.
 *
 * The three playlists are structural buckets (swap in your own names/eras) —
 * rename them to whatever three moods actually fit your list.
 */

export const playlists: Playlist[] = [
  {
    id: "golden-era",
    name: "Golden Era",
    tracks: [
      {
        id: "placeholder-1",
        title: "bahut jatate ho chah hamse",
        artist: "NON",
        film: "Film / album",
        year: 1965,
        duration: "0:00",
        videoId:"gaYpZ-lGhQg",
      },
    ],
  },
  {
    id: "monsoon-mix",
    name: "Monsoon Mix",
    tracks: [
      {
        id: "placeholder-2",
        title: "Add another track",
        artist: "Artist name",
        film: "Film / album",
        year: 1978,
        duration: "0:00",
        videoId: "REPLACE_ME_22c",
      },
    ],
  },
  {
    id: "late-night",
    name: "Late Night",
    tracks: [
      {
        id: "placeholder-3",
        title: "And a third",
        artist: "Artist name",
        film: "Film / album",
        year: 1990,
        duration: "0:00",
        videoId: "REPLACE_ME_33c",
      },
    ],
  },
];
