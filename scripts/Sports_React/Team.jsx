import React from 'react';
import PropTypes from 'prop-types';

export default function Team({ team }) {
    return (
        <li className="sports">
            <img className="sports-photo" src={`../static/images/sport/${team.name}.png`} alt="Team Logo" />
            <a href={team.link}>{team.name}</a>
        </li>
    );
}

Team.propTypes = {
    team: PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
    }).isRequired,
};
