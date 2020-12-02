import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoggedIn from './Auth_React/LoggedIn';
import HeadTitle from './HeadTitle';
import LoginModal from './Auth_React/LoginModal';
import FixedPlugin from './FixedPlugin';

export default function Head({ logIn, loggedIn }) {
    const [display, setDisplay] = useState('none');
    const [ppic, updatePpic] = useState('https://pyxis.nymag.com/v1/imgs/496/329/a32a4361653ee50f48ef2e5be2d85c3550-clone-high-2.rsquare.w1200.jpg');

    const handleClick = () => {
        setDisplay('block');
    };
    
    function setProfilePic({url})
    {
        updatePpic(() => url);
    }

    if (loggedIn) {
        return (
            <div className="Head">
                <HeadTitle />
                <FixedPlugin />
                <LoggedIn profile_pic={ppic} />
            </div>
        );
    }

    return (
        <div className="Head">
            <HeadTitle />
            <FixedPlugin />
            <button onClick={handleClick} type="button" className="login-button">Log In</button>
            <LoginModal logIn={logIn} setProfilePic={setProfilePic} display={display} setDisplay={setDisplay} />
        </div>
    );
}

Head.propTypes = {
    logIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};
