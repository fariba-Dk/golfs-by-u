import axios from 'axios';//library to make our calls

const URL = 'https://golf-course-finder.p.rapidapi.com/courses/';
//https://golf-course-finder.p.rapidapi.com/courses?radius=1&lat=36.56910381018662&lng=-121.95035631683683
// https://golf-course-finder.p.rapidapi.com/courses?radius=1&lat=?&lng=?&radius=1&lat=%7B%22radius%22:5%7D
//this is from rapid api
//
//Rancho park
//Latitude: 34.0454302 Longitude: -118.4206915


const allCourses = {
  method: 'GET',
  url: 'https://golf-course-finder.p.rapidapi.com/courses',
  params: {radius: '10', lat: '34.0454302', lng: '-118.4206915'},
  headers: {
    'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
    'X-RapidAPI-Key': '11e75caaf7msh15da62401f002e4p1fcd54jsn4c82e75044aa'
  }
};

export const getGolfCoursesData = axios.request(allCourses).then(function (response) {
	console.log('this is my courses data', response.data);
}).catch(function (error) {
	console.error(error);
});


const courseDetails = {
  method: 'GET',
  url: 'https://golf-course-finder.p.rapidapi.com/course/details',
  params: {zip: '90064', name: 'Rancho Park Golf Academy'},
  headers: {
    'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
    'X-RapidAPI-Key': '11e75caaf7msh15da62401f002e4p1fcd54jsn4c82e75044aa'
  }
};

export const getCourseDetailsData = axios.request(courseDetails).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

