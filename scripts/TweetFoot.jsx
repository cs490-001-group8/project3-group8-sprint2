import React from 'react';
import PropTypes from 'prop-types';

export default function TweetFoot({ tweetTime, tweetDate }) {
    return (
        <div className="tweet-foot">
            <span className="tweet-foot-time">{tweetTime}</span>
            {' '}
            <span className="tweet-foot-date">{tweetDate}</span>
        </div>
    );
}

TweetFoot.propTypes = {
    tweetTime: PropTypes.string.isRequired,
    tweetDate: PropTypes.string.isRequired,
};
