import React, { useState } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key, react/forbid-prop-types */
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
            <div className="park-modal-content">
                { park.description.length > 1 && (
                <div className="description">
                    <h2>Description</h2>
                    <p>
                        {park.description}
                    </p>
                </div>
                )}
                { park.activities.length > 0 && (
                <div className="activities">
                    <h2>Activities</h2>
                    <ul>
                        {park.activities.map((each, index) => <li key={index}>{each}</li>)}
                    </ul>
                </div>
                )}
                { park.fees.length > 0 && (
                    <div>
                        <h2>Fees Information</h2>
                        <div className="fees">
                            {park.fees.map((each, index) => (
                                <div key={index}>
                                    <p>
                                        $
                                        {each.cost}
                                    </p>
                                    <p>{each.description}</p>
                                </div>
    ))}
                        </div>
                    </div>
                )}
                { (park.directionsInfo.length > 1 && park.directionsUrl.length > 1) && (
                    <div className="direction">
                        <h2>Direction Information</h2>
                        <p>
                            {park.directionsInfo}
                        </p>
                        <a href={park.directionsUrl} target="_blank" rel="noreferrer" className="anchor btn">Get Important Alerts</a>
                    </div>
                )}
                { park.operatingHours.length > 0 && (
                    <div className="operation-hours">
                        <h2>Operation Hours:</h2>
                        {park.operatingHours.map(
                            (each, index) => (
                                <div key={index}>
                                    <p>{each.description}</p>
                                    {Object.entries(each.standardHours).map(
                                    ([key, value], index2) => (
                                        <div key={index2} className="weekdays">
                                            <span className="days">{key}</span>
                                            <span className="time">{value}</span>
                                        </div>
),
                                )}
                                </div>
                        ),
)}
                    </div>
                )}
                { park.images.length > 0 && (
                    <div className="images-section">
                        <h2>Images</h2>
                        <div className="images">
                            {park.images.map((each, index) => (
                                <div key={index} className="image">
                                    <img src={each.url} alt={each.altText} width="600" height="400" />
                                    <div className="image-description">
                                        {each.caption}
                                    </div>
                                </div>
))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParkModal;

ParkModal.propTypes = {
    park: PropTypes.object.isRequired,
    setParkModal: PropTypes.func.isRequired,
};
