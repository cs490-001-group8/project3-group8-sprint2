import React from 'react';
import PropTypes from 'prop-types';

export default function TweetText({ tweetBody }) {
    return (
        <div className="tweet-text">
            {tweetBody}
        </div>
    );
}

TweetText.propTypes = {
    tweetBody: PropTypes.string.isRequired,
};
