import React from 'react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function WeatherCard(props) {

  //logic for 0 3 ....
  const index = props.dayNum * 8;
  const tempFar = Math.round((props.data.list[index].main.temp * 9) / 5 + 33);
  const tempCel = props.data.list[index].main.temp;
  const city = props.data.city.name;
  const country = props.data.city.country;

  const weather = props.data.list[index].weather[0].description;
  //https://date-fns.org/v2.28.0/docs/format
  const dateMilliseconds = props.data.list[index].dt;
  const date = new Date(dateMilliseconds * 1000);
  console.log(`this is dateMilliseconds`, dateMilliseconds, date);
  console.log(`this is date`, date);
  const formattedDate = format(date, 'PPPP'); //=> 'Nov'
  const humidity = props.data.list[index].main.humidity; //data.list[props.dayNum].main.humidity

   const [data, setData] = useState();

  const [latitude, setLatitude] = useState();//37.7749
  const [longitude, setLongitude] = useState();//-122.4194

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };


  return (

    <div>
      <div className='weatherCard'>
        <h3>{formattedDate} </h3>
        <h2>
          city={city}, country={country}{' '}
        </h2>
        <h2>
          Temp: {tempFar}ºF or {tempCel}ºC
        </h2>
        <h2>Humidity is {humidity} %</h2>
        <h2>{weather}...</h2>
      </div>
    </div>
  );
}
