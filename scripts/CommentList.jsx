import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <div className="Comment-List">
      <ul>
        {comments.map((comment) => (
          <Comment
            commentBody={comment.text}
          />
        ))}
      </ul>
    </div>
  );
}

CommentList.propTypes = {
  currTab: PropTypes.arrayOf(PropTypes.string).isRequired,
};
