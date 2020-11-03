import React from 'react';
import PropTypes from 'prop-types';
import OAuthButton from './OAuthButton';

export default function Head({ logIn }) {
  return (
    <div className="Head">
      This is a Head.
      <OAuthButton logIn={logIn} />
    </div>
  );
}

Head.propTypes = {
  logIn: PropTypes.func.isRequired,
};
