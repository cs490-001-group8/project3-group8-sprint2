import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoggedIn from './Auth_React/LoggedIn';
import HeadTitle from './HeadTitle';
import LoginModal from './Auth_React/LoginModal';

export default function Head({ logIn, loggedIn }) {
    const [display, setDisplay] = useState('none');

    const handleClick = () => {
        setDisplay('block');
    };

    if (loggedIn) {
        return (
            <div className="Head">
                <HeadTitle />
                <LoggedIn />
            </div>
        );
    }

    return (
        <div className="Head">
            <HeadTitle />
            <button onClick={handleClick} type="button" className="login-button">Log In</button>
            <LoginModal logIn={logIn} display={display} setDisplay={setDisplay} />
        </div>
    );
}

Head.propTypes = {
    logIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
