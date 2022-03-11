import axios from 'axios';
import React, { useState, useCallback } from 'react';
import Weather from './components/Weather.js';
import Pin from './components/Pin';
import AutoComplete from 'places-autocomplete-react';
import './index.css';

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


  return (
    <div className='App'>
      <h1 className='weather-nav'>
        🌞 Whats-Your-Temp ©<span role='img' aria-label='tent'></span>
      </h1>

      <div className='weatherContainer p3-3 pb-3'>
        <Weather markers={markers} />
      </div>
      <div>
        <Pin markers={markers} setMarkers={setMarkers} />
      </div>
    </div>
  );
}
