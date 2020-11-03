import React from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

export default function CommentBlock() {
  return (
    <div className="Comment-Block">
      <CommentList />
      <CommentInput />
    </div>
  );
}
