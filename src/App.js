
import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import { getWeatherData } from './API-CALLS/api'
import { getGolfCourses, getCourseDetails } from './API-CALLS/api';
import Header from './components/header/Header';
import List from './components/courses/CourseList';
import Map from './components/map/Map';

const App = () => {
  const [ type, setType ] = useState( 'courses' );
  const [ rating, setRating ] = useState( '' );

  const [ coords, setCoords ] = useState( {} );
  const [ radius, setRadius ] = useState( );


  const [ golfCourses, setGolfCourses ] = useState( {} )
  const [ courseDetails, setCourseDetails ] = useState( {} )

  const [ filteredCourses, setFilteredCourses ] = useState( [] );
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

  useEffect( () => {
    const filtered = courses.filter( ( course ) => Number( course.rating ) > rating );

    setFilteredCourses( filtered );
  }, [ type ] );

  useEffect( () => {
    if ( radius ) {
      setIsLoading( true );

      getGolfCourses( radius, String(coords.lat), String(coords.lng ))//getGolfCourses = async (radius, lat, lng)
        .then( ( data ) => {
          console.log( data, coords )
          setCourses( data.filter( ( course ) => course.name && course.num_reviews > 0 ) );
          setFilteredCourses( [] );
          setRating( '' );
          setIsLoading( false );
        } ).catch( err => console.log( err ) )
    }
  }, [])

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = (latLng) => {
    console.log('App.onPlaceChange', latLng)
    // const lat = autocomplete.getGolfCourses().geometry.location.lat();
    // const lng = autocomplete.getGolfCourses().geometry.location.lng();

    setCoords( {lat:latLng.lat, lng:latLng.lng } );
  };


  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            courses={filteredCourses.length ? filteredCourses : courses}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setRadius={setRadius}
            setCoords={setCoords}
            coords={coords}
            courses={filteredCourses.length ? filteredCourses : courses}

          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;


