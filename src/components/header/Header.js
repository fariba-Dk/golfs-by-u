import React from 'react';
import Map from '../map/Map';
import { CssBaseline, Grid } from '@material-ui/core';
import AutoComplete from './AutoComplete'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import useStyles from './headerStyle'


const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();

  return (

    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
           ⛳️ Golf'sByU ⛳️
        </Typography>

        <Box display="flex">
          <Typography variant="h5" className={classes.title}>
             <AutoComplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
        </Typography>
        </Box>
      </Toolbar>
      </AppBar>
  </>
  );
};

export default Header;


