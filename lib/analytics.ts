import { track } from "@vercel/analytics";

/** Fired when a video errors out post-ship (deleted / embedding disabled) and we auto-skip. */
export function trackTrackError(code: number, videoId: string) {
  track("track_playback_error", { code, videoId });
}
