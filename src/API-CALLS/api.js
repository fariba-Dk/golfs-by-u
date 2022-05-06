import axios from 'axios';

export const getData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getGolfCourses = async ( lat, lng) => {
  try {
    const { data: { data } } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/courses', {
     method: 'GET',
      params: { lat, lon: lng},
      headers: {'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_COURSES_API_KEY}
    } )
    return data;
  }
  catch ( error ) {
    console.log(error)
  }
};




export const getCourseDetails = async ( lat, lng ) => {
  try {
    if ( lat && lng ) {
      const { data: { data } } = await axios.get( 'https://golf-course-finder.p.rapidapi.com/courses/details', {
        method: 'GET',
        params: { lat, lon: lng },
        headers: {
          'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_COURSES_API_KEY
        }
      } )
      return data;
    }
  }
  catch ( error ) {
    console.log(error)
  }
};




export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
