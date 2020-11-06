import React, { useState } from 'react';
import WidgetTitle from './WidgetTitle';
import { Socket } from './Socket';

function convertTime(time){
    let newTime = ""
    if (time > 12){
        newTime = time - 12 + ":00 PM"
    } else if (time === 0){
        newTime = "12:00 AM"
    } else {
        newTime = time + ":00 AM"
    }
    
    return newTime
}

export default function WeatherHourly(props) {
  return (
    <div className="hourlyWeather">
        <h2>{convertTime(props.time)}</h2>
        <img src={props.icon} alt={props.description} />
        <h4> {props.description} </h4>
        <h3> {props.temp} </h3>
    </div>
  );
}