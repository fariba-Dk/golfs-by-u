import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './courseListStyle';
import CourseDetails from './CourseDetails'
import { getGolfCoursesData, getCourseDetailsData, getWeatherData } from '../../API-CALLS/api';

const List = ({course, courses, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();
  const [ type, setType ] = useState( 'courses' )
  const [details, setDetails] = useState({});
  const [rating, setRating]= useState({})

  
  useEffect(() => {
    setElRefs((refs) => Array(courses.length).fill().map((_, i) => refs[i] || createRef()));
  }, [courses]);


  return (
    <div className={classes.container}>
      <Typography variant="h4">Golf Courses around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
          <>
            {/* scroll down form */}
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Search here ⛳️</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="courses">Golf Courses</MenuItem>
              <MenuItem value="parks">Parks</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
            {/* scroll down ratings */}
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Ratings</InputLabel>
            <Select id="rating" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">Rating</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
            </FormControl>

            {/* container */}
          <Grid container spacing={3} className={classes.list}>
            {courses?.map((course, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <CourseDetails selected={Number(childClicked) === i} refProp={elRefs[i]} course={course} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;

