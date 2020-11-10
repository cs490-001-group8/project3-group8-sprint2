import React from 'react';
import PropTypes from 'prop-types';
import RouteTab from './RouteTab';

export default function Body({ myName, loggedIn }) {
    return (
        <div className="Body">
            <RouteTab myName={myName} loggedIn={loggedIn} />
        </div>
    );
}

Body.propTypes = {
    myName: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
