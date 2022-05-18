
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  return(
    <>
    </>
  )
}


// Next, import the service, then call the service inside your useEffect Hook. Update the list with setList if the component is mounted. To understand why you should check if the component is mounted before setting the data, see Step 2 — Preventing Errors on Unmounted Components in How To Handle Async Data Loading, Lazy Loading, and Code Splitting with React.

// Currently you are only running the effect once when the page loads, so the dependency array will be empty. In the next step, you’ll trigger the effect based on different page actions to ensure that you always have the most up-to-date information.

// Add the following highlighted code:

import { getList } from '../../services/list';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
   let mounted = true;
   getList()
     .then(items => {
       if(mounted) {
         setList(items)
       }
     })
   return () => mounted = false;
 }, [])

  return(
    <>
    </>
  )
}

export default App;
Finally, loop over the items with .map and display them in a list:

api-tutorial/src/components/App/App
import React, { useEffect, useState } from 'react';
import './App.css';
import { getList } from '../../services/list';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])

  return(
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
       {list.map(item => <li key={item.item}>{item.item}</li>)}
     </ul>
   </div>
  )
}

export default App;

// let cc = console.log



// function persistence( num ) {
//   //conver => arr
//   let numArr = num.toString().split( '' );

//   if ( numArr.length > 1 ) {
//     let product = 1
//     for ( let i = 0; i < numArr.length; i++ ) {
//       product *= Number( numArr[ i ] )
//     }
//     //
//     return 1 + persistence( product )
//   } else {
//     return 0
//   }
// }
// cc(persistence(3422))//6
// cc(persistence(39)) //4
// cc(persistence(999))//2
// cc(persistence(4))//4


// // const a = geocoder.geocode( { 'location': result[ 0 ].geometry.location }, function ( results, status ) {
// //     if ( status == google.maps.GeocoderStatus.OK ) {

// //       //Postal Code Not found, Try to get Postal code for City
// //       var result = results[ 0 ].address_components;

// //       for ( var i = 0; i < result.length; ++i ) {
// //         if ( result[ i ].types[ 0 ] == "postal_code" ) {
// //           postal = result[ i ].long_name;
// //         }
// //       }
// //     }
// // } )
// //   console.log(a)


