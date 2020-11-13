import React, { useState, useEffect } from 'react';
import { Socket } from './Socket';
import WidgetTitle from './WidgetTitle';

export default function BillsWidget() {
    const [bills, getBills] = useState(() => []);

    useEffect(() => {
        Socket.on('send bills', (data) => {
            getBills(() => data.bills);
        });

        Socket.emit('get bills');
    }, []);

    return (
        <div className="widget">
            <WidgetTitle title="Recent Bills" />

            Bills bills bills
        </div>
    );
}
