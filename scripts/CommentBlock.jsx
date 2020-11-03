import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Socket } from './Socket';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

export default function CommentBlock({ currTab }) {

  const [comments, updateComments] = useState(() => [])

  useEffect(() => {
    Socket.on("new comment", (data) =>
      {
        updateComments((comments) => [{"text": data.text}].concat(comments));
      });
      
    Socket.on("old comments", (data) =>
      {
        updateComments(() => data.comments);
      });

    Socket.emit("get comments", {"tab": "Home"});
  }, []);

  return (
    <div className="Comment-Block">
      <CommentList />
      <CommentInput currTab={currTab} />
    </div>
  );
}

CommentBlock.propTypes = {
  currTab: PropTypes.string.isRequired,
};
