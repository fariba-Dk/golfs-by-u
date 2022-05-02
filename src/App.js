import * as React from 'react';
import {CssBaseline, Grid} from '@material-ui/core'
import Map from './components/Map'
import Pin from './components/Pin'
import Header from './components/Header'
import CourseList from './components/CourseList'

export default function App() {

  return (
    //hooks and state to look for changes to update
     <>
      <CssBaseline />

      <Header />

      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={ 12 } md={ 4 }>
          <Pin/>
          <CourseList
            // isLoading={isLoading}
            // childClicked={childClicked}
            // places={filteredPlaces.length ? filteredPlaces : places}
            // type={type}
            // setType={setType}
            // rating={rating}
            // setRating={setRating}
           />
        </Grid>

        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Map
            // setChildClicked={setChildClicked}
            // setBounds={setBounds}
            // setCoords={setCoords}
            // coords={coords}
            // places={filteredPlaces.length ? filteredPlaces : places}
            // weatherData={weatherData}
          /> */}
        </Grid>

      </Grid>
    </>
  );
}
