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

 // parse = require('node-html-parser');

const libraries = [ "places" ];
//getting props
const Map = ({ coords, setCoords, setChildClicked, courses,details}) => {
  //const matches = React.useMediaQuery('(min-width:600px)');
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
        >{ courses?.map( ( course, i ) =>
          <div
            className={ classes.markerContainer }
            lat={ Number(course.latitude) }
            lng={ Number( course.longitude ) }
            key={i}
          >
            <Paper elevation={ 3 } className={ classes.paper }>
              <Typography className={ classes.typography } varient="subtitle2" gutterBottom>{ course.name }</Typography>
              <image className={classes.pointer} src={course.photo ? course.photo.images.large.url : 'https://cdn.pixabay.com/photo/2015/06/21/15/03/jamaica-816669_1280.jpg'} alt={course.name}
            /></Paper>
          </div> ) }
      </GoogleMapReact>
      </div>
   </>

  );
};

export default Map;
