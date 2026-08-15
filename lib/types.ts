export interface Track {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** Display duration, e.g. "4:12". The real duration comes from the player once cued. */
  duration: string;
  /** YouTube video ID (the 11-char code from youtube.com/watch?v=XXXXXXXXXXX). */
  videoId: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}
