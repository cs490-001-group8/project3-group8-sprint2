import React, { useState, useEffect } from 'react';
import { Socket } from '../Socket';
import WidgetTitle from '../WidgetTitle';
import PoliticianList from './PoliticianList';

export default function PoliticiansWidget() {
    const [politicians, getPoliticians] = useState(() => []);

    useEffect(() => {
        Socket.on('send politicians', (data) => {
            getPoliticians(() => data.politicians);
        });

        Socket.emit('get politicians');
    }, []);

    return (
        <div className="widget">
            <WidgetTitle title="Politicians" />

            <PoliticianList politicians={politicians} />
        </div>
    );
}
