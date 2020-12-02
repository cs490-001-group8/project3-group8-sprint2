import React from 'react';
import PropTypes from 'prop-types';

export default function LoggedIn({ profilePic }) {
    return (
        <div className="logged-in">
            <img className="user-profile-pic" alt="" src={profilePic} />
            Logged In
        </div>
    );
}

LoggedIn.propTypes = {
    profilePic: PropTypes.string.isRequired,
};
