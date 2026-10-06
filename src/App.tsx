import { useEffect } from 'react';
import './portfolio.css';
import CursorGridBg from './components/CursorGridBg';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Experience from './components/Experience';
import Notebook from './components/Notebook';
import Contact from './components/Contact';

export default function App() {
  // Fluid ink splash that trails the cursor across the whole page (loads once)
  useEffect(() => {
    if ((window as unknown as { __splashLoaded?: boolean }).__splashLoaded) return;
    (window as unknown as { __splashLoaded?: boolean }).__splashLoaded = true;
    const s = document.createElement('script');
    s.src = '/splashCursor.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <CursorGridBg />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Experience />
        <Notebook />
      </main>
      <Contact />
    </>
  );
}
