import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main id='main'>{children}</main>
    <Footer />
  </>
);

export default Layout;
