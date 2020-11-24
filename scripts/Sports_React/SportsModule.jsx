import React, { useEffect, useState } from 'react';
import Team from './Team';
import WidgetTitle from '../WidgetTitle';
import { Socket } from '../Socket';

export default function SportsModule() {
    const [teams, setTeams] = useState(() => []);

    useEffect(() => {
        Socket.on('send sport', (data) => {
            setTeams(() => data.teams);
        });

        Socket.emit('get sport');
    }, []);

    return (
        <div className="widget">
            <WidgetTitle title="Sports Team" />

            <ul className="bill-list">
                {teams.map((team) => (
                    <Team
                      team={team}
                    />
                ))}
            </ul>
        </div>
    );
}
