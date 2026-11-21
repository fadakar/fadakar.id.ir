import { useTheme } from '../../hooks/useTheme';
import { toggleThemeAt } from '../../theme/theme';

const MoonIcon = () => (
  <svg viewBox='0 0 24 24' width='18' height='18' fill='none' aria-hidden>
    <path
      d='M20 14.6A8.2 8.2 0 0 1 9.4 4 7.2 7.2 0 1 0 20 14.6Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
);

const SunIcon = () => (
  <svg viewBox='0 0 24 24' width='18' height='18' fill='none' aria-hidden>
    <circle cx='12' cy='12' r='3.25' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M12 3.5v1.75M12 18.75V20.5M3.5 12h1.75M18.75 12H20.5M6.1 6.1l1.25 1.25M16.65 16.65l1.25 1.25M17.9 6.1l-1.25 1.25M7.35 16.65 6.1 17.9'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
);

const ThemeToggle = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type='button'
      className='theme-toggle'
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleThemeAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }}
      aria-pressed={dark}
      aria-label={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
