import React from 'react';
import PropTypes from 'prop-types';

export default function BillSponsors({ billSponsors }) {
    return (
        <div className="bill-sponsors">
            Sponsors:
            <ul>
                {billSponsors.map((sponsor) => (
                    <li>{sponsor}</li>
                ))}
            </ul>
        </div>
    );
}

BillSponsors.propTypes = {
    billSponsors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
