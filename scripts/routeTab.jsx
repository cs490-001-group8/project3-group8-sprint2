import React from 'react';
import {
  Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@reach/tabs';
import '@reach/tabs/styles.css';
import PropTypes from 'prop-types';
import GoogleTrafficView from './GoogleTrafficView';
import CommentBlock from './CommentBlock';

export default function RouteTab({ myName, loggedIn }) {
  return (
    <Tabs>
      <TabList>
        <Tab className="tab">Home</Tab>
        <Tab className="tab">Commuter</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GoogleTrafficView />
          <CommentBlock currTab="Home" myName={myName} loggedIn={loggedIn} />
        </TabPanel>
        <TabPanel>
          <p>Commuter!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

RouteTab.propTypes = {
  myName: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
