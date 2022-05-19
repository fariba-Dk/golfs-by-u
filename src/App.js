import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import { getGolfCoursesData, getCourseDetailsData, getWeatherData } from './API-CALLS/api';
import Header from './components/header/Header';
import List from './components/courses/CourseList';
import Map from './components/map/Map';

const App = () => {

  //to set coords on auto
  const [ coords, setCoords ] = useState( {} );
  const [ radius, setRadius ] = useState( '5' );
  const [ type, setType ] = useState( 'courses' );

  // golf course hooks
  const [ details, setDetails ] = useState( {} )
  const [ courses, setCourses ] = useState( [] );
 

  const [ autocomplete, setAutocomplete ] = useState( null );
  const [ childClicked, setChildClicked ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( false );

  //this sets the user's location RIGHT WHEN
  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ( { coords: { latitude, longitude } } ) => {
      setCoords( { lat: latitude, lng: longitude } );
    } );
  }, [] );

  const onPlaceChanged = ( coords ) => {

    setCoords( coords );
    if ( coords.lat && coords.lng && radius ) {

      setIsLoading( true )//display loading
      getGolfCoursesData( radius, coords.lat, coords.lng )
        .then( ( data ) => {

          setCourses( data.courses )
          console.log( 'list from api', data )

        } )
        .catch( ( err ) =>
          console.log( err ) )
        .finally( () => {
          setIsLoading( false );//once loaded it sets to false
        }
        )
    }
  }
//   useEffect( () => {
//     if ( courses ) {
//       setIsLoading(true)

//       getCourseDetailsData( details.name, details.zip )
//         .then( ( courseDetails ) => {
//           setDetails( courseDetails.details )
//           console.log( 'this is details', courseDetails )

//         } ).catch( ( err ) => {
//           console.log( err )

//         } )

//   }
// },['courses'])






/*
{
"course_details":{3 items
"html_attributions":[]0 items
"result":{7 items
"formatted_address":"1700 17 Mile Dr, Pebble Beach, CA 93953, USA"
"formatted_phone_number":"(831) 574-5609"
"name":"Pebble Beach Golf Links"
"photos":[...]10 items
"rating":4.8
"url":"https://maps.google.com/?cid=15094594552774239886"
"website":"http://www.pebblebeach.com/golf/pebble-beach-golf-links"
}
"status":"OK"
*/

  const onLoad = (autoC) => setAutocomplete(autoC);

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            courses={courses}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setRadius={setRadius}
            setCoords={setCoords}
            coords={ coords }
            courses={courses}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
