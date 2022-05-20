import React, {useEffect, useState, useMediaquery} from 'react';
import { Box, Typography, useMediaQuery, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
//import LocationOnIcon from '@material-ui/icons/LocationOn';
import useStyles from './courseDetailsStyle'
import { getGolfCoursesData, getCourseDetailsData, getWeatherData } from '../../API-CALLS/api';

let cc = console.log
const CourseDetails = ( { course, selected, refProp } ) => {

  const classes = useStyles()
  const [ weather, setWeather ] = useState()

  if ( selected ) {
    refProp?.current?.scrollIntoView( { behavior: "smooth", block: 'start' } )
  }

  //getting golf-course details from rapid API
  const [ details, setDetails ] = useState( {} )

  useEffect( () => {
    getCourseDetailsData( course.name, course.zip )
      .then( ( details ) => {
        setDetails( details )
        console.log(details, 'this is details --->')

        //console.log(details.course_details.result.photos[1])
      } ).catch( ( err ) => {
        console.log( err )
      } ).finally( () => {
      })
},[course])

  // image = {
  //   details? details.whatever_the_url_xxxxxxx : 'https://www.gettyimages.com/phot

  return (
        <Card elevation={6}>
      <CardMedia
        style={ { height: 350 } }
        image={ course.photos ? details.course_details.result.photos[1] : 'https://images.squarespace-cdn.com/content/v1/5a8c9ed1d55b410cece9c9a0/1568236242518-8URRECJK2GRGY6I5UABU/PebbleBeachGolfLinks%2307_KingTide.jpg'}

        //image={ details.course_detail ? details.course_details.result.photos[0].large.url : 'https://cdn.pixabay.com/photo/2015/06/21/15/03/jamaica-816669_1280.jpg'}
        title={course.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{course.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>

          <Typography component="legend">{course.num_reviews} review{course.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Number of Holes</Typography>
          <Typography gutterBottom variant="subtitle1">
            {course.difficulty}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
        {course.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            {course.address}
          </Typography>
        )}
        {course.url && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            {course.url}
          </Typography>
        )}</Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(course.web_url, '_blank')}>
          Reviews
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(course.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>

  )
}
export default CourseDetails;
