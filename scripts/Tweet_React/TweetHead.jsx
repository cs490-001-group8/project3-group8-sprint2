import React from 'react';
import PropTypes from 'prop-types';
import TweetHeadPic from './TweetHeadPic';
import TweetHeadUser from './TweetHeadUser';

export default function TweetHead({ tweetUserPic, tweetUserName, tweetScreenName }) {
    return (
        <div className="tweet-head">
            <TweetHeadPic tweetUserPic={tweetUserPic} />
            <TweetHeadUser tweetUserName={tweetUserName} tweetScreenName={tweetScreenName} />
        </div>
    );
}

TweetHead.propTypes = {
    tweetUserPic: PropTypes.string.isRequired,
    tweetUserName: PropTypes.string.isRequired,
    tweetScreenName: PropTypes.string.isRequired,
};
