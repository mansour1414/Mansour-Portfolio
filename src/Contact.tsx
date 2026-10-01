import { useState, type ChangeEvent, type FormEvent } from 'react';
import { site, ui } from './data';
import { icons, Svg } from './icons';
import { useApp } from './store';

const SB_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'wa' | 'error';
const empty = { name: '', email: '', subject: '', message: '', website: '' };

export function Contact() {
  const { t, lang } = useApp();
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState<Status>('idle');
  const c = ui.contact;

  const on = (k: keyof typeof empty) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  const finish = (s: Status, reset: boolean) => {
    setStatus(s);
    setTimeout(() => { setStatus('idle'); if (reset) setF(empty); }, 2500);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    if (f.website) { finish('sent', true); return; } // honeypot: only bots fill it
    const d = { name: f.name.trim(), email: f.email.trim(), subject: f.subject.trim(), message: f.message.trim() };

    if (SB_URL && SB_KEY) {
      setStatus('sending');
      try {
        const r = await fetch(`${SB_URL}/rest/v1/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', apikey: SB_KEY, Prefer: 'return=minimal',
            // Legacy anon keys are JWTs (send as Bearer); new sb_publishable_ keys are not, so only the apikey header is sent.
            ...(SB_KEY.startsWith('eyJ') ? { Authorization: `Bearer ${SB_KEY}` } : {}),
          },
          body: JSON.stringify({ ...d, subject: d.subject || null, lang }),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        finish('sent', true);
      } catch (err) {
        console.error('Supabase insert failed:', err);
        finish('error', false);
      }
      return;
    }
    // No Supabase configured: open WhatsApp (no await before window.open, so popup blockers allow it).
    const lines = [t(c.waName) + d.name, t(c.waEmail) + d.email];
    if (d.subject) lines.push(t(c.waSubject) + d.subject);
    lines.push('', d.message);
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    finish('wa', true);
  };

  const label = { idle: c.send, sending: c.sending, sent: c.sent, wa: c.waOpened, error: c.error }[status];

  return (
    <section id="contact"><div className="container">
      <div className="section-head reveal"><h2>{t(ui.sections.contact)}</h2><div className="rule" /></div>
      <div className="contact-grid">
        <div className="contact-info reveal">
          <h3>{t(c.heading)}</h3>
          <p>{t(c.text)}</p>
          <a className="mail" href={`mailto:${site.email}`}>✉️ {site.email}</a>
          <a className="btn-gold" style={{ marginBottom: 26 }} href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
            {t(c.whatsapp)} <span dir="ltr">+{site.whatsapp}</span>
          </a>
          <div className="socials">
            {site.github && <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Svg size={18}>{icons.github}</Svg></a>}
            {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Svg size={18}>{icons.linkedin}</Svg></a>}
          </div>
        </div>
        <form className="form-card reveal" onSubmit={submit}>
          <div className="form-row">
            <div className="field"><input type="text" maxLength={100} required value={f.name} onChange={on('name')} placeholder={t(c.name)} aria-label={t(c.name)} /></div>
            <div className="field"><input type="email" maxLength={254} required value={f.email} onChange={on('email')} placeholder={t(c.email)} aria-label={t(c.email)} /></div>
          </div>
          <div className="field"><input type="text" maxLength={150} value={f.subject} onChange={on('subject')} placeholder={t(c.subject)} aria-label={t(c.subject)} /></div>
          <div className="field"><textarea rows={5} maxLength={2000} required value={f.message} onChange={on('message')} placeholder={t(c.message)} aria-label={t(c.message)} /></div>
          <div className="hp" aria-hidden="true"><input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={on('website')} /></div>
          <button type="submit" className="btn-gold" disabled={status === 'sending'}>{t(label)} {status === 'idle' && '✈'}</button>
        </form>
      </div>
    </div></section>
  );
}
