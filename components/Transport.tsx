interface TransportProps {
  isPlaying: boolean;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  size?: "sm" | "lg";
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-[1px]">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

export default function Transport({ isPlaying, onPrev, onToggle, onNext, size = "sm" }: TransportProps) {
  const playButtonSize = size === "lg" ? "h-[52px] w-[52px]" : "h-9 w-9";

  return (
    <div className="flex items-center gap-3 text-cream">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className="flex h-9 w-9 min-w-[44px] items-center justify-center rounded-full text-cream/70 transition-colors hover:text-cream"
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={`flex ${playButtonSize} items-center justify-center rounded-full bg-linear-to-b from-marigold to-meter shadow-[0_6px_20px_-4px_var(--color-meter)] ring-1 ring-white/25`}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="flex h-9 w-9 min-w-[44px] items-center justify-center rounded-full text-cream/70 transition-colors hover:text-cream"
      >
        <NextIcon />
      </button>
    </div>
  );
}
