import React from 'react';
import PropTypes from 'prop-types';
import CommentBlock from './CommentBlock';
import GoogleTrafficView from './GoogleTrafficView';

export default function Body({ myName, loggedIn }) {
  return (
    <div className="Body">
      <GoogleTrafficView />
      <CommentBlock currTab="Home" myName={myName} loggedIn={loggedIn} />
    </div>
  );
}

Body.propTypes = {
  myName: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
