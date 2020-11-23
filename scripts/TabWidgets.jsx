import React from 'react';
import PropTypes from 'prop-types';
import TrafficWidget from './TrafficWidget';
import NewsList from './NewsList';
import WeatherModule from './WeatherModule';
import TweetWidget from './TweetWidget';
import BillsWidget from './BillsWidget';
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
                <BillsWidget />
            </div>
        );
    }
    if (currTab === 'Recreation') {
        return (
            <div className="tab-widgets-section">
                <NationalParks />
                
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
