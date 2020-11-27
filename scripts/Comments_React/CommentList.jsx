import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

export default function CommentList({
    comments, loggedIn, likedComments, addToLikes, removeFromLikes,
}) {
    if (loggedIn) {
        return (
            <ul className="comment-list">
                {comments.map((comment) => (
                    <Comment
                      commentId={comment.id}
                      commentBody={comment.text}
                      commentName={comment.name}
                      commentTime={comment.time}
                      commentLikes={comment.likes}
                      loggedIn={loggedIn}
                      likedComments={likedComments}
                      addToLikes={addToLikes}
                      removeFromLikes={removeFromLikes}
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
                  commentLikes={comment.likes}
                  loggedIn={loggedIn}
                  likedComments={likedComments}
                  addToLikes={addToLikes}
                  removeFromLikes={removeFromLikes}
                />
      ))}
        </ul>
    );
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        name: PropTypes.string,
        time: PropTypes.time,
        likes: PropTypes.number,
    })).isRequired,
    loggedIn: PropTypes.bool.isRequired,
    likedComments: PropTypes.arrayOf(PropTypes.number).isRequired,
    addToLikes: PropTypes.func.isRequired,
    removeFromLikes: PropTypes.func.isRequired,
};
