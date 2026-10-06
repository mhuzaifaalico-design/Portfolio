import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#hero', id: 'hero', label: 'Home' },
  { href: '#work', id: 'work', label: 'Experience' },
  { href: '#playground', id: 'playground', label: 'Toolkit' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      let current = 'hero';
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo" aria-label="M Huzaifa Ali — home">H</a>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.id} href={l.href} className={active === l.id ? 'active' : ''}>{l.label}</a>
        ))}
      </div>
      <a href="https://linktr.ee/designbyhuzaifa" target="_blank" rel="noopener" className="nav-cta" aria-label="Open full portfolio on Linktree">
        <span className="nav-cta-text">Portfolio</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
      </a>
      <a href="mailto:huzaifaali.co@gmail.com" className="nav-email">huzaifaali.co@gmail.com</a>
    </nav>
  );
}
