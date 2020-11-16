import React from 'react';
import PropTypes from 'prop-types';

export default function PoliticianPhoto({ photo }) {
    return (
        <img className="politician-photo" src={photo} alt="This person has not uploaded their photo" />
    );
}

PoliticianPhoto.propTypes = {
    photo: PropTypes.string.isRequired,
};
