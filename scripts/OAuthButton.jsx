import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Socket } from './Socket';

export default function OAuthButton() {
  let clientID = '881732433179-i733jq65m0j09pio425p40hosd8r2klf.apps.googleusercontent.com';
  
  const responseGoogle = (response) => {
    let userObject = {
      'id': response.profileObj.googleId,
      'name': response.profileObj.name,
      'image': response.profileObj.imageUrl,
      'email': response.profileObj.email
    }
    
    Socket.emit('user login', userObject);
  }

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      id="googleButton"
    />
  )
}