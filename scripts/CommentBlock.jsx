import React from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

export default function CommentBlock({ currTab }) {
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
