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



          {/* <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography> */}
          {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete> */}
        </Box>
      </Toolbar>
      </AppBar>
  </>
  );
};

export default Header;



// import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';



// const Header = ( { onPlaceChanged, onLoad } ) => {

//   //hooks
//   const classes = useStyles()

//    return (
//      <AppBar position="static">
//        <Toolbar className={ classes.toolbar }>
//           <Typography variant="h5" className={classes.title}>
//           ⛳️ Golf'sByU ⛳️
//         </Typography>



//         <Box display="flex">
//            <Map />

//            {/* <Pin/> */}
//           {/* <AutoComplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//             <div className={classes.search}>
//               <div className={classes.searchIcon}>
//                 <SearchIcon />
//               </div>
//               <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
//             </div>
//           </AutoComplete> */}
//         </Box>
//       </Toolbar>

//      </AppBar>

//   )
// }
// export default Header;

