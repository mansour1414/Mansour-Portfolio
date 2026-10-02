/* Minimal Supabase Auth + REST client for the admin page (no extra libraries).
   Security lives in the database (RLS policies in supabase/schema.sql), not in hiding this page. */
const BASE = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '').replace(/\/+$/, '');
const KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '';
export const configured = Boolean(BASE && KEY);

export interface Msg {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  lang: 'ar' | 'en' | null;
  is_read: boolean;
}
export interface Session { access_token: string; refresh_token: string; expires_at: number; email: string }

/** Thrown when credentials or the session are invalid (UI sends the user back to the login form). */
export class AuthError extends Error {}

const SKEY = 'mansour-admin-session';

export function loadSession(): Session | null {
  try {
    const s = JSON.parse(localStorage.getItem(SKEY) ?? 'null') as Session | null;
    return s && s.access_token && s.refresh_token ? s : null;
  } catch { return null; }
}
function saveSession(s: Session | null) {
  try {
    if (s) localStorage.setItem(SKEY, JSON.stringify(s)); else localStorage.removeItem(SKEY);
  } catch { /* storage blocked */ }
}

interface TokenReply {
  access_token?: string; refresh_token?: string; expires_in?: number; expires_at?: number; user?: { email?: string };
}

async function token(grant: 'password' | 'refresh_token', body: object): Promise<Session> {
  const r = await fetch(`${BASE}/auth/v1/token?grant_type=${grant}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: KEY },
    body: JSON.stringify(body),
  });
  if (r.status === 429) throw new Error('rate');
  if (!r.ok) throw new AuthError(`HTTP ${r.status}`);
  const d = (await r.json()) as TokenReply;
  if (!d.access_token || !d.refresh_token) throw new AuthError('bad reply');
  return {
    access_token: d.access_token,
    refresh_token: d.refresh_token,
    expires_at: d.expires_at ?? Math.floor(Date.now() / 1000) + (d.expires_in ?? 3600),
    email: d.user?.email ?? '',
  };
}

export async function signIn(email: string, password: string): Promise<Session> {
  const s = await token('password', { email, password });
  saveSession(s);
  return s;
}

export async function signOut(): Promise<void> {
  const s = loadSession();
  saveSession(null);
  if (!s) return;
  try {
    await fetch(`${BASE}/auth/v1/logout`, { method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${s.access_token}` } });
  } catch { /* already signed out locally */ }
}

// One shared refresh at a time (refresh tokens rotate, parallel refreshes would invalidate each other).
let pending: Promise<Session> | null = null;
async function validSession(): Promise<Session> {
  const s = loadSession();
  if (!s) throw new AuthError('no session');
  if (s.expires_at - 60 > Date.now() / 1000) return s;
  if (!pending) {
    pending = token('refresh_token', { refresh_token: s.refresh_token })
      .then((n) => { saveSession(n); return n; })
      .catch((e: unknown) => { if (e instanceof AuthError) saveSession(null); throw e; })
      .finally(() => { pending = null; });
  }
  return pending;
}

async function rest(path: string, method: 'GET' | 'PATCH' | 'DELETE', body?: object): Promise<Response> {
  const s = await validSession();
  const r = await fetch(`${BASE}/rest/v1/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json', apikey: KEY, Authorization: `Bearer ${s.access_token}`, Prefer: 'return=minimal',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 401) { saveSession(null); throw new AuthError('expired'); }
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r;
}

export async function listMessages(): Promise<Msg[]> {
  const r = await rest('messages?select=*&order=created_at.desc&limit=200', 'GET');
  return (await r.json()) as Msg[];
}
export async function setRead(id: string, isRead: boolean): Promise<void> {
  await rest(`messages?id=eq.${encodeURIComponent(id)}`, 'PATCH', { is_read: isRead });
}
export async function removeMessage(id: string): Promise<void> {
  await rest(`messages?id=eq.${encodeURIComponent(id)}`, 'DELETE');
}
