import React from 'react';
import PropTypes from 'prop-types';
import CommentBlock from './CommentBlock';
import TabWidgets from './TabWidgets';

export default function TabContent({
  myName, loggedIn, currTab, currTabComment,
}) {
  return (
    <div className="tab-content">
      <TabWidgets currTab={currTab} />
      <CommentBlock currTab={currTabComment} myName={myName} loggedIn={loggedIn} />
    </div>
  );
}

TabContent.propTypes = {
  myName: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  currTab: PropTypes.string.isRequired,
  currTabComment: PropTypes.string.isRequired,
};
