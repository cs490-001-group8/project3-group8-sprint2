import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Socket } from '../Socket';
import CommentInputText from './CommentInputText';
import CommentInputButton from './CommentInputButton';

export default function CommentInput({ currTab, myName }) {
    // Create something to keep track of what's currently in the input
    const [currIn, updateCurrIn] = useState(() => '');

    // Submit current text and clear the field
    function getInput() {
        Socket.emit('new comment', {
            text: currIn,
            name: myName,
            tab: currTab,
        });
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
              onEnter={getInput}
            />
            <CommentInputButton OnPress={getInput} />
        </div>
    );
}

CommentInput.propTypes = {
    currTab: PropTypes.string.isRequired,
    myName: PropTypes.string.isRequired,
};
