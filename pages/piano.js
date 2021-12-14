import { useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { Snow } from '../components/snow';
import styles from '../styles/Piano.module.css';
import useSound from '../hooks/useSound.js';
import sleighBells from '../public/piano/sounds/sleigh-bells.mp3';
import { voices } from '../voices/piano.js';
import classnames from 'classnames';

export default function Piano() {
  const [letItSnow, setLetItSnow] = useState(false);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(-1);

  const sleighBellsSound = useSound({ url: sleighBells, loop: true });

  const voiceSounds = voices.map(({ audio }) => useSound({ url: audio }));

  const isVoicePlaying = voiceSounds.some((voiceSound) => voiceSound.isPlaying);

  function nextVoice() {
    if (!isVoicePlaying) {
      const voiceIndex = currentVoiceIndex >= voiceSounds.length - 1 ? 0 : currentVoiceIndex + 1;

      playAudio(voiceIndex);

      setCurrentVoiceIndex(voiceIndex);
    }
  }

  function playAudio(voiceIndex) {
    voiceSounds[voiceIndex].play();
  }

  useLayoutEffect(() => {
    if (letItSnow) {
      sleighBellsSound.play();
    } else {
      sleighBellsSound.stop();
    }
  }, [letItSnow]);

  const containerClassName = classnames(styles.container, {
    [styles.withSnow]: letItSnow
  });

  return (
    <>
      <div className={containerClassName}>
        <Head>
          <title>Maggie's Meowy Christmas Piano Recital</title>
          <link rel="icon" href="/piano/cat.png" key="favicon" />
        </Head>
        <h1 className={styles.title}>
          <button type="button" onClick={nextVoice} className={styles.titleCat}></button>
          <span className={styles.titleText}>Maggie's Meowy Christmas Piano Recital</span>
          <button type="button" onClick={nextVoice} className={styles.titleCat}></button>
        </h1>
        <div className={styles.section}>
          <h2 className={styles.heading2}>Featuring</h2>
          <div className={styles.featuringPerson}>Maggie on the piano</div>
          <div className={styles.heading3}>Possible Special Guest</div>
          <div className={styles.featuringPerson}>Rory on the vocals</div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.heading2}>Setlist</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>Silent Night</li>
            <li className={styles.listItem}>Jingle Bells</li>
            <li className={styles.listItem}>Hips Don't Lie</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2 className={styles.heading2}>Date &amp; Location</h2>
          <p>Tuesday, December 21st, 2021 @ 7:00PM</p>
          <p>
            24 West 70<sup>th</sup> Terrace &amp; <a className={styles.link}>Virtual</a>
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.heading2}>Menu</h2>
          <p>Light appetitzers and drinks served.</p>
          <p>The nog will flow.</p>
        </div>
      </div>
      <div className={styles.snowToolbar}>
        <button className={styles.snowButton} onClick={() => setLetItSnow(!letItSnow)}>
          {letItSnow ? 'Let It Stop' : 'Let It Snow'}
        </button>
      </div>
      <Snow isEnabled={letItSnow} />
    </>
  );
}
