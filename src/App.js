import React from 'react';
import Weather from './components/Weather.js';
import Pin from './components/Pin';
import AutoComplete from './components/AutoComplete'
import Search from './components/Search'

export default function App() {



  return (
    <div className='App'>
      {/* <div className='weatherContainer'>
        <Weather markers={markers} />
      </div> */}
      {/* <div>
        <Search/>
      </div> */}
        <div>
        <Search/>
      </div>

      <div>
        <AutoComplete/>
      </div>

      <div>
        <Pin />
    </div>
    </div>
  );
}
