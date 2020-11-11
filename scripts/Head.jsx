import React from 'react';
import PropTypes from 'prop-types';
import OAuthButton from './OAuthButton';
import LoggedIn from './LoggedIn';
import HeadTitle from './HeadTitle';
import FacebookAuth from './FacebookAuth';

export default function Head({ logIn, loggedIn }) {
    if (loggedIn) {
        return (
            <div className="Head">
                <HeadTitle />
                <LoggedIn />
            </div>
        );
    }

    return (
        <div className="Head">
            <HeadTitle />
            <OAuthButton logIn={logIn} />
            <FacebookAuth logIn={logIn} />
        </div>
    );
}

Head.propTypes = {
    logIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
