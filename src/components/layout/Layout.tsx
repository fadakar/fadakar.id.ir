import { JSX, ReactNode } from 'react';
import { Footer } from './index';
import { Header } from './index';
import { Aside } from '../index';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className='min-h-screen bg-slate-100 pt-0 print:min-h-0 print:bg-white print:pt-0'>
      <Header />
      <div className='mx-auto max-w-7xl px-3 py-3 sm:px-4 lg:px-12 lg:py-4 print:mx-0 print:max-w-none print:px-0 print:py-0'>
        <div className='grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5 print:grid-cols-1 print:gap-0'>
          <div className='col-span-1 min-w-0 print:col-span-1'>
            <Aside />
          </div>
          <main className='col-span-2 flex min-w-0 flex-col gap-3 lg:gap-4 print:col-span-1 print:mt-0 print:gap-2 print:space-y-0'>
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
