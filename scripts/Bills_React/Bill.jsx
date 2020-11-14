import React from 'react';
import PropTypes from 'prop-types';
import BillTitle from './BillTitle';
import BillUpdate from './BillUpdate';
import BillSponsors from './BillSponsors';

export default function Bill({ billTitle, billUpdate, billAction, billSponsors })
{
    return (
        <li className="bill">
            <BillTitle billTitle={billTitle} />
            <BillUpdate billUpdate={billUpdate} billAction={billAction} />
            <BillSponsors billSponsors={billSponsors} />
        </li>
    );
}

Bill.propTypes = {
    billTitle: PropTypes.string.isRequired,
    billUpdate: PropTypes.string.isRequired,
    billAction: PropTypes.string.isRequired,
    billSponsors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
