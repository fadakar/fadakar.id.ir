import { useEffect, useState } from 'react';
import { applyTheme, readTheme, toggleTheme, type ThemeName } from '../theme/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeName>(readTheme);

  useEffect(() => {
    const onChange = () => setTheme(readTheme());
    window.addEventListener('themechange', onChange);
    return () => window.removeEventListener('themechange', onChange);
  }, []);

  return { theme, toggleTheme, setTheme: applyTheme };
};
