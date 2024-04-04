// Google Maps:
import {
  loadGoogleMapsLibrary,
  loadGoogleCoreLibrary,
  loadGoogleMarkerLibrary,
} from './googleMapDependencies';

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
  private async initMap(
    DivElement: HTMLElement,
    position: position = {
      lat: 0,
      lng: 0,
    },
    zoom: number = 6
  ) {
    const { Map } = await CustomMap.googleLibraries.maps;
    if (!Map) throw new Error('Failed to load Google Maps!!!');
    // console.log('from createInstance');
    this.googleMap = new Map(DivElement, {
      zoom: zoom,
      center: position,
      mapId: 'DEMO_MAP_ID', // required for AdvancedMarkerElement;
    });

    const { LatLngBounds } = await CustomMap.googleLibraries.core;
    if (!LatLngBounds) throw new Error('Failed to load Google Maps!!!');
    this.bounds = new LatLngBounds();
  }

  constructor(
    DivElement: HTMLElement,
    position: position = {
      lat: 0,
      lng: 0,
    },
    zoom: number = 6
  ) {
    this.initMap(DivElement, position, zoom);
    this.markers = [];
  }

  static googleLibraries = {
    maps: loadGoogleMapsLibrary(),
    core: loadGoogleCoreLibrary(),
    marker: loadGoogleMarkerLibrary(),
  };

  private googleMap: google.maps.Map | undefined;
  private markers: google.maps.marker.AdvancedMarkerElement[];
  private bounds: google.maps.LatLngBounds | undefined;

  private fitToBounds(
    bounds: google.maps.LatLngBounds,
    padding: number = 15
  ): void {
    this.googleMap!.fitBounds(bounds, padding);
  }

  async placeMarkerOn({ target, label, color }: markerOptions) {
    // console.log(CustomMap.googleLibraries);

    // Loading from Google libraries, (statically cached):
    const { AdvancedMarkerElement, PinElement } = await CustomMap
      .googleLibraries.marker;
    const { InfoWindow } = await CustomMap.googleLibraries.maps;
    if (!AdvancedMarkerElement || !PinElement || !InfoWindow)
      throw new Error(
        'There was a problem with loading from Google Libraries!'
      );

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

    // Creating new marker:
    const marker: google.maps.marker.AdvancedMarkerElement =
      new AdvancedMarkerElement({
        map: this.googleMap,
        position: target.position,
        content: pinScaled.element,
      });

    // Creating the pop-up for the marker:
    const infoWindow = new InfoWindow({
      content: target.getMarkerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });

    // Fitting all markers on the screen:
    if (!this.bounds)
      throw new Error(
        'There was a problem with loading LatLngBounds from Google libraries!'
      );

    this.markers.push(marker);
    this.bounds.extend(marker.position!);
    this.fitToBounds(this.bounds);
  }
}
