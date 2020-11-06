import React from 'react';

function convertTime(time) {
  let newTime = '';

  if (time > 12) {
    newTime = time - 12 + ':00 PM'; // eslint-disable-line prefer-template
  } else if (time === 0) {
    newTime = '12:00 AM'; // eslint-disable-line prefer-template
  } else {
    newTime = time + ':00 AM'; // eslint-disable-line prefer-template
  }

  return newTime;
}

export default function WeatherHourly(props) {
  const {
    time,
    icon,
    description,
    temp,
  } = props;

  return (
    <div className="hourlyWeather">
      <h2>
        {convertTime(time)}
      </h2>
      <img
        src={icon}
        alt={description}
      />
      <h4>
        {description}
      </h4>
      <h3>
        {temp}
      </h3>
    </div>
  );
}

WeatherHourly.propTypes = {
  time: WeatherHourly.string.isRequired,
  icon: WeatherHourly.string.isRequired,
  description: WeatherHourly.string.isRequired,
  temp: WeatherHourly.string.isRequired,
};
