import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Weather from './components/Weather.js';
import Pin from './components/Pin';
import AutoComplete from './components/AutoComplete'
import Search from './components/Search'
import Map from './components/Map'

export default function App() {

  return (
    //hooks and state to look for changes to update
    <div className='App'>

      <div>
     <Map/>
     </div>
    </div>
  );
}
