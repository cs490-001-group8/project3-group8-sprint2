import React from 'react';
import PropTypes from 'prop-types';

export default function Team({ team }) {
    return (
        <li className="sports">
            <h3>{team.name}</h3>
            <img className="sports-photo" src={`../static/images/sport/${team.name}.png`} alt="Team Logo" />
            <p>
                All-time Record:
                {' '}
                {team.record}
            </p>
            <p>
                Championships won:
                {' '}
                {team.won}
            </p>
            <a href={team.link}>Link to site</a>
        </li>
    );
}

Team.propTypes = {
    team: PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
        record: PropTypes.string,
        won: PropTypes.string,
    }).isRequired,
};
