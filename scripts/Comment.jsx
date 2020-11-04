import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ commentBody, commentName }) {
  return (
    <li className="comment">
      <span className="comment-name">
        {commentName}
        :
        {' '}
      </span>
      <span className="comment-body">{commentBody}</span>
    </li>
  );
}

Comment.propTypes = {
  commentBody: PropTypes.string.isRequired,
  commentName: PropTypes.string.isRequired,
};
