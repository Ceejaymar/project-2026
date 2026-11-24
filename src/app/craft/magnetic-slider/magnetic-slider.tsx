'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from 'motion/react';
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles from './magnetic-slider.module.css';

export default function MagneticSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(0);
  const edgeLockRef = useRef<'left' | 'right' | null>(null);
  const releaseRef = useRef<{
    side: 'left' | 'right';
    previousStretch: number;
  } | null>(null);

  const [value, setValue] = useState(0);

  const x = useMotionValue(0);

  const stretch = useSpring(0, {
    stiffness: 250,
    damping: 28,
  });

  const visualWidth = useMotionTemplate`calc(100% + ${stretch}px)`;

  const [stretchOrigin, setStretchOrigin] = useState<'left' | 'right'>('left');

  useMotionValueEvent(x, 'change', (latest) => {
    const maxX = getMaxX();

    if (maxX <= 0) return;

    const percentage = Math.max(0, Math.min(100, (latest / maxX) * 100));

    valueRef.current = percentage;
    setValue(Math.round(percentage));
  });

  useMotionValueEvent(stretch, 'change', (latest) => {
    const release = releaseRef.current;
    if (!release) return;

    const contraction = release.previousStretch - latest;

    const direction = release.side === 'left' ? 1 : -1;

    const nextX = x.get() + contraction * direction;

    x.set(Math.max(0, Math.min(getMaxX(), nextX)));

    release.previousStretch = latest;
  });

  useMotionValueEvent(stretch, 'animationComplete', () => {
    releaseRef.current = null;
  });

  const getMaxX = useCallback(() => {
    if (!trackRef.current || !thumbRef.current) return 0;

    return trackRef.current.clientWidth - thumbRef.current.clientWidth;
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const maxX = getMaxX();

      x.set((valueRef.current / 100) * maxX);
    });

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    if (thumbRef.current) {
      observer.observe(thumbRef.current);
    }

    return () => observer.disconnect();
  }, [x, getMaxX]);

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
            style={{ x }}
            role="slider"
            tabIndex={0}
            aria-label="Magnetic slider position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            onKeyDown={handleKeyDown}
            onPanStart={() => {
              releaseRef.current = null;
              stretch.jump(0);
              const currentX = x.get();
              const maxX = getMaxX();

              if (currentX <= 1) {
                edgeLockRef.current = 'left';
              } else if (currentX >= maxX - 1) {
                edgeLockRef.current = 'right';
              } else {
                edgeLockRef.current = null;
              }

              if (edgeLockRef.current) {
                setStretchOrigin(edgeLockRef.current);
              }
            }}
            onPan={(_, info) => {
              const maxX = getMaxX();
              if (maxX <= 0) return;

              if (edgeLockRef.current) {
                const lockedSide = edgeLockRef.current;

                const pullDistance = Math.max(
                  0,
                  lockedSide === 'left' ? info.offset.x : -info.offset.x,
                );

                const breakawayDistance = Math.min(70, maxX / 2);

                if (pullDistance < breakawayDistance) {
                  stretch.set(pullDistance * 0.6);
                  return;
                }

                releaseRef.current = {
                  side: lockedSide,
                  previousStretch: stretch.get(),
                };

                edgeLockRef.current = null;

                stretch.set(0);
                return;
              }

              const currentX = x.get();
              const edgeZone = Math.min(40, maxX / 4);

              const pullingFromLeft = currentX < edgeZone && info.delta.x > 0;
              const pullingFromRight = currentX > maxX - edgeZone && info.delta.x < 0;

              let resistance = 1;

              if (pullingFromLeft || pullingFromRight) {
                const distanceFromEdge = pullingFromLeft ? currentX : maxX - currentX;

                const progress = Math.min(1, distanceFromEdge / edgeZone);

                const easedProgress = progress * progress * (3 - 2 * progress);

                resistance = 0.1 + 0.6 * easedProgress;
              }

              const nextX = currentX + info.delta.x * resistance;

              x.set(Math.max(0, Math.min(maxX, nextX)));
            }}
            onPanEnd={() => {
              edgeLockRef.current = null;
              stretch.set(0);
            }}
          >
            <motion.div
              className={styles.thumbVisual}
              data-origin={stretchOrigin}
              aria-hidden="true"
              style={{ width: visualWidth }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
