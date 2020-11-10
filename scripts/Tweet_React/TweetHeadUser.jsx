import React from 'react';
import PropTypes from 'prop-types';

export default function TweetHeadUser({ tweetUserName, tweetScreenName }) {
    return (
        <div className="tweet-head-user">
            <span className="tweet-head-user-name">{tweetUserName}</span>
            {' '}
            <br />
            <span className="tweet-head-user-sname">
                @
                <span className="tweet-head-user-sname-r">{tweetScreenName}</span>
            </span>
        </div>
    );
}

TweetHeadUser.propTypes = {
    tweetUserName: PropTypes.string.isRequired,
    tweetScreenName: PropTypes.string.isRequired,
};
