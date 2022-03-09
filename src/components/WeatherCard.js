
import React from 'react';

export default function WeatherCard(props) {
  if(!props.data) return;
  //logic for
  const temp = props.data.list[props.dayNum].main.temp;
  const city = props.data.city.name;
  const weather = props.data.list[props.dayNum].description;
  const humidity = props.data.list[props.dayNum].humidity;

  // useEffect(() => {
  //   if (markers && markers[0]) fetchWeather(markers[0].lat, markers[0].lng);
  // }, [markers]);




  return (
    <div>
      <center>
        <h2>Here is Your forecast for {props.dayNum} </h2>

        <div>
          {/* <!-- {props.markers && props.markers[0]
        ? `${props.markers[0].lat}, ${props.markers[0].lng}`
        : null} --> */}
          <h2>City: {city}</h2>
          <h2>Temperature: {temp}ºC</h2>

          <h2>Humidity: {humidity}</h2>
          <h2>Conditions: {weather}</h2>
        </div>
      </center>
    </div>
  );
}
