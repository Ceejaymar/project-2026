'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import {
  animate,
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
  const lockOffsetRef = useRef(0);

  const releaseRef = useRef<{
    side: 'left' | 'right';
    previousStretch: number;
  } | null>(null);

  const captureRef = useRef<{
    side: 'left' | 'right';
    startX: number;
  } | null>(null);

  const panOffsetRef = useRef(0);

  const [value, setValue] = useState(0);
  const [stretchOrigin, setStretchOrigin] = useState<'left' | 'right'>('left');

  const x = useMotionValue(0);

  const stretch = useSpring(0, {
    stiffness: 250,
    damping: 28,
  });

  const arrivalStretch = useSpring(0, {
    stiffness: 250,
    damping: 18,
  });

  const visualWidth = useMotionTemplate`calc(100% + ${stretch}px + ${arrivalStretch}px)`;

  const getMaxX = useCallback(() => {
    if (!trackRef.current || !thumbRef.current) return 0;

    return Math.max(0, trackRef.current.clientWidth - thumbRef.current.clientWidth);
  }, []);

  // Track slider position and stretch during magnetic capture.
  useMotionValueEvent(x, 'change', (latest) => {
    const capture = captureRef.current;

    if (capture) {
      const extraWidth =
        capture.side === 'left' ? capture.startX - latest : latest - capture.startX;

      const maxCaptureStretch = 25;

      arrivalStretch.jump(Math.max(0, Math.min(maxCaptureStretch, extraWidth)));
    }

    const maxX = getMaxX();
    if (maxX <= 0) return;

    const percentage = Math.max(0, Math.min(100, (latest / maxX) * 100));

    valueRef.current = percentage;
    setValue(Math.round(percentage));
  });

  // Move the thumb forward as the stretched shape contracts.
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

  // Preserve the slider's percentage when its dimensions change.
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

    // Cancel an incoming capture before moving with the keyboard.
    x.stop();
    captureRef.current = null;
    releaseRef.current = null;
    edgeLockRef.current = null;
    stretch.jump(0);

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
              // Cancel any incoming magnetic capture.
              x.stop();
              captureRef.current = null;
              panOffsetRef.current = 0;
              lockOffsetRef.current = 0;

              releaseRef.current = null;
              stretch.jump(0);
              arrivalStretch.jump(0);

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
              panOffsetRef.current = info.offset.x;

              // Let an incoming capture finish without pointer interference.
              if (captureRef.current) return;

              const maxX = getMaxX();
              if (maxX <= 0) return;

              // 1. Stretch when pulling away from an attached endpoint.
              if (edgeLockRef.current) {
                const lockedSide = edgeLockRef.current;

                const offsetFromLock = info.offset.x - lockOffsetRef.current;

                const pullDistance = Math.max(
                  0,
                  lockedSide === 'left' ? offsetFromLock : -offsetFromLock,
                );

                const breakawayDistance = Math.min(95, maxX / 2);

                if (pullDistance < breakawayDistance) {
                  stretch.jump(pullDistance * 0.45);
                  return;
                }

                // Release the anchored edge with a spring.
                releaseRef.current = {
                  side: lockedSide,
                  previousStretch: stretch.get(),
                };

                edgeLockRef.current = null;

                stretch.set(0);
                return;
              }

              // 2. Apply resistance when moving away from an edge.
              const currentX = x.get();
              const edgeZone = Math.min(40, maxX / 4);

              const pullingFromLeft = currentX < edgeZone && info.delta.x > 0;
              const pullingFromRight = currentX > maxX - edgeZone && info.delta.x < 0;

              let resistance = 1;

              if (pullingFromLeft || pullingFromRight) {
                const distanceFromEdge = pullingFromLeft ? currentX : maxX - currentX;

                const progress = Math.min(1, distanceFromEdge / edgeZone);
                const easedProgress = progress * progress * (3 - 2 * progress);

                resistance = 0.1 + 0.9 * easedProgress;
              }

              const dragSensitivity = 0.55;

              const nextX = Math.max(
                0,
                Math.min(maxX, currentX + info.delta.x * resistance * dragSensitivity),
              );

              // 3. Detect when approaching a magnetic endpoint.
              const captureDistance = Math.min(24, maxX / 4);

              const approachingLeft = info.delta.x < 0 && nextX <= captureDistance;
              const approachingRight = info.delta.x > 0 && nextX >= maxX - captureDistance;

              if (approachingLeft || approachingRight) {
                const side = approachingLeft ? 'left' : 'right';

                releaseRef.current = null;
                setStretchOrigin(side);

                stretch.jump(0);
                arrivalStretch.jump(0);

                const capture = {
                  side,
                  startX: currentX,
                } as const;

                captureRef.current = capture;

                // Smooth magnetic arrival
                animate(x, side === 'left' ? 0 : maxX, {
                  type: 'tween',
                  duration: 0.1,
                  ease: [0.42, 1, 0.58, 1],

                  onComplete: () => {
                    // Ignore a capture that was cancelled.
                    if (captureRef.current !== capture) return;

                    captureRef.current = null;

                    // Contract the stretched shape after attachment.
                    arrivalStretch.set(0);

                    edgeLockRef.current = side;
                    lockOffsetRef.current = panOffsetRef.current;
                  },
                });

                return;
              }

              // 4. Normal movement between endpoints.
              x.set(nextX);
            }}
            onPanEnd={() => {
              edgeLockRef.current = null;

              // Allow incoming magnetic capture to complete.
              if (!captureRef.current) {
                stretch.set(0);
              }
            }}
          >
            <motion.div
              className={styles.thumbVisual}
              data-origin={stretchOrigin}
              aria-hidden="true"
              style={{ width: visualWidth }}
            >
              <CaretLeftIcon weight="fill" size={18} />
              <CaretRightIcon weight="fill" size={18} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
