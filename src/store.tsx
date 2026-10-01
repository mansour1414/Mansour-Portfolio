import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L } from './data';

export type Lang = 'ar' | 'en';
export type Theme = 'dark' | 'light';
interface Ctx { lang: Lang; theme: Theme; toggleLang: () => void; toggleTheme: () => void; t: (v: L) => string }

const AppCtx = createContext<Ctx | null>(null);

// Same localStorage keys as admin-draft/admin.html, so both pages share the choice.
function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v as T) ? (v as T) : fallback;
  } catch { return fallback; }
}
function save(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* storage blocked */ } }

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => read('mansour-lang', ['ar', 'en'] as const, 'ar'));
  const [theme, setTheme] = useState<Theme>(() => read('mansour-theme', ['dark', 'light'] as const, 'dark'));

  useEffect(() => {
    const h = document.documentElement;
    h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr';
    save('mansour-lang', lang);
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save('mansour-theme', theme);
  }, [theme]);

  const t = useCallback((v: L) => v[lang], [lang]);
  const value = useMemo<Ctx>(() => ({
    lang, theme, t,
    toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
    toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')),
  }), [lang, theme, t]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside <AppProvider>');
  return c;
}
