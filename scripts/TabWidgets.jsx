import React from 'react';
import PropTypes from 'prop-types';
import GoogleTrafficView from './GoogleTrafficView';
import NewsList from './NewsList';
import WeatherModule from './WeatherModule';
import TweetWidget from './TweetWidget';

export default function TabWidgets({ currTab }) {
    if (currTab === 'Commuter') {
        return (
            <div className="tab-widgets-section">
                <WeatherModule />
                <GoogleTrafficView />
            </div>
        );
    }

    return (
        <div className="tab-widgets-section">
            <NewsList />
            <WeatherModule />
            <TweetWidget />
        </div>
    );
}

TabWidgets.propTypes = {
    currTab: PropTypes.string.isRequired,
};
