import React from 'react';
import Weather from './components/Weather.js';
import Pin from './components/Pin';



export default function App() {

  const [markers, setMarkers] = React.useState([]); //making state global

  return (
    <div className='App'>
      <div className='weatherContainer'>
        <Weather markers={markers} />
      </div>

      <Pin markers={markers} setMarkers={setMarkers} />
    </div>
  );
}
