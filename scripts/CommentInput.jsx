import React, { useState } from 'react';
import CommentInputText from './CommentInputText';
import CommentInputButton from './CommentInputButton';

export default function CommentInput() {
  // Create something to keep track of what's currently in the input
  const [currIn, updateCurrIn] = useState(() => '');

  // Submit current text and clear the field
  function getInput() {
    console.log(currIn);
    updateCurrIn(() => '');
  }

  // Update the input field
  function changeIn(curr) {
    updateCurrIn(() => curr);
  }

  return (
    <div className="comment-input">
      <CommentInputText
        onChange={changeIn}
        input={currIn}
      />
      <CommentInputButton OnPress={getInput} />
    </div>
  );
}
