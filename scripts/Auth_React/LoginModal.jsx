import React from 'react';
import PropTypes from 'prop-types';
import FacebookAuth from './FacebookAuth';
import OAuthButton from './OAuthButton';

const LoginModal = ({
    logIn, display, setDisplay, setProfilePic,
}) => {
    const modalDisplay = {
        display,
    };

    const handleClick = () => {
        setDisplay('none');
    };

    return (
        <div className="modal" style={modalDisplay}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Login</h2>
                    <button type="button" onClick={handleClick} className="close">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="facebook-button">
                        <FacebookAuth logIn={logIn} setProfilePic={setProfilePic} />
                    </div>
                    <div className="google-button">
                        <OAuthButton logIn={logIn} setProfilePic={setProfilePic} />
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginModal.propTypes = {
    display: PropTypes.string.isRequired,
    logIn: PropTypes.func.isRequired,
    setProfilePic: PropTypes.func.isRequired,
    setDisplay: PropTypes.func.isRequired,
};

export default LoginModal;
