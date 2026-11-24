import { INFORMATION as person } from '../../settings';
import Icon from '../Icon';
import Wordmark from '../Wordmark';

const Footer = () => (
  <footer id='contact'>
    <div className='container'>
      <div className='contact-row'>
        <div>
          <h2>Get in touch</h2>
          <a className='contact-email' href={'mailto:' + person.email}>
            {person.email}
            <Icon name='link' />
          </a>
        </div>
        <div className='contact-methods'>
          <a href={person.github}>
            GitHub <Icon name='link' />
          </a>
          <a href={person.linkedin}>
            LinkedIn <Icon name='link' />
          </a>
          <a href={'tel:' + person.phone}>
            {person.phone} <Icon name='phone' />
          </a>
        </div>
      </div>
      <div className='footer-base'>
        <a className='footer-name' href={person.website}>
          <Wordmark />
          <span className='footer-signature'>
            <span>{person.name}</span>
            <span lang='fa' dir='rtl'>
              {person.nameFa}
            </span>
          </span>
        </a>
        <div>
          <a href='https://github.com/fadakar/fadakar.id.ir'>
            Source <Icon name='code' />
          </a>
          <a href='#top'>
            Back to top <Icon name='up' />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
