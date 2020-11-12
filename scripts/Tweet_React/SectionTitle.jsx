import React from 'react';
import PropTypes from 'prop-types';

export default function SectionTitle({ title }) {
    return (
        <div className="tweets-title">
            {title}
        </div>
    );
}

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
};
