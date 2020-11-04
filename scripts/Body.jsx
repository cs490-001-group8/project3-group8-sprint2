import React from 'react';
import PropTypes from 'prop-types';
import CommentBlock from './CommentBlock';

export default function Body({ myName }) {
  return (
    <div className="Body">
      This is a body.
      <CommentBlock currTab="Home" myName={myName} />
    </div>
  );
}

Body.propTypes = {
  myName: PropTypes.string.isRequired,
};
