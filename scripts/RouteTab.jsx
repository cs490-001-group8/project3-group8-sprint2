import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter, NavLink, Route, Switch,
} from 'react-router-dom';
import TabContent from './TabContent';

export default function RouteTab({ myName, loggedIn }) {
    return (
        <BrowserRouter>
            <div>
                <div>
                    <NavLink className="tab" to="/">Home</NavLink>
                    <NavLink className="tab" to="/Commuter">Commuter</NavLink>
                    <NavLink className="tab" to="/Politics">Politics</NavLink>
                    <NavLink className="tab" to="/Recreation">Recreation</NavLink>
                </div>
                <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                          <TabContent currTab="Home" myName={myName} loggedIn={loggedIn} />
                        )}
                    />
                    <Route
                      exact
                      path="/Commuter"
                      render={() => (
                          <TabContent currTab="Commuter" myName={myName} loggedIn={loggedIn} />
                        )}
                    />
                    <Route
                      exact
                      path="/Politics"
                      render={() => (
                          <TabContent currTab="Politics" myName={myName} loggedIn={loggedIn} />
                        )}
                    />
                    <Route
                      exact
                      path="/Recreation"
                      render={() => (
                          <TabContent currTab="Recreation" myName={myName} loggedIn={loggedIn} />
                        )}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

RouteTab.propTypes = {
    myName: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
