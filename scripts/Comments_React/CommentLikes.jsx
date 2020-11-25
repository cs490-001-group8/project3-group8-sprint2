import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';

export default function CommentLikes({ commentId, commentLikes }) {
    const [selected, changeSelected] = useState(() => false);

    function likeComment() {
        changeSelected((last) => !last);
        Socket.emit('like comment', {
            comment_id: commentId,
            like: !selected,
        });
    }

    useEffect(() => {
    }, [commentLikes]);

    return (
        <div className="comment-foot">
            {commentLikes + selected}
            <input type="checkbox" onClick={likeComment} value={selected} />
            <span className="comment-like" />
        </div>
    );
}

CommentLikes.propTypes = {
    commentId: PropTypes.number.isRequired,
    commentLikes: PropTypes.number.isRequired,
};
