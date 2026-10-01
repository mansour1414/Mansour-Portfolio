import { about, certificates, projects, services, site, skills, skillsExtra, ui, type L } from './data';
import { icons, Svg } from './icons';
import { useApp } from './store';

function Head({ title }: { title: L }) {
  const { t } = useApp();
  return <div className="section-head reveal"><h2>{t(title)}</h2><div className="rule" /></div>;
}

export function Hero() {
  const { t } = useApp();
  const stats = [
    { icon: 'briefcase', num: projects.length, label: ui.stats.projects },
    { icon: 'gear', num: services.length, label: ui.stats.services },
    { icon: 'code', num: skills.reduce((n, s) => n + s.items.length, 0), label: ui.stats.tech },
  ];
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div>
          <h1 className="reveal">{t(site.name)}</h1>
          <p className="role reveal">{t(site.role)}</p>
          <div className="divider reveal"><span className="line" /><span className="dot" /></div>
          <p className="tagline reveal"><span>{t(site.tagline[0])}</span><span className="ar-line">{t(site.tagline[1])}</span></p>
          <div className="hero-cta reveal">
            <a href="#contact" className="btn-gold">{t(ui.buildTogether)}</a>
            <a href="#work" className="btn-ghost">{t(ui.explore)}</a>
          </div>
          <div className="stack reveal">{site.heroStack.map((s) => <span key={s}><i />{s}</span>)}</div>
        </div>
        <div className="hero-visual reveal">
          <div className="orbit o1" /><div className="orbit o2" />
          <div className="portrait">
            <svg className="ring-txt" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="circ" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" /></defs>
              <text><textPath href="#circ">{t(site.ring)}</textPath></text>
            </svg>
            <span className="mono">{t(site.monogram)}</span>
          </div>
        </div>
        <div className="stats">
          {stats.map((s, i) => (
            <div className="stat float-badge reveal" key={s.icon} style={{ animationDelay: `${i * 0.8}s` }}>
              <div className="ic"><Svg>{icons[s.icon]}</Svg></div>
              <div><div className="num">{s.num}</div><div className="lbl">{t(s.label)}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { t, lang } = useApp();
  const [pre, bold, post] = about.p1[lang];
  return (
    <section id="about"><div className="container">
      <Head title={ui.sections.about} />
      <div className="about-grid">
        <div className="about-card reveal">
          <p>{pre}<strong>{bold}</strong>{post}</p>
          <p>{t(about.p2)}</p>
        </div>
        <div className="exp-list">
          {about.info.map((i) => (
            <div className="exp-item reveal" key={i.k.en}>
              <span className="yr">{t(i.k)}</span>
              <div><h4>{t(i.h)}</h4><p>{t(i.p)}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div></section>
  );
}

export function Skills() {
  const { t } = useApp();
  return (
    <section id="skills"><div className="container">
      <Head title={ui.sections.skills} />
      <div className="skill-grid">
        {skills.map((s) => (
          <div className="skill-card reveal" key={s.title}>
            <h3>{s.title}</h3>
            <div className="skills">{s.items.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
          </div>
        ))}
        <div className="skill-card wide reveal">
          <h3>{t(ui.additional)}</h3>
          <div className="skills"><span className="chip">{t(skillsExtra)}</span></div>
        </div>
      </div>
    </div></section>
  );
}

export function Works() {
  const { t } = useApp();
  return (
    <section id="work"><div className="container">
      <Head title={ui.sections.work} />
      <div className="works-grid">
        {projects.map((p) => (
          <article className="work reveal" key={p.name}>
            <div className="thumb"><Svg sw={1.4}>{icons[p.icon]}</Svg></div>
            <div className="body">
              <h3>{p.name}</h3>
              <p>{t(p.desc)}</p>
              <div className="tech">{p.tech.map((x) => <span key={x}>{x}</span>)}</div>
            </div>
            {p.url && <a className="go" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>↗</a>}
          </article>
        ))}
      </div>
    </div></section>
  );
}

export function Services() {
  const { t } = useApp();
  return (
    <section id="services"><div className="container">
      <Head title={ui.sections.services} />
      <div className="svc-grid">
        {services.map((s) => (
          <div className="svc reveal" key={s.title.en}>
            <div className="ic"><Svg size={26} sw={1.6}>{icons[s.icon]}</Svg></div>
            <h3>{t(s.title)}</h3>
            <p>{t(s.desc)}</p>
          </div>
        ))}
      </div>
    </div></section>
  );
}

export function Certificates() {
  const medal = <div className="medal"><Svg size={28}>{icons.medal}</Svg></div>;
  return (
    <section id="certificates"><div className="container">
      <Head title={ui.sections.certificates} />
      <div className="cert-grid">
        {certificates.length > 0
          ? certificates.map((c) => (
              <div className="cert reveal" key={`${c.name}-${c.year}`}>{medal}<h4>{c.name}</h4><span>{c.issuer} · {c.year}</span></div>
            ))
          : <div className="cert placeholder reveal">{medal}<h4>[ناقص]</h4><span>[ناقص]</span></div>}
      </div>
    </div></section>
  );
}
