import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ParkModal = ({ park, setParkModal }) => {
    const [parkDisplay, setParkDisplay] = useState({ display: 'block' });

    const handleClick = () => {
        setParkDisplay(() => { 'none'; });
        setParkModal(null);
    };

    return (
        <div className="park-modal modal" style={parkDisplay}>
            <div className="modal-header">
                <h2>{park.name}</h2>
                <button type="button" onClick={handleClick} className="close">&times;</button>
            </div>
            <div className="modal-content">
                { park.activities.length > 1 && (
                <div className="activities">
                    <h3>Activities</h3>
                    <ul>
                        {park.activities.map((each) => <li>{each}</li>)}
                    </ul>
                </div>
)}
            </div>
        </div>
    );
};

export default ParkModal;

ParkModal.propTypes = {
    park: PropTypes.shape.isRequired,
    setParkModal: PropTypes.func.isRequired,
};
