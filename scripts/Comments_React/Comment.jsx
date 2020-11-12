import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ commentBody, commentName, commentTime }) {
    return (
        <li className="comment">
            <div className="comment-info">
                <span className="comment-info-name">{commentName}</span>
                <span className="comment-info-time">{commentTime}</span>
            </div>
            <div className="comment-body">{commentBody}</div>
        </li>
    );
}

Comment.propTypes = {
    commentBody: PropTypes.string.isRequired,
    commentName: PropTypes.string.isRequired,
    commentTime: PropTypes.string.isRequired,
};
