import React, { useState, useEffect } from 'react';
import { Socket } from '../Socket';
import NationalPark from './NationalPark';

const NationalParks = () => {
    const [nationalParks, setNationalParks] = useState([]);

    useEffect(() => {
        Socket.emit('get national parks');
        Socket.on('national parks', (data) => {
            setNationalParks(data.parks);
        });
        return () => {
            Socket.off('national parks');
        };
    }, []);

    return (
        <div className="park-container">
            <h1 className="header">
                NationalParks
            </h1>
            <div className="parks">
                {nationalParks.map((park) => (
                    <NationalPark park={park} key={park.id} />
                    ))}
            </div>
        </div>
    );
};

export default NationalParks;
