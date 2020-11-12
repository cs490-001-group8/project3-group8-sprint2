import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

export default function TweetList({ tweets }) {
    return (
        <ul className="tweet-list">
            {tweets.map((tweet) => (
                <Tweet
                  tweetUserPic={tweet.ppic}
                  tweetUserName={tweet.uname}
                  tweetScreenName={tweet.sname}
                  tweetBody={tweet.text}
                  tweetTime={tweet.time}
                  tweetDate={tweet.date}
                />
      ))}
        </ul>
    );
}

TweetList.propTypes = {
    tweets: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        sname: PropTypes.string,
        ppic: PropTypes.string,
        uname: PropTypes.string,
        time: PropTypes.string,
        date: PropTypes.string,
    })).isRequired,
};
