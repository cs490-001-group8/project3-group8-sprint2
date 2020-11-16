import React from 'react';
import PropTypes from 'prop-types';

export default function PoliticianPhoto({ photo }) {
    return (
        <img className="politician-photo" src={photo} alt="" />
    );
}

PoliticianPhoto.propTypes = {
    photo: PropTypes.string.isRequired,
};
