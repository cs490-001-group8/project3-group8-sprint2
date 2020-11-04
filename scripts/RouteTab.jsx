import React, { useState } from 'react';
import {
  Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@reach/tabs';
import '@reach/tabs/styles.css';
import PropTypes from 'prop-types';
import GoogleTrafficView from './GoogleTrafficView';
import CommentBlock from './CommentBlock';

export default function RouteTab({ myName, loggedIn }) {
  const tabs = ["Home", "Commuter"]
  const [tabInd, changeTabInd] = useState(() => 0);
  const currTab = tabs[tabInd]

  return (
    <Tabs
      onChange={(index) => changeTabInd(() => index)}
    >
      <TabList>
        <Tab className="tab">Home</Tab>
        <Tab className="tab">Commuter</Tab>
      </TabList>
      <TabPanels>
        <TabPanel label="Home">
          <GoogleTrafficView />
          <CommentBlock currTab={currTab} myName={myName} loggedIn={loggedIn} />
        </TabPanel>
        <TabPanel label="Commuter">
          <p>Commuter!</p>
          <CommentBlock currTab={currTab} myName={myName} loggedIn={loggedIn} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

RouteTab.propTypes = {
  myName: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
