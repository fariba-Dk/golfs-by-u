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
  console.log( 'this is data from api', data )
  return data
  }


//get course details
const courseDetails = {
  method: 'GET',
  url: 'https://golf-course-finder.p.rapidapi.com/course/details',
  params: {zip: '90066', name:'rancho park'},
  headers: {
    'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GETGOLF_API_KEY//
  }
};

export const getCourseDetailsData = axios.request(courseDetails).then(function (response) {
	console.log('course-details from api', response.data);
}).catch(function (error) {
	console.error(error);
});























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
