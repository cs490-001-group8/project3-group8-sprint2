import React from 'react';
import PropTypes from 'prop-types';
import PoliticianBody from './PoliticianBody';
import PoliticianPhoto from './PoliticianPhoto';

export default function Politician({
    name, photo, website, district, party, chamber,
}) {
    return (
        <li className="politician">
            <PoliticianPhoto photo={photo} />
            <PoliticianBody
              name={name}
              website={website}
              district={district}
              party={party}
              chamber={chamber}
            />
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
