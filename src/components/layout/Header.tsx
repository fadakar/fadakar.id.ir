import { INFORMATION } from '../../settings';
import Icon from '../Icon';
import Wordmark from '../Wordmark';
import ThemeToggle from '../theme/ThemeToggle';

const Header = () => (
  <header className='masthead' id='top'>
    <a className='skip-link' href='#main'>
      Skip to résumé
    </a>
    <div className='container masthead-inner'>
      <a className='wordmark' href='#top' aria-label='Gholamreza Fadakar, top of résumé'>
        <Wordmark />
        <span className='wordmark-title'>Résumé</span>
      </a>
      <div className='header-actions'>
        <ThemeToggle />
        <a className='download' href={INFORMATION.PDFFile} download>
          <Icon name='download' />
          Download PDF
        </a>
      </div>
    </div>
  </header>
);
export default Header;
