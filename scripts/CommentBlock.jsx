import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Socket } from './Socket';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import CommentTitle from './CommentTitle';

export default function CommentBlock({ currTab, myName }) {
  const [comments, updateComments] = useState(() => []);

  useEffect(() => {
    Socket.on('new comment', (data) => {
      updateComments((oldComments) => [{ text: data.text }].concat(oldComments));
    });

    Socket.on('old comments', (data) => {
      updateComments(() => data.comments);
    });

    Socket.emit('get comments', { tab: 'Home' });
  }, []);

  return (
    <div className="Comment-Block">
      <CommentTitle />
      <CommentList comments={comments} />
      <CommentInput currTab={currTab} myName={myName} />
    </div>
  );
}

CommentBlock.propTypes = {
  currTab: PropTypes.string.isRequired,
  myName: PropTypes.string.isRequired,
};
