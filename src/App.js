import axios from 'axios';
import React, { useState, useCallback } from 'react';
import Weather from './components/Weather.js';
import Pin from './components/Pin';
import AutoComplete from 'places-autocomplete-react';
import './index.css';
import Icon from './components/Icon';

export default function App() {
  const [address, setAddress] = useState({});
  //when component is loads

  const [markers, setMarkers] = React.useState([]); //making state global

  const correct = useCallback(
    (strAddress) => {
      console.log(strAddress);
      //make the api call to weather api with strformatted address
      //make a temp set usestate set that tem to the result o fthe api and then pass the state to the werather comp and display it there
      setAddress(strAddress.formattedAddress);
    },
    [setAddress]
  );

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

      //get temp from response body
      // setTemp(response.data.list[0].main.temp);
      // console.log(response.data);
      // //get city from data
      // setCity(response.data.city.name);
      // setWeather(response.data.list[0].weather[0].description);
      // setHumidity(response.data.list[0].main.humidity);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <h1 className='weather-nav'>
        🌞 Whats-Your-Temp ©<span role='img' aria-label='tent'></span>
      </h1>
      <div className='App'>
        <div className='weatherContainer p3-3 pb-3'>
          {/* <Weather day={'Mon'} icon={'Sun'} temp={32} />
          <Weather day={'Tue'} icon={'Mistake'} temp={33} />
          <Weather day={'Wed'} icon={'Snowing'} temp={32} />
          <Weather day={'Thu'} icon={'Rain'} temp={35} />
          <Weather day={'Fri'} icon={'Sun'} temp={15} />
          <Weather day={'Sat'} icon={'Cloud'} temp={30} /> */}
          <Weather day={'Sun'} icon={'Partial'} temp={34} />
        </div>

        <Weather markers={markers} />
      </div>
      <div>
        <Pin markers={markers} setMarkers={setMarkers} />
      </div>
    </>
  );
}
