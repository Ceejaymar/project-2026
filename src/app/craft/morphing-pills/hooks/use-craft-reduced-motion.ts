'use client';

import { useEffect, useState } from 'react';

export function useCraftReducedMotion() {
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [pageReducedMotion, setPageReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateSystemPreference = () => {
      setSystemReducedMotion(mediaQuery.matches);
    };

    const updatePagePreference = () => {
      setPageReducedMotion(root.dataset.craftReduceMotion === 'true');
    };

    // Read initial preferences
    updateSystemPreference();
    updatePagePreference();

    // Subscribe to system preference changes
    mediaQuery.addEventListener('change', updateSystemPreference);

    // Subscribe to page-level preference changes
    const observer = new MutationObserver(updatePagePreference);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-craft-reduce-motion'],
    });

    return () => {
      mediaQuery.removeEventListener('change', updateSystemPreference);
      observer.disconnect();
    };
  }, []);

  return systemReducedMotion || pageReducedMotion;
}
