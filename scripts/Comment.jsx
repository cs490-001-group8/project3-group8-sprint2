import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ commentBody, commentName }) {
  return (
    <li className="comment">
      <div className="comment-name">{commentName}</div><div className="comment-body">{commentBody}</div>
    </li>
  );
}

Comment.propTypes = {
  commentBody: PropTypes.string.isRequired,
  commentName: PropTypes.string.isRequired,
};
