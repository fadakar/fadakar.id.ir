import { useState } from 'react';
import { EXPERIENCE, SKILLS } from '../settings';
import Icon, { type IconName } from './Icon';

const symbols: Record<string, IconName> = {
  Backend: 'server',
  Frontend: 'code',
  'Data & messaging': 'data',
  Infrastructure: 'cloud',
  'Delivery & tooling': 'tooling',
};

export default function Toolkit() {
  const [selected, setSelected] = useState(0);
  return (
    <section className='sheet section-block toolkit' id='skills' aria-labelledby='toolkit-title'>
      <h2 id='toolkit-title'>Engineering toolkit</h2>
      <div className='toolkit-layout'>
        <div className='tool-options' role='group' aria-label='Technology categories'>
          {SKILLS.map((group, i) => (
            <button
              key={group.title}
              type='button'
              aria-pressed={i === selected}
              aria-controls={'tool-' + i}
              onClick={() => setSelected(i)}
            >
              <Icon name={symbols[group.title]} />
              {group.title}
            </button>
          ))}
        </div>
        <div className='tool-panels'>
          {SKILLS.map((group, i) => {
            const companies = [
              ...new Set(
                EXPERIENCE.filter((job) =>
                  job.stack.some((tool) => group.names.includes(tool)),
                ).map((job) => job.company),
              ),
            ];
            return (
              <div
                className='tool-panel'
                id={'tool-' + i}
                key={group.title}
                data-active={i === selected}
              >
                <h3>{group.title}</h3>
                <ul className='tool-names'>
                  {group.names.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                {!!companies.length && (
                  <p className='tool-history'>
                    <strong>Used at</strong> {companies.join(' / ')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
