import * as React from 'react';
import Weather from './Weather.js';
import Pin from './Pin';
import AutoComplete from './AutoComplete'
import Search from './Search'
import useStyles from './mapStyle'

export default function Map() {

  const classes = useStyles()

  return (
    //hooks and state to look for changes to update

    <div className='Map'>

      <div>
        <AutoComplete/>
      </div>

    </div>
  );
}
