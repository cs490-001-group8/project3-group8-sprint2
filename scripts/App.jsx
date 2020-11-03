import React, { useState } from 'react';
import Body from './Body';
import Head from './Head';

export default function App() {
  const [name, setName] = useState(() => '');
  const [loggedIn, setLoggedIn] = useState(() => false);

  function logIn(newName) {
    setName(() => newName);
    setLoggedIn(() => true);
  }

  return (
    <div className="App">
      <Head logIn={logIn} />
      <Body loggedIn={loggedIn} myName={name} />
    </div>
  );
}
