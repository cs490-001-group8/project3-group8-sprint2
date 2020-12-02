import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

export default function OAuthButton({ logIn, setProfilePic }) {
    const clientID = '881732433179-i733jq65m0j09pio425p40hosd8r2klf.apps.googleusercontent.com';

    function successGoogle(response) {
        logIn({
            newName: response.profileObj.name,
            newEmail: response.profileObj.email,
            newType: 'Google',
        });
        setProfilePic({ url: response.profileObj.imageUrl });
    }

    function failureGoogle() {
        // eslint-disable-next-line no-alert
        alert('Failed to login with Google!');
    }

    return (
        <div className="login">
            <GoogleLogin
              clientId={clientID}
              buttonText="Login"
              onSuccess={successGoogle}
              onFailure={failureGoogle}
              id="googleButton"
            />
        </div>
    );
}

OAuthButton.propTypes = {
    logIn: PropTypes.func.isRequired,
    setProfilePic: PropTypes.func.isRequired,
};
