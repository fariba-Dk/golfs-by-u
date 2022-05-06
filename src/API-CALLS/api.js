import axios from 'axios';

const URL = 'https://golf-course-finder.p.rapidapi.com/courses';

//this is from rapid api

export const getGolfCourses = async ( radius, lat, lng ) => {
  try {
    const { data: { data } } = await axios.get( URL, {
      params: { radius: radius, lat: lat, lng: lng },
      headers: {
        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
        'X-RapidAPI-Key': '11e75caaf7msh15da62401f002e4p1fcd54jsn4c82e75044aa'
      }
    } )
  } catch ( err ) {
    console.log( err )
  }
}


 export const getCourseDetails = async ( lat, lng ) => {
  try {
      const { data: { data } } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/courses/details', {
        // method: 'GET',
        params: { lat:lat , lon: lng },
        headers: {
          'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
          'X-RapidAPI-Key': '11e75caaf7msh15da62401f002e4p1fcd54jsn4c82e75044aa'
        }
      } )
      return data;
    }catch ( error ) {
    console.log(error)
  }
}

