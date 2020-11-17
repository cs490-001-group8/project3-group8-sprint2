import React from 'react';
import TweetAllSections from './TweetAllSections';
import WidgetTitle from '../WidgetTitle';

export default function TweetWidget() {
    return (
        <div className="widget">
            <WidgetTitle title="Politicians' Tweets" />

            <TweetAllSections />
        </div>
    );
}
