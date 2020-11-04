import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Socket } from './Socket';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import CommentTitle from './CommentTitle';

export default function CommentBlock({ currTab, myName, loggedIn }) {
  const [comments, updateComments] = useState(() => []);

  useEffect(() => {
    Socket.on('new comment', (data) => {
      updateComments((oldComments) => [
        { text: data.text, name: data.name, time: data.time }].concat(oldComments));
    });

    Socket.on('old comments', (data) => {
      updateComments(() => data.comments);
    });

    Socket.emit('get comments', { tab: currTab });
  }, []);

  useEffect(() => {
    Socket.emit('get comments', { tab: currTab });
  }, [currTab]);
  
  console.log(currTab)

  if (loggedIn) {
    return (
      <div className="Comment-Block">
        <CommentTitle />
        <CommentList comments={comments} loggedIn={loggedIn} />
        <CommentInput currTab={currTab} myName={myName} />
      </div>
    );
  }

  return (
    <div className="Comment-Block">
      <CommentTitle />
      <CommentList comments={comments} loggedIn={loggedIn} />
    </div>
  );
}

CommentBlock.propTypes = {
  currTab: PropTypes.string.isRequired,
  myName: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
