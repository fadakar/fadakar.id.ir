import { useState } from 'react';
import { EXPERIENCE } from '../settings';
import Icon from './Icon';
import LinkedText from './LinkedText';

export default function ExperienceList() {
  const [opened, setOpened] = useState<Set<number>>(() => new Set([0]));
  const allOpen = opened.size === EXPERIENCE.length;

  const toggle = (index: number) =>
    setOpened((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section id='experience' className='chapter experience' aria-labelledby='experience-title'>
      <div className='chapter-heading'>
        <h2 id='experience-title'>Work experience</h2>
        <span className='chapter-rule' />
        <button
          className='expand-all'
          type='button'
          onClick={() => setOpened(allOpen ? new Set() : new Set(EXPERIENCE.map((_, i) => i)))}
        >
          <Icon name={allOpen ? 'minus' : 'plus'} />
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      <div className='timeline'>
        {EXPERIENCE.map((job, i) => (
          <article
            className='role'
            data-current={!!job.current}
            data-open={opened.has(i)}
            key={job.company + job.dates}
          >
            {i === 4 && <h2 className='print-earlier'>Earlier experience</h2>}
            <h3>
              <button
                type='button'
                className='role-toggle'
                aria-expanded={opened.has(i)}
                aria-controls={'role-' + i}
                onClick={() => toggle(i)}
              >
                <span className='role-date'>
                  <i aria-hidden='true' />
                  {job.dates}
                </span>
                <span className='role-main'>
                  <span className='role-title'>{job.role}</span>
                  <span className='role-company'>{job.company}</span>
                </span>
                <span className='disclosure-icon'>
                  <Icon name={opened.has(i) ? 'minus' : 'plus'} />
                </span>
              </button>
            </h3>
            <div className='role-details' id={'role-' + i}>
              <ul className='accomplishments'>
                {job.achievements.map((achievement) => (
                  <li key={achievement}>
                    <LinkedText text={achievement} />
                  </li>
                ))}
              </ul>
              <ul className='role-stack' aria-label='Technologies used'>
                {job.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
