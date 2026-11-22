export type ThemeName = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export const readTheme = (): ThemeName => {
  const current = document.documentElement.dataset.theme;
  if (current === 'dark' || current === 'light') return current;
  return 'light';
};

const themeColor: Record<ThemeName, string> = {
  light: '#102e34',
  dark: '#0e2429',
};

export const applyTheme = (theme: ThemeName) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor[theme]);
  window.dispatchEvent(new CustomEvent('themechange'));
};

export const toggleTheme = () => {
  applyTheme(readTheme() === 'dark' ? 'light' : 'dark');
};

type ThemeReveal = {
  skipTransition: () => void;
  finished: Promise<void>;
};

type DocumentWithReveal = Document & {
  startViewTransition?: (update: () => void) => ThemeReveal;
};

let activeReveal: ThemeReveal | null = null;

const REVEAL_MS = 750;

const coverRadius = (x: number, y: number) =>
  Math.ceil(
    Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 4,
  );

export const toggleThemeAt = (x: number, y: number) => {
  const root = document.documentElement;
  root.style.setProperty('--theme-x', `${x}px`);
  root.style.setProperty('--theme-y', `${y}px`);
  root.style.setProperty('--theme-r', `${coverRadius(x, y)}px`);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = (document as DocumentWithReveal).startViewTransition;
  if (reduced || !start) {
    toggleTheme();
    return;
  }

  const scrollY = window.scrollY;
  const restoreScroll = () => window.scrollTo(0, scrollY);
  const revealMs = readTheme() === 'dark' ? 500 : REVEAL_MS;

  activeReveal?.skipTransition();
  root.classList.add('theme-revealing');
  const reveal = start.call(document, () => {
    toggleTheme();
    restoreScroll();
  });
  activeReveal = reveal;
  window.setTimeout(() => {
    if (activeReveal === reveal) reveal.skipTransition();
  }, revealMs);
  void reveal.finished.finally(() => {
    if (activeReveal === reveal) {
      root.classList.remove('theme-revealing');
      activeReveal = null;
    }
    restoreScroll();
  });
};
