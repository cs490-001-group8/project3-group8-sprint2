import React from 'react';
import PropTypes from 'prop-types';

export default function BillTitle({ billTitle })
{
    return (
        <div className="bill-title">
            {billTitle}
        </div>
    );
}

BillTitle.propTypes = {
    billTitle: PropTypes.string.isRequired,
};
