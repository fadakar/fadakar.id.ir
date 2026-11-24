export type ThemeName = 'light' | 'dark';

export const readTheme = (): ThemeName =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export const applyTheme = (theme: ThemeName) => {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#141a28' : '#fafbfe');
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // The current page still supports theme changes when storage is restricted.
  }
  window.dispatchEvent(new CustomEvent('themechange'));
};

export const toggleTheme = () => applyTheme(readTheme() === 'dark' ? 'light' : 'dark');
