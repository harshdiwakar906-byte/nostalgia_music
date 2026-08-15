import { formatTime } from "@/lib/format";

export default function TimeReadout({
  currentTime,
  duration,
  className = "",
}: {
  currentTime: number;
  duration: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-1 font-meter text-[10.5px] tabular-nums text-meter/90 ${className}`}>
      <span>{formatTime(currentTime)}</span>
      <span className="text-cream/40">/</span>
      <span className="text-cream/60">{formatTime(duration)}</span>
    </div>
  );
}
