import { useEffect, useRef, useState } from 'react';
import { INFORMATION } from '../../settings';

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'certification', label: 'Certificates' },
  { id: 'languages', label: 'Languages' },
];

const Header = () => {
  const [active, setActive] = useState('summary');
  const navRef = useRef<HTMLElement>(null);
  const paused = useRef(false);
  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector(`a[href="#${active}"]`);
    if (!(nav instanceof HTMLElement) || !(link instanceof HTMLElement)) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const visible = linkRect.left >= navRect.left + 2 && linkRect.right <= navRect.right - 2;
    if (visible) return;

    const delta = linkRect.left - navRect.left - (nav.clientWidth - linkRect.width) / 2;
    nav.scrollTo({ left: Math.max(0, nav.scrollLeft + delta), behavior: 'auto' });
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
      className='sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden'
    >
      <div className='flex items-center gap-2 px-3 py-2 sm:px-4'>
        <nav
          ref={navRef}
          aria-label='Resume sections'
          className='flex min-w-0 flex-1 gap-1.5 overflow-x-auto'
        >
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => selectSection(section.id)}
                className={`inline-flex min-h-9 shrink-0 items-center rounded-full px-3 text-[13px] font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
        <a
          href={INFORMATION.PDFFile}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex min-h-9 shrink-0 items-center rounded-full bg-slate-900 px-3 text-xs font-semibold text-white lg:hidden'
        >
          PDF
        </a>
      </div>
    </header>
  );
};

export default Header;
