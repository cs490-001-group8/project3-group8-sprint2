import React, { useState, useEffect } from 'react';
import { Socket } from '../Socket';
import NationalPark from './NationalPark';
import WidgetTitle from '../WidgetTitle';

const NationalParks = () => {
    const [favoriteParks, setFavoriteParks] = useState([]);
    const [otherParks, setOtherParks] = useState([]);
    const [displayArrows, setDisplayArrows] = useState(false);

    useEffect(() => {
        Socket.emit('get national parks');
        Socket.on('national parks', (data) => {
            setFavoriteParks(data.favoriteParks);
            setOtherParks(data.otherParks);
        });
        Socket.on('national parks update', (data) => {
            setDisplayArrows(data.display_move_park_arrow);
        });
        return () => {
            Socket.off('national parks');
            Socket.off('national parks update');
        };
    }, []);
    useEffect(() => {

    }, [favoriteParks]);

    const moveFromOther = (id) => {
        const parkToMove = otherParks.filter((each) => each.id === id)[0];
        setOtherParks(() => otherParks.filter((each) => each.id !== id));
        setFavoriteParks((prev) => [parkToMove, ...prev]);
        Socket.emit('add favorite parks', {
            parkID: id,
        });
    };
    const moveFromFavorite = (id) => {
        const parkToMove = favoriteParks.filter((each) => each.id === id)[0];
        setFavoriteParks(() => favoriteParks.filter((each) => each.id !== id));
        setOtherParks((prev) => [parkToMove, ...prev]);
        Socket.emit('add favorite parks', {
            parkID: id,
        });
    };

    return (
        <div className="widget scroll">
            <WidgetTitle title="National Parks" />
            <div className="park-container">
                { displayArrows && (
                <div className="favorite-parks">
                    <h2>Favorite Parks</h2>
                    <div className="parks">
                        {favoriteParks.map((park) => (
                            <NationalPark
                              park={park}
                              buttonType="&#8681;"
                              moveAction={moveFromFavorite}
                              key={park.id}
                              tooltiptext="Move to other parks"
                            />
                            ))}
                    </div>
                </div>
)}
                <div className="other-parks">
                    { displayArrows && <h2>Other Parks</h2> }
                    <div className="parks">
                        {otherParks.map((park) => (displayArrows
                                ? (
                                    <NationalPark
                                      park={park}
                                      buttonType="&#8679;"
                                      moveAction={moveFromOther}
                                      key={park.id}
                                      tooltiptext="Move to favorite parks"
                                    />
)
                                : (
                                    <NationalPark
                                      park={park}
                                      buttonType=""
                                      moveAction={moveFromOther}
                                      key={park.id}
                                      tooltiptext=""
                                    />
)
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NationalParks;
