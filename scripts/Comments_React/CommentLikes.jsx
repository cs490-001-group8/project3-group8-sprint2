import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';

export default function CommentLikes({
    commentId, commentLikes, loggedIn, likedComments, addToLikes, removeFromLikes,
}) {
    const [selected, changeSelected] = useState(() => false);

    function likeComment() {
        if (likedComments.includes(commentId)) {
            removeFromLikes(commentId);
        } else {
            addToLikes(commentId);
        }
        changeSelected((last) => !last);
        Socket.emit('like comment', {
            comment_id: commentId,
            like: !selected,
        });
    }

    useEffect(() => {
    });

    if (loggedIn) {
        if (likedComments.includes(commentId)) {
            return (
                <div className="comment-foot">
                    {commentLikes}
                    <input type="button" className="comment-like-button liked" onClick={likeComment} />
                </div>
            );
        }
        return (
            <div className="comment-foot">
                {commentLikes}
                <input type="button" className="comment-like-button not-liked" onClick={likeComment} />
            </div>
        );
    }
    return (
        <div className="comment-foot">
            {commentLikes + selected}
            <input type="button" className="comment-like-button" onClick={likeComment} disabled />
        </div>
    );
}

CommentLikes.propTypes = {
    commentId: PropTypes.number.isRequired,
    commentLikes: PropTypes.number.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    likedComments: PropTypes.arrayOf(PropTypes.number).isRequired,
    addToLikes: PropTypes.func.isRequired,
    removeFromLikes: PropTypes.func.isRequired,
};
