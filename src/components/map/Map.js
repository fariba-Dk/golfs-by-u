import React, {useCallback,useState} from 'react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import '../../index.css'
import mapStyles from './mapStyle';
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

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [] );

    const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

    const onMapClick = React.useCallback((e, lat, lng) => {

      setSelected( ( current ) => [
        ...current,
        {
          lat: e.lat(),
          lng: e.lng(),
          time: new Date(),
        },
      ]);
    }, [] );


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
        { courses.map( ( course) => (
          <Marker
            className={ classes.markerContainer }
            lat={ Number( course.latitude ) }
            lng={ Number( course.longitude ) }
            key={`${course.lat}-${course.lng}`}
            onClick={() => {
            setChildClicked(course);
            }}
            icon={{
              icon: '⛳️' ,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
        />
        ) ) }
        { selected ? (
            <InfoWindow
            position={{lat: selected.lat, lng: selected.lng}}
            onCloseClick={ () => {
              setChildClicked( null );
            } }
          >
            <div>
              <h2>
                <span role="img" aria-label="course">
                  ⛳️
                </span>{ " " }
                Here
              </h2>
              <p>Golf Course by you { formatRelative( selected.time, new Date() ) }
              </p>
            </div>
          </InfoWindow> ) : null }
      </GoogleMapReact>
      </div>
   </>

  );
};

export default Map;
