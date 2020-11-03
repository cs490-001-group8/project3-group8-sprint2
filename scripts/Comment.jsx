import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ commentBody }) {
  return (
    <li>
      <div className="Comment">
        {commentBody}
      </div>
    </li>
  );
}

Comment.propTypes = {
  commentBody: PropTypes.string.isRequired,
};
