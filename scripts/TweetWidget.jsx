import React, { useState, useEffect } from 'react';
import TweetsSection from './Tweet_React/TweetsSection';
import { Socket } from './Socket';
import WidgetTitle from './WidgetTitle';

export default function TweetWidget() {
    const [govTweet, getGovTweet] = useState(() => []);
    const [senTweets, getSenTweets] = useState(() => []);

    useEffect(() => {
        Socket.on('political tweets', (data) => {
            getGovTweet(() => data.gov);
            getSenTweets(() => data.sen);
        });

        Socket.emit('get political tweets');
    }, []);

    return (
        <div className="widget">
            <WidgetTitle title="Politicians' Tweets" />

            <TweetsSection
              tweets={govTweet}
              sectionTitle="Govenor"
            />
            <TweetsSection
              tweets={senTweets}
              sectionTitle="Senators"
            />
        </div>
    );
}
