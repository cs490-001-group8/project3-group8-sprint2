import React, { useState, useEffect } from 'react';
import WidgetTitle from '../WidgetTitle';
import WeatherHourly from './WeatherHourly';
import { Socket } from '../Socket';

export default function WeatherModule() {
    const [currWeather, setCurrWeather] = useState(() => []);
    const [currCity, setCurrCity] = useState(() => 'Hourly');
    useEffect(() => {
        Socket.on('send weather', (data) => {
            setCurrCity(data.city_name);
            setCurrWeather([]);
            const iterWeather = [];
            for (let i = 0; i < data.hourly.length; i += 1) {
                const temp = (
                    <WeatherHourly
                      key={i}
                      time={data.hourly[i].time}
                      icon={data.hourly[i].icon}
                      description={data.hourly[i].description}
                      temp={`${Math.round(data.hourly[i].temp)} °F`}
                    />
                );
                iterWeather.push(temp);
            }
            // eslint-disable-next-line no-shadow
            setCurrWeather((currWeather) => [...currWeather, iterWeather]);
        });

        Socket.on('weather error', () => {
            setCurrCity('Hourly');
            setCurrWeather([]);
            setCurrWeather((currWeather) => [...currWeather, 'Please enter a valid NJ zipcode or city name!']);
        });
    }, []);

    function handleSubmit(event) {
        const currCityEvent = document.getElementById('inputCity');
        const currCityValue = currCityEvent.value;
        Socket.emit('weather request', {
            city_name: currCityValue,
        });
        currCityEvent.value = '';
        event.preventDefault();
    }
    return (
        <div className="widget weather_widget">
            <WidgetTitle title={`${currCity} Forecast`} />
            <form onSubmit={handleSubmit}>
                <input id="inputCity" placeholder="Search your city" type="text" />
            </form>
            <hr />
            {currWeather}
        </div>
    );
}
