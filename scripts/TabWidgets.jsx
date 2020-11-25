import React from 'react';
import PropTypes from 'prop-types';
import TrafficWidget from './Traffic_React/TrafficWidget';
import NewsList from './News_React/NewsList';
import WeatherModule from './Weather_React/WeatherModule';
import TweetWidget from './Tweet_React/TweetWidget';
import BillsWidget from './Bills_React/BillsWidget';
import SportsModule from './Sports_React/SportsModule';
import PoliticiansWidget from './Politicians_React/PoliticiansWidget';
import NationalParks from './National_Parks/NationalParks';

export default function TabWidgets({ currTab }) {
    if (currTab === 'Commuter') {
        return (
            <div className="tab-widgets-section">
                <WeatherModule />
                <TrafficWidget />
            </div>
        );
    }

    if (currTab === 'Politics') {
        return (
            <div className="tab-widgets-section">
                <TweetWidget />
                <PoliticiansWidget />
                <BillsWidget />
            </div>
        );
    }

    if (currTab === 'Recreation') {
        return (
            <div className="tab-widgets-section">
                <SportsModule />
                <NationalParks />
            </div>
        );
    }
    
    if (currTab === 'Personal') {
        return (
            <div className="tab-widgets-section">
                <h1>Hope this works!</h1>
            </div>
        );
    }

    return (
        <div className="tab-widgets-section">
            <NewsList />
            <WeatherModule />
        </div>
    );
}

TabWidgets.propTypes = {
    currTab: PropTypes.string.isRequired,
};
