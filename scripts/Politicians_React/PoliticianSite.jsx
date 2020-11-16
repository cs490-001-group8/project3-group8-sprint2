import React from 'react';
import PropTypes from 'prop-types';

export default function PoliticianBody({ website }) {
    return (
        <div className="politician-site">
            <a href={website}>{website}</a>
        </div>
    );
}

PoliticianBody.propTypes = {
    website: PropTypes.string.isRequired,
};
