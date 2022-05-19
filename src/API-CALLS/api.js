import axios from 'axios';//library to make our calls

export const hostUrl ='https://golf-course-finder.p.rapidapi.com'

//get list of courses from rapid api   Rancho park =>Latitude: 34.0454302 Longitude: -118.4206915
export const getGolfCoursesData = async (radius = 5, lat, lng) => {
  const { data } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/courses', {
    params: {radius, lat, lng},
     headers: {
      'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GETGOLF_API_KEY
    }
  } )
  return data
}



export const getCourseDetailsData = async ( name, zip_code ) => {
  const { courseDetail } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/course/details', {

    params: {
      name: name,
      zip: zip_code,
    },
    headers: {
      'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GETGOLF_API_KEY
    }
  } )
  console.log('000course details', courseDetail)
 return courseDetail
}

export const getWeatherData = async (lat, lng) => {

      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lng },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });
console.log('whether here s', data)
      return data;
  };






















//{getCourseDetailsData, getGolfCoursesData}
// export function getCoordinates(address){
//   fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=process.env.REACT_APP_GOOGLE_MAP_API_KEY")
//     .then(response => response.json())
//     .then(data => {
//       const latitude = data.results.geometry.location.lat;
//       const longitude = data.results.geometry.location.lng;
//       const zip = data.results.geometry.location.zip
//       console.log({latitude, longitude, zip})
//     })
// }
