'use client';

import { useEffect, useState } from 'react';

export default function usePrefersReducedMotion() {
  const [prefersReduceMotion, setPrefersReduceMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    setPrefersReduceMotion(query.matches);

    const handleChange = () => {
      setPrefersReduceMotion(query.matches);
    };

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReduceMotion;
}
