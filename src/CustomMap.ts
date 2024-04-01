// Google Maps:
import {
  GoogleLibsInterface,
  loadGoogleLibraries,
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
  static async createInstance(
    DivElement: HTMLElement,
    position: position = {
      lat: 0,
      lng: 0,
    },
    zoom: number = 6
  ): Promise<CustomMap | void> {
    const googleLibraries: GoogleLibsInterface | void =
      await loadGoogleLibraries();
    if (!googleLibraries) throw new Error('Failed to load Google Maps!!!');
    console.log('from createInstance');
    return new CustomMap(DivElement, position, zoom, googleLibraries);
  }

  private constructor(
    DivElement: HTMLElement,
    position: position = {
      lat: 0,
      lng: 0,
    },
    zoom: number = 6,
    googleLibraries: GoogleLibsInterface
  ) {
    this.googleLibraries = googleLibraries!;
    console.log(this.googleLibraries);

    if (!this.googleLibraries)
      throw new Error('Please use the createInstance method instead.');

    const { Map, LatLngBounds } = this.googleLibraries;
    this.googleMap = new Map(DivElement, {
      zoom: zoom,
      center: position,
      mapId: 'DEMO_MAP_ID', // required for AdvancedMarkerElement;
    });

    this.bounds = new LatLngBounds();
    this.markers = [];
  }

  protected googleLibraries: GoogleLibsInterface | undefined;

  private googleMap: GoogleLibsInterface['Map'] | undefined;
  protected markers: GoogleLibsInterface['AdvancedMarkerElement'][] | undefined;
  protected bounds: GoogleLibsInterface['LatLngBounds'] | undefined;

  protected fitToBounds(
    bounds: google.maps.LatLngBounds,
    padding: number = 15
  ): void {
    this.googleMap.fitBounds(bounds, padding);
  }

  placeMarkerOn({ target, label, color }: markerOptions): void {
    setTimeout(() => {
      console.log(this.googleLibraries);
      const { AdvancedMarkerElement, PinElement, MapsLib } =
        this.googleLibraries!;

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

      const infoWindow = new MapsLib.InfoWindow({
        content: target.getMarkerContent(),
      });

      marker.addListener('click', () => {
        infoWindow.open(this.googleMap, marker);
      });

      // Fitting all markers on the screen:
      this.markers!.push(marker);
      this.bounds!.extend(marker.position!);
      this.fitToBounds(this.bounds);
    }, 500);
  }
}
