
import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';
import { getWeatherData } from './API-CALLS/api'
import { getGolfCourses, getCourseDetails } from './API-CALLS/api';
import Header from './components/Header';
import List from './components/CourseList';
import Map from './components/Map';

const App = () => {
  const [type, setType] = useState('courses');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [ bounds, setBounds ] = useState( null );

  const [ golfCourses, setGolfCourses ] = useState( {} )
  const [ courseDetails, setCourseDetails ] = useState( {} )

  const [ weatherData, setWeatherData ] = useState( [] );

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredCourses(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coords.lat, coords.lng)
        .then( ( data ) => setWeatherData( data ) );

      getGolfCourses( coords.lat, coords.lng )
      .then((data)=>setGolfCourses(data))

      getGolfCourses(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredCourses([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = (latLng) => {
    console.log('App.onPlaceChange', latLng)
    // const lat = autocomplete.getPlace().geometry.location.lat();

    // const lng = autocomplete.getPlace().geometry.location.lng();

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
            places={filteredCourses.length ? filteredCourses : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredCourses.length ? filteredCourses : places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;


