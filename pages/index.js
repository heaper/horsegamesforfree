import {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useSound from '../hooks/useSound.js';
import styles from '../styles/Home.module.css';
import voices from '../voices';

export default function Home() {
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(-1);
  const [text, setText] = useState('Horse Games For Free!');

  const voiceSounds = voices.map(({audio}) => useSound(audio));

  const isVoicePlaying = voiceSounds.some(voiceSound => voiceSound.isPlaying);

  function nextVoice() {
    if(!isVoicePlaying) {
      const voiceIndex = currentVoiceIndex >= voiceSounds.length - 1 ? 0 : currentVoiceIndex + 1;

      playAudio(voiceIndex);
      updateText(voiceIndex);

      setCurrentVoiceIndex(voiceIndex);
    }
  }

  function playAudio(voiceIndex) {
    voiceSounds[voiceIndex].play();
  }

  function updateText(voiceIndex) {
    setText(voices[voiceIndex].caption);
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
         {text}
        </h1>
        <button className={styles.horseButton} onClick={nextVoice}>
          <img 
            className={horseImageClassName}
            src="/horse.svg"
            alt="horse" />
        </button>
      </main>
    </div>
  )
}
