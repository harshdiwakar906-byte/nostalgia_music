import type { RefObject } from "react";

interface VinylProps {
  size: number;
  isPlaying: boolean;
  /** Placeholder the real, single YouTube iframe gets measured against and overlaid onto. */
  slotRef: RefObject<HTMLDivElement | null>;
}

/**
 * Two deliberately separate layers, not a literal "cover art clipped into an
 * 80px circle":
 *
 *  1. A purely decorative grooved ring that spins/pauses with playback —
 *     this is what makes it read as a record player at a glance.
 *  2. A small unclipped 16:9 window in the middle, sized close to the ring's
 *     footprint, which is where the *real* YouTube iframe gets positioned
 *     (see Player.tsx). It never rotates and is never cropped to a circle —
 *     doing either would hide YouTube's built-in ad-skip control, which is
 *     exactly what the brief's embedding rules are there to prevent.
 */
export default function Vinyl({ size, isPlaying, slotRef }: VinylProps) {
  const windowWidth = Math.round(size * 0.92);
  const windowHeight = Math.round((windowWidth * 9) / 16);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.85) 0px, rgba(0,0,0,0.85) 2px, rgba(255,255,255,0.05) 3px, rgba(0,0,0,0.85) 5px)",
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.7), 0 4px 14px rgba(0,0,0,0.5)",
          animation: "vinylspin 8s linear infinite",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      />
      <div
        ref={slotRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md bg-night-soft ring-1 ring-white/20"
        style={{ width: windowWidth, height: windowHeight }}
      />
      <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}
