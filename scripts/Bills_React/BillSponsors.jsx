import React from 'react';
import PropTypes from 'prop-types';
import Bill from './Bill';

export default function BillSponsors({ billSponsors }) {
    return (
        <div className="bill-sponsors">
            Sponsors: 
            <ul>
                {billSponsors.map((sponsor, i) => (
                    <li key={i}>{sponsor}</li>
                ))}
            </ul>
        </div>
    );
}

BillSponsors.propTypes = {
    billSponsors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
