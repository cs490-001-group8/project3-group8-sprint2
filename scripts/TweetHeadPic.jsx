import React from 'react';
import PropTypes from 'prop-types';

export default function TweetHeadPic({ tweetUserPic }) {
    return (
        <div className="tweet-head-pic">
            <img src={tweetUserPic} />
        </div>
    );
}

TweetHeadPic.propTypes = {
    tweetUserPic: PropTypes.string.isRequired,
};
