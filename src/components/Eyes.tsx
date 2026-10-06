import { useEffect, useRef } from 'react';

/** Googly eyes that track the cursor and blink every few seconds. */
export default function Eyes({ hint }: { hint?: boolean }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const eyes = Array.from(wrap.querySelectorAll<HTMLElement>('.eye'));
    const maxMove = 28;

    const onMove = (e: MouseEvent) => {
      eyes.forEach((eye) => {
        const pupil = eye.querySelector<HTMLElement>('.pupil');
        if (!pupil) return;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy) / 8);
        const angle = Math.atan2(dy, dx);
        pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`;
      });
    };
    window.addEventListener('mousemove', onMove);

    const blink = setInterval(() => {
      eyes.forEach((eye) => eye.classList.add('blink'));
      setTimeout(() => eyes.forEach((eye) => eye.classList.remove('blink')), 150);
    }, 3000);

    // "colour me" hint fades in, then disappears the moment painting starts
    let raf = 0;
    if (hint && hintRef.current) {
      const el = hintRef.current;
      raf = requestAnimationFrame(() => el.classList.add('show'));
    }
    const onPaint = () => hintRef.current?.classList.add('hide');
    window.addEventListener('hero-painted', onPaint);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('hero-painted', onPaint);
      clearInterval(blink);
      cancelAnimationFrame(raf);
    };
  }, [hint]);

  return (
    <span className="eyes-scene" ref={wrapRef} aria-hidden="true">
      <span className="eye"><span className="pupil" /></span>
      <span className="eye"><span className="pupil" /></span>
      {hint && <span className="cursor-hint" ref={hintRef}>colour me</span>}
    </span>
  );
}
