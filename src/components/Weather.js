import axios from 'axios';
import '../index.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import WeatherCard from '../components/WeatherCard';
// import Icon from './components/Icon.js';
import Temp from '../components/Temp';
import Days from '../components/Days';

const MyURL =
  'http://api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=-122.4194&appid=0e94ff0e87c051d7531693a200fce67d&units=metric';
//react-weather api key: 0e94ff0e87c051d7531693a200fce67d

const dateBuilder = (d) => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[d.getDay()]; //get day
  let date = d.getDate(); //get date
  let month = months[d.getMonth()]; //get month
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};
const libraries = ['places'];

export default function Weather(props) {
  //ALL THE HOOKS
  // const { isLoaded, loadError } = useLoadScript({MyURL
  // ,
  //   libraries,
  // });
  const [data, setData] = useState();
  //   const [city, setCity] = useState('San Francisco');
  //   const [temp, setTemp] = useState(0);
  //   const [weather, setWeather] = useState('');

  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);
  //   const [humidity, setHumidity] = useState(0);

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  async function fetchWeather(latitude, longitude) {
    try {
      //lets get our location:
      // await window.navigator.geolocation.getCurrentPosition(
      //   savePositionToState
      // );

      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=0e94ff0e87c051d7531693a200fce67d&units=metric`
      );
      console.log(response);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //either make card for the = break it down to smaller comp, that more reusable
  //hard coding [0] and as a result im on the first element
  //create a prop val const dayCount(porp) provide it in app
  //useEf runs only once
  const { markers } = props;
  useEffect(() => {
    if (markers && markers[0]) fetchWeather(markers[0].lat, markers[0].lng);
  }, [markers]);

  //------------- Return here
  // if (loadError) return 'Error';
  // if (!isLoaded) return 'Loading...';
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div className='weatherCard'>
        <Days days={props.days} />
        {/* <Icon icon={props.icon} /> */}
        <Temp temp={props.temp} />
        <div>
          <form value={data.city.name}>
            <input
              type='text'
              placeholder='Enter city'
              //   onChange={(e) => setTemp()}
              onKeyPress={fetchWeather}
            />
            <button onKeyPress={fetchWeather} type='submit'>
              Get Weather
            </button>
            <h2>City: {data.city.name}</h2>
          </form>
        </div>
        <WeatherCard data={data} dayNum={0} />
        <WeatherCard data={data} dayNum={1} />
        {/* <center>
          <h2>Here is Your forecast for Today {dateBuilder(new Date())}</h2>
          setCity( event.target.value );
          <form value={city}>
            <input
              type='text'
              placeholder='Enter city'
              onChange={(e) => setTemp()}
              onKeyPress={fetchWeather}
            />
            <button onKeyPress={fetchWeather} type='submit'>
              Get Weather
            </button>
            <h2>City: {city}</h2>
          </form>
          <div>
            {props.markers && props.markers[0]
              ? `${props.markers[0].lat}, ${props.markers[0].lng}`
              : null}
            <h2>City: {city}</h2>
            <h2>Temperature: {temp}ºC</h2>

            <h2>Humidity: {humidity}</h2>
            <h2>Conditions: {weather}</h2>
          </div>
        </center> */}
      </div>
    </div>
  );
}

/*SEARCH FETCH
//  function weatherSearch(evt) {
//   if (evt.key === 'Enter' && city) {
//     //requesting an API from the weather
//     fetch(`${api.base}weather?q=${city}&appid=${api.key}`)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result)
//         setWeather(result);
//         //set query to empty string null
//         setQuery('');
//         // console.log(result);
//       });
//   }
// }
{
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1646427600,
            "main": {
                "temp": 12.81,
                "feels_like": 12.13,
                "temp_min": 12.81,
                "temp_max": 12.85,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 1013,
                "humidity": 76,
                "temp_kf": -0.04
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": {
                "all": 40
            },
            "wind": {
                "speed": 9.73,
                "deg": 292,
                "gust": 11.49
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-04 21:00:00"
        },
        {
            "dt": 1646438400,
            "main": {
                "temp": 12.05,
                "feels_like": 11.19,
                "temp_min": 10.53,
                "temp_max": 12.05,
                "pressure": 1015,
                "sea_level": 1015,
                "grnd_level": 1014,
                "humidity": 72,
                "temp_kf": 1.52
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": {
                "all": 34
            },
            "wind": {
                "speed": 11.46,
                "deg": 291,
                "gust": 14.8
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-05 00:00:00"
        },
        {
            "dt": 1646449200,
            "main": {
                "temp": 10.28,
                "feels_like": 9.14,
                "temp_min": 9.01,
                "temp_max": 10.28,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 1016,
                "humidity": 68,
                "temp_kf": 1.27
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "clouds": {
                "all": 15
            },
            "wind": {
                "speed": 9.34,
                "deg": 293,
                "gust": 14.13
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-05 03:00:00"
        },
        {
            "dt": 1646460000,
            "main": {
                "temp": 9.04,
                "feels_like": 4.83,
                "temp_min": 9.04,
                "temp_max": 9.04,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 1015,
                "humidity": 67,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 8
            },
            "wind": {
                "speed": 10.5,
                "deg": 282,
                "gust": 13.56
            },
            "visibility": 10000,
            "pop": 0.25,
            "rain": {
                "3h": 0.16
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-05 06:00:00"
        },
        {
            "dt": 1646470800,
            "main": {
                "temp": 8.33,
                "feels_like": 4.63,
                "temp_min": 8.33,
                "temp_max": 8.33,
                "pressure": 1016,
                "sea_level": 1016,
                "grnd_level": 1015,
                "humidity": 71,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "clouds": {
                "all": 46
            },
            "wind": {
                "speed": 7.53,
                "deg": 305,
                "gust": 11.56
            },
            "visibility": 10000,
            "pop": 0.59,
            "rain": {
                "3h": 0.42
            },
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-05 09:00:00"
        },
        {
            "dt": 1646481600,
            "main": {
                "temp": 7.58,
                "feels_like": 3.5,
                "temp_min": 7.58,
                "temp_max": 7.58,
                "pressure": 1017,
                "sea_level": 1017,
                "grnd_level": 1015,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 25
            },
            "wind": {
                "speed": 8.11,
                "deg": 313,
                "gust": 11.68
            },
            "visibility": 10000,
            "pop": 0.23,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-05 12:00:00"
        },
        {
            "dt": 1646492400,
            "main": {
                "temp": 6.95,
                "feels_like": 3.99,
                "temp_min": 6.95,
                "temp_max": 6.95,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 1016,
                "humidity": 72,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": {
                "all": 12
            },
            "wind": {
                "speed": 4.53,
                "deg": 336,
                "gust": 8.06
            },
            "visibility": 10000,
            "pop": 0.11,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-05 15:00:00"
        },
        {
            "dt": 1646503200,
            "main": {
                "temp": 9.65,
                "feels_like": 7.61,
                "temp_min": 9.65,
                "temp_max": 9.65,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 1017,
                "humidity": 57,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 10
            },
            "wind": {
                "speed": 3.92,
                "deg": 342,
                "gust": 5.22
            },
            "visibility": 10000,
            "pop": 0.04,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-05 18:00:00"
        },
        {
            "dt": 1646514000,
            "main": {
                "temp": 10.9,
                "feels_like": 9.35,
                "temp_min": 10.9,
                "temp_max": 10.9,
                "pressure": 1018,
                "sea_level": 1018,
                "grnd_level": 1016,
                "humidity": 50,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 52
            },
            "wind": {
                "speed": 1.6,
                "deg": 331,
                "gust": 2.93
            },
            "visibility": 10000,
            "pop": 0.09,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-05 21:00:00"
        },
        {
            "dt": 1646524800,
            "main": {
                "temp": 11.74,
                "feels_like": 10.33,
                "temp_min": 11.74,
                "temp_max": 11.74,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 1017,
                "humidity": 52,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 58
            },
            "wind": {
                "speed": 4.24,
                "deg": 287,
                "gust": 4.37
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-06 00:00:00"
        },
        {
            "dt": 1646535600,
            "main": {
                "temp": 9.82,
                "feels_like": 7.17,
                "temp_min": 9.82,
                "temp_max": 9.82,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1018,
                "humidity": 77,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 31
            },
            "wind": {
                "speed": 5.53,
                "deg": 293,
                "gust": 7.05
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-06 03:00:00"
        },
        {
            "dt": 1646546400,
            "main": {
                "temp": 9.03,
                "feels_like": 7,
                "temp_min": 9.03,
                "temp_max": 9.03,
                "pressure": 1021,
                "sea_level": 1021,
                "grnd_level": 1019,
                "humidity": 80,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": {
                "all": 32
            },
            "wind": {
                "speed": 3.61,
                "deg": 298,
                "gust": 5.32
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-06 06:00:00"
        },
        {
            "dt": 1646557200,
            "main": {
                "temp": 8.55,
                "feels_like": 8.55,
                "temp_min": 8.55,
                "temp_max": 8.55,
                "pressure": 1021,
                "sea_level": 1021,
                "grnd_level": 1019,
                "humidity": 81,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 1
            },
            "wind": {
                "speed": 0.97,
                "deg": 277,
                "gust": 2.09
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-06 09:00:00"
        },
        {
            "dt": 1646568000,
            "main": {
                "temp": 7.83,
                "feels_like": 7.83,
                "temp_min": 7.83,
                "temp_max": 7.83,
                "pressure": 1022,
                "sea_level": 1022,
                "grnd_level": 1020,
                "humidity": 83,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 1
            },
            "wind": {
                "speed": 1.18,
                "deg": 322,
                "gust": 2.32
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-06 12:00:00"
        },
        {
            "dt": 1646578800,
            "main": {
                "temp": 7.49,
                "feels_like": 6.52,
                "temp_min": 7.49,
                "temp_max": 7.49,
                "pressure": 1023,
                "sea_level": 1023,
                "grnd_level": 1021,
                "humidity": 86,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 1
            },
            "wind": {
                "speed": 1.74,
                "deg": 95,
                "gust": 2.12
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-06 15:00:00"
        },
        {
            "dt": 1646589600,
            "main": {
                "temp": 10.42,
                "feels_like": 9.32,
                "temp_min": 10.42,
                "temp_max": 10.42,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 1023,
                "humidity": 69,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 1
            },
            "wind": {
                "speed": 1.67,
                "deg": 82,
                "gust": 2.21
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-06 18:00:00"
        },
        {
            "dt": 1646600400,
            "main": {
                "temp": 12.79,
                "feels_like": 11.53,
                "temp_min": 12.79,
                "temp_max": 12.79,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 1023,
                "humidity": 54,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.99,
                "deg": 293,
                "gust": 1.62
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-06 21:00:00"
        },
        {
            "dt": 1646611200,
            "main": {
                "temp": 11.86,
                "feels_like": 10.77,
                "temp_min": 11.86,
                "temp_max": 11.86,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 1023,
                "humidity": 64,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 5.07,
                "deg": 283,
                "gust": 4.99
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-07 00:00:00"
        },
        {
            "dt": 1646622000,
            "main": {
                "temp": 9.57,
                "feels_like": 7.54,
                "temp_min": 9.57,
                "temp_max": 9.57,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 1023,
                "humidity": 78,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 3.86,
                "deg": 278,
                "gust": 4.34
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-07 03:00:00"
        },
        {
            "dt": 1646632800,
            "main": {
                "temp": 8.91,
                "feels_like": 8.59,
                "temp_min": 8.91,
                "temp_max": 8.91,
                "pressure": 1027,
                "sea_level": 1027,
                "grnd_level": 1025,
                "humidity": 79,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.34,
                "deg": 307,
                "gust": 1.73
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-07 06:00:00"
        },
        {
            "dt": 1646643600,
            "main": {
                "temp": 8.55,
                "feels_like": 8.55,
                "temp_min": 8.55,
                "temp_max": 8.55,
                "pressure": 1027,
                "sea_level": 1027,
                "grnd_level": 1025,
                "humidity": 80,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.02,
                "deg": 71,
                "gust": 1.13
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-07 09:00:00"
        },
        {
            "dt": 1646654400,
            "main": {
                "temp": 8.16,
                "feels_like": 7.18,
                "temp_min": 8.16,
                "temp_max": 8.16,
                "pressure": 1027,
                "sea_level": 1027,
                "grnd_level": 1025,
                "humidity": 79,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.86,
                "deg": 42,
                "gust": 2.02
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-07 12:00:00"
        },
        {
            "dt": 1646665200,
            "main": {
                "temp": 7.77,
                "feels_like": 6.68,
                "temp_min": 7.77,
                "temp_max": 7.77,
                "pressure": 1027,
                "sea_level": 1027,
                "grnd_level": 1025,
                "humidity": 77,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.91,
                "deg": 35,
                "gust": 2.12
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-07 15:00:00"
        },
        {
            "dt": 1646676000,
            "main": {
                "temp": 11.45,
                "feels_like": 10.09,
                "temp_min": 11.45,
                "temp_max": 11.45,
                "pressure": 1028,
                "sea_level": 1028,
                "grnd_level": 1026,
                "humidity": 55,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.83,
                "deg": 34,
                "gust": 3.09
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-07 18:00:00"
        },
        {
            "dt": 1646686800,
            "main": {
                "temp": 14.32,
                "feels_like": 12.96,
                "temp_min": 14.32,
                "temp_max": 14.32,
                "pressure": 1026,
                "sea_level": 1026,
                "grnd_level": 1024,
                "humidity": 44,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.24,
                "deg": 293,
                "gust": 3.77
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-07 21:00:00"
        },
        {
            "dt": 1646697600,
            "main": {
                "temp": 13.68,
                "feels_like": 12.62,
                "temp_min": 13.68,
                "temp_max": 13.68,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 1023,
                "humidity": 58,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 4.15,
                "deg": 274,
                "gust": 5.21
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-08 00:00:00"
        },
        {
            "dt": 1646708400,
            "main": {
                "temp": 11.33,
                "feels_like": 10.48,
                "temp_min": 11.33,
                "temp_max": 11.33,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 1023,
                "humidity": 75,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 2.3,
                "deg": 280,
                "gust": 2.79
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-08 03:00:00"
        },
        {
            "dt": 1646719200,
            "main": {
                "temp": 10.59,
                "feels_like": 9.77,
                "temp_min": 10.59,
                "temp_max": 10.59,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 1024,
                "humidity": 79,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 1.58,
                "deg": 266,
                "gust": 2.08
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-08 06:00:00"
        },
        {
            "dt": 1646730000,
            "main": {
                "temp": 10.13,
                "feels_like": 9.34,
                "temp_min": 10.13,
                "temp_max": 10.13,
                "pressure": 1025,
                "sea_level": 1025,
                "grnd_level": 1023,
                "humidity": 82,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 2
            },
            "wind": {
                "speed": 0.97,
                "deg": 210,
                "gust": 1.41
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-08 09:00:00"
        },
        {
            "dt": 1646740800,
            "main": {
                "temp": 9.76,
                "feels_like": 9.76,
                "temp_min": 9.76,
                "temp_max": 9.76,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 1022,
                "humidity": 81,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "clouds": {
                "all": 18
            },
            "wind": {
                "speed": 0.63,
                "deg": 137,
                "gust": 0.96
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-08 12:00:00"
        },
        {
            "dt": 1646751600,
            "main": {
                "temp": 9.51,
                "feels_like": 8.79,
                "temp_min": 9.51,
                "temp_max": 9.51,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 1022,
                "humidity": 74,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 69
            },
            "wind": {
                "speed": 1.81,
                "deg": 86,
                "gust": 1.91
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-08 15:00:00"
        },
        {
            "dt": 1646762400,
            "main": {
                "temp": 12.8,
                "feels_like": 11.55,
                "temp_min": 12.8,
                "temp_max": 12.8,
                "pressure": 1024,
                "sea_level": 1024,
                "grnd_level": 1022,
                "humidity": 54,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 82
            },
            "wind": {
                "speed": 1.89,
                "deg": 59,
                "gust": 2.54
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-08 18:00:00"
        },
        {
            "dt": 1646773200,
            "main": {
                "temp": 15.37,
                "feels_like": 14.09,
                "temp_min": 15.37,
                "temp_max": 15.37,
                "pressure": 1022,
                "sea_level": 1022,
                "grnd_level": 1021,
                "humidity": 43,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 97
            },
            "wind": {
                "speed": 1.96,
                "deg": 359,
                "gust": 2.95
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-08 21:00:00"
        },
        {
            "dt": 1646784000,
            "main": {
                "temp": 15.9,
                "feels_like": 14.72,
                "temp_min": 15.9,
                "temp_max": 15.9,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1018,
                "humidity": 45,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": {
                "all": 64
            },
            "wind": {
                "speed": 3.13,
                "deg": 283,
                "gust": 3.09
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-09 00:00:00"
        },
        {
            "dt": 1646794800,
            "main": {
                "temp": 11.97,
                "feels_like": 11.05,
                "temp_min": 11.97,
                "temp_max": 11.97,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1018,
                "humidity": 70,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 5
            },
            "wind": {
                "speed": 2.81,
                "deg": 278,
                "gust": 3.35
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-09 03:00:00"
        },
        {
            "dt": 1646805600,
            "main": {
                "temp": 10.92,
                "feels_like": 10.05,
                "temp_min": 10.92,
                "temp_max": 10.92,
                "pressure": 1021,
                "sea_level": 1021,
                "grnd_level": 1019,
                "humidity": 76,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 2
            },
            "wind": {
                "speed": 1.87,
                "deg": 273,
                "gust": 2.31
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-09 06:00:00"
        },
        {
            "dt": 1646816400,
            "main": {
                "temp": 10.31,
                "feels_like": 9.43,
                "temp_min": 10.31,
                "temp_max": 10.31,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1018,
                "humidity": 78,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 0.77,
                "deg": 217,
                "gust": 0.89
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-09 09:00:00"
        },
        {
            "dt": 1646827200,
            "main": {
                "temp": 10.02,
                "feels_like": 9.09,
                "temp_min": 10.02,
                "temp_max": 10.02,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 1017,
                "humidity": 77,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 0.41,
                "deg": 122,
                "gust": 0.57
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2022-03-09 12:00:00"
        },
        {
            "dt": 1646838000,
            "main": {
                "temp": 9.9,
                "feels_like": 9.9,
                "temp_min": 9.9,
                "temp_max": 9.9,
                "pressure": 1019,
                "sea_level": 1019,
                "grnd_level": 1017,
                "humidity": 74,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 0.69,
                "deg": 31,
                "gust": 0.71
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-09 15:00:00"
        },
        {
            "dt": 1646848800,
            "main": {
                "temp": 13.37,
                "feels_like": 12.3,
                "temp_min": 13.37,
                "temp_max": 13.37,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1018,
                "humidity": 59,
                "temp_kf": 0
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": {
                "all": 0
            },
            "wind": {
                "speed": 0.93,
                "deg": 3,
                "gust": 1.11
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2022-03-09 18:00:00"
        }
    ],
    "city": {
        "id": 5391959,
        "name": "San Francisco",
        "coord": {
            "lat": 37.7749,
            "lon": -122.4194
        },
        "country": "US",
        "population": 805235,
        "timezone": -28800,
        "sunrise": 1646404620,
        "sunset": 1646445963
    }
}*/
