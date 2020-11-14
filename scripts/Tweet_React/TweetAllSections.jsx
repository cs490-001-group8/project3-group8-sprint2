import React, { useState, useEffect } from 'react';
import TweetsSection from './TweetsSection';
import { Socket } from '../Socket';

export default function TweetAllSections() {
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
        <div className="tweet-all-sections">
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
