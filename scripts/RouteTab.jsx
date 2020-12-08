import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Switch,
} from 'react-router-dom';
import TabContent from './TabContent';

export default function RouteTab({
    myName, loggedIn, myLoginType, myEmail,
}) {
    return (
        <div>
            <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                      <TabContent
                        currTab="Home"
                        myName={myName}
                        loggedIn={loggedIn}
                        myEmail={myEmail}
                        myLoginType={myLoginType}
                        hasDiscussion
                      />
          )}
                />
                <Route
                  exact
                  path="/Commuter"
                  render={() => (
                      <TabContent
                        currTab="Commuter"
                        myName={myName}
                        loggedIn={loggedIn}
                        myEmail={myEmail}
                        myLoginType={myLoginType}
                        hasDiscussion
                      />
          )}
                />
                <Route
                  exact
                  path="/Politics"
                  render={() => (
                      <TabContent
                        currTab="Politics"
                        myName={myName}
                        loggedIn={loggedIn}
                        myEmail={myEmail}
                        myLoginType={myLoginType}
                        hasDiscussion
                      />
          )}
                />
                <Route
                  exact
                  path="/Recreation"
                  render={() => (
                      <TabContent
                        currTab="Recreation"
                        myName={myName}
                        loggedIn={loggedIn}
                        myEmail={myEmail}
                        myLoginType={myLoginType}
                        hasDiscussion
                      />
          )}
                />
                <Route
                  exact
                  path="/Personal"
                  render={() => (
                      <TabContent
                        currTab="Personal"
                        myName={myName}
                        loggedIn={loggedIn}
                        myEmail={myEmail}
                        myLoginType={myLoginType}
                        hasDiscussion={false}
                      />
          )}
                />
            </Switch>
        </div>
    );
}

RouteTab.propTypes = {
    myName: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    myEmail: PropTypes.string.isRequired,
    myLoginType: PropTypes.string.isRequired,
};
