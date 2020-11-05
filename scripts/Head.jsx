import React from 'react';
import PropTypes from 'prop-types';
import OAuthButton from './OAuthButton';
import LoggedIn from './LoggedIn';
import HeadTitle from './HeadTitle';

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
    </div>
  );
}

Head.propTypes = {
  logIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
