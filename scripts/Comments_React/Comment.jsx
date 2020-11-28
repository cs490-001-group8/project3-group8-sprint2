import React from 'react';
import PropTypes from 'prop-types';
import CommentLikes from './CommentLikes';

export default function Comment({
    commentBody, commentName, commentTime, commentId,
    commentLikes, loggedIn, likedComments, addToLikes,
    removeFromLikes, plusOnes, minusOnes,
}) {
    return (
        <li className="comment">
            <div className="comment-info">
                <span className="comment-info-name">{commentName}</span>
                <span className="comment-info-time">{commentTime}</span>
            </div>
            <div className="comment-body">{commentBody}</div>
            <CommentLikes
              commentId={commentId}
              commentLikes={commentLikes}
              loggedIn={loggedIn}
              likedComments={likedComments}
              addToLikes={addToLikes}
              removeFromLikes={removeFromLikes}
              plusOnes={plusOnes}
              minusOnes={minusOnes}
            />
        </li>
    );
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    commentBody: PropTypes.string.isRequired,
    commentName: PropTypes.string.isRequired,
    commentTime: PropTypes.string.isRequired,
    commentLikes: PropTypes.number.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    likedComments: PropTypes.arrayOf(PropTypes.number).isRequired,
    addToLikes: PropTypes.func.isRequired,
    removeFromLikes: PropTypes.func.isRequired,
    plusOnes: PropTypes.arrayOf(PropTypes.number).isRequired,
    minusOnes: PropTypes.arrayOf(PropTypes.number).isRequired,
};
