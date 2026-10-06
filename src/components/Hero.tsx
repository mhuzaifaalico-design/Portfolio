import { useEffect, useRef } from 'react';
import Eyes from './Eyes';

const MAX_DOTS = 900;
const MIN_DIST = 18;
const BRUSH_RADIUS = 280;

function HeroContent({ invert }: { invert?: boolean }) {
  return (
    <>
      <div className="hero-main">
        <p className="hero-hello">Hi, I&rsquo;m Huzaifa &mdash; a</p>
        <h1 className="hero-title">
          <span className="line line-1">
            UX/UI
            {invert ? (
              <span className="eyes-spacer" aria-hidden="true"><span /><span /></span>
            ) : (
              <Eyes hint />
            )}
          </span>
          <span className="line line-2">Designer</span>
        </h1>
      </div>
      <div className="hero-bottom">
        <p className="hero-desc">
          I don&rsquo;t just shape screens, I shape how people feel &mdash; before they even know why.
        </p>
        <div className="hero-actions">
          <a href="#work" className="hero-btn primary" tabIndex={invert ? -1 : 0}>
            See my experience <span aria-hidden="true">&darr;</span>
          </a>
          <a href="mailto:huzaifaali.co@gmail.com" className="hero-btn ghost" tabIndex={invert ? -1 : 0}>
            Let&rsquo;s talk
          </a>
        </div>
      </div>
      <div className="hero-strip">
        <span>Portfolio &rsquo;26</span>
        <span className="skills">
          UX<span className="dot">&middot;</span>UI<span className="dot">&middot;</span>Prototyping<span className="dot">&middot;</span>AI-Augmented Design
        </span>
        <span>Scroll &darr;</span>
      </div>
    </>
  );
}

/**
 * White hero that the visitor "colours in" black by rubbing the cursor —
 * an inverted text layer is revealed through the same SVG mask.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const dotsGroup = dotsRef.current;
    if (!heroEl || !dotsGroup) return;

    let lastX: number | null = null;
    let lastY: number | null = null;
    let announced = false;

    const addDot = (clientX: number, clientY: number) => {
      const rect = heroEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (lastX !== null && lastY !== null) {
        if (Math.hypot(x - lastX, y - lastY) < MIN_DIST) return;
      }
      lastX = x;
      lastY = y;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(x));
      circle.setAttribute('cy', String(y));
      circle.setAttribute('r', String(BRUSH_RADIUS));
      circle.setAttribute('fill', 'white');
      dotsGroup.appendChild(circle);
      while (dotsGroup.childNodes.length > MAX_DOTS) dotsGroup.removeChild(dotsGroup.firstChild!);
      if (!announced) {
        announced = true;
        window.dispatchEvent(new Event('hero-painted'));
      }
    };

    const onPointerMove = (e: PointerEvent) => addDot(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) addDot(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => { lastX = null; lastY = null; };

    heroEl.addEventListener('pointermove', onPointerMove);
    heroEl.addEventListener('touchmove', onTouchMove, { passive: true });
    heroEl.addEventListener('pointerleave', onLeave);

    // Touch screens have no cursor to rub with — paint the hero in with an automatic zig-zag sweep
    let cancelled = false;
    const rafs: number[] = [];
    if (window.matchMedia('(hover: none)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const timer = setTimeout(() => {
        if (cancelled) return;
        const r = heroEl.getBoundingClientRect();
        const rows = Math.max(3, Math.ceil(r.height / 260));
        const pts: [number, number][] = [];
        for (let i = 0; i <= rows; i++) {
          const y = r.top + (r.height * i) / rows;
          const from = i % 2 ? r.right + 40 : r.left - 40;
          const to = i % 2 ? r.left - 40 : r.right + 40;
          for (let k = 0; k <= 10; k++) pts.push([from + ((to - from) * k) / 10, y]);
        }
        if (reduce) { pts.forEach(([x, y]) => addDot(x, y)); return; }
        let n = 0;
        const step = () => {
          for (let j = 0; j < 5 && n < pts.length; j++, n++) addDot(pts[n][0], pts[n][1]);
          if (n < pts.length) rafs.push(requestAnimationFrame(step));
          else { lastX = null; lastY = null; }
        };
        step();
      }, 900);
      return () => {
        cancelled = true;
        clearTimeout(timer);
        rafs.forEach(cancelAnimationFrame);
        heroEl.removeEventListener('pointermove', onPointerMove);
        heroEl.removeEventListener('touchmove', onTouchMove);
        heroEl.removeEventListener('pointerleave', onLeave);
      };
    }

    return () => {
      heroEl.removeEventListener('pointermove', onPointerMove);
      heroEl.removeEventListener('touchmove', onTouchMove);
      heroEl.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-paint" aria-hidden="true" />
      <div className="hero-base"><HeroContent /></div>
      <div className="hero-invert" aria-hidden="true"><HeroContent invert /></div>

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <mask id="rubMask" maskUnits="objectBoundingBox" x="-20%" y="-20%" width="140%" height="140%">
            <rect x="-2000" y="-2000" width="5000" height="5000" fill="black" />
            <g ref={dotsRef} />
          </mask>
        </defs>
      </svg>
    </section>
  );
}
