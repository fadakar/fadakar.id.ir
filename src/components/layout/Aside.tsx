import { useEffect, useRef } from 'react';
import { INFORMATION } from '../../settings';
import { Card } from '../index';

const STICKY_OFFSET_PX = 20;
const RESIZE_DEBOUNCE_MS = 150;

const Aside = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sidebar = sidebarRef.current;
    if (!container || !sidebar) return;

    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
    const isPrint = () => window.matchMedia('print').matches;

    const applyOffset = () => {
      if (isPrint() || !isDesktop()) {
        sidebar.style.top = '';
        return;
      }

      const viewportHeight = window.innerHeight;
      const sidebarHeight = sidebar.offsetHeight;
      const availableHeight = viewportHeight - STICKY_OFFSET_PX * 2;
      const overflowAmount = sidebarHeight - availableHeight;

      if (overflowAmount <= 0) {
        sidebar.style.top = `${STICKY_OFFSET_PX}px`;
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const scrolledPast = STICKY_OFFSET_PX - containerRect.top;
      const clamped = Math.max(0, Math.min(scrolledPast, overflowAmount));

      sidebar.style.top = `${STICKY_OFFSET_PX - clamped}px`;
    };

    const handleScroll = () => applyOffset();

    const handleResize = () => {
      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = window.setTimeout(() => {
        resizeTimeoutRef.current = null;
        applyOffset();
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(applyOffset);
    resizeObserver.observe(sidebar);

    applyOffset();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current !== null) window.clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className='relative h-full print:h-auto'>
      <div
        ref={sidebarRef}
        className='flex flex-col print:flex-col gap-4 lg:sticky lg:top-5 print:gap-0 print:space-y-3'
      >
        {/*<!------------------------------------------------------------------->*/}
        {/*<!------------------- screen-only: photo/name panel ------------------>*/}
        {/*<!------------------------------------------------------------------->*/}
        <div className='print:hidden bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden'>
          <img
            className='rounded-t-lg w-full select-none'
            draggable='false'
            src={INFORMATION.profileBackgroundImage}
            alt='programmer'
          />

          <div className='relative w-[7rem]'>
            <img
              className='absolute h-[7rem] top-[-70px] left-[35px] rounded-xl ring-2 ring-gray-200 outline-2 outline-gray-400'
              draggable='false'
              src={INFORMATION.profileImage}
              alt={`${INFORMATION.nameFa} ${INFORMATION.name}`}
            />
          </div>

          <div className='p-4 pt-12 flex flex-col gap-2 px-8'>
            <h5 className='text-xl tracking-tight text-gray-800'>{INFORMATION.name}</h5>
            <p className='pl-1 text-md text-gray-700'>{INFORMATION.position}</p>
          </div>

          <div className='flex flex-col'>
            <a
              target='_blank'
              href={INFORMATION.PDFFile}
              className='w-full text-center focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-4  hover:cursor-pointer transition-all ease-in-out'
            >
              Download PDF
            </a>
          </div>
        </div>

        {/*<!------------------------------------------------------------------->*/}
        {/*<!----------------------- section Information ----------------------->*/}
        {/*<!-------- print-only: photo+name merged into left 50% -------------->*/}
        {/*<!------------------------------------------------------------------->*/}
        <Card title={'Information'}>
          <div className='flex flex-col print:flex-row print:gap-4 print:items-center'>
            <div className='hidden print:flex print:basis-1/2 print:min-w-0 print:items-center print:gap-3'>
              <img
                className='print:h-16 print:w-16 rounded-xl ring-2 ring-gray-200 outline-2 outline-gray-400 shrink-0'
                draggable='false'
                src={INFORMATION.profileImage}
                alt={`${INFORMATION.nameFa} ${INFORMATION.name}`}
              />
              <div className='flex flex-col gap-1 min-w-0'>
                <h5 className='print:text-base font-bold text-gray-800 break-words'>
                  {INFORMATION.name}
                </h5>
                <p className='print:text-sm text-gray-700 break-words'>{INFORMATION.position}</p>
              </div>
            </div>

            <div className='flex flex-col gap-2 print:gap-1 print:basis-1/2 print:min-w-0'>
              <div className='flex justify-between gap-3 print:text-sm'>
                <div className='text-gray-500 shrink-0'>Location</div>
                <div className='text-gray-700 text-right break-words'>{INFORMATION.location}</div>
              </div>

              <div className='flex justify-between gap-3 print:text-sm'>
                <div className='text-gray-500 shrink-0'>Experience</div>
                <div className='text-gray-700 text-right break-words'>
                  {INFORMATION.experienceTime}
                </div>
              </div>

              <div className='flex justify-between gap-3 print:text-sm'>
                <div className='text-gray-500 shrink-0'>Birthday</div>
                <div className='text-gray-700 text-right break-words'>{INFORMATION.birthday}</div>
              </div>
            </div>
          </div>
        </Card>

        {/*<!------------------------------------------------------------------->*/}
        {/*<!----------------------- section Contact Me ------------------------>*/}
        {/*<!------------------------------------------------------------------->*/}
        <Card title={'Contact Me'}>
          <div className='flex flex-col gap-2 print:gap-1'>
            <div className='flex justify-between gap-3 print:text-sm'>
              <div className='text-gray-500 shrink-0'>Phone</div>
              <a
                className='text-gray-700 text-right break-words'
                target='_blank'
                href={`tel:${INFORMATION.phone}`}
              >
                {INFORMATION.phone}
              </a>
            </div>

            <div className='flex justify-between gap-3 print:text-sm'>
              <div className='text-gray-500 shrink-0'>Email</div>
              <a
                className='text-gray-700 text-right break-all'
                target='_blank'
                href={`mailto:${INFORMATION.email}`}
              >
                {INFORMATION.email}
              </a>
            </div>

            <div className='flex justify-between gap-3 print:text-sm'>
              <div className='text-gray-500 shrink-0'>Personal Website</div>
              <a
                className='text-gray-700 text-right break-all'
                target='_blank'
                href={INFORMATION.website}
              >
                {INFORMATION.website}
              </a>
            </div>

            <div className='flex justify-between gap-3 print:text-sm'>
              <div className='text-gray-500 shrink-0'>Github</div>
              <a
                className='text-gray-700 text-right break-words'
                target='_blank'
                href={INFORMATION.github}
              >
                Visit Github
              </a>
            </div>

            <div className='flex justify-between gap-3 print:text-sm'>
              <div className='text-gray-500 shrink-0'>Linkedin</div>
              <a
                className='text-gray-700 text-right break-words'
                target='_blank'
                href={INFORMATION.linkedin}
              >
                Visit Linkedin
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Aside;
