import React, { useState } from 'react';
import { Socket } from './Socket';
import Body from './Body';
import Head from './Head';
import Footer from './Footer';

export default function App() {
    const [name, setName] = useState(() => '');
    const [loggedIn, setLoggedIn] = useState(() => false);

    function logIn(newName) {
        setName(() => newName);
        setLoggedIn(() => true);
        Socket.emit('log in');
    }

    return (
        <div className="App">
            <Head loggedIn={loggedIn} logIn={logIn} />
            <Body loggedIn={loggedIn} myName={name} />
            <Footer />
        </div>
    );
}
