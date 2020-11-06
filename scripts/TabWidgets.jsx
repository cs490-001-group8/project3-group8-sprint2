import React from 'react';
import PropTypes from 'prop-types';
import GoogleTrafficView from './GoogleTrafficView';
import NewsList from './NewsList';

export default function TabWidgets({ currTab }) {
  if (currTab === 'Commuter') {
    return (
      <div className="tab-widgets-section">
        <GoogleTrafficView />
        <NewsList />
      </div>
    );
  }

  return (
    <div className="tab-widgets-section">
        <NewsList />
        <GoogleTrafficView />
    </div>
  );
}

TabWidgets.propTypes = {
  currTab: PropTypes.string.isRequired,
};
