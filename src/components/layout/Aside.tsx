import { INFORMATION } from '../../settings';

const contacts = [
  {
    label: 'Phone',
    href: `tel:${INFORMATION.phone}`,
    value: INFORMATION.phone,
  },
  {
    label: 'Email',
    href: `mailto:${INFORMATION.email}`,
    value: INFORMATION.email,
  },
  {
    label: 'Website',
    href: INFORMATION.website,
    value: INFORMATION.website.replace(/^https?:\/\//, ''),
  },
  {
    label: 'GitHub',
    href: INFORMATION.github,
    value: 'fadakar',
  },
  {
    label: 'LinkedIn',
    href: INFORMATION.linkedin,
    value: 'Profile',
  },
];

const Aside = () => {
  return (
    <div className='lg:sticky lg:top-20 lg:z-20 print:static'>
      <div
        id='profile'
        className='overflow-hidden rounded-2xl bg-card ring-1 ring-line print:hidden'
      >
        <img
          className='block h-auto w-full select-none'
          draggable='false'
          src={INFORMATION.profileBackgroundImage}
          alt='Gholamreza Fadakar'
        />

        <div className='px-4 pb-4'>
          <div className='flex items-center gap-3 pt-4'>
            <img
              className='h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-line'
              draggable='false'
              src={INFORMATION.profileImage}
              alt={`${INFORMATION.nameFa} ${INFORMATION.name}`}
            />
            <div className='min-w-0'>
              <h1 className='text-xl leading-tight font-semibold tracking-tight text-ink'>
                {INFORMATION.name}
              </h1>
              <p className='mt-0.5 text-sm text-muted'>{INFORMATION.position}</p>
            </div>
          </div>
          <p className='mt-2 text-xs text-muted'>
            {INFORMATION.location}
            <span className='px-1.5 text-line'>·</span>
            {INFORMATION.experienceTime}
            <span className='px-1.5 text-line'>·</span>
            {INFORMATION.birthday}
          </p>

          <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-line pt-3 lg:hidden'>
            {contacts.map((row) => (
              <a
                key={row.label}
                className='inline-flex min-h-10 items-center text-sm font-medium text-accent'
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                href={row.href}
              >
                {row.label === 'Website' ? row.value : row.label}
              </a>
            ))}
          </div>
          <div className='mt-3 hidden border-t border-line pt-2 lg:block'>
            {contacts.map((row) => (
              <a
                key={row.label}
                className='flex items-center justify-between gap-3 py-1 text-sm'
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                href={row.href}
              >
                <span className='shrink-0 text-muted'>{row.label}</span>
                <span className='min-w-0 text-right font-medium break-all text-accent'>
                  {row.value}
                </span>
              </a>
            ))}
          </div>

          <a
            target='_blank'
            rel='noopener noreferrer'
            href={INFORMATION.PDFFile}
            className='mt-3 flex min-h-10 items-center justify-center gap-2 rounded-full bg-accent-fill text-sm font-semibold text-on-accent hover:bg-accent-fill-hover'
          >
            <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' aria-hidden='true'>
              <path
                d='M12 4v10m0 0 4-4m-4 4-4-4M5 19h14'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Download PDF
          </a>
        </div>
      </div>

      <header className='mb-3 hidden border-b border-black pb-2 print:block'>
        <div className='flex items-center gap-3'>
          <img
            className='h-14 w-14 shrink-0 rounded-md'
            draggable='false'
            src={INFORMATION.profileImage}
            alt=''
          />
          <div className='min-w-0'>
            <p className='text-lg leading-tight font-bold text-black'>{INFORMATION.name}</p>
            <p className='text-xs text-black'>{INFORMATION.position}</p>
          </div>
        </div>
        <p className='mt-1.5 text-[11px] leading-snug text-black'>
          {INFORMATION.location}
          {' · '}
          {INFORMATION.phone}
          {' · '}
          {INFORMATION.email}
          {' · '}
          {INFORMATION.website.replace(/^https?:\/\//, '')}
          {' · '}
          GitHub fadakar
          {' · '}
          LinkedIn
        </p>
        <p className='text-[11px] text-black'>
          {INFORMATION.experienceTime}
          {' · '}
          Born {INFORMATION.birthday}
        </p>
      </header>
    </div>
  );
};

export default Aside;
