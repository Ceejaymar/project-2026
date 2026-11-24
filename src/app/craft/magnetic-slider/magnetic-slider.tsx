'use client';

import { motion, useMotionValue, useMotionValueEvent } from 'motion/react';
import { type KeyboardEvent, useRef, useState } from 'react';

import styles from './magnetic-slider.module.css';

export default function MagneticSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(0);

  const x = useMotionValue(0);

  useMotionValueEvent(x, 'change', (latest) => {
    const maxX = getMaxX();

    if (maxX <= 0) return;

    const percentage = (latest / maxX) * 100;

    setValue(Math.round(Math.max(0, Math.min(100, percentage))));
  });

  function getMaxX() {
    if (!trackRef.current || !thumbRef.current) return 0;

    return trackRef.current.clientWidth - thumbRef.current.clientWidth;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let nextValue = value;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        nextValue += 5;
        break;

      case 'ArrowLeft':
      case 'ArrowDown':
        nextValue -= 5;
        break;

      case 'Home':
        nextValue = 0;
        break;

      case 'End':
        nextValue = 100;
        break;

      default:
        return;
    }

    event.preventDefault();

    const clampedValue = Math.max(0, Math.min(100, nextValue));

    x.set((clampedValue / 100) * getMaxX());
    setValue(clampedValue);
  }

  return (
    <section className={styles.slider} aria-label="Magnetic slider">
      <div className={styles.container}>
        <div ref={trackRef} className={styles.track}>
          <motion.div
            ref={thumbRef}
            className={styles.thumb}
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ x }}
            role="slider"
            tabIndex={0}
            aria-label="Magnetic slider position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </section>
  );
}
