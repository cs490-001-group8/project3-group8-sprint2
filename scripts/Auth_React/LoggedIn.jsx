import React from 'react';
import PropTypes from 'prop-types';

export default function LoggedIn({ profilePic, userName }) {
    return (
        <div className="logged-in">
            <img className="user-profile-pic" alt="" src={profilePic} />
            Welcome,
            {' '}
            {userName.split(' ')[0]}
            !
        </div>
    );
}

LoggedIn.propTypes = {
    profilePic: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};
