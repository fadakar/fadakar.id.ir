import { useEffect, useRef, useState } from 'react';
import { INFORMATION } from '../settings';
import Icon from './Icon';
import Wordmark from './Wordmark';

const sections = [
  { id: 'summary', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Credentials' },
];

const SectionNav = () => {
  const [active, setActive] = useState('summary');
  const [docked, setDocked] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anchors = sections.map(({ id }) => document.getElementById(id));
    const cover = document.getElementById('summary');
    let frame = 0;
    const update = () => {
      frame = 0;
      setDocked(!!cover && cover.getBoundingClientRect().bottom <= 0);
      const offset = (nav.current?.offsetHeight ?? 54) + 24;
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      if (progress.current) progress.current.style.transform = 'scaleX(' + fraction + ')';
      const current = anchors.reduce(
        (last, el) => (el && el.getBoundingClientRect().top <= offset ? el.id : last),
        'summary',
      );
      setActive(fraction >= 0.999 ? 'education' : current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className='reading-nav' data-docked={docked} aria-label='Résumé sections' ref={nav}>
      <div className='container reading-bar'>
        {docked && (
          <a className='reading-name' href='#top'>
            <Wordmark />
            <span>{INFORMATION.name}</span>
          </a>
        )}
        <div className='nav-inner'>
          {sections.map(({ id, label }) => (
            <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}>
              {label}
            </a>
          ))}
        </div>
        {docked && (
          <div className='reading-actions'>
            <label className='section-picker'>
              <Icon name='sections' />
              <select
                aria-label='Jump to résumé section'
                title='Jump to résumé section'
                value={active}
                onChange={(event) => {
                  const id = event.target.value;
                  if (window.location.hash === '#' + id)
                    document.getElementById(id)?.scrollIntoView();
                  else window.location.hash = id;
                }}
              >
                {sections.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <a
              className='reading-download'
              href={INFORMATION.PDFFile}
              download
              aria-label='Download résumé PDF'
            >
              <Icon name='download' />
              <span>
                <span className='download-verb'>Download </span>PDF
              </span>
            </a>
          </div>
        )}
      </div>
      <span className='reading-progress' aria-hidden='true' ref={progress} />
    </nav>
  );
};

export default SectionNav;
