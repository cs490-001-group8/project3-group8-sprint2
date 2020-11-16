import React from 'react';
import PropTypes from 'prop-types';

export default function Politician({
    name, photo, website, district, party, chamber,
}) {
    return (
        <li className="bill">
            {name}{photo}{website}{district}{party}{chamber}
        </li>
    );
}

Politician.propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    chamber: PropTypes.string.isRequired,
};
