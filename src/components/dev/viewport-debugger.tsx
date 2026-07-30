'use client';

import { useEffect, useState } from 'react';

type ViewportInfo = {
  width: number;
  height: number;
  visualWidth: number;
  visualHeight: number;
  dpr: number;
  orientation: 'portrait' | 'landscape';
};

export default function ViewportDebugger() {
  const [viewport, setViewport] = useState<ViewportInfo | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    function updateViewport() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        width,
        height,
        visualWidth: Math.round(window.visualViewport?.width ?? width),
        visualHeight: Math.round(window.visualViewport?.height ?? height),
        dpr: window.devicePixelRatio,
        orientation: width > height ? 'landscape' : 'portrait',
      });
    }

    updateViewport();

    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    window.visualViewport?.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
      window.visualViewport?.removeEventListener('resize', updateViewport);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || !viewport) {
    return null;
  }

  return (
    <aside
      style={{
        position: 'fixed',
        right: 12,
        bottom: 12,
        zIndex: 9999,
        border: '1px solid rgb(255 255 255 / 0.18)',
        borderRadius: 10,
        background: 'rgb(0 0 0 / 0.78)',
        color: 'white',
        padding: '10px 12px',
        fontFamily: 'monospace',
        fontSize: 12,
        lineHeight: 1.45,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div>{viewport.orientation}</div>
      <div>
        {viewport.width} × {viewport.height}
      </div>
      <div>
        visual: {viewport.visualWidth} × {viewport.visualHeight}
      </div>
      <div>dpr: {viewport.dpr}</div>
      <div>rem: {(viewport.width / 16).toFixed(2)}</div>
    </aside>
  );
}
