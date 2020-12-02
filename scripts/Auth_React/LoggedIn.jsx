import React from 'react';
import PropTypes from 'prop-types';

export default function LoggedIn({ profile_pic }) {
    return (
        <div className="logged-in">
            <img className="user-profile-pic" src={profile_pic} />Logged In
        </div>
    );
}

LoggedIn.propTypes = {
    profile_pic: PropTypes.string.isRequired,
};
