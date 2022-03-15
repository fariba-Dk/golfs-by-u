import React from 'react';

export default function WeatherCard(props) {
  if (!props.data) return;
  //logic for 0 3 ....
  const index = props.dayNum * 8;
  const tempFar = Math.round((props.data.list[index].main.temp * 9) / 5 + 33);
  const tempCel = props.data.list[index].main.temp;
  const city = props.data.city.name;
  const country = props.data.city.country;

  const weather = props.data.list[index].weather[0].description;
  const date = props.data.list[index].dt_txt;
  const humidity = props.data.list[index].main.humidity; //data.list[props.dayNum].main.humidity

  return (
    <div>
      <div className='weatherCard'>
        <h3>On:{date} </h3>
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
