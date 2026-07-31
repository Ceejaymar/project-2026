'use client';

import { useEffect, useState } from 'react';

import styles from './reduce-motion-toggle.module.css';

export default function ReduceMotionToggle() {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.craftReduceMotion = String(isReduced);

    return () => {
      delete document.documentElement.dataset.craftReduceMotion;
    };
  }, [isReduced]);

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-pressed={isReduced}
      onClick={() => setIsReduced((current) => !current)}
    >
      <span>Reduce motion</span>

      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </button>
  );
}
