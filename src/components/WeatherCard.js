import React from 'react';

export default function WeatherCard(props) {
  if (!props.data) return;
  //logic for 0 3 ....
  const index = props.dayNum * 8;
  const tempFar = Math.round(props.data.list[index].main.temp * 9/5 + 33)
  const tempCel = (props.data.list[index].main.temp)

  const weather = props.data.list[index].weather[0].description;
  const date = props.data.list[index].dt_txt;
  const humidity = props.data.list[index].main.humidity; //data.list[props.dayNum].main.humidity

  return (
    <div>
      <center>
        <h2>Forecast for {date} </h2>

        <div>
          <h2>Temperature: {tempFar}ºF or {tempCel}ºC</h2>
          <h2>Humidity: {humidity} %</h2>
          <h2>Conditions: {weather}...</h2>
        </div>
      </center>
    </div>
  );
}
