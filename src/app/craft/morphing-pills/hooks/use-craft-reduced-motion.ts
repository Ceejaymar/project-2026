'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

export function useCraftReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [pageReducedMotion, setPageReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const updatePreference = () => {
      setPageReducedMotion(root.dataset.craftReduceMotion === 'true');
    };

    updatePreference();

    const observer = new MutationObserver(updatePreference);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-craft-reduce-motion'],
    });

    return () => observer.disconnect();
  }, []);

  return Boolean(prefersReducedMotion) || pageReducedMotion;
}
