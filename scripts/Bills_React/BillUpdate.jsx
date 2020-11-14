import React from 'react';
import PropTypes from 'prop-types';

export default function BillUpdate({ billUpdate, billAction }) {
    return (
        <div className="bill-update">
            Last update:
            {' '}
            {billUpdate}
            ,
            {' '}
            {billAction}
        </div>
    );
}

BillUpdate.propTypes = {
    billUpdate: PropTypes.string.isRequired,
    billAction: PropTypes.string.isRequired,
};
