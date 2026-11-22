import { INFORMATION as person } from '../../settings';

const Portrait = () => (
  <figure className='portrait'>
    <div className='portrait-photo'>
      <img
        src={person.profileImage}
        alt='Gholamreza Fadakar'
        width='1024'
        height='1024'
        fetchPriority='high'
      />
    </div>
    <figcaption lang='fa' dir='rtl'>
      {person.nameFa}
    </figcaption>
  </figure>
);

export default Portrait;
