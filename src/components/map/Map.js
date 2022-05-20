import React, {useCallback,useState} from 'react';
import { Paper, Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import '../../index.css'
import useStyles from './mapStyle.js';

const libraries = [ "places" ];


let cc = console.log
const Map = ({ coords, setCoords, setChildClicked, courses, details, weatherData}) => {

  const classes = useStyles();
  const { isLoaded, loadError } = useLoadScript( {
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  } );

  if ( loadError ) return "Error loading maps"
  if ( !isLoaded ) return "Loading Maps..."

  return (
    <>
    <div className={classes.mapContainer}>
      <GoogleMapReact
        defaultCenter={ coords }
        id="map"
        center={coords}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={''}
        // onClick={ onMapClick }
        onChange={ ( e ) => {
            setCoords( { lat: e.center.lat, lng: e.center.lng } )
          } }
        onChildClick={(child) => setChildClicked(child)}
        >{ courses?.map( ( course, i ) =>(
          <div className={classes.markerContainer}
            lat={coords.lat}
            lng={coords.lng }
            key={i}
          >⛳️</div>
        ) ) }

      </GoogleMapReact>
      </div>
  </>

  );
}

export default Map;
