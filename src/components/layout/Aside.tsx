import { INFORMATION } from '../../settings';
import { Card } from '../index';

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
    <div className='flex flex-col gap-3 lg:sticky lg:top-14 lg:gap-2.5 print:block print:gap-0'>
      <div
        id='profile'
        className='overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 print:hidden'
      >
        <img
          className='h-36 w-full object-cover object-center select-none'
          draggable='false'
          src={INFORMATION.profileBackgroundImage}
          alt=''
        />

        <div className='relative h-10'>
          <img
            className='absolute left-4 -top-8 h-16 w-16 rounded-xl object-cover shadow-md ring-4 ring-white'
            draggable='false'
            src={INFORMATION.profileImage}
            alt={`${INFORMATION.nameFa} ${INFORMATION.name}`}
          />
        </div>

        <div className='flex flex-col gap-0.5 px-4 pb-3'>
          <h1 className='text-lg font-semibold tracking-tight text-slate-900'>
            {INFORMATION.name}
          </h1>
          <p className='text-sm text-slate-600'>{INFORMATION.position}</p>
        </div>

        <a
          target='_blank'
          rel='noopener noreferrer'
          href={INFORMATION.PDFFile}
          className='flex min-h-10 w-full items-center justify-center bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800'
        >
          Download PDF
        </a>
      </div>

      <header className='mb-3 hidden border-b border-slate-900 pb-2 print:block'>
        <div className='flex items-center gap-3'>
          <img
            className='h-14 w-14 shrink-0 rounded-md'
            draggable='false'
            src={INFORMATION.profileImage}
            alt=''
          />
          <div className='min-w-0'>
            <p className='text-lg font-bold leading-tight text-slate-900'>{INFORMATION.name}</p>
            <p className='text-xs text-slate-700'>{INFORMATION.position}</p>
          </div>
        </div>
        <p className='mt-1.5 text-[11px] leading-snug text-slate-800'>
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
        <p className='text-[11px] text-slate-700'>
          {INFORMATION.experienceTime}
          {' · '}
          Born {INFORMATION.birthday}
        </p>
      </header>

      <Card title='Information' dense screenOnly>
        <div>
          <dl className='grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm'>
            <dt className='text-slate-500'>Location</dt>
            <dd className='text-right font-medium text-slate-800'>{INFORMATION.location}</dd>
            <dt className='text-slate-500'>Experience</dt>
            <dd className='text-right font-medium text-slate-800'>{INFORMATION.experienceTime}</dd>
            <dt className='text-slate-500'>Birthday</dt>
            <dd className='text-right font-medium text-slate-800'>{INFORMATION.birthday}</dd>
          </dl>
        </div>
      </Card>

      <Card title='Contact' id='contact' dense screenOnly>
        <div className='flex flex-col'>
          {contacts.map((row) => (
            <a
              key={row.label}
              className='flex min-h-11 items-center justify-between gap-3 rounded-md px-1 text-sm hover:bg-slate-50 lg:min-h-0 lg:py-1'
              target={row.href.startsWith('http') ? '_blank' : undefined}
              rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              href={row.href}
            >
              <span className='shrink-0 text-slate-500'>{row.label}</span>
              <span className='min-w-0 text-right font-medium break-all text-blue-700'>
                {row.value}
              </span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Aside;
