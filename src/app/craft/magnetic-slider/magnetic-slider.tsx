'use client';

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import {
  animate,
  motion,
  type PanInfo,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from 'motion/react';
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

// Adjust this import to your existing hook's location.
import { useCraftReducedMotion } from '../hooks/use-craft-reduced-motion';

import styles from './magnetic-slider.module.css';

type Side = 'left' | 'right';

type InteractionMode =
  | { type: 'idle' }
  | { type: 'locked'; side: Side; lockOffset: number }
  | { type: 'capturing'; side: Side; startX: number };

const SETTINGS = {
  releaseSpring: {
    stiffness: 250,
    damping: 28,
  },
  arrivalSpring: {
    stiffness: 250,
    damping: 18,
  },
  maxCaptureStretch: 25,
  breakawayDistance: 95,
  stretchMultiplier: 0.45,
  edgeZone: 40,
  dragSensitivity: 0.55,
  captureDistance: 24,
  captureDuration: 0.1,
  captureEase: [0.42, 1, 0.58, 1] as [number, number, number, number],
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function MagneticSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(0);
  const panOffsetRef = useRef(0);

  const modeRef = useRef<InteractionMode>({ type: 'idle' });

  const releaseRef = useRef<{
    side: Side;
    previousStretch: number;
  } | null>(null);

  const [value, setValue] = useState(0);
  const [stretchOrigin, setStretchOrigin] = useState<Side>('left');

  const reduceMotion = useCraftReducedMotion();

  const x = useMotionValue(0);

  const stretch = useSpring(0, SETTINGS.releaseSpring);
  const arrivalStretch = useSpring(0, SETTINGS.arrivalSpring);

  const visualWidth = useMotionTemplate`calc(100% + ${stretch}px + ${arrivalStretch}px)`;

  const getMaxX = useCallback(() => {
    if (!trackRef.current || !thumbRef.current) return 0;

    return Math.max(0, trackRef.current.clientWidth - thumbRef.current.clientWidth);
  }, []);

  // Cancel existing interactions and animations.
  const resetInteraction = useCallback(() => {
    x.stop();

    modeRef.current = { type: 'idle' };
    releaseRef.current = null;

    stretch.jump(0);
    arrivalStretch.jump(0);
  }, [x, stretch, arrivalStretch]);

  // Start magnetic capture toward an endpoint.
  // Also reused when a resize interrupts capture.
  const startCapture = useCallback(
    (side: Side, startX: number, maxX: number) => {
      const capture: InteractionMode = {
        type: 'capturing',
        side,
        startX,
      };

      modeRef.current = capture;

      animate(x, side === 'left' ? 0 : maxX, {
        type: 'tween',
        duration: SETTINGS.captureDuration,
        ease: SETTINGS.captureEase,

        onComplete: () => {
          // Ignore captures cancelled by input or resize.
          if (modeRef.current !== capture) return;

          // Contract the stretched shape after attachment.
          arrivalStretch.set(0);

          modeRef.current = {
            type: 'locked',
            side,
            lockOffset: panOffsetRef.current,
          };
        },
      });
    },
    [x, arrivalStretch],
  );

  // Track position and incoming magnetic stretch.
  useMotionValueEvent(x, 'change', (latest) => {
    const mode = modeRef.current;

    if (mode.type === 'capturing' && !reduceMotion) {
      const extraWidth = mode.side === 'left' ? mode.startX - latest : latest - mode.startX;

      arrivalStretch.jump(clamp(extraWidth, 0, SETTINGS.maxCaptureStretch));
    }

    const maxX = getMaxX();
    if (maxX <= 0) return;

    const percentage = clamp((latest / maxX) * 100, 0, 100);

    valueRef.current = percentage;
    setValue(Math.round(percentage));
  });

  // Move the thumb forward as outgoing stretch contracts.
  useMotionValueEvent(stretch, 'change', (latest) => {
    const release = releaseRef.current;
    if (!release || reduceMotion) return;

    const contraction = release.previousStretch - latest;
    const direction = release.side === 'left' ? 1 : -1;

    const nextX = x.get() + contraction * direction;

    x.set(clamp(nextX, 0, getMaxX()));

    release.previousStretch = latest;
  });

  useMotionValueEvent(stretch, 'animationComplete', () => {
    releaseRef.current = null;
  });

  // Settle ongoing animations when Reduce motion is enabled.
  useEffect(() => {
    if (!reduceMotion) return;

    const mode = modeRef.current;
    const release = releaseRef.current;
    const remainingStretch = stretch.get();

    resetInteraction();

    if (mode.type === 'capturing') {
      // Finish magnetic arrival immediately.
      x.set(mode.side === 'left' ? 0 : getMaxX());
    } else if (release) {
      // Complete the remaining breakaway movement immediately.
      const direction = release.side === 'left' ? 1 : -1;

      x.set(clamp(x.get() + remainingStretch * direction, 0, getMaxX()));
    }
  }, [reduceMotion, resetInteraction, stretch, x, getMaxX]);

  // Preserve position when dimensions change.
  // Retarget an active capture if the track is resized.
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const maxX = getMaxX();

      const projectedX = clamp((valueRef.current / 100) * maxX, 0, maxX);

      const mode = modeRef.current;

      if (mode.type !== 'capturing') {
        x.set(projectedX);
        return;
      }

      // Invalidate the old capture before stopping its tween.
      modeRef.current = { type: 'idle' };
      x.stop();

      arrivalStretch.jump(0);

      // Preserve the current percentage in the new dimensions.
      x.set(projectedX);

      if (reduceMotion) {
        x.set(mode.side === 'left' ? 0 : maxX);
        return;
      }

      if (maxX <= 0) return;

      // Restart capture toward the newly positioned endpoint.
      startCapture(mode.side, projectedX, maxX);
    });

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    if (thumbRef.current) {
      observer.observe(thumbRef.current);
    }

    return () => observer.disconnect();
  }, [x, getMaxX, arrivalStretch, reduceMotion, startCapture]);

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

    resetInteraction();

    const clampedValue = clamp(nextValue, 0, 100);

    x.set((clampedValue / 100) * getMaxX());
  }

  function handlePanStart() {
    resetInteraction();
    panOffsetRef.current = 0;

    // Reduced motion: allow dragging without a stretch lock.
    if (reduceMotion) return;

    const currentX = x.get();
    const maxX = getMaxX();

    let side: Side | null = null;

    if (currentX <= 1) {
      side = 'left';
    } else if (currentX >= maxX - 1) {
      side = 'right';
    }

    if (side) {
      modeRef.current = {
        type: 'locked',
        side,
        lockOffset: 0,
      };

      setStretchOrigin(side);
    }
  }

  function handlePan(info: PanInfo) {
    panOffsetRef.current = info.offset.x;

    const mode = modeRef.current;

    // Let incoming capture finish without pointer interference.
    if (mode.type === 'capturing') return;

    const maxX = getMaxX();
    if (maxX <= 0) return;

    // 1. Stretch while attached to an endpoint.
    if (mode.type === 'locked' && !reduceMotion) {
      const offsetFromLock = info.offset.x - mode.lockOffset;

      const pullDistance = Math.max(0, mode.side === 'left' ? offsetFromLock : -offsetFromLock);

      const breakawayDistance = Math.min(SETTINGS.breakawayDistance, maxX / 2);

      if (pullDistance < breakawayDistance) {
        stretch.jump(pullDistance * SETTINGS.stretchMultiplier);
        return;
      }

      // Release the anchored edge with its original spring.
      releaseRef.current = {
        side: mode.side,
        previousStretch: stretch.get(),
      };

      modeRef.current = { type: 'idle' };

      stretch.set(0);
      return;
    }

    // 2. Apply resistance when moving away from an edge.
    const currentX = x.get();
    const edgeZone = Math.min(SETTINGS.edgeZone, maxX / 4);

    const pullingFromLeft = currentX < edgeZone && info.delta.x > 0;

    const pullingFromRight = currentX > maxX - edgeZone && info.delta.x < 0;

    let resistance = 1;

    if (pullingFromLeft || pullingFromRight) {
      const distanceFromEdge = pullingFromLeft ? currentX : maxX - currentX;

      const progress = Math.min(1, distanceFromEdge / edgeZone);
      const easedProgress = progress * progress * (3 - 2 * progress);

      resistance = 0.1 + 0.9 * easedProgress;
    }

    const nextX = clamp(currentX + info.delta.x * resistance * SETTINGS.dragSensitivity, 0, maxX);

    // 3. Detect when approaching a magnetic endpoint.
    const captureDistance = Math.min(SETTINGS.captureDistance, maxX / 4);

    const approachingLeft = info.delta.x < 0 && nextX <= captureDistance;

    const approachingRight = info.delta.x > 0 && nextX >= maxX - captureDistance;

    if (approachingLeft || approachingRight) {
      const side: Side = approachingLeft ? 'left' : 'right';

      resetInteraction();
      setStretchOrigin(side);

      if (reduceMotion) {
        // Snap directly to the endpoint without animation.
        x.set(side === 'left' ? 0 : maxX);
      } else {
        startCapture(side, currentX, maxX);
      }

      return;
    }

    // 4. Normal movement between endpoints.
    x.set(nextX);
  }

  function handlePanEnd() {
    // Allow an animated magnetic capture to complete.
    if (modeRef.current.type !== 'capturing') {
      modeRef.current = { type: 'idle' };

      if (reduceMotion) {
        stretch.jump(0);
      } else {
        stretch.set(0);
      }
    }
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
            onPanStart={handlePanStart}
            onPan={(_, info) => handlePan(info)}
            onPanEnd={handlePanEnd}
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
