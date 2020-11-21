import React, { useState } from 'react';
import { Socket } from './Socket';
import Body from './Body';
import Head from './Head';
import Footer from './Footer';

export default function App() {
    const colorTable = {
        purple: '#9c27b0',
        blue: '#00bbff',
        green: '#4caf50',
        red: '#f44336',
        orange: '#ff9800',
    };

    const [name, setName] = useState(() => '');
    const [loggedIn, setLoggedIn] = useState(() => false);
    const [style, setStyle] = useState();

    const changeBackground = (clr, img) => {
        if (clr !== '') setStyle({ backgroundColor: `${colorTable[clr]}` });
        else setStyle({ backgroundImage: `url(${img})` });
    }

    function logIn(newName) {
        setName(() => newName);
        setLoggedIn(() => true);
        Socket.emit('log in');
    }

    return (
        <div className="App" style={style}>
            <Head loggedIn={loggedIn} logIn={logIn} changeBackground={changeBackground}/>
            <Body loggedIn={loggedIn} myName={name} />
            <Footer />
        </div>
    );
}
