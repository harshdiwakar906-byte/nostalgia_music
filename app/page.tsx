import TopBar from "@/components/TopBar";
import Player from "@/components/Player";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div
        className="hero-bg fixed inset-0 z-0 bg-cover bg-center"
        aria-hidden
      />

      <div
        className="fixed inset-0 z-0 bg-linear-to-b from-black/35 via-transparent to-black/80"
        aria-hidden
      />

      <div className="grain-overlay fixed inset-0 z-0" aria-hidden />

      <div className="relative z-10">
        <TopBar />
        <Player />
      </div>
    </main>
  );
}