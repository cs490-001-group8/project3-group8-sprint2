import React, { useState, useEffect } from 'react';
import TweetList from './Tweet_React/TweetList';
import { Socket } from './Socket';
import WidgetTitle from './WidgetTitle';

export default function TweetWidget() {
    const [govTweet, getGovTweet] = useState(() => []);
    const [senTweets, getSenTweets] = useState(() => []);

    useEffect(() => {
        Socket.on('political tweets', (data) => {
            getGovTweet(() => data.gov);
            getSenTweets(() => data.sen);
            console.log(data)
        });

        Socket.emit('get political tweets');
    }, []);
    
    return (
        <div className="widget">
            <WidgetTitle title="Politicians' Tweets" />

            <TweetList
              tweets={govTweet}
            />
            <TweetList
              tweets={senTweets}
            />
        </div>
    );
}
