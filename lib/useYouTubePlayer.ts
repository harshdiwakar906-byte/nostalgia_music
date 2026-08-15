"use client";

import { useCallback, useEffect, useRef, useState } from "react";

let apiPromise: Promise<void> | null = null;

const YOUTUBE_PLAYLIST_ID = "PLfdfb0LKtKKs8IcyIvtsf_FfmJU-1pbI1";

function loadYouTubeApi(): Promise<void> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });

  return apiPromise;
}

export type PlaybackState =
  | "unstarted"
  | "playing"
  | "paused"
  | "buffering"
  | "ended"
  | "cued";

function mapState(state: YT.PlayerState): PlaybackState {
  switch (state) {
    case YT.PlayerState.PLAYING:
      return "playing";
    case YT.PlayerState.PAUSED:
      return "paused";
    case YT.PlayerState.BUFFERING:
      return "buffering";
    case YT.PlayerState.ENDED:
      return "ended";
    case YT.PlayerState.CUED:
      return "cued";
    default:
      return "unstarted";
  }
}

interface UseYouTubePlayerArgs {
  elementId: string;
  onEnded: () => void;
  onError: (code: number, videoId: string) => void;
}

export function useYouTubePlayer({
  elementId,
  onEnded,
  onError,
}: UseYouTubePlayerArgs) {
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);

  const [playback, setPlayback] =
    useState<PlaybackState>("unstarted");

  const [ready, setReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  onEndedRef.current = onEnded;
  onErrorRef.current = onError;

  const stopPolling = useCallback(() => {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    stopPolling();

    pollRef.current = setInterval(() => {
      const player = playerRef.current;

      if (!player) return;

      try {
        const time = player.getCurrentTime();
        const total = player.getDuration();

        if (Number.isFinite(time)) {
          setCurrentTime(time);
        }

        if (Number.isFinite(total) && total > 0) {
          setDuration(total);
        }
      } catch {
        // Player can briefly be unavailable while changing videos.
      }
    }, 250);
  }, [stopPolling]);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled) return;

      const player = new window.YT.Player(elementId, {
        playerVars: {
          playsinline: 1,
          rel: 0,
          listType: "playlist",
          list: YOUTUBE_PLAYLIST_ID,
        },

        events: {
          onReady: () => {
            if (cancelled) return;

            setReady(true);

            try {
              const total = player.getDuration();

              if (Number.isFinite(total) && total > 0) {
                setDuration(total);
              }
            } catch {
              // Wait for metadata.
            }
          },

          onStateChange: (event) => {
            if (cancelled) return;

            const state = mapState(event.data);

            setPlayback(state);

            if (state === "playing") {
              startPolling();
            } else {
              stopPolling();
            }

            if (state === "ended") {
              onEndedRef.current();
            }
          },

          onError: (event) => {
            if (cancelled) return;

            let videoId = "";

            try {
             videoId = (player as any).getVideoData?.()?.video_id;
            } catch {
              // Ignore.
            }

            onErrorRef.current(event.data, videoId);
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      cancelled = true;

      stopPolling();

      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore destroy errors.
      }

      playerRef.current = null;
    };
  }, [elementId, startPolling, stopPolling]);

  const play = useCallback(() => {
    try {
      playerRef.current?.playVideo();
    } catch {
      // Ignore.
    }
  }, []);

  const pause = useCallback(() => {
    try {
      playerRef.current?.pauseVideo();
    } catch {
      // Ignore.
    }
  }, []);

  const next = useCallback(() => {
    try {
      (playerRef.current as any)?.nextVideo?.();
    } catch {
      // Ignore.
    }
  }, []);

  const previous = useCallback(() => {
    try {
      (playerRef.current as any)?.previousVideo?.();
    } catch {
      // Ignore.
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    try {
      playerRef.current?.seekTo(seconds, true);
      setCurrentTime(seconds);
    } catch {
      // Ignore.
    }
  }, []);

  return {
    ready,
    playback,
    currentTime,
    duration,
    play,
    pause,
    next,
    previous,
    seekTo,
  };
}