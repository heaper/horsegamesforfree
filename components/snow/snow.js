import { useRef, useEffect } from 'react';
import { snowStorm } from './snowStorm.js';
import styles from './snow.module.css';

export function Snow({ isEnabled = false }) {
  const canvasEl = useRef(null);
  const snowStormInst = useRef(null);

  useEffect(() => {
    if (isEnabled) {
      snowStormInst.current = snowStorm({ canvasEl: canvasEl.current });
      snowStormInst.current.start();
    } else if (snowStormInst.current) {
      snowStormInst.current.stop();
    }

    return () => {
      if (snowStormInst.current) {
        snowStormInst.current.stop();
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return <canvas id="snow" ref={canvasEl} className={styles.snow}></canvas>;
}
