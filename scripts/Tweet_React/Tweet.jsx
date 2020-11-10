import React from 'react';
import PropTypes from 'prop-types';
import TweetHead from './TweetHead';
import TweetText from './TweetText';
import TweetFoot from './TweetFoot';

export default function Tweet({
    tweetUserPic, tweetUserName, tweetScreenName, tweetBody, tweetTime, tweetDate,
}) {
    return (
        <li className="tweet">
            <TweetHead
              tweetUserPic={tweetUserPic}
              tweetUserName={tweetUserName}
              tweetScreenName={tweetScreenName}
            />
            <TweetText tweetBody={tweetBody} />
            <TweetFoot tweetTime={tweetTime} tweetDate={tweetDate} />
        </li>
    );
}

Tweet.propTypes = {
    tweetUserPic: PropTypes.string.isRequired,
    tweetUserName: PropTypes.string.isRequired,
    tweetScreenName: PropTypes.string.isRequired,
    tweetBody: PropTypes.string.isRequired,
    tweetTime: PropTypes.string.isRequired,
    tweetDate: PropTypes.string.isRequired,
};
