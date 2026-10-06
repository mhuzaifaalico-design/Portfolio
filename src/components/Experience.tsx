import React, { useEffect, useRef, useState } from 'react';

/* ── Code-drawn monochrome UI mockups (no external images) ── */

function MockDashboard() {
  return (
    <svg viewBox="0 0 1454 780" role="img" aria-label="Dashboard interface wireframe">
      <rect width="1454" height="780" rx="28" fill="#161616" />
      <rect x="0" y="0" width="240" height="780" rx="28" fill="#1e1e1e" />
      <rect x="36" y="40" width="120" height="18" rx="9" fill="#4a4a4a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="36" y={110 + i * 62} width={i === 1 ? 168 : 140} height="16" rx="8" fill={i === 1 ? '#e9e9e9' : '#3a3a3a'} />
      ))}
      <rect x="280" y="40" width="320" height="24" rx="12" fill="#e9e9e9" />
      <rect x="1140" y="36" width="76" height="76" rx="38" fill="#2a2a2a" />
      <rect x="1240" y="36" width="178" height="76" rx="38" fill="#e9e9e9" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={280 + i * 390} y="150" width="350" height="180" rx="20" fill="#1e1e1e" stroke="#333" />
          <rect x={312 + i * 390} y="186" width="110" height="14" rx="7" fill="#4a4a4a" />
          <rect x={312 + i * 390} y="222" width="180" height="34" rx="10" fill={i === 0 ? '#e9e9e9' : '#5a5a5a'} />
          <rect x={312 + i * 390} y="286" width="90" height="12" rx="6" fill="#333" />
        </g>
      ))}
      <rect x="280" y="370" width="740" height="360" rx="20" fill="#1e1e1e" stroke="#333" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={330 + i * 82} y={690 - (i % 3 === 0 ? 220 : i % 2 ? 150 : 90)} width="44" height={i % 3 === 0 ? 220 : i % 2 ? 150 : 90} rx="10" fill={i === 5 ? '#e9e9e9' : '#3a3a3a'} />
      ))}
      <rect x="1050" y="370" width="368" height="360" rx="20" fill="#1e1e1e" stroke="#333" />
      <circle cx="1234" cy="510" r="82" fill="none" stroke="#3a3a3a" strokeWidth="26" />
      <path d="M1234 428 a82 82 0 0 1 71 123" fill="none" stroke="#e9e9e9" strokeWidth="26" />
      <rect x="1090" y="640" width="290" height="14" rx="7" fill="#3a3a3a" />
      <rect x="1090" y="676" width="210" height="14" rx="7" fill="#2a2a2a" />
    </svg>
  );
}

function MockMobile() {
  return (
    <svg viewBox="0 0 1454 780" role="img" aria-label="Mobile app wireframes">
      <rect width="1454" height="780" rx="28" fill="#161616" />
      {[0, 1].map((p) => (
        <g key={p} transform={`translate(${330 + p * 440} 60)`}>
          <rect width="360" height="660" rx="44" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="3" />
          <rect x="130" y="22" width="100" height="22" rx="11" fill="#0a0a0a" />
          <rect x="36" y="80" width="180" height="20" rx="10" fill="#e9e9e9" />
          <rect x="36" y="122" width="120" height="12" rx="6" fill="#4a4a4a" />
          <rect x="36" y="170" width="288" height="150" rx="18" fill={p === 1 ? '#e9e9e9' : '#262626'} />
          {p === 1 && <circle cx="108" cy="245" r="36" fill="#0a0a0a" />}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="36" y={352 + i * 92} width="288" height="72" rx="16" fill="#262626" />
              <circle cx="72" cy={388 + i * 92} r="20" fill="#4a4a4a" />
              <rect x="108" y={370 + i * 92} width="140" height="12" rx="6" fill={i === 0 && p === 0 ? '#e9e9e9' : '#5a5a5a'} />
              <rect x="108" y={394 + i * 92} width="90" height="10" rx="5" fill="#3a3a3a" />
            </g>
          ))}
          <rect x="36" y="612" width="288" height="10" rx="5" fill="#3a3a3a" />
        </g>
      ))}
      <circle cx="180" cy="620" r="90" fill="none" stroke="#2a2a2a" strokeWidth="2" strokeDasharray="6 10" />
      <circle cx="1290" cy="160" r="70" fill="none" stroke="#2a2a2a" strokeWidth="2" strokeDasharray="6 10" />
    </svg>
  );
}

function MockBranding() {
  return (
    <svg viewBox="0 0 1454 780" role="img" aria-label="Brand and web design wireframe">
      <rect width="1454" height="780" rx="28" fill="#161616" />
      <rect x="60" y="60" width="1334" height="660" rx="24" fill="#1e1e1e" stroke="#333" />
      <circle cx="106" cy="104" r="9" fill="#4a4a4a" />
      <circle cx="136" cy="104" r="9" fill="#3a3a3a" />
      <circle cx="166" cy="104" r="9" fill="#2a2a2a" />
      <rect x="220" y="88" width="420" height="32" rx="16" fill="#0a0a0a" />
      <rect x="140" y="180" width="560" height="52" rx="12" fill="#e9e9e9" />
      <rect x="140" y="252" width="420" height="52" rx="12" fill="#5a5a5a" />
      <rect x="140" y="346" width="360" height="16" rx="8" fill="#3a3a3a" />
      <rect x="140" y="380" width="300" height="16" rx="8" fill="#2a2a2a" />
      <rect x="140" y="446" width="180" height="56" rx="28" fill="#e9e9e9" />
      <rect x="340" y="446" width="180" height="56" rx="28" fill="none" stroke="#5a5a5a" strokeWidth="2" />
      <circle cx="1090" cy="360" r="150" fill="#262626" />
      <circle cx="1090" cy="360" r="150" fill="none" stroke="#3a3a3a" strokeWidth="2" />
      <path d="M1090 260 l30 62 68 10 -49 48 12 68 -61 -32 -61 32 12 -68 -49 -48 68 -10 z" fill="#e9e9e9" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={140 + i * 210} y="560" width="180" height="110" rx="16" fill={i === 1 ? '#e9e9e9' : '#262626'} />
      ))}
    </svg>
  );
}

/* ── Data ── */

interface Job {
  id: string;
  peekLabel: string;
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
  mock: () => React.JSX.Element;
}

const JOBS: Job[] = [
  {
    id: 'sixtysix',
    peekLabel: '01 — 66loop Technologies',
    eyebrow: '01 — UX/UI Designer · Jan 2026 — Present · Lahore',
    title: '66loop Technologies',
    desc: 'Leading UX/UI end to end — research, flows, wireframes and design systems — with AI-augmented workflows that take products from idea to prototype, fast.',
    tags: ['UX/UI', 'Design Systems', 'AI Workflows'],
    mock: MockDashboard,
  },
  {
    id: 'bufferstack',
    peekLabel: '02 — BufferStack Technologies',
    eyebrow: '02 — UX/UI Designer · Aug 2025 — Jan 2026 · Lahore',
    title: 'BufferStack Technologies',
    desc: 'Designed mobile and web interfaces: personas, user flows, hi-fi prototypes in Figma and user testing in Maze to validate every decision.',
    tags: ['Mobile & Web', 'Prototyping', 'User Testing'],
    mock: MockMobile,
  },
  {
    id: 'clixo',
    peekLabel: '03 — Clixo Digital',
    eyebrow: '03 — Visual Designer · Feb 2024 — Apr 2025 · Lahore',
    title: 'Clixo Digital',
    desc: 'Crafted visual identities, marketing creatives and pixel-perfect mockups in Photoshop — the foundation of my eye for detail.',
    tags: ['Visual Design', 'Branding', 'Mockups'],
    mock: MockBranding,
  },
];

/** Horizontal accordion — hover or tap a panel to expand it. */
export default function Experience() {
  const [openId, setOpenId] = useState(JOBS[0].id);
  const accRef = useRef<HTMLDivElement>(null);

  // Fade panels in when the section scrolls into view
  useEffect(() => {
    const acc = accRef.current;
    if (!acc) return;
    if (!('IntersectionObserver' in window)) {
      acc.classList.add('in-view');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          acc.classList.add('in-view');
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(acc);
    return () => io.disconnect();
  }, []);

  return (
    <section id="work">
      <p className="intro-label">(02) &mdash; Experience</p>
      <div className="acc" ref={accRef}>
        {JOBS.map((job, i) => {
          const open = openId === job.id;
          return (
            <article
              key={job.id}
              className={'acc-panel' + (open ? ' is-open' : '')}
              tabIndex={0}
              style={{ '--d': `${i * 0.12}s` } as React.CSSProperties}
              aria-label={`${job.title} — ${job.eyebrow}`}
              onMouseEnter={() => setOpenId(job.id)}
              onFocus={() => setOpenId(job.id)}
              onClick={() => setOpenId(job.id)}
            >
              <div className="acc-peek" aria-hidden="true">
                <job.mock />
              </div>
              <span className="acc-peek-label" aria-hidden="true">{job.peekLabel}</span>
              <div className="acc-body">
                <div className="acc-media">
                  <div className="acc-device"><img src='/Black.png'></img></div>
                </div>
                <span className="work-eyebrow">{job.eyebrow}</span>
                <h3 className="work-title">{job.title}</h3>
                <p className="work-desc">{job.desc}</p>
                <div className="work-tags">
                  {job.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  <a
                    href="https://linktr.ee/designbyhuzaifa"
                    target="_blank"
                    rel="noopener"
                    className="work-go"
                    aria-label={`See work from ${job.title} in the full portfolio`}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
