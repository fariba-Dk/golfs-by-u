import * as React from 'react';
import Weather from './Weather.js';
import Pin from './Pin';
import AutoComplete from './AutoComplete'
import Search from './Search'

export default function Map() {

  return (
    //hooks and state to look for changes to update

    <div className='Map'>

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
