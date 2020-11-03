import React, { useState, useEffect } from 'react'
import Body from './Body';
import Head from './Head';
import { Socket } from './Socket';

export default function App() {
  const [userList, setUserList] = useState([]);
  
  function updateUserList () {
    React.useEffect(() => {
      Socket.on('send client', (data) => {
        setUserList(userList => [...userList, data])
      })
      
      return () => {
        Socket.off('send client');
      }
    });
  }
  
  updateUserList()
  
  return (
    <div className="App">
      <Head />
      <Body />
    </div>
  );
}
