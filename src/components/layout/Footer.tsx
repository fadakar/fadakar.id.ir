import { INFORMATION as person } from '../../settings';

const Footer = () => (
  <footer className='container footer' id='contact'>
    <div className='footer-contact'>
      <a href={'mailto:' + person.email}>{person.email}</a>
      <a href={'tel:' + person.phone}>{person.phone}</a>
    </div>
    <div className='footer-links'>
      <a href={person.github}>GitHub</a>
      <a href={person.linkedin}>LinkedIn</a>
      <a href={person.website}>fdkr.ir</a>
      <a href='https://github.com/fadakar/fadakar.id.ir'>Source</a>
      <a href='#top'>Back to top</a>
    </div>
  </footer>
);
export default Footer;
