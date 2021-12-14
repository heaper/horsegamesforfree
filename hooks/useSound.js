import { useState, useEffect, useLayoutEffect, useRef } from 'react';

export default function useSound({ url, loop = false }) {
  const audio = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  //synchronous needed for permission to play audio in Safari from a user interaction
  useLayoutEffect(() => {
    if (audio.current !== null) {
      if (isPlaying) {
        audio.current.currentTime = 0;
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audioInst = new Audio(url);
    audioInst.loop = loop;
    audio.current = audioInst;
    audioInst.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audioInst.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  function play() {
    setIsPlaying(true);
  }

  function stop() {
    setIsPlaying(false);
  }

  return {
    play,
    stop,
    isPlaying,
  };
}
