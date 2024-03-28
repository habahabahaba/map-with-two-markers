// Google Maps:
import googleMapsLibraries from './googleMapDependencies';

const { Map, AdvancedMarkerElement, PinElement, LatLngBounds } =
  googleMapsLibraries!;

interface position {
  lat: number;
  lng: number;
}

export interface positionable {
  position: {
    lat: number;
    lng: number;
  };
  getMarkerContent(): string;
}

interface markerOptions {
  target: positionable;
  label?: string;
  color?: string;
}

export default class CustomMap {
  private googleMap: google.maps.Map;
  constructor(
    DivElement: HTMLElement,
    position: position = {
      lat: 0,
      lng: 0,
    },
    zoom: number = 6
  ) {
    this.googleMap = new Map(DivElement, {
      zoom: zoom,
      center: position,
      mapId: 'DEMO_MAP_ID', // required for AdvancedMarkerElement;
    });

    this.bounds = new LatLngBounds();
    this.markers = [];
  }

  protected markers: google.maps.marker.AdvancedMarkerElement[];
  protected bounds: google.maps.LatLngBounds;

  protected fitToBounds(
    bounds: google.maps.LatLngBounds,
    padding: number = 15
  ): void {
    this.googleMap.fitBounds(bounds, padding);
  }

  placeMarkerOn({ target, label, color }: markerOptions): void {
    // For bold outlined text:
    const element = document.createElement('h3');
    element.style.webkitTextStroke = '0.4px black';
    element.textContent = label || null;

    // Ceating pin:
    const pinScaled = new PinElement({
      scale: 1.5,
      background: color,
      borderColor: 'black',
      glyphColor: 'white',
      glyph: element,
    });

    const marker = new AdvancedMarkerElement({
      map: this.googleMap,
      position: target.position,
      content: pinScaled.element,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: target.getMarkerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });

    // Fitting all markers on the screen:
    this.markers.push(marker);
    this.bounds.extend(marker.position!);
    this.fitToBounds(this.bounds);
  }
}
