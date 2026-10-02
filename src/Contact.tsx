import { useState, type ChangeEvent, type FormEvent } from 'react';
import { site, ui } from './data';
import { icons, Svg } from './icons';
import { useApp } from './store';

const SB_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

type Channel = 'email' | 'wa';
type Result = Channel | 'partial' | null;
const empty = { name: '', email: '', subject: '', message: '', website: '' };
const PREFILL_MAX = 800; // very long text can exceed mailto/wa.me URL limits; the full message is always saved in the dashboard

export function Contact() {
  const { t, lang } = useApp();
  const [f, setF] = useState(empty);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const c = ui.contact;

  const on = (k: keyof typeof empty) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  // Saves a copy in the admin dashboard (Supabase). Returns false when not configured or on failure.
  const save = async (d: { name: string; email: string; subject: string; message: string }): Promise<boolean> => {
    if (!SB_URL || !SB_KEY) return false;
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
      return true;
    } catch (err) {
      console.error('Supabase insert failed:', err);
      return false;
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    if (f.website) { setF(empty); setResult('email'); return; } // honeypot: only bots fill it

    // Which button was pressed (email / WhatsApp)
    const sub = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = sub?.value === 'wa' ? 'wa' : 'email';

    const d = { name: f.name.trim(), email: f.email.trim(), subject: f.subject.trim(), message: f.message.trim() };
    const lines = [t(c.waName) + d.name, t(c.waEmail) + d.email];
    if (d.subject) lines.push(t(c.waSubject) + d.subject);
    lines.push('', d.message.length > PREFILL_MAX ? `${d.message.slice(0, PREFILL_MAX)}…` : d.message);
    const body = lines.join('\n');

    setSending(true);
    setResult(null);
    const saving = save(d); // start saving the dashboard copy first, but do not wait for it:
    // the chosen app opens right away, inside the click, so popup blockers allow it.
    if (channel === 'wa') {
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.subject || t(c.mailSubject))}&body=${encodeURIComponent(body)}`;
    }
    const saved = await saving;
    setSending(false);
    setResult(saved ? channel : 'partial');
    if (saved) setF(empty);
  };

  const resultText = result === 'email' ? c.doneEmail : result === 'wa' ? c.doneWa : result === 'partial' ? c.partial : null;

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
          <p className="form-hint">{t(c.chooseHint)}</p>
          <div className="form-actions">
            <button type="submit" value="email" className="btn-gold" disabled={sending}>✉️ {t(sending ? c.sending : c.viaEmail)}</button>
            <button type="submit" value="wa" className="btn-ghost" disabled={sending}>💬 {t(sending ? c.sending : c.viaWa)}</button>
          </div>
          {resultText && <p className={result === 'partial' ? 'form-error' : 'form-ok'} role="status">{t(resultText)}</p>}
        </form>
      </div>
    </div></section>
  );
}
