import { useEffect, useState } from 'react';
import { nav, site, ui } from './data';
import { icons, Svg } from './icons';
import { useApp } from './store';

export function Nav() {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      let cur = 'home';
      for (const { id } of nav) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav>
        <a href="#home" className="logo" aria-label="Home">M</a>
        <ul className="nav-links">
          {nav.map((n) => (
            <li key={n.id}><a href={`#${n.id}`} className={active === n.id ? 'active' : ''}>{t(n.label)}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="pill" onClick={toggleLang} title="Language" aria-label="Language">🌐 <span>{lang === 'ar' ? 'EN' : 'ع'}</span></button>
          <button className="icon-btn" onClick={toggleTheme} title="Theme" aria-label="Theme">
            <Svg size={18} sw={2}>{theme === 'dark' ? icons.moon : icons.sun}</Svg>
          </button>
          <a href="#contact" className="btn-gold nav-cta-desktop">{t(ui.letsTalk)}</a>
          <button className="hamburger" onClick={() => setOpen(true)} aria-label="Menu" aria-expanded={open}><span /><span /><span /></button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <button className="icon-btn mobile-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        {nav.map((n) => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{t(n.label)}</a>)}
        <a href="#contact" className="btn-gold" onClick={() => setOpen(false)}>{t(ui.letsTalk)}</a>
      </div>
    </>
  );
}

export function Footer() {
  const { t } = useApp();
  return (
    <footer>
      <div className="container foot">
        <a href="#home" className="logo" aria-label="Home">M</a>
        <div className="links">{nav.map((n) => <a key={n.id} href={`#${n.id}`}>{t(n.label)}</a>)}</div>
        <div className="copy">© {new Date().getFullYear()} {t(site.name)}. {t(ui.rights)} · <a className="admin-link" href="/#/admin">{t(ui.admin)}</a></div>
      </div>
    </footer>
  );
}

export function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <button className={`to-top${show ? ' show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>;
}
