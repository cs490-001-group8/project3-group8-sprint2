import React from 'react';
import PropTypes from 'prop-types';
import CommentLikes from './CommentLikes';

export default function Comment({
    commentBody, commentName, commentTime, commentId, commentLikes,
}) {
    return (
        <li className="comment">
            <div className="comment-info">
                <span className="comment-info-name">{commentName}</span>
                <span className="comment-info-time">{commentTime}</span>
            </div>
            <div className="comment-body">{commentBody}</div>
            <CommentLikes commentId={commentId} commentLikes={commentLikes} />
        </li>
    );
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    commentBody: PropTypes.string.isRequired,
    commentName: PropTypes.string.isRequired,
    commentTime: PropTypes.string.isRequired,
    commentLikes: PropTypes.number.isRequired,
};
