import axios from 'axios';

const URL = 'https://golf-course-finder.p.rapidapi.com/courses/';
//https://golf-course-finder.p.rapidapi.com/courses?radius=1&lat=36.56910381018662&lng=-121.95035631683683
// https://golf-course-finder.p.rapidapi.com/courses?radius=1&lat=?&lng=?&radius=1&lat=%7B%22radius%22:5%7D
//this is from rapid api

export const getGolfCourses = async (lat, lng ) => {
  try {
    const { data: { data } } = await axios.get( URL, {
      params: { radius: 1,lat: lat, lng: lng },
      headers: {
        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
        'X-RapidAPI-Key': '11e75caaf7msh15da62401f002e4p1fcd54jsn4c82e75044aa'
      }
    } )

    return data
  } catch ( err ) {
    console.log( err )
  }
}


 export const getCourseDetails = async ( radius, lat, lng ) => {
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

