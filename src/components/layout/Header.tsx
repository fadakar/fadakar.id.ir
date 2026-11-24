import { INFORMATION } from '../../settings';
import Icon from '../Icon';
import SectionNav from '../SectionNav';
import Wordmark from '../Wordmark';
import ThemeToggle from '../theme/ThemeToggle';

const Header = () => (
  <header className='masthead'>
    <a className='skip-link' href='#main'>
      Skip to résumé
    </a>
    <div className='container masthead-inner'>
      <a className='brand' href='#top' aria-label='Gholamreza Fadakar, top of résumé'>
        <span className='brand-mark'>
          <Wordmark />
        </span>
        <span className='brand-name'>G. Fadakar</span>
      </a>
      <SectionNav />
      <div className='header-actions'>
        <ThemeToggle />
        <a className='button download' href={INFORMATION.PDFFile} download>
          <Icon name='download' /> Résumé PDF
        </a>
      </div>
    </div>
  </header>
);
export default Header;
