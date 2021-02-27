import React, {useState, useEffect, useLayoutEffect} from 'react';

export default function useSound(url) {

    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    //synchronous needed for permission to play audio in Safari from a user interaction
    useLayoutEffect(() => {
        if(audio !== null) {
            isPlaying ? audio.play() : audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const audioInst = new Audio(url);
        setAudio(audioInst);
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
        isPlaying
    };
};