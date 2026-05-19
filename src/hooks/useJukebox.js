import { useCallback, useEffect, useRef, useState } from 'react';
import { playlist } from '../jukebox.js';

const VOLUME_STORAGE_KEY = 'portfolio-jukebox-volume';

function getInitialVolume() {
  try {
    const saved = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (saved != null) {
      const value = Number(saved);
      if (!Number.isNaN(value)) {
        return Math.min(1, Math.max(0, value));
      }
    }
  } catch {
    // ignore storage errors
  }
  return 0.7;
}

export function useJukebox() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(getInitialVolume);
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(false);

  currentIndexRef.current = currentIndex;
  isPlayingRef.current = isPlaying;

  const currentTrack = playlist[currentIndex];

  const applyVolume = useCallback((value) => {
    const clamped = Math.min(1, Math.max(0, value));
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    setVolumeState(clamped);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(clamped));
    } catch {
      // ignore storage errors
    }
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlayingRef.current) {
      pause();
    } else {
      play();
    }
  }, [pause, play]);

  const restart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    if (!isPlayingRef.current) {
      play();
    }
  }, [play]);

  const goToIndex = useCallback(
    async (index, { autoplay = isPlayingRef.current } = {}) => {
      const audio = audioRef.current;
      if (!audio) return;

      const nextIndex = (index + playlist.length) % playlist.length;
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      audio.src = playlist[nextIndex].src;
      audio.load();

      if (autoplay) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    },
    [],
  );

  const next = useCallback(() => {
    goToIndex(currentIndexRef.current + 1, { autoplay: isPlayingRef.current });
  }, [goToIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = playlist[0].src;
    audio.volume = volume;
    audio.load();

    const onEnded = () => {
      goToIndex(currentIndexRef.current + 1, { autoplay: true });
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [goToIndex]);

  return {
    audioRef,
    currentTrack,
    isPlaying,
    volume,
    setVolume: applyVolume,
    toggle,
    restart,
    next,
  };
}
