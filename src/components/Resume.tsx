import {
  CERTIFICATIONS,
  EDUCATION,
  INFORMATION as person,
  LANGUAGES,
  SKILLS,
  SUMMARY,
} from '../settings';
import ExperienceList from './ExperienceList';
import Icon, { type IconName } from './Icon';
import PacketFlow from './PacketFlow';

function Overview() {
  return (
    <section id='summary' className='cover' aria-labelledby='person-name'>
      <div className='container hero'>
        <div className='intro'>
          <div className='identity-line'>
            <span className='identity-note'>
              <Icon name='pin' />
              {person.location}
            </span>
            <span className='avatar'>
              <img
                src={person.profileImage}
                alt={person.nameFa}
                lang='fa'
                width='72'
                height='72'
                fetchPriority='high'
              />
            </span>
            <span className='identity-note'>
              Since {person.careerStart}
              <Icon name='clock' />
            </span>
          </div>
          <h1 id='person-name'>
            Gholamreza <em>Fadakar</em>
          </h1>
          <p className='profession'>
            <span aria-hidden='true' />
            {person.position}
            <span aria-hidden='true' />
          </p>
          <p className='summary-copy'>{SUMMARY}</p>
          <div className='hero-actions'>
            <a className='button primary' href='#experience'>
              View experience <Icon name='down' />
            </a>
            <a className='button secondary' href={'mailto:' + person.email}>
              <Icon name='mail' />
              Get in touch
            </a>
          </div>
          <div className='print-contact'>
            <a href={'mailto:' + person.email}>{person.email}</a>
            <a href={'tel:' + person.phone}>{person.phone}</a>
            <a href={person.website}>fdkr.ir</a>
            <a href={person.github}>github.com/fadakar</a>
            <a href={person.linkedin}>LinkedIn profile</a>
          </div>
        </div>
        <PacketFlow />
      </div>
    </section>
  );
}

const skillSymbols: Record<string, IconName> = {
  Backend: 'server',
  Frontend: 'code',
  'Data & messaging': 'data',
  Infrastructure: 'cloud',
  'Delivery & tooling': 'tooling',
};

function Skills() {
  return (
    <section className='chapter' id='skills' aria-labelledby='skills-title'>
      <div className='chapter-heading'>
        <h2 id='skills-title'>Technical skills</h2>
        <span className='chapter-rule' />
        <Icon name='code' />
      </div>
      <dl className='skill-list'>
        {SKILLS.map(({ title, names }) => (
          <div className='skill-group' key={title}>
            <dt>
              <span className='group-symbol'>
                <Icon name={skillSymbols[title]} />
              </span>
              {title}
            </dt>
            <dd>
              {names.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Credentials() {
  return (
    <section className='chapter' id='education' aria-labelledby='credentials-title'>
      <div className='chapter-heading'>
        <h2 id='credentials-title'>Credentials</h2>
        <span className='chapter-rule' />
        <Icon name='award' />
      </div>
      <div className='credential-grid'>
        <div className='credential-panel'>
          <h3>
            <Icon name='book' />
            Education
          </h3>
          {EDUCATION.map((entry) => (
            <article className='education-item' key={entry.title}>
              <p className='entry-meta'>{entry.year} · Tehran, Iran</p>
              <h4>{entry.title}</h4>
              <p>
                {entry.school} · GPA {entry.grade}
              </p>
            </article>
          ))}
          <div id='languages' className='languages'>
            <h3>Languages</h3>
            <dl>
              {LANGUAGES.map((language) => (
                <div key={language.name}>
                  <dt>{language.name}</dt>
                  <dd>{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div id='certification' className='credential-panel'>
          <h3>
            <Icon name='award' />
            Certifications
          </h3>
          {CERTIFICATIONS.map((cert) => (
            <a
              className='certificate'
              key={cert.title}
              href={'/assets/cert/' + cert.file}
              target='_blank'
              rel='noreferrer'
            >
              <span>
                <strong>{cert.title}</strong>
                <small>
                  {cert.institution} · {cert.year} · {cert.grade}
                </small>
              </span>
              <Icon name='link' />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Resume() {
  return (
    <>
      <Overview />
      <div className='container resume-sections'>
        <ExperienceList />
        <Skills />
        <Credentials />
      </div>
    </>
  );
}
