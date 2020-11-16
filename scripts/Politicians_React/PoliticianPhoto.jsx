import React from 'react';
import PropTypes from 'prop-types';

export default function PoliticianPhoto({ photo }) {
    return (
        <div className="politician-photo">
            <image src={photo} alt="" />
        </div>
    );
}

PoliticianPhoto.propTypes = {
    photo: PropTypes.string.isRequired,
};
