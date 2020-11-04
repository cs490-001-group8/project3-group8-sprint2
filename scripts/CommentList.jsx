import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

export default function CommentList({ comments }) {
  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <Comment
          commentBody={comment.text}
          commentName={comment.name}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};
