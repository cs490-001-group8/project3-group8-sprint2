import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Socket } from './Socket';
import Body from './Body';
import Head from './Head';
import Footer from './Footer';
import ThemeContext from './ThemeContext';

export default function App() {
    const prevOffset = useRef(0);

    const [name, setName] = useState(() => '');
    const [email, setEmail] = useState(() => '');
    const [loginType, setLoginType] = useState(() => '');
    const [loggedIn, setLoggedIn] = useState(() => false);
    const [image, setImage] = useState(localStorage.getItem('image'));
    const [color, setColor] = useState(localStorage.getItem('color'));
    const [headerClass, setHeaderClass] = useState('up');
    const contextValue = {
        contextImage: [image, setImage],
        contextColor: [color, setColor],
        contextName: [name, setName],
        contextEmail: [email, setEmail],
        contextLoginType: [loginType, setLoginType],
    };

    useEffect(() => {
        const handleScroll = () => {
            const curOffset = window.scrollY;

            if (prevOffset.current < curOffset) setHeaderClass('scroll-down');
            else setHeaderClass('scroll-up');

            prevOffset.current = curOffset;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    });

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
            <BrowserRouter>
                <div className="App">
                    <Head loggedIn={loggedIn} logIn={logIn} headerClass={headerClass} />
                    <Body
                      loggedIn={loggedIn}
                      myName={name}
                      myEmail={email}
                      myLoginType={loginType}
                    />
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}
