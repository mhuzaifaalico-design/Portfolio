import { useCallback, useEffect, useRef, useState } from 'react';

const TURN = 850;
const STAGGER = 180;

const TOOLS: [string, string][] = [
  ['Figma', 'UI design & prototyping'],
  ['Photoshop', 'Editing & mockups'],
  ['ChatGPT', 'Research & documentation'],
  ['Claude AI', 'UX research, personas & flows'],
  ['Notion', 'Project & docs management'],
  ['Framer / Figma Make', 'Prototyping & design'],
  ['Maze', 'Prototyping & user testing'],
  ['Uizard', 'AI wireframe generation'],
];

const EXPLORING = [
  'AI UX Patterns',
  'Designing for LLM-based interfaces',
  'Generative Design Systems',
  'AI-Augmented UX Research',
  'Prompt-Driven Prototyping',
  'Generative UI Design',
  'Using AI to scale design tokens',
];

const EDUCATION: [string, string, string][] = [
  ['BS Computer Sciences', 'Virtual University, Pakistan', '2026'],
  ['UX Design Fundamentals', 'IBM · CNext Learning', '2026'],
  ['Fundamentals of Digital Design', 'CNext Learning', '2025'],
  ['Web & App Development', 'Kamyab Jawan Program', '2024'],
  ['DHIS', 'District Health Info System · Univ. of Oslo', '2024'],
  ['Hifz-e-Quran', 'Madarsa Ahsan ul Quran', '2016'],
];

const PAGES = ['index', 'tools', 'exploring', 'education'] as const;
type Page = (typeof PAGES)[number];
const TAB_LABELS: Record<Page, string> = {
  index: 'Index',
  tools: 'Toolbox',
  exploring: 'Exploring',
  education: 'Education',
};
const GHOST_LABELS: Record<Page, string> = {
  index: 'Index',
  tools: 'Toolbox',
  exploring: 'Exploring',
  education: 'Education',
};

/** Spiral-bound notebook with real 3D page turns. */
export default function Notebook() {
  const [current, setCurrent] = useState(0); // open page (drives tabs + stacking)
  const [flipped, setFlipped] = useState<boolean[]>(() => PAGES.map(() => false));
  const [turning, setTurning] = useState<number[]>([]);
  const busyRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = useCallback(
    (name: Page) => {
      const target = PAGES.indexOf(name);
      if (target < 0 || busyRef.current) return;
      setCurrent((cur) => {
        if (target === cur) return cur;
        const forward = target > cur;
        const ordered: number[] = [];
        if (forward) for (let i = cur; i < target; i++) ordered.push(i);
        else for (let i = cur - 1; i >= target; i--) ordered.push(i); // top-most sheet turns first

        if (reduce) {
          setFlipped((prev) => {
            const next = [...prev];
            ordered.forEach((i) => { next[i] = forward; });
            return next;
          });
          busyRef.current = false;
          return target;
        }
        busyRef.current = true;
        // each sheet lifts, turns and lands one after another
        ordered.forEach((sheetIdx, k) => {
          const t = window.setTimeout(() => {
            setTurning((prev) => [...prev, sheetIdx]);
            setFlipped((prev) => {
              const next = [...prev];
              next[sheetIdx] = forward;
              return next;
            });
          }, k * STAGGER);
          timersRef.current.push(t);
        });
        const done = window.setTimeout(() => {
          setTurning([]);
          busyRef.current = false;
        }, (ordered.length - 1) * STAGGER + TURN);
        timersRef.current.push(done);
        return target;
      });
    },
    [reduce],
  );

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const onNotebookClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    const goEl = el.closest<HTMLElement>('[data-go]');
    if (goEl) {
      go(goEl.dataset.go as Page);
      return;
    }
    // Clicking the open right-hand page (not a button) turns it, like a real notebook
    const face = el.closest('.nb-face--front');
    if (!face || el.closest('a, button')) return;
    const sheet = face.closest('.nb-sheet');
    const i = Number((sheet as HTMLElement)?.dataset.i);
    if (i === current && i < PAGES.length - 1) go(PAGES[i + 1]);
  };

  const sheetZ = (i: number) => {
    const k = turning.indexOf(i);
    if (k >= 0) return 100 + k;
    return i < current ? 10 + i : 10 + (PAGES.length - i);
  };

  const front = (page: Page) => {
    switch (page) {
      case 'index':
        return (
          <>
            <h3 className="nb-h">Index</h3>
            <div className="nb-index">
              <div className="nb-row nb-row--head"><span>Section</span><span>Page No.</span></div>
              <button type="button" className="nb-row" data-go="tools"><span className="nb-row-name">Toolbox</span><span>01</span></button>
              <button type="button" className="nb-row" data-go="exploring"><span className="nb-row-name">Currently Exploring</span><span>02</span></button>
              <button type="button" className="nb-row" data-go="education"><span className="nb-row-name">Education &amp; Courses</span><span>03</span></button>
            </div>
            <div className="nb-pg-actions">
              <span />
              <button type="button" className="nb-next" data-go="tools">Next page &rarr;</button>
            </div>
          </>
        );
      case 'tools':
        return (
          <>
            <h3 className="nb-h">Toolbox</h3>
            <div className="nb-pg-meta">
              <button type="button" className="nb-back" data-go="index">&larr; Index</button>
              <span>Page 01</span>
            </div>
            <div className="nb-list">
              {TOOLS.map(([name, note]) => (
                <div className="nb-row nb-row--static" key={name}>
                  <span className="nb-row-name">{name}</span>
                  <span className="nb-row-note">{note}</span>
                </div>
              ))}
            </div>
            <div className="nb-pg-actions">
              <button type="button" className="nb-prev-inline" data-go="index">&larr; Index</button>
              <button type="button" className="nb-next" data-go="exploring">Next page &rarr;</button>
            </div>
          </>
        );
      case 'exploring':
        return (
          <>
            <h3 className="nb-h">Currently Exploring</h3>
            <div className="nb-pg-meta">
              <button type="button" className="nb-back" data-go="index">&larr; Index</button>
              <span>Page 02</span>
            </div>
            <div className="nb-list">
              {EXPLORING.map((name) => (
                <div className="nb-row nb-row--static" key={name}>
                  <span className="nb-row-name">{name}</span>
                </div>
              ))}
            </div>
            <div className="nb-pg-actions">
              <button type="button" className="nb-prev-inline" data-go="tools">&larr; Toolbox</button>
              <button type="button" className="nb-next" data-go="education">Next page &rarr;</button>
            </div>
          </>
        );
      case 'education':
        return (
          <>
            <h3 className="nb-h">Education</h3>
            <div className="nb-pg-meta">
              <button type="button" className="nb-back" data-go="index">&larr; Index</button>
              <span>Page 03</span>
            </div>
            <div className="nb-list">
              {EDUCATION.map(([name, org, year]) => (
                <div className="nb-row nb-row--static" key={name}>
                  <span className="nb-row-name">{name}</span>
                  <span className="nb-row-note">{org}</span>
                  <span className="nb-row-year">{year}</span>
                </div>
              ))}
            </div>
            <div className="nb-pg-actions">
              <button type="button" className="nb-prev-inline" data-go="exploring">&larr; Exploring</button>
            </div>
          </>
        );
    }
  };

  return (
    <section id="playground" aria-labelledby="playgroundTitle">
      <h2 className="mp-title" id="playgroundTitle">My Design Kit</h2>
      <div className="nb-wrap">
        <div className="nb" onClick={onNotebookClick}>
          <div className="nb-ribbons" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="nb-cover" aria-hidden="true" />

          <div className="nb-note nb-note--back" aria-hidden="true" />
          <div className="nb-note">
            <h3>Notes</h3>
            <p>The tools I reach for, what I&rsquo;m learning, and where I studied. Flip through the tabs &rarr;</p>
          </div>
          <div className="nb-pocket" aria-hidden="true">
            <svg className="nb-doodle" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M60 78 C58 60 58 44 60 30" />
              <path d="M60 62 C50 58 42 50 40 40 C50 41 57 48 60 56" />
              <path d="M60 52 C70 48 77 41 80 32 C70 33 63 39 60 46" />
              <circle cx="60" cy="22" r="8" />
              <path d="M60 8v4M60 32v4M46 22h4M70 22h4M50 12l3 3M67 29l3 3M50 32l3-3M67 15l3-3" />
              <path d="M24 28l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
              <path d="M96 50l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z" />
            </svg>
          </div>

          <div className="nb-spine" aria-hidden="true" />
          <div className="nb-rings" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>

          <div className="nb-pagewrap">
            <div className="nb-stack" aria-hidden="true" />
            {PAGES.map((page, i) => (
              <div
                key={page}
                className={
                  'nb-sheet' +
                  (page !== 'index' ? ' nb-sheet--dense' : '') +
                  (flipped[i] ? ' is-flipped' : '') +
                  (turning.includes(i) ? ' is-turning' : '')
                }
                data-i={i}
                style={{ zIndex: sheetZ(i) }}
              >
                <section className="nb-face nb-face--front" aria-label={TAB_LABELS[page]}>
                  {front(page)}
                </section>
                <div className="nb-face nb-face--back" aria-hidden="true">
                  <span className="nb-ghost">{GHOST_LABELS[page]}</span>
                  <button type="button" className="nb-prev" data-go={page} tabIndex={-1}>
                    &larr; Back to {GHOST_LABELS[page]}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="nb-tabs" role="tablist" aria-label="Notebook sections">
            {PAGES.map((page, i) => (
              <button
                key={page}
                type="button"
                className={'nb-tab' + (i === current ? ' is-on' : '')}
                data-go={page}
                role="tab"
                aria-selected={i === current}
              >
                {TAB_LABELS[page]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
