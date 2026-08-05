import { JSX, ReactNode } from 'react';
import { Footer } from './index';
import { Header } from './index';
import { Aside } from '../index';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className='bg-gray-100 print:bg-white min-h-screen pt-2 lg:pt-5 print:pt-0 print:min-h-0'>
      <Header />
      <div className='lg:max-w-7xl lg:mx-auto py-2 px-4 lg:px-12 print:max-w-none print:mx-0 print:py-0 print:px-0'>
        <div
          className='grid grid-cols-1 lg:grid-cols-3 lg:gap-4 print:grid-cols-1 print:gap-0'
          style={{ fontFamily: 'Open Sans' }}
        >
          <div className='col-span-1 print:col-span-1 print:mb-3'>
            <Aside />
          </div>
          <div className='col-span-2 flex flex-col gap-4 mt-4 lg:mt-0 print:col-span-1 print:mt-0 print:gap-0 print:space-y-3'>
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
