import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type='button'
      className='theme-toggle'
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label='Dark mode'
      title={dark ? 'Use light mode' : 'Use dark mode'}
    >
      <svg
        viewBox='0 0 24 24'
        width='18'
        height='18'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        {dark ? (
          <>
            <circle cx='12' cy='12' r='3.25' />
            <path d='M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19m0-14-1.5 1.5m-11 11L5 19' />
          </>
        ) : (
          <path d='M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z' />
        )}
      </svg>
    </button>
  );
};
export default ThemeToggle;
