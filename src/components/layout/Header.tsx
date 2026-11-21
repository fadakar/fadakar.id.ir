import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../theme/ThemeToggle';

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certification', label: 'Certificates' },
  { id: 'languages', label: 'Languages' },
];

const Header = () => {
  const [active, setActive] = useState('summary');
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
    ready: false,
  });
  const navRef = useRef<HTMLElement>(null);
  const paused = useRef(false);
  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const place = () => {
      const nav = navRef.current;
      const link = nav?.querySelector(`a[href="#${active}"]`);
      if (!(nav instanceof HTMLElement) || !(link instanceof HTMLElement)) return;

      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      setIndicator({
        left: link.offsetLeft,
        width: link.offsetWidth,
        top: desktop ? link.offsetTop + link.offsetHeight - 2 : link.offsetTop,
        height: desktop ? 2 : link.offsetHeight,
        ready: true,
      });
    };

    place();
    window.addEventListener('resize', place);

    const nav = navRef.current;
    const link = nav?.querySelector(`a[href="#${active}"]`);
    if (nav instanceof HTMLElement && link instanceof HTMLElement) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const visible = linkRect.left >= navRect.left + 2 && linkRect.right <= navRect.right - 2;
      if (!visible) {
        const delta = linkRect.left - navRect.left - (nav.clientWidth - linkRect.width) / 2;
        nav.scrollTo({ left: Math.max(0, nav.scrollLeft + delta), behavior: 'smooth' });
      }
    }

    return () => window.removeEventListener('resize', place);
  }, [active]);

  useEffect(() => {
    const update = () => {
      if (paused.current) return;

      const nodes = SECTIONS.map((section) => ({
        id: section.id,
        el: document.getElementById(section.id),
      }))
        .filter((section): section is { id: string; el: HTMLElement } => section.el !== null)
        .sort(
          (a, b) =>
            a.el.getBoundingClientRect().top +
            window.scrollY -
            (b.el.getBoundingClientRect().top + window.scrollY),
        );

      if (nodes.length === 0) return;

      const header = document.querySelector('[data-site-header]');
      const headerHeight =
        header instanceof HTMLElement ? header.getBoundingClientRect().height : 56;
      const anchor =
        parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
        headerHeight + 16;

      let current = 'summary';
      for (const section of nodes) {
        if (section.el.getBoundingClientRect().top <= anchor + 8) current = section.id;
      }

      const remaining =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (remaining < 72) {
        const lastOnScreen = [...nodes].reverse().find((section) => {
          const rect = section.el.getBoundingClientRect();
          return rect.top < window.innerHeight - 16 && rect.bottom > headerHeight;
        });
        if (lastOnScreen) current = lastOnScreen.id;
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    updateRef.current = update;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectSection = (id: string) => {
    setActive(id);
    paused.current = true;
    window.setTimeout(() => {
      paused.current = false;
      updateRef.current();
    }, 900);
  };

  return (
    <header
      data-site-header
      className='sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur print:hidden'
    >
      <div className='flex items-center gap-2 px-3 py-2 sm:px-4'>
        <nav
          ref={navRef}
          aria-label='Resume sections'
          className='section-nav relative flex min-w-0 flex-1 gap-1 overflow-x-auto'
        >
          <span
            aria-hidden='true'
            className={`pointer-events-none absolute z-0 motion-reduce:transition-none ${
              indicator.ready
                ? 'transition-[left,width,top,height] duration-300 ease-out'
                : ''
            } ${
              indicator.height > 4
                ? 'rounded-full bg-accent-fill'
                : 'rounded-none bg-accent'
            }`}
            style={{
              left: indicator.left,
              width: indicator.width,
              top: indicator.top,
              height: indicator.height,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => selectSection(section.id)}
                className={`relative z-10 inline-flex min-h-10 shrink-0 items-center rounded-full px-3 text-[13px] font-medium transition-colors duration-300 lg:min-h-11 lg:rounded-none lg:px-2.5 ${
                  isActive ? 'text-on-accent lg:text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
