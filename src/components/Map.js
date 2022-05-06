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
import '../index.css'
import mapStyles from './mapStyle';
import useStyles from './mapStyle.js';

const center = {
  lat: 32.905431,
  lng: -117.243229,
};
const libraries = [ "places" ];

const Map = ({ coords, setCoords, setBounds, setChildClicked, weatherData }) => {
  //const matches = React.useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const [ selected, setSelected ] = React.useState( null );

  const [places, setPlaces] = useState([])

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
    mapRef.current.setZoom(12);
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
        defaultCenter={ center }
        id="map"
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onClick={ onMapClick }
        onChildClick={(child) => setChildClicked(child)}
      >
        { places.map( ( place) => (
          <Marker
            className={ classes.markerContainer }
            lat={ Number( place.latitude ) }
            lng={ Number( place.longitude ) }
            key={`${place.lat}-${place.lng}`}
            onClick={() => {
            setChildClicked(place);
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

