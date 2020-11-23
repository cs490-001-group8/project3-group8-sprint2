import React from 'react';
import WidgetTitle from '../WidgetTitle';
import GoogleTrafficView from './GoogleTrafficView';

export default function TrafficWidget() {
    return (
        <div className="widget">
            <WidgetTitle title="Traffic" />
            <GoogleTrafficView />
        </div>
    );
}
