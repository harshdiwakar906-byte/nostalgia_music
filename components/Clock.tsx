"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function splitParts(date: Date) {
  const parts = formatter.formatToParts(date);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "";
  const period = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
  return { hour, minute, period };
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Avoid a server/client mismatch: render nothing until mounted.
    return <span className="font-meter text-sm text-cream/80 tabular-nums">&nbsp;</span>;
  }

  const { hour, minute, period } = splitParts(now);

  return (
    <span className="font-meter text-sm text-cream/90 tabular-nums" suppressHydrationWarning>
      {hour}
      <span className="blink">:</span>
      {minute}
      <span className="ml-1 text-[11px] text-cream/60">{period}</span>
    </span>
  );
}
