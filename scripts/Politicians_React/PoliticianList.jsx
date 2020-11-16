import React from 'react';
import PropTypes from 'prop-types';
import Politician from './Politician';

export default function PoliticianList({ politicians }) {
    return (
        <ul className="bill-list">
            {politicians.map((pol) => (
                <Politician
                  name={pol.name}
                  photo={pol.photo}
                  website={pol.website}
                  district={pol.district}
                  party={pol.party}
                  chamber={pol.chamber}
                />
            ))}
        </ul>
    );
}

PoliticianList.propTypes = {
    politicians: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        photo: PropTypes.string,
        website: PropTypes.string,
        district: PropTypes.string,
        party: PropTypes.string,
        chamber: PropTypes.string,
    })).isRequired,
};
