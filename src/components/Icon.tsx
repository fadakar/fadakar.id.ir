const paths = {
  download: 'M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4',
  mail: 'M3 5.5h18v13H3z M3.5 6l8.5 7 8.5-7',
  plus: 'M5 12h14m-7-7v14',
  minus: 'M5 12h14',
  sections: 'M4 6h16M4 12h12M4 18h8',
  down: 'M12 4v15m-6-6 6 6 6-6',
  up: 'M12 20V5m-6 6 6-6 6 6',
  link: 'M6 18 18 6M7 6h11v11',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
  layers: 'm2 8 10-5 10 5-10 5zM3 12l9 4.5 9-4.5M3 16l9 4.5 9-4.5',
  pause: 'M8.5 5v14m7-14v14',
  play: 'm8 5 11 7-11 7z',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0zm-4.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  server: 'M3 3.5h18v7H3zM3 13.5h18v7H3zM6 7h.01M6 17h.01m9-10h3m-3 10h3',
  data: 'M20 6c0 1.7-3.6 3-8 3S4 7.7 4 6s3.6-3 8-3 8 1.3 8 3Zm0 0v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6m0 6c0 1.7 3.6 3 8 3s8-1.3 8-3',
  cloud: 'M6 18a5 5 0 1 1 0-10 6 6 0 0 1 11.5-.5A5.3 5.3 0 0 1 18 18z',
  tooling:
    'M5 5v13m0-7c7 0 12-1 12-6M5 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  briefcase: 'M3 7h18v13H3zM8 7V4h8v3M3 11l9 3 9-3m-9 1v3',
  phone: 'M7 2h10v20H7zM11 19h2',
  book: 'M3 5c3-1 6-.8 9 1.2C15 4.2 18 4 21 5v14c-3-1-6-.8-9 1.2C9 18.2 6 18 3 19zM12 6v14',
  award: 'M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-10 5-1 9 5-3 5 3-1-9',
  clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-5v5l3 2',
};

export type IconName = keyof typeof paths;

const Icon = ({ name }: { name: IconName }) => (
  <svg
    className='icon'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.65'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d={paths[name]} />
  </svg>
);

export default Icon;
