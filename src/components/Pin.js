import React from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

//date stamp
import { formatRelative } from 'date-fns';

import '../index.css'

//Map props we need for map UI
const libraries = [ "places" ];

const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
};
//San Fran lat/lng
const center = {
  lat: 32.905431,
  lng: -117.243229,
};

export default function Pin() {

  //react google hook to load api
  const { isLoaded, loadError } = useLoadScript( {
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  } );

  //hook to set state for PIN
  const [ pins, setPins ] = React.useState( [] )
  const [ selected, setSelected ] = React.useState( null );

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    }, []);

  if ( loadError ) return "Error loading maps"
  if ( !isLoaded ) return "Loading Maps..."

  return (

    <div>
       <h1 className="map-h2">
        Golf'SByU{" "}
        <span role="img" aria-label="tent">
          ⛳️
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={ mapContainerStyle }
        zoom={ 8 }
        center={ center }

      /*  THIS IS WHAT CONSOLE GIVES US
        onClick={ ( e ) => {
           _.zl {latLng: _.Ee, domEvent: MouseEvent, pixel: _.I, xb: _.I}
          latLng: _.Ee {lat: ƒ, lng: ƒ}
          [[Prototype]]: Object
          ~~~~ WE USE THE CONSOLE INFO WE GET TO SET-STATE IN OUR COMPONENT
      */
        onClick={ ( e ) => {
          e.preventDefault();
          setPins( ( currentPin ) => [
            ...currentPin, {
            lat: e.tatLng.lat(),
            lng: e.latLng.lng(),
            pinnedTime: new Date()
          } ] )
      }}
      >
        {/* Show pins */ }

        { pins.map( ( pin ) => (
          <Marker
            key={ pin.time.toISOString() }
            position={ { lat: pin.lat, lng: pin.lng } }
            icon='⛳️'
        />
        ) ) }

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role='img' aria-label='bear'>
                  📍
                </span>{' '}
                You are Here!
              </h2>
              <p>Weather is {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}




























