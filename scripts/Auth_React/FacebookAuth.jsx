import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

export default function FacebookAuth({ logIn }) {
    function responseFacebook(response) {
        logIn({
            newName: response.name,
            newEmail: response.email,
            loginType: 'Facebook',
        });
    }

    function failureFacebook() {
        // eslint-disable-next-line no-alert
        alert('Failed to login with Facebook!');
    }

    return (
        <div className="login">
            <FacebookLogin
              appId="856995921505171"
              autoLoad={false}
              fields="name, email"
              callback={responseFacebook}
              onFailure={failureFacebook}
              cookie={false}
              size="small"
              icon="fa-facebook"
            />
        </div>
    );
}

FacebookAuth.propTypes = {
    logIn: PropTypes.func.isRequired,
};
