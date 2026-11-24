import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'summary', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState('summary');
  const fragment = useRef('');
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anchors = sections.map(({ id }) => document.getElementById(id));
    const header = document.querySelector('header');
    let frame = 0;
    fragment.current = window.location.hash.slice(1);
    const update = () => {
      frame = 0;
      const offset = (header?.offsetHeight ?? 80) + 24;
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      if (progress.current) progress.current.style.transform = 'scaleX(' + fraction + ')';
      const current = anchors.reduce(
        (last, el) => (el && el.getBoundingClientRect().top <= offset ? el.id : last),
        sections[0].id,
      );
      if (fraction >= 0.999) {
        // On tall screens several final headings can share one scroll destination.
        const target = fragment.current ? document.getElementById(fragment.current) : null;
        const requested = anchors.find(
          (el) => el?.contains(target) && el.getBoundingClientRect().top >= offset - 12,
        );
        setActive(requested?.id ?? sections[sections.length - 1].id);
      } else {
        setActive(current);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const followFragment = () => {
      fragment.current = window.location.hash.slice(1);
      schedule();
    };
    const followScroll = () => {
      if (fragment.current) {
        fragment.current = '';
        schedule();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowDown', 'ArrowUp', ' '].includes(event.key))
        followScroll();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', followFragment);
    window.addEventListener('wheel', followScroll, { passive: true });
    window.addEventListener('touchmove', followScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    // A direct link can arrive before React has mounted its fragment target.
    if (window.location.hash && window.scrollY === 0) {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ behavior: 'instant' });
    }
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', followFragment);
      window.removeEventListener('wheel', followScroll);
      window.removeEventListener('touchmove', followScroll);
      window.removeEventListener('keydown', onKey);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <nav className='section-nav' aria-label='Résumé sections'>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={'#' + id}
            aria-current={active === id ? 'location' : undefined}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              fragment.current = id;
              setActive(id);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <span className='reading-progress' aria-hidden='true' ref={progress} />
    </>
  );
}
