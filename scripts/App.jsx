import React, { useState, useEffect } from 'react'
import Body from './Body';
import Head from './Head';
import { Socket } from './Socket';

export default function App() {
  const [name, setName] = useState(() => '');
  const [loggedIn, setLoggedIn] = useState(() => false);
  
  function logIn(name)
  {
    setName(() => name);
    setLoggedIn(() => true);
  }
  
  return (
    <div className="App">
      <Head logIn={logIn} />
      <Body />
    </div>
  );
}
