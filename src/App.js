import React from 'react';
import Weather from './components/Weather.js';
import Pin from './components/Pin';
import PlacesAutocomplete from './components/PlacesAutocomplete'


export default function App() {



  return (
    <div className='App'>
      {/* <div className='weatherContainer'>
        <Weather markers={markers} />
      </div> */}
        <div>
          <Pin />
      </div>
    </div>
  );
}
