import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

export default function OAuthButton({ logIn }) {
    const clientID = '881732433179-i733jq65m0j09pio425p40hosd8r2klf.apps.googleusercontent.com';

    function successGoogle(response) {
        logIn(response.profileObj.name);
    }

    return (
        <div className="login">
            <GoogleLogin
              clientId={clientID}
              buttonText="Login"
              onSuccess={successGoogle}
              id="googleButton"
            />
        </div>
    );
}

OAuthButton.propTypes = {
    logIn: PropTypes.func.isRequired,
};
