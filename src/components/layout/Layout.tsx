import { JSX, ReactNode } from 'react';
import { Footer } from './index';
import { Header } from './index';
import { Aside } from '../index';
import { INFORMATION } from '../../settings';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className='min-h-screen bg-paper pt-0 print:min-h-0 print:bg-white print:pt-0'>
      <Header />
      <div className='mx-auto max-w-7xl px-3 py-3 sm:px-4 lg:px-12 lg:py-4 print:mx-0 print:max-w-none print:px-0 print:py-0'>
        <div className='grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5 print:grid-cols-1 print:gap-0'>
          <div className='col-span-1 min-w-0 print:col-span-1'>
            <Aside />
          </div>
          <main className='relative z-0 flex min-w-0 flex-col gap-4 lg:col-span-2 print:col-span-1 print:mt-0 print:gap-2 print:space-y-0'>
            {children}
            <Footer />
          </main>
        </div>
      </div>
      <a
        href={INFORMATION.PDFFile}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Download PDF'
        className='fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-30 flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-accent-fill text-[10px] font-bold tracking-wide text-on-accent shadow-lg hover:bg-accent-fill-hover lg:hidden print:hidden'
      >
        <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' aria-hidden='true'>
          <path
            d='M12 4v10m0 0 4-4m-4 4-4-4M5 19h14'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        PDF
      </a>
    </div>
  );
};

export default Layout;
