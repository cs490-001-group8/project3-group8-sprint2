import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ParkModal from './ParkModal';
/* eslint-disable react/forbid-prop-types */
const NationalPark = ({ park, buttonType, moveAction }) => {
    const [parkModal, setParkModal] = useState(null);

    const handleClick = () => {
        setParkModal(park);
    };

    const handleMovePark = () => {
        moveAction(park.id);
    };

    return (
        <div>
            <div className="park">
                <div className="park-header">
                    <h2><a href={park.url} target="_blank" rel="noreferrer">{park.name}</a></h2>
                    { buttonType && <button type="button" onClick={handleMovePark} className="park-move-btn btn">{buttonType}</button>}
                </div>
                <div className="park-body">
                    { park.images.length !== 0
                        ? <img src={park.images[0].url} alt="Failed to load img" />
                        : <img src="../../static/images/no-image-icon.png" alt="Static no img icon" />}
                    <p>
                        {park.description}
                    </p>
                    <button type="button" onClick={handleClick} className="park-detail-btn btn">Details</button>
                </div>
            </div>
            { parkModal && <ParkModal park={park} setParkModal={setParkModal} />}
        </div>
    );
};

export default NationalPark;

NationalPark.propTypes = {
    park: PropTypes.object.isRequired,
    buttonType: PropTypes.string.isRequired,
    moveAction: PropTypes.func.isRequired,
};
