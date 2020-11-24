import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

export default function CommentList({ comments, loggedIn }) {
    if (loggedIn) {
        return (
            <ul className="comment-list">
                {comments.map((comment) => (
                    <Comment
                      commentId={comment.id}
                      commentBody={comment.text}
                      commentName={comment.name}
                      commentTime={comment.time}
                    />
        ))}
            </ul>
        );
    }

    return (
        <ul className="comment-list-loggedout">
            {comments.map((comment) => (
                <Comment
                  commentId={comment.id}
                  commentBody={comment.text}
                  commentName={comment.name}
                  commentTime={comment.time}
                />
      ))}
        </ul>
    );
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.int,
        text: PropTypes.string,
        name: PropTypes.string,
        time: PropTypes.time,
    })).isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
