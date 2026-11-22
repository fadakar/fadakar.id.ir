const paths = {
  download: 'M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4',
  mail: 'M3 5.5h18v13H3z M3.5 6l8.5 7 8.5-7',
  plus: 'M5 12h14m-7-7v14',
  minus: 'M5 12h14',
  sections: 'M4 6h16M4 12h12M4 18h8',
};

const Icon = ({ name }: { name: keyof typeof paths }) => (
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
