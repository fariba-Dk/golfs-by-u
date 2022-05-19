
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

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


