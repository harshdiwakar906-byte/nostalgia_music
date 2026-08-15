"use client";

import { useEffect, useState } from "react";

const BASE = 214;

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(BASE);
    const id = setInterval(() => {
      setCount((c) => {
        const base = c ?? BASE;
        const drift = Math.round((Math.random() - 0.5) * 6);
        return Math.max(1, base + drift);
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-1.5 text-xs text-cream/70" suppressHydrationWarning>
      <span className="h-1.5 w-1.5 rounded-full bg-meter shadow-[0_0_6px_var(--color-meter)]" />
      {count ?? BASE} listening now
    </span>
  );
}
