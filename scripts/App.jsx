import React, { useState } from 'react';
import { Socket } from './Socket';
import Body from './Body';
import Head from './Head';
import Footer from './Footer';
import ThemeContext from './ThemeContext';

export default function App() {
    const [name, setName] = useState(() => '');
    const [loggedIn, setLoggedIn] = useState(() => false);
    const [image, setImage] = useState(localStorage.getItem('image'));
    const [color, setColor] = useState(localStorage.getItem('color'));
    const contextValue = { contextImage: [image, setImage], contextColor: [color, setColor] };

    function logIn(newName) {
        setName(() => newName);
        setLoggedIn(() => true);
        Socket.emit('log in');
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className="App">
                <Head loggedIn={loggedIn} logIn={logIn} />
                <Body loggedIn={loggedIn} myName={name} />
                <Footer />
            </div>
        </ThemeContext.Provider>
    );
}


