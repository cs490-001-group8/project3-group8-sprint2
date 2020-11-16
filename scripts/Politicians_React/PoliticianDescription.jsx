import React from 'react';
import PropTypes from 'prop-types';

export default function PoliticianDescription({ district, party, chamber }) {
    return (
        <div className="politician-description">
            {party} member of the {chamber} chamber in the {district} district.
        </div>
    );
}

PoliticianDescription.propTypes = {
    district: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    chamber: PropTypes.string.isRequired,
};
