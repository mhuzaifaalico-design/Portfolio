import { useEffect, useRef } from 'react';
// @ts-ignore — plain JS module with adjacent .d.ts
import { initCursorGrid } from '../lib/cursorGrid.js';

/**
 * Full-page background grid that lights up in cells around the cursor,
 * holds briefly, then fades — plus a radial pulse ring on click.
 */
export default function CursorGridBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const destroy = initCursorGrid(ref.current, {
      cellSize: 60,
      color: '#ffffff',
      radius: 160,
      falloff: 'smooth',
      holdTime: 300,
      fadeDuration: 700,
      lineWidth: 1,
      maxOpacity: 0.6,
      fillOpacity: 0,
      gridOpacity: 0,
      cellRadius: 4,
      clickPulse: true,
      pulseSpeed: 700,
    });
    return destroy;
  }, []);

  return <div className="page-cursor-grid" ref={ref} aria-hidden="true" />;
}
