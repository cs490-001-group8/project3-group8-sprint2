import React from 'react';
import Tweet from './Tweet';
import WidgetTitle from './WidgetTitle';

export default function TweetWidget() {
    return (
        <div className="widget">
            <WidgetTitle title="Tweets" />

            <Tweet
              tweetUserPic="https://i.kym-cdn.com/entries/icons/facebook/000/035/196/cover10.jpg"
              tweetUserName="jfk"
              tweetScreenName="ImJfk"
              tweetBody="Hello I am jfk"
              tweetTime="7"
              tweetDate="11/2/2020"
            />
        </div>
    );
}
