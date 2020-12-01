import React, { useState } from 'react';
import { Socket } from './Socket';
import Body from './Body';
import Head from './Head';
import Footer from './Footer';
import ThemeContext from './ThemeContext';

export default function App() {
    const [name, setName] = useState(() => '');
    const [email, setEmail] = useState(() => '');
    const [loginType, setLoginType] = useState(() => '');
    const [loggedIn, setLoggedIn] = useState(() => false);
    const [image, setImage] = useState(localStorage.getItem('image'));
    const [color, setColor] = useState(localStorage.getItem('color'));
    const contextValue = {
        contextImage: [image, setImage],
        contextColor: [color, setColor],
        contextName: [name, setName],
        contextEmail: [email, setEmail],
        contextLoginType: [loginType, setLoginType],
    };

    function saveChanges(img, clr) {
        setColor(clr);
        setImage(img);
        localStorage.setItem('color', clr);
        localStorage.setItem('image', img);
    }

    function logIn({ newName, newEmail, newType }) {
        setName(() => newName);
        setEmail(() => newEmail);
        setLoginType(() => newType);
        setLoggedIn(() => true);

        Socket.emit('log in', {
            newName,
            newEmail,
            loginType: newType,
        });
        Socket.on('theme', (data) => {
            if (data.name === newName && data.email === newEmail
                && data.loginType === newType) {
                if (data.pattern === 'color') saveChanges('', data.value);
                else saveChanges(data.value, '');
            }
        });
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className="App">
                <Head loggedIn={loggedIn} logIn={logIn} />
                <Body loggedIn={loggedIn} myName={name} myEmail={email} myLoginType={loginType} />
                <Footer />
            </div>
        </ThemeContext.Provider>
    );
}
