"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
}

export default function SeekBar({ currentTime, duration, onSeek }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragRatio, setDragRatio] = useState<number | null>(null);

  const ratioFromEvent = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    return rect.width === 0 ? 0 : x / rect.width;
  }, []);

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const ratio = ratioFromEvent(e);
      setDragRatio(ratio);
    },
    [ratioFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (dragRatio === null) return;
      setDragRatio(ratioFromEvent(e));
    },
    [dragRatio, ratioFromEvent]
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (dragRatio === null) return;
      const ratio = ratioFromEvent(e);
      setDragRatio(null);
      if (duration > 0) onSeek(ratio * duration);
    },
    [dragRatio, duration, onSeek, ratioFromEvent]
  );

  const activeRatio = dragRatio ?? (duration > 0 ? currentTime / duration : 0);
  const displayTime = dragRatio !== null ? dragRatio * duration : currentTime;

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.max(duration, 0)}
      aria-valuenow={Math.round(displayTime)}
      tabIndex={0}
      className="group relative flex h-6 w-full touch-none items-center"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-rickshaw shadow-[0_0_8px_var(--color-rickshaw)]"
          style={{ width: `${Math.min(activeRatio, 1) * 100}%` }}
        />
      </div>
      <div
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cream opacity-0 shadow transition-opacity group-hover:opacity-100"
        style={{ left: `calc(${Math.min(activeRatio, 1) * 100}% - 6px)` }}
      />
    </div>
  );
}
