import Eyes from './Eyes';

interface ContactItem {
  icon: React.ReactNode;
  name: string;
  desc: string;
  href?: string;
}

const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
  </svg>
);
const phoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const pinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const globeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
  </svg>
);
const cameraIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const atIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
);

const ITEMS: ContactItem[] = [
  { icon: mailIcon, name: 'Email', desc: 'Fastest way to reach me.', href: 'mailto:huzaifaali.co@gmail.com' },
  { icon: phoneIcon, name: 'Phone', desc: '(+92) 315 1475453 — call or WhatsApp.', href: 'tel:+923151475453' },
  { icon: 'in', name: 'LinkedIn', desc: 'The professional version of me.', href: 'https://www.linkedin.com/in/muhammad-huzaifa-224543216' },
  { icon: 'Bē', name: 'Behance', desc: 'Case studies and visual explorations.', href: 'https://www.behance.net/muhammadhuzaifa138' },
  { icon: cameraIcon, name: 'Instagram', desc: '@huzaifa.design.co — daily design drops.', href: 'https://www.instagram.com/huzaifa.design.co' },
  { icon: atIcon, name: 'Twitter / X', desc: '@MuhammadHu37377 — design thoughts.', href: 'https://twitter.com/MuhammadHu37377' },
  { icon: globeIcon, name: 'Full Portfolio', desc: 'Everything, in one link.', href: 'https://linktr.ee/designbyhuzaifa' },
  { icon: pinIcon, name: 'Address', desc: 'Gulshan-e-Ravi, Lahore, Pakistan.' },
];

export default function Contact() {
  return (
    <footer id="contact">
      <p className="intro-label">(04) &mdash; Contact</p>
      <div className="contact-grid">
        <div>
          <h2 className="contact-title">
            Let&rsquo;s shape how <span>people feel.</span>
          </h2>
          <div className="contact-row">
            <a href="mailto:huzaifaali.co@gmail.com" className="contact-email">huzaifaali.co@gmail.com</a>
            <span className="footer-eyes"><Eyes /></span>
          </div>
        </div>

        <ul className="contact-list">
          {ITEMS.map((item) => (
            <li key={item.name}>
              {item.href ? (
                <a
                  href={item.href}
                  className="contact-link"
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  <span className="contact-icon" aria-hidden="true">{item.icon}</span>
                  <span>
                    <span className="contact-name">{item.name}</span>
                    <span className="contact-desc">{item.desc}</span>
                  </span>
                  <span className="contact-arrow" aria-hidden="true">↗</span>
                </a>
              ) : (
                <div className="contact-link">
                  <span className="contact-icon" aria-hidden="true">{item.icon}</span>
                  <span>
                    <span className="contact-name">{item.name}</span>
                    <span className="contact-desc">{item.desc}</span>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer">
        <span>&copy; 2026 M Huzaifa Ali &middot; Lahore, Pakistan</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/muhammad-huzaifa-224543216" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://www.behance.net/muhammadhuzaifa138" target="_blank" rel="noopener">Behance</a>
          <a href="https://www.instagram.com/huzaifa.design.co" target="_blank" rel="noopener">Instagram</a>
          <a href="https://linktr.ee/designbyhuzaifa" target="_blank" rel="noopener">Linktree</a>
        </div>
        <a href="#hero" className="footer-top">Back to top &uarr;</a>
      </div>
    </footer>
  );
}
