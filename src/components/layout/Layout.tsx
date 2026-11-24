import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => (
  <div id='top'>
    <Header />
    <main id='main' tabIndex={-1}>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
