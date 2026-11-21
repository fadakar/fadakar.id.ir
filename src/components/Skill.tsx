import { JSX } from 'react';
import { SKILL_ICONS } from '../skillIcons';

interface Props {
  name: string;
}

const LocalIcon = ({ kind }: { kind: string }) => {
  if (kind === 'local:sql') {
    return (
      <svg viewBox='0 0 16 16' className='h-6 w-6 shrink-0' aria-hidden='true'>
        <ellipse cx='8' cy='3.5' rx='5.5' ry='2' fill='none' stroke='#64748b' strokeWidth='1.2' />
        <path
          d='M2.5 3.5v9c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2v-9'
          fill='none'
          stroke='#64748b'
          strokeWidth='1.2'
        />
        <path
          d='M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2'
          fill='none'
          stroke='#64748b'
          strokeWidth='1.2'
        />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 16 16' className='h-6 w-6 shrink-0' aria-hidden='true'>
      <path
        d='M4.2 5.2a4.2 4.2 0 0 1 6.7-1.2L12.2 5.3'
        fill='none'
        stroke='#64748b'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M11.2 3.2v2.3H8.9'
        fill='none'
        stroke='#64748b'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M11.8 10.8a4.2 4.2 0 0 1-6.7 1.2L3.8 10.7'
        fill='none'
        stroke='#64748b'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M4.8 12.8V10.5H7.1'
        fill='none'
        stroke='#64748b'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
    </svg>
  );
};

const Skill: ({ name }: Props) => JSX.Element = ({ name }) => {
  const icons = SKILL_ICONS[name] ?? [];

  return (
    <li className='inline-flex h-9 max-w-full items-center gap-1.5 rounded-md border border-line bg-paper/70 py-1 pr-2.5 pl-1.5 text-sm font-medium text-ink print:hidden'>
      {icons.map((icon) =>
        icon.startsWith('local:') ? (
          <LocalIcon key={icon} kind={icon} />
        ) : (
          <img
            key={icon}
            src={icon}
            alt=''
            className={`h-6 w-6 shrink-0${icon.includes('/nextjs/') ? ' [[data-theme=dark]_&]:invert' : ''}`}
          />
        ),
      )}
      <span className='truncate'>{name}</span>
    </li>
  );
};
export default Skill;
