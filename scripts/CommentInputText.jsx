import React from 'react';
import PropTypes from 'prop-types';

export default function CommentInputText({ input, onChange }) {
  return (
    <textarea
      className="comment-input-text"
      value={input}
      onChange={(userIn) => onChange(userIn.target.value)}
    />
  );
}

CommentInputText.propTypes = {
  onChange: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
};
