import React from 'react';
import PropTypes from 'prop-types';
import Bill from './Bill';

export default function BillsList({ bills }) {
    return (
        <ul className="bill-list">
            {bills.map((bill) => (
                <Bill billTitle={bill.title} billUpdate={bill.updated_at} billAction={bill.last_action} billSponsors={bill.sponsors} />
            ))}
        </ul>
    );
}

BillsList.propTypes = {
    bills: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        updated_at: PropTypes.string,
        last_action: PropTypes.string,
        sponsors: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
};
