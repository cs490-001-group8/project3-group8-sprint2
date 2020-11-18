import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ParkModal from './ParkModal';

const NationalPark = ({ park }) => {
    const [parkModal, setParkModal] = useState(null);

    const handleClick = () => {
        setParkModal(park);
    };
    return (
        <div>
            <div className="park">
                <a href={park.url} target="_blank" rel="noreferrer"><h2>{park.name}</h2></a>
                { park.images.length !== 0 && <img src={park.images[0].url} alt="Not Found" /> }
                <p>
                    {park.description}
                    <button type="button" onClick={handleClick}>more</button>
                </p>
            </div>
            { parkModal && <ParkModal park={park} setParkModal={setParkModal} />}
        </div>
    );
};

export default NationalPark;

NationalPark.propTypes = {
    park: PropTypes.shape.isRequired,
};
