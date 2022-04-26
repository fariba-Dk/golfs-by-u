import React, { useState } from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import "@reach/combobox/styles.css"



import { formatRelative } from 'date-fns';

const libraries = ['places'];
const mapContainerStyle = {
  height: '80vh',
  width: '100vw',
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
////37.7749° N, 122.4194° W
const center = {
  lat: 32.905431,
  lng: -117.243229,
};
// require('dotenv').config();
const googleMapsApiKey=process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function Pin( { markers, setMarkers } ) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:"AIzaSyB1fByA0ZCLSYpzyNAlcVJTwIEUNDYuaIE",
    libraries,

  });

  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  //useRef, useCallback, useLoadScript
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    //add logic for https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete#maps_places_autocomplete-javascript for listiner for autocompelete
  }, []);
//
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    console.log('this is test--->')
    mapRef.current.setZoom(10);
  }, []);



  return (
    <div className="search">
      {/* <Search panTo={panTo} /> */}

      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

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


  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
// function Search( { panTo } ) {

//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 43.6532, lng: () => -79.3832 },
//       radius: 100 * 1000,
//     },
//   } );

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = async ( address ) => {

//     setValue(address, false);
//     clearSuggestions();
//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       panTo({ lat, lng });
//     } catch (error) {
//       console.log('😱 Error: ', error);
//     }
//   };



  )
}

