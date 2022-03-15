import axios from 'axios';
import '../index.css';
import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';


const MyURL =
  'http://api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=-122.4194&appid=0e94ff0e87c051d7531693a200fce67d&units=metric';
//react-weather api key: 0e94ff0e87c051d7531693a200fce67d

const libraries = ['places'];

export default function Weather(props) {
  const [data, setData] = useState();

  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  async function fetchWeather(latitude, longitude) {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=0e94ff0e87c051d7531693a200fce67d&units=metric`
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const { markers } = props;
  useEffect(() => {
    if (markers && markers[0]) fetchWeather(markers[0].lat, markers[0].lng);
  }, [markers]);

  if (!data) return <div>Loading...</div>;

  const newLocal = 1;
  return (
    <div>
      <div className='weatherCard'>
        <WeatherCard
          data={data}
          dayNum={0}
        />
        <WeatherCard data={data} dayNum={1} />
        <WeatherCard data={data} dayNum={3} />
        <center>
          <form>
            <input
              type='text'
              placeholder='Enter city'
              onKeyPress={fetchWeather}
            />
            <button onKeyPress={fetchWeather} type='submit'>
              Get Weather
            </button>
          </form>
        </center>
      </div>
    </div>
  );
}
