import React from 'react';
import PropTypes from 'prop-types';
import OAuthButton from './OAuthButton';
import LoggedIn from './LoggedIn';

export default function Head({ logIn, loggedIn }) {
  
  if (loggedIn)
  {
    return (
      <div className="Head">
        This is a Head.
        <LoggedIn />
      </div>
    );
  }
  else
  {
    return (
      <div className="Head">
        This is a Head.
        <OAuthButton logIn={logIn} />
      </div>
    );
  }
}

Head.propTypes = {
  logIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
