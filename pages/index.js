import {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useSound from '../hooks/useSound.js';
import styles from '../styles/Home.module.css';
import voice1 from '../public/voice1.mp3';
import voice2 from '../public/voice2.mp3';
import voice3 from '../public/voice3.mp3';
import voice4 from '../public/voice4.mp3';

export default function Home() {
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(-1);
  //const [play, stop, isPlaying] = useSound(voice1);

  const voices = [
    useSound(voice1),
    useSound(voice2),
    useSound(voice3),
    useSound(voice4)
  ];

  const isVoicePlaying = voices.some(voice => voice.isPlaying);

  function playVoice() {
    if(!isVoicePlaying) {
      const voiceIndex = currentVoiceIndex >= voices.length - 1 ? 0 : currentVoiceIndex + 1;

      voices[voiceIndex].play();

      setCurrentVoiceIndex(voiceIndex);
    }
  }

  let horseImageClassName = styles.horseImage;
  if(isVoicePlaying) {
    horseImageClassName += ` ${styles.neigh}`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Horse Games For Free!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <Image
        alt="Background"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center bottom"
        priority={true}
        quality={75}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Horse Games For Free!
        </h1>
        <button className={styles.horseButton} onClick={playVoice}>
          <img 
            className={horseImageClassName}
            src="/horse.svg"
            alt="horse" />
        </button>
      </main>
    </div>
  )
}
