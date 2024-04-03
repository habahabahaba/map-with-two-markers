/// <reference types="@types/google.maps" />

export interface GoogleLibsInterface {
  MapsLib: google.maps.MapsLibrary;
  Map: typeof google.maps.Map;
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  PinElement: typeof google.maps.marker.PinElement;
  LatLngBounds: typeof google.maps.LatLngBounds;
}

export async function loadGoogleMapsLibrary(): Promise<google.maps.MapsLibrary> {
  const maps = (await google.maps.importLibrary(
    'maps'
  )) as google.maps.MapsLibrary;

  return maps;
}

export async function loadGoogleCoreLibrary(): Promise<google.maps.CoreLibrary> {
  const coreLibrary = (await google.maps.importLibrary(
    'core'
  )) as google.maps.CoreLibrary;

  return coreLibrary;
}

export async function loadGoogleMarkerLibrary(): Promise<google.maps.MarkerLibrary> {
  const MarkerLibrary = (await google.maps.importLibrary(
    'marker'
  )) as google.maps.MarkerLibrary;

  return MarkerLibrary;
}

async function loadGoogleMap(): Promise<typeof Map> {
  const { Map } = (await google.maps.importLibrary(
    'maps'
  )) as google.maps.MapsLibrary;

  return Map;
}

async function loadGoogleMarker(): Promise<typeof AdvancedMarkerElement> {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    'marker'
  )) as google.maps.MarkerLibrary;

  return AdvancedMarkerElement;
}

async function loadGooglePin(): Promise<typeof PinElement> {
  const { PinElement } = (await google.maps.importLibrary(
    'marker'
  )) as google.maps.MarkerLibrary;

  return PinElement;
}

async function loadGoogleBounds(): Promise<typeof LatLngBounds> {
  const { LatLngBounds } = (await google.maps.importLibrary(
    'core'
  )) as google.maps.CoreLibrary;

  return LatLngBounds;
}

// export const googleMapsLibraries: GoogleLibsInterface | void =
//   await Promise.all([
//     loadGoogleMapsLibrary(),
//     loadGoogleMap(),
//     loadGoogleMarker(),
//     loadGooglePin(),
//     loadGoogleBounds(),
//   ])
//     .then((tuple) => ({
//       MapsLib: tuple[0],
//       Map: tuple[1],
//       AdvancedMarkerElement: tuple[2],
//       PinElement: tuple[3],
//       LatLngBounds: tuple[4],
//     }))
//     .catch((err) => console.error(err));

export async function loadGoogleLibraries(): Promise<GoogleLibsInterface | void> {
  const googleMapsLibraries: GoogleLibsInterface | void = await Promise.all([
    loadGoogleMapsLibrary(),
    loadGoogleMap(),
    loadGoogleMarker(),
    loadGooglePin(),
    loadGoogleBounds(),
  ])
    .then((tuple) => ({
      MapsLib: tuple[0],
      Map: tuple[1],
      AdvancedMarkerElement: tuple[2],
      PinElement: tuple[3],
      LatLngBounds: tuple[4],
    }))
    .catch((err) => console.error(err));

  return googleMapsLibraries;
}

// interface GooleMapsLibraries {
//   Map: typeof google.maps.Map;
//   AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
//   LatLngBounds: typeof google.maps.LatLngBounds;
// }

// class GoogleMapsLoader {
//   private libraries?: GooleMapsLibraries;

//   async loadLibraries(): Promise<GooleMapsLibraries> {
//     const [Map, AdvancedMarkerElement, LatLngBounds] = await Promise.all([
//       this.loadGoolegMap(),
//       this.loadGoogleMarker(),
//       this.loadGoogleBounds(),
//     ]);

//     const libraries = { Map, AdvancedMarkerElement, LatLngBounds };
//     this.libraries = libraries;
//     return libraries;
//   }

//   private async loadGoolegMap(): Promise<typeof google.maps.Map> {
//     const { Map } = (await google.maps.importLibrary(
//       'maps'
//     )) as google.maps.MapsLibrary;
//     return Map;
//   }
//   async loadGoogleMarker(): Promise<typeof AdvancedMarkerElement> {
//     const { AdvancedMarkerElement } = (await google.maps.importLibrary(
//       'marker'
//     )) as google.maps.MarkerLibrary;

//     return AdvancedMarkerElement;
//   }

//   async loadGoogleBounds(): Promise<typeof LatLngBounds> {
//     const { LatLngBounds } = (await google.maps.importLibrary(
//       'core'
//     )) as google.maps.CoreLibrary;

//     return LatLngBounds;
//   }

//   getLibraries(): GooleMapsLibraries {
//     if (!this.libraries) {
//       throw new Error('Dada');
//     }
//     return this.libraries;
//   }
// }

// const loader = new GoogleMapsLoader();
// export const googleMapsLibraries: GooleMapsLibraries | void = await loader
//   .loadLibraries()
//   .then(() => {

//     return loader.getLibraries();
//   })
//   .catch((error) => {
//     console.error('Failed to load Google Maps!!!', error);
//   });
