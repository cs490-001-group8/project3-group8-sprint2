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
                        <a className="comment-like-button" onClick={likeComment} onKeyDown={likeComment} role="button" tabIndex={0}>
                            <img src="../static/images/likes/likes_like.png" className="like-icon" alt="" />
                            <img src="../static/images/likes/likes_like-to-nolike.png" className="other-icon" alt="" />
                        </a>
                        <span className="like-count">{commentLikes + 1}</span>
                    </div>
                );
            }

            return (
                <div className="comment-foot">
                    <a className="comment-like-button" onClick={likeComment} onKeyDown={likeComment} role="button" tabIndex={0}>
                        <img src="../static/images/likes/likes_like.png" className="like-icon" alt="" />
                        <img src="../static/images/likes/likes_like-to-nolike.png" className="other-icon" alt="" />
                    </a>
                    <span className="like-count">{commentLikes}</span>
                </div>
            );
        }
        if (minusOnes.includes(commentId)) {
            return (
                <div className="comment-foot">
                    <a className="comment-like-button" onClick={likeComment} onKeyDown={likeComment} role="button" tabIndex={0}>
                        <img src="../static/images/likes/likes_nolike.png" className="like-icon" alt="" />
                        <img src="../static/images/likes/likes_nolike-to-like.png" className="other-icon" alt="" />
                    </a>
                    <span className="like-count">{commentLikes - 1}</span>
                </div>
            );
        }

        return (
            <div className="comment-foot">
                <a className="comment-like-button" onClick={likeComment} onKeyDown={likeComment} role="button" tabIndex={0}>
                    <img src="../static/images/likes/likes_nolike.png" className="like-icon" alt="" />
                    <img src="../static/images/likes/likes_nolike-to-like.png" className="other-icon" alt="" />
                </a>
                <span className="like-count">{commentLikes}</span>
            </div>
        );
    }
    return (
        <div className="comment-foot">
            <span className="comment-like-button">
                <img src="../static/images/likes/likes_nolike.png" alt="" />
            </span>
            <span className="like-count">{commentLikes}</span>
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
