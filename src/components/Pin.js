import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
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
const options = {
  disableDefaultUI: true,
  zoomControl: true,
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

  const onMapClick = React.useCallback((e) => {
      setPins((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        },
      ]);
  }, [] );


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
       {/* <h1 className="map-h2">
        Golf'sByU{" "}
        <span role="img" aria-label="tent">
          ⛳️
        </span>
      </h1> */}
      <GoogleMap
        id="map"
        mapContainerStyle={ mapContainerStyle }
        zoom={ 8 }
        center={ center }
        options={ options }
        onClick={onMapClick}
      /*  THIS IS WHAT CONSOLE GIVES US
        onClick={ ( e ) => {
           _.zl {latLng: _.Ee, domEvent: MouseEvent, pixel: _.I, xb: _.I}
          latLng: _.Ee {lat: ƒ, lng: ƒ}
          [[Prototype]]: Object
          ~~~~ WE USE THE CONSOLE INFO WE GET TO SET-STATE IN OUR COMPONENT
      */
      >
        {/* Show pins;*/ }

        { pins.map( ( pin ) => (
           <Marker
            key={`${pin.lat}-${pin.lng}`}
            position={{ lat: pin.lat, lng: pin.lng }}
            onClick={() => {
              setSelected(pin);
            }}
            icon={{
              icon: '⛳️' ,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
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
                <span role="img" aria-label="bear">
                  ⛳️
                </span>{" "}
                Here
              </h2>
              <p>Golf Course by you { formatRelative( selected.time, new Date() ) }
              </p>
            </div>
          </InfoWindow>



        ) : null }

      </GoogleMap>
    </div>
  )
}
