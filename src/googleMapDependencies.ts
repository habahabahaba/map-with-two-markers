/// <reference types="@types/google.maps" />

interface GoogleLibs {
  Map: typeof google.maps.Map;
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
  PinElement: typeof google.maps.marker.PinElement;
  LatLngBounds: typeof google.maps.LatLngBounds;
}

// type GoogleLibsTuple = [
//   typeof google.maps.Map,
//   typeof google.maps.marker.AdvancedMarkerElement,
//   typeof google.maps.marker.PinElement,
//   typeof google.maps.LatLngBounds
// ];

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

const googleMapsLibraries: GoogleLibs | void = await Promise.all([
  loadGoogleMap(),
  loadGoogleMarker(),
  loadGooglePin(),
  loadGoogleBounds(),
])
  .then((tuple) => ({
    Map: tuple[0],
    AdvancedMarkerElement: tuple[1],
    PinElement: tuple[2],
    LatLngBounds: tuple[3],
  }))
  .catch((err) => console.error(err));

export default googleMapsLibraries;

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
