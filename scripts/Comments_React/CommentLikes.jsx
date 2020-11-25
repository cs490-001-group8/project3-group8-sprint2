import React from 'react';
import PropTypes from 'prop-types';

export default function CommentLikes({ commentId, }) {
    return (
        <div className="comment-foot">
            {commentId}
            <button className="comment-like" />
        </div>
    );
}

CommentLikes.propTypes = {
    commentId: PropTypes.number.isRequired,
};
