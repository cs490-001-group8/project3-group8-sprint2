import React, { useState, useEffect } from 'react';
import { Socket } from '../Socket';
import NationalPark from './NationalPark';

const NationalParks = () => {
    const [favoriteParks, setFavoriteParks] = useState([]);
    const [otherParks, setOtherParks] = useState([]);

    useEffect(() => {
        Socket.emit('get national parks');
        Socket.on('national parks', (data) => {
            setOtherParks(data.parks);
        });
        return () => {
            Socket.off('national parks');
        };
    }, []);

    const moveFromOther = (id) => {
        const parkToMove = otherParks.filter((each) => each.id === id)[0];
        setOtherParks(() => otherParks.filter((each) => each.id !== id));
        setFavoriteParks((prev) => [parkToMove, ...prev]);
    };
    const moveFromFavorite = (id) => {
        const parkToMove = favoriteParks.filter((each) => each.id === id)[0];
        setFavoriteParks(() => favoriteParks.filter((each) => each.id !== id));
        setOtherParks((prev) => [parkToMove, ...prev]);
    };

    return (
        <div className="park-container">
            <div className="park-container-header">
                <h1>
                    NationalParks
                </h1>
            </div>
            <div className="favorite-parks">
                <h3>Favorite Parks</h3>
                <div className="parks">
                    {favoriteParks.map((park) => (
                        <NationalPark
                          park={park}
                          buttonType="&#8681;"
                          moveAction={moveFromFavorite}
                          key={park.id}
                        />
                        ))}
                </div>
            </div>
            <div className="other-parks">
                <h3>Other Parks</h3>
                <div className="parks">
                    {otherParks.map((park) => (
                        <NationalPark
                          park={park}
                          buttonType="&#8679;"
                          moveAction={moveFromOther}
                          key={park.id}
                        />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default NationalParks;
