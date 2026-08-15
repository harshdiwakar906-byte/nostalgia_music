"use client";

import { useEffect, useRef, useState } from "react";
import { useYouTubePlayer } from "@/lib/useYouTubePlayer";
import Vinyl from "./Vinyl";
import SeekBar from "./SeekBar";
import TimeReadout from "./TimeReadout";
import Transport from "./Transport";

const VIDEO_ELEMENT_ID = "yt-player";

const YOUTUBE_PLAYLIST_ID =
  "PLfdfb0LKtKKs8IcyIvtsf_FfmJU-1pbI1";

export default function Player() {
  const {
    ready,
    playback,
    currentTime,
    duration,
    play,
    pause,
    next,
    previous,
    seekTo,
  } = useYouTubePlayer({
    elementId: VIDEO_ELEMENT_ID,
  });

  const [title, setTitle] = useState("Nostalgia Music");
  const [artist, setArtist] = useState("YouTube Playlist");

  const desktopSlotRef = useRef<HTMLDivElement>(null);
  const mobileSlotRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  const [positioned, setPositioned] = useState(false);

  const isPlaying = playback === "playing";

  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.getElementById(VIDEO_ELEMENT_ID);

      if (!iframe) return;

      const player = (iframe as HTMLElement & {
        getVideoData?: () => {
          title?: string;
          author?: string;
        };
      });

      if (typeof player.getVideoData === "function") {
        const data = player.getVideoData();

        if (data.title) {
          setTitle(data.title);
        }

        if (data.author) {
          setArtist(data.author);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    function reposition() {
      const slot = mq.matches
        ? desktopSlotRef.current
        : mobileSlotRef.current;

      const wrap = videoWrapRef.current;

      if (!slot || !wrap) return;

      const rect = slot.getBoundingClientRect();

      wrap.style.top = `${rect.top}px`;
      wrap.style.left = `${rect.left}px`;
      wrap.style.width = `${rect.width}px`;
      wrap.style.height = `${rect.height}px`;

      setPositioned(true);
    }

    reposition();

    window.addEventListener("resize", reposition);
    window.addEventListener("orientationchange", reposition);
    mq.addEventListener("change", reposition);

    const ro = new ResizeObserver(reposition);

    if (desktopSlotRef.current) {
      ro.observe(desktopSlotRef.current);
    }

    if (mobileSlotRef.current) {
      ro.observe(mobileSlotRef.current);
    }

    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("orientationchange", reposition);
      mq.removeEventListener("change", reposition);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-xl -translate-x-1/2 flex-col items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6">

      {/* Desktop */}
      <div className="glass hidden w-full items-center gap-4 rounded-full p-3 pr-5 sm:flex">

        <Vinyl
          size={80}
          isPlaying={isPlaying}
          slotRef={desktopSlotRef}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-semibold leading-tight">
              {title}
            </p>

            <p className="truncate text-[12.5px] text-cream/70">
              {artist}
            </p>
          </div>

          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seekTo}
          />

          <TimeReadout
            currentTime={currentTime}
            duration={duration}
          />
        </div>

        <Transport
          isPlaying={isPlaying}
          onPrev={previous}
          onToggle={isPlaying ? pause : play}
          onNext={next}
        />
      </div>

      {/* Mobile */}
      <div className="glass flex w-full flex-col gap-3 rounded-[26px] p-4 sm:hidden">

        <div className="flex items-center gap-3">

          <Vinyl
            size={64}
            isPlaying={isPlaying}
            slotRef={mobileSlotRef}
          />

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[15px] font-semibold leading-tight">
              {title}
            </p>

            <p className="truncate text-[12.5px] text-cream/70">
              {artist}
            </p>
          </div>

        </div>

        <SeekBar
          currentTime={currentTime}
          duration={duration}
          onSeek={seekTo}
        />

        <div className="grid grid-cols-3 items-center">

          <TimeReadout
            currentTime={currentTime}
            duration={duration}
            className="justify-self-start"
          />

          <div className="justify-self-center">

            <Transport
              isPlaying={isPlaying}
              onPrev={previous}
              onToggle={isPlaying ? pause : play}
              onNext={next}
              size="lg"
            />

          </div>

          <span />

        </div>
      </div>

      {/* YouTube player */}
      <div
        ref={videoWrapRef}
        className="pointer-events-auto fixed z-20 overflow-hidden rounded-md transition-opacity duration-200"
        style={{
          opacity: positioned && ready ? 1 : 0,
        }}
      >
        <div
          id={VIDEO_ELEMENT_ID}
          className="h-full w-full"
        />
      </div>

    </div>
  );
}