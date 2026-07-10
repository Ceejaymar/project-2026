'use client';

import usePrefersReducedMotion from '@/hooks/usePrefersReduceMotion';

export function NoiseFilter() {
  const prefersReduceMotion = usePrefersReducedMotion();

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter
          id="noise-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            seed="10"
            result="noise"
          >
            {!prefersReduceMotion && (
              <animate
                attributeName="seed"
                values="1;2;3;4;5;6;7;8"
                dur="0.4s"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>

          <feColorMatrix
            in="noise"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.4 0
            "
            result="soft-noise"
          />

          <feBlend in="SourceGraphic" in2="soft-noise" mode="soft-light" />
        </filter>
      </defs>
    </svg>
  );
}
