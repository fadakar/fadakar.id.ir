import {
  CERTIFICATIONS,
  EDUCATION,
  INFORMATION as person,
  LANGUAGES,
  SKILLS,
  SUMMARY,
} from '../settings';
import Portrait from './layout/Aside';
import ExperienceList from './ExperienceList';
import Icon from './Icon';
import SectionNav from './SectionNav';

function Overview() {
  return (
    <section id='summary' className='cover' aria-labelledby='person-name'>
      <div className='container hero'>
        <div className='intro'>
          <p className='profession'>{person.position}</p>
          <h1 id='person-name'>
            Gholamreza <em>Fadakar</em>
          </h1>
          <p className='location'>
            {person.location}
            <span aria-hidden='true'>·</span>Building software since {person.careerStart}
          </p>
          <p className='summary-copy'>{SUMMARY}</p>
          <a className='contact-link' href={'mailto:' + person.email}>
            <Icon name='mail' />
            {person.email}
          </a>
          <div className='print-contact'>
            <a href={'mailto:' + person.email}>{person.email}</a>
            <span>{person.location}</span>
            <a href={'tel:' + person.phone}>{person.phone}</a>
            <a href={person.website}>fdkr.ir</a>
            <a href={person.github}>github.com/fadakar</a>
            <a href={person.linkedin}>LinkedIn profile</a>
          </div>
        </div>
        <Portrait />
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className='skills-panel' id='skills'>
      <h2>Technical skills</h2>
      <dl className='skill-list'>
        {SKILLS.map(({ title, names }) => (
          <div className='skill-group' key={title}>
            <dt>{title}</dt>
            <dd>{names.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Credentials() {
  return (
    <section className='credentials' id='education' aria-labelledby='credentials-title'>
      <h2 id='credentials-title'>Credentials</h2>
      <div className='credential-grid'>
        <div>
          <h3>Education</h3>
          {EDUCATION.map((entry) => (
            <article className='education-item' key={entry.title}>
              <p className='entry-meta'>{entry.year} · Tehran, Iran</p>
              <h4>{entry.title}</h4>
              <p>
                {entry.school} · GPA {entry.grade}
              </p>
            </article>
          ))}
        </div>
        <div id='certification'>
          <h3>Certifications</h3>
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
            </a>
          ))}
        </div>
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
    </section>
  );
}

const Resume = () => (
  <>
    <Overview />
    <SectionNav />
    <div className='container resume-sections'>
      <ExperienceList />
      <Skills />
      <Credentials />
    </div>
  </>
);

export default Resume;
