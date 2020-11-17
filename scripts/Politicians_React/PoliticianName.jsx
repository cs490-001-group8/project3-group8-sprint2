import React from 'react';
import PropTypes from 'prop-types';

export default function PoliticianName({ name }) {
    return (
        <div className="politician-name">
            {name}
        </div>
    );
}

PoliticianName.propTypes = {
    name: PropTypes.string.isRequired,
};
