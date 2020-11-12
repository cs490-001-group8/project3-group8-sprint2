import React from 'react';
import WidgetTitle from './WidgetTitle';
import GoogleTrafficView from './Traffic_React/GoogleTrafficView';

export default function TrafficWidget() {
    return (
        <div className="widget">
            <WidgetTitle title="Traffic" />
            <GoogleTrafficView />
        </div>
    );
}
