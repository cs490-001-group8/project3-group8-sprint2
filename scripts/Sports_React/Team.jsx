import React from 'react';
import PropTypes from 'prop-types';

export default function Team({ Teams }) {
    return (
        <li className="sports">
            <img className="sports-photo" src={`../static/images/sport/${Teams.name}.png`} alt="Team Logo" />
            <a href={Teams.link}>{Teams.name}</a>
        </li>
    );
}

Team.propTypes = {
    Teams: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
    })).isRequired,
};
