import React, { useState, useEffect } from 'react';
import { Socket } from './Socket';
import Body from './Body';
import Head from './Head';
import Footer from './Footer';
import FixedPlugin from './FixedPlugin';

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
    const [image, setImage] = React.useState(localStorage.getItem('image'));
    const [color, setColor] = React.useState(localStorage.getItem('color'));
    const [style, setStyle] = React.useState();

    const changeBackground = (img, clr) => {
        setColor(clr);
        setImage(img);

        localStorage.setItem('color', clr);
        localStorage.setItem('image', img);

        if (clr !== '') setStyle({ backgroundColor: `${colorTable[clr]}` });
        else setStyle({ backgroundImage: `url(${img})` });
    };

    useEffect(() => {
        let cacheColor = color;
        let cacheImage = image;

        if (cacheImage == null || cacheColor == null) {
            cacheColor = 'blue';
            cacheImage = '';
        }

        changeBackground(cacheImage, cacheColor);
    }, []);

    function logIn(newName) {
        setName(() => newName);
        setLoggedIn(() => true);
        Socket.emit('log in');
    }

    const handleImageClick = (img) => {
        changeBackground(img, '');
    };

    const handleColorClick = (clr) => {
        changeBackground('', clr);
    };

    return (
        <div className="App" style={style}>
            <Head loggedIn={loggedIn} logIn={logIn} />
            <Body loggedIn={loggedIn} myName={name} />
            <Footer />
            <FixedPlugin
              handleImageClick={handleImageClick}
              handleColorClick={handleColorClick}
              color={color}
              image={image}
            />
        </div>
    );
}
