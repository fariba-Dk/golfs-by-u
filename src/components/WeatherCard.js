import React from 'react';
import { format } from 'date-fns';

export default function WeatherCard(props) {
  if (!props.data) return;
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

  //use js in-line to format date
  //use 3rd party library to format date
  //date

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
