'use client';

import { useState } from 'react';
import { morphingPillItems } from '../morphing-pills-content';

export type Direction = 'UP' | 'DOWN';

export function usePillSelection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>('DOWN');

  function changeFeature(step: -1 | 1) {
    setDirection(step === 1 ? 'DOWN' : 'UP');

    setActiveIndex((current) => {
      if (current === null) return 0;

      return (current + step + morphingPillItems.length) % morphingPillItems.length;
    });
  }

  function handleDirection(index: number) {
    if (index === activeIndex) return;

    setDirection(activeIndex !== null && index < activeIndex ? 'UP' : 'DOWN');

    setActiveIndex(index);
  }

  return {
    activeIndex,
    direction,
    changeFeature,
    handleDirection,
  };
}
