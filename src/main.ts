// Classes:
import User from './User';
import Company from './Company';
import CustomMap from './CustomMap';

// 3rd Party:

//  CSS:
import './style.css';

const user = new User();
const company = new Company();

console.log('User: ', user);
console.log('Company: ', company);

const mapDiv: HTMLElement = document.getElementById('map')!;

const customMap = new CustomMap(mapDiv, user.position);
console.log(customMap);
customMap.placeMarkerOn({ target: user, label: 'User' });
customMap.placeMarkerOn({
  target: company,
  label: 'Co.',
  color: 'grey',
});
