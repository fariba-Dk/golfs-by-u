import React, {useCallback,useState} from 'react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
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
//getting props
const Map = ({ coords, setCoords, setRadius, setChildClicked }) => {
  //const matches = React.useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const [ selected, setSelected ] = React.useState( null );

  const [courses, setCourses] = useState([])

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
      //bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={ coords }
        id="map"
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        // onClick={ onMapClick }
        onChange={ ( e ) => {
            setCoords( { lat: e.center.lat, lng: e.center.lng } )
          } }
        onChildClick={(child) => setChildClicked(child)}
      >
      </GoogleMapReact>
      </div>
   </>

  );
};

export default Map;
