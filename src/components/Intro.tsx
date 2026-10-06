import { useEffect, useRef } from 'react';

const TEXT =
  "I don't just shape screens — I shape how people feel before they even know why. From research and personas to flows and design systems, I use AI to 10x my output and make interfaces feel inevitable.";
const EMPHASIS = ['feel'];

const SKILLS = [
  'Design Systems',
  'Mobile & Web Design',
  'Wireframing & Flows',
  'User Testing',
  'Prompt Engineering',
  'Generative UI',
];

/** Big statement that un-blurs word by word as you scroll. */
export default function Intro() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.word'));
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));
      const revealCount = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('revealed', i < revealCount));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section id="intro">
      <p className="intro-label">(01) &mdash; About</p>
      <p className="intro-text" ref={textRef}>
        {TEXT.split(/(\s+)/).map((token, i) =>
          /^\s+$/.test(token) ? (
            token
          ) : token.length ? (
            <span
              key={i}
              className={
                'word' + (EMPHASIS.some((w) => token.toLowerCase().includes(w)) ? ' emphasis' : '')
              }
            >
              {token}
            </span>
          ) : null,
        )}
      </p>
      <div className="intro-footer">
        <ul className="intro-skills">
          {SKILLS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <a href="mailto:huzaifaali.co@gmail.com" className="intro-more">
          Say hello <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
