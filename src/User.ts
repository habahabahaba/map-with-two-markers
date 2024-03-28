// Interfaces:
import { positionable } from './CustomMap';

// 3rd Party:
import { faker } from '@faker-js/faker';

export default class User implements positionable {
  name: string;
  position: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();

    this.position = {
      lat: +faker.address.latitude(70, -55),
      lng: +faker.address.longitude(),
    };
  }

  getMarkerContent(): string {
    return `<div><b>User name:</b> ${this.name}</div>`;
  }
}
