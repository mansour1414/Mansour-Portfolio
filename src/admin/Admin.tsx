import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { L } from '../data';
import { icons, Svg } from '../icons';
import { useApp } from '../store';
import { AuthError, configured, listMessages, loadSession, removeMessage, setRead, signIn, signOut, type Msg } from './api';
import { at } from './text';
import './admin.css';

function Tools() {
  const { lang, theme, toggleLang, toggleTheme } = useApp();
  return (
    <div className="adm-tools">
      <button className="pill" onClick={toggleLang} aria-label="Language">🌐 <span>{lang === 'ar' ? 'EN' : 'ع'}</span></button>
      <button className="icon-btn" onClick={toggleTheme} aria-label="Theme">
        <Svg size={18} sw={2}>{theme === 'dark' ? icons.moon : icons.sun}</Svg>
      </button>
    </div>
  );
}

function Center({ children }: { children: ReactNode }) {
  return <div className="adm-center">{children}</div>;
}

function Login({ expired, onDone }: { expired: boolean; onDone: () => void }) {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<L | null>(expired ? at.expired : null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      await signIn(email.trim(), pw);
      onDone();
    } catch (x) {
      setErr(x instanceof AuthError ? at.badCreds : x instanceof Error && x.message === 'rate' ? at.tooMany : at.network);
      setBusy(false);
    }
  };

  return (
    <Center>
      <div className="adm-corner"><Tools /></div>
      <form className="form-card adm-login" onSubmit={submit}>
        <a href="/" className="logo adm-logo" aria-label="Home">M</a>
        <h1>{t(at.loginTitle)}</h1>
        <div className="field">
          <input type="email" required autoComplete="username" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={t(at.email)} aria-label={t(at.email)} />
        </div>
        <div className="field">
          <input type="password" required autoComplete="current-password" dir="ltr" value={pw} onChange={(e) => setPw(e.target.value)}
            placeholder={t(at.password)} aria-label={t(at.password)} />
        </div>
        <button type="submit" className="btn-gold" disabled={busy}>{t(busy ? at.signingIn : at.signIn)}</button>
        {err && <p className="form-error" role="alert">{t(err)}</p>}
      </form>
    </Center>
  );
}

const fmt = (iso: string, lang: string) =>
  new Date(iso).toLocaleString(lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });

function Dashboard({ onExit }: { onExit: (expired: boolean) => void }) {
  const { t, lang } = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actErr, setActErr] = useState(false);

  const load = useCallback(async () => {
    setState('loading');
    try {
      setMsgs(await listMessages());
      setState('ok');
    } catch (e) {
      if (e instanceof AuthError) onExit(true); else setState('error');
    }
  }, [onExit]);
  useEffect(() => { void load(); }, [load]);

  const act = async (id: string, run: () => Promise<void>, apply: (l: Msg[]) => Msg[]) => {
    setBusyId(id);
    setActErr(false);
    try {
      await run();
      setMsgs(apply);
    } catch (e) {
      if (e instanceof AuthError) onExit(true); else setActErr(true);
    } finally {
      setBusyId(null);
    }
  };
  const patchRead = (id: string, v: boolean) => (l: Msg[]) => l.map((x) => (x.id === id ? { ...x, is_read: v } : x));

  const toggleOpen = (m: Msg) => {
    const next = open === m.id ? null : m.id;
    setOpen(next);
    if (next && !m.is_read) void act(m.id, () => setRead(m.id, true), patchRead(m.id, true));
  };
  const remove = (id: string) => {
    if (!window.confirm(t(at.confirmDel))) return;
    void act(id, () => removeMessage(id), (l) => l.filter((x) => x.id !== id));
  };
  const logout = async () => { await signOut(); onExit(false); };

  const unread = msgs.filter((m) => !m.is_read).length;
  const shown = filter === 'unread' ? msgs.filter((m) => !m.is_read) : msgs;
  const session = loadSession();

  return (
    <div className="adm">
      <header className="adm-top">
        <a href="/" className="logo" aria-label="Home">M</a>
        <h1>{t(at.heading)}{session?.email && <small dir="ltr">{session.email}</small>}</h1>
        <Tools />
        <a className="btn-ghost" href="/">{t(at.site)}</a>
        <button className="btn-ghost" onClick={logout}>{t(at.logout)}</button>
      </header>

      <div className="adm-stats">
        <div className="adm-stat"><div className="n">{msgs.length}</div><div className="l">{t(at.total)}</div></div>
        <div className="adm-stat"><div className="n">{unread}</div><div className="l">{t(at.unread)}</div></div>
      </div>

      <div className="adm-bar">
        <button className={`pill${filter === 'all' ? ' on' : ''}`} onClick={() => setFilter('all')}>{t(at.all)}</button>
        <button className={`pill${filter === 'unread' ? ' on' : ''}`} onClick={() => setFilter('unread')}>{t(at.unread)}</button>
        <button className="pill adm-refresh" onClick={() => void load()}>↻ {t(at.refresh)}</button>
      </div>

      {actErr && <p className="form-error" role="alert">{t(at.actErr)}</p>}
      {state === 'loading' && <p className="adm-note">{t(at.loading)}</p>}
      {state === 'error' && <p className="form-error" role="alert">{t(at.loadErr)}</p>}
      {state === 'ok' && shown.length === 0 && <p className="adm-note">{t(filter === 'unread' ? at.emptyUnread : at.empty)}</p>}

      <div className="adm-list">
        {shown.map((m) => (
          <article className={`msg-card${m.is_read ? '' : ' unread'}`} key={m.id}>
            <button className="msg-head" onClick={() => toggleOpen(m)} aria-expanded={open === m.id}>
              <span className="m-av">{[...m.name][0]?.toUpperCase() ?? '?'}</span>
              <span className="m-main">
                <strong>{m.name}</strong>
                <small dir="ltr">{m.email}</small>
                <span className="m-sub">{m.subject || t(at.noSubject)}</span>
              </span>
              <time dateTime={m.created_at}>{fmt(m.created_at, lang)}</time>
            </button>
            {open === m.id && (
              <div className="msg-body">
                <p>{m.message}</p>
                <div className="msg-act">
                  <a className="btn-gold" href={`mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`Re: ${m.subject ?? ''}`)}`}>{t(at.reply)}</a>
                  <button className="btn-ghost" disabled={busyId === m.id}
                    onClick={() => void act(m.id, () => setRead(m.id, !m.is_read), patchRead(m.id, !m.is_read))}>
                    {t(m.is_read ? at.markUnread : at.markRead)}
                  </button>
                  <button className="btn-ghost danger" disabled={busyId === m.id} onClick={() => remove(m.id)}>{t(at.del)}</button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const { t } = useApp();
  const [authed, setAuthed] = useState(() => configured && loadSession() !== null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    document.title = t(at.title);
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    return () => { m.remove(); };
  }, [t]);

  const exit = useCallback((wasExpired: boolean) => { setExpired(wasExpired); setAuthed(false); }, []);

  return (
    <>
      <div className="ambient" /><div className="grain" />
      {!configured
        ? <Center><p className="adm-note">{t(at.notConfigured)}</p></Center>
        : authed
          ? <Dashboard onExit={exit} />
          : <Login expired={expired} onDone={() => { setExpired(false); setAuthed(true); }} />}
    </>
  );
}
