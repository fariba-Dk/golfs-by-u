import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
//import LocationOnIcon from '@material-ui/icons/LocationOn';
import useStyles from './courseDetailsStyle'


const CourseDetails = ( { course, selected, refProp } ) => {
  if ( selected ) {
    refProp?.current?.scrollIntoView({behavior:"smooth", block:'start'})
  }
//courses.name  courses.zip_code  courses.distance
  const classes = useStyles()

  return (
        <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={ course.photo ? course.photo.images.large.url :'https://www.gettyimages.com/photos/golf-course-no-people?assettype=image&sort=mostpopular&phrase=golf%20course%20no%20people&license=rf%2Crm&servicecontext=srp-related'}
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

        </Box>
        {course?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            {/* <img src={award.images.small} /> */}
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {course?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {course.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            {course.address}
          </Typography>
        )}
        {course.url && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            {course.url}
          </Typography>
        )}
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
