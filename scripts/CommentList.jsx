import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

export default function CommentList({ comments, loggedIn }) {
  
  if(loggedIn)
  {
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
  else
  {
    return (
      <ul className="comment-list-loggedout">
        {comments.map((comment) => (
          <Comment
            commentBody={comment.text}
            commentName={comment.name}
          />
        ))}
      </ul>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
