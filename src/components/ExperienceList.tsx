import { useState } from 'react';
import { EXPERIENCE, type Job } from '../settings';
import Icon from './Icon';
import LinkedText from './LinkedText';

function Role({ job, index }: { job: Job; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  return (
    <article
      className={'role' + (job.current ? ' current' : '') + (index === 4 ? ' earlier-start' : '')}
    >
      {index === 4 && <h2 className='print-earlier'>Earlier experience</h2>}
      <h3>
        <button
          type='button'
          className='role-toggle'
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={'role-' + index}
        >
          <span className='role-main'>
            <span className='role-date'>{job.dates}</span>
            <span className='role-title'>{job.role}</span>
            <span className='role-company'>{job.company}</span>
          </span>
          <span className='disclosure-icon'>
            <Icon name={expanded ? 'minus' : 'plus'} />
          </span>
        </button>
      </h3>
      <div id={'role-' + index} className='role-details' data-expanded={expanded}>
        <ul className='accomplishments'>
          {job.achievements.map((achievement) => (
            <li key={achievement}>
              <LinkedText text={achievement} />
            </li>
          ))}
        </ul>
        <p className='role-stack'>{job.stack.join(' · ')}</p>
      </div>
    </article>
  );
}

const ExperienceList = () => (
  <section id='experience' className='experience'>
    <h2>Experience</h2>
    <div className='timeline'>
      {EXPERIENCE.map((job, index) => (
        <Role key={job.company + job.dates} job={job} index={index} />
      ))}
    </div>
  </section>
);

export default ExperienceList;
