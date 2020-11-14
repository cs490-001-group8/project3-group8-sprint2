import React from 'react';
import PropTypes from 'prop-types';
import BillTitle from './BillTitle';

export default function Bill({ billTitle, billUpdate, billSponsors })
{
    return (
        <li className="bill">
            <BillTitle billTitle={billTitle} />
            {billUpdate}
            {billSponsors}
        </li>
    );
}

Bill.propTypes = {
    billTitle: PropTypes.string.isRequired,
    billUpdate: PropTypes.string.isRequired,
    billSponsors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
