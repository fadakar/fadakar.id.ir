import { INFORMATION as person } from '../settings';

function PortraitStorage({ selected }: { selected: boolean }) {
  return (
    <div className='flow-node store object-store'>
      <button
        type='button'
        className='store-key object-key'
        aria-label='Trace Object storage'
        aria-pressed={selected}
      >
        <span className='object-art'>
          <svg className='storage-drawing' viewBox='0 0 128 94' fill='none' aria-hidden='true'>
            <g stroke='currentColor' strokeWidth='1.2' strokeLinejoin='round'>
              <path className='hardware-shadow' d='m14 68 47-18 53 18-47 19z' />
              <path className='plate-face' d='m13 57 49-18 53 18v8L66 84 13 65z' />
              <path className='plate-side' d='m13 57 53 18 49-18v8L66 84 13 65z' />
              <path d='M66 75v9m12-8 6-2m4-1.5 6-2' />
              <path className='plate-face' d='m13 49 49-18 53 18v8L66 76 13 57z' />
              <path className='plate-side' d='m13 49 53 18 49-18v8L66 76 13 57z' />
              <path d='M66 67v9m10-23 25-9M21 54l6 2m3 1 3 1' />
              <path d='m87 64.5 12-4.5' stroke='var(--channel)' strokeWidth='2.3' />
            </g>
          </svg>
          <span className='avatar'>
            <img
              src={person.profileImage}
              alt={person.nameFa}
              lang='fa'
              width='64'
              height='64'
              fetchPriority='high'
            />
            <svg className='orbit-field' viewBox='0 0 64 64' fill='none' aria-hidden='true'>
              <path className='portrait-route' d='M32 -19V-2A34 34 0 1 1 31.99 -2' />
              <g className='portrait-packet'>
                <rect x='-2.75' y='-1.75' width='5.5' height='3.5' rx='1.5' />
                <circle cx='-5.5' r='1.1' opacity='.55' />
              </g>
            </svg>
          </span>
          <i className='socket store-in' aria-hidden='true' />
          <i className='socket store-out' aria-hidden='true' />
        </span>
        <span className='object-caption'>Object storage</span>
      </button>
    </div>
  );
}

export default function ProfileStore({
  index,
  name,
  selected,
}: {
  index: number;
  name: string;
  selected: boolean;
}) {
  if (index === 0) return <PortraitStorage selected={selected} />;
  const isProfile = index === 1;
  return (
    <div className='flow-node store record-store'>
      <div className='store-head'>
        <button
          type='button'
          className='store-key database-key'
          aria-label={'Trace ' + name}
          aria-describedby={isProfile ? 'person-name' : 'profile-summary'}
          aria-pressed={selected}
        >
          <svg className='icon' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <g stroke='currentColor' strokeWidth='1.25' strokeLinejoin='round'>
              <path
                fill='var(--channel-wash)'
                d='M3.5 6.5h17v11c0 2-3.8 3.5-8.5 3.5s-8.5-1.5-8.5-3.5z'
              />
              <ellipse fill='var(--surface)' cx='12' cy='6.5' rx='8.5' ry='3.5' />
              <path
                d='M3.5 12c0 2 3.8 3.5 8.5 3.5s8.5-1.5 8.5-3.5v5.5c0 2-3.8 3.5-8.5 3.5s-8.5-1.5-8.5-3.5z'
                fill='currentColor'
                fillOpacity='.28'
              />
            </g>
            <circle fill='currentColor' cx='17.3' cy='17' r='1.1' />
          </svg>
          {name}
        </button>
        <i className='socket store-in' aria-hidden='true' />
        <i className='socket store-out' aria-hidden='true' />
      </div>
    </div>
  );
}
