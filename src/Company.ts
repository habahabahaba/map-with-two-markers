// Interfaces:
import { positionable } from './CustomMap';

// 3rd Party:
import { faker } from '@faker-js/faker';

export default class Company implements positionable {
  companyName: string;
  catchPhrase: string;
  position: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.position = {
      lat: +faker.address.latitude(70, -55),
      lng: +faker.address.longitude(),
    };
  }

  getMarkerContent(): string {
    return `
    <div>
      <h3>${this.companyName}</h3>    
      <h5>Moto: "${this.catchPhrase}"</h5>
    </div>
    `;
  }
}
