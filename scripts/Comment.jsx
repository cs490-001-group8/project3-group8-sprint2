import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ commentBody, commentName, commentTime }) {
  return (
    <li className="comment">
      <span className="comment-name">
        {commentName}
        :
        {' '}
        {commentTime}
      </span>
      <br />
      <span className="comment-body">{commentBody}</span>
    </li>
  );
}

Comment.propTypes = {
  commentBody: PropTypes.string.isRequired,
  commentName: PropTypes.string.isRequired,
  commentTime: PropTypes.string.isRequired,
};
