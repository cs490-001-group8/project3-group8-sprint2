import React from 'react';
import PropTypes from 'prop-types';

export default function CommentInputButton({ OnPress }) {
    return (
        <button className="comment-input-button" type="button" onClick={OnPress}>
            Send
        </button>
    );
}

CommentInputButton.propTypes = {
    OnPress: PropTypes.func.isRequired,
};
