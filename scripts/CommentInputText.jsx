import React from 'react';
import PropTypes from 'prop-types';

export default function CommentInputText({ input, onChange, onEnter }) {
  const pressedEnter = (e) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <textarea
      className="comment-input-text"
      value={input}
      onChange={(userIn) => onChange(userIn.target.value)}
      onKeyUp={pressedEnter}
    />
  );
}

CommentInputText.propTypes = {
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
};
