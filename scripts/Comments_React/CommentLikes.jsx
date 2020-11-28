import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';

export default function CommentLikes({
    commentId, commentLikes, loggedIn, likedComments,
    addToLikes, removeFromLikes, plusOnes, minusOnes,
}) {
    const [selected, changeSelected] = useState(() => false);

    function likeComment() {
        if (likedComments.includes(commentId)) {
            removeFromLikes(commentId);
            Socket.emit('like comment', {
                comment_id: commentId,
                like: false,
            });
        } else {
            addToLikes(commentId);
            Socket.emit('like comment', {
                comment_id: commentId,
                like: true,
            });
        }
        if (selected) changeSelected(() => false);
        else changeSelected(() => true);
    }

    if (loggedIn) {
        if (likedComments.includes(commentId)) {
            if (plusOnes.includes(commentId)) {
                return (
                    <div className="comment-foot">
                        {commentLikes + 1}
                        <input type="button" className="comment-like-button liked" onClick={likeComment} />
                    </div>
                );
            }

            return (
                <div className="comment-foot">
                    {commentLikes}
                    <input type="button" className="comment-like-button liked" onClick={likeComment} />
                </div>
            );
        }
        if (minusOnes.includes(commentId)) {
            return (
                <div className="comment-foot">
                    {commentLikes - 1}
                    <input type="button" className="comment-like-button not-liked" onClick={likeComment} />
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
            {commentLikes}
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
    plusOnes: PropTypes.arrayOf(PropTypes.number).isRequired,
    minusOnes: PropTypes.arrayOf(PropTypes.number).isRequired,
};
