/* eslint react/prop-types: 0 */
// Proptype enforcement breaks the module.
import React, { useState, useEffect } from 'react';
import { Socket } from './Socket';

let selectedDict = {
    News: false,
    Weather: false,
    Traffic: false,
    Bills: false,
    Politician_Twitter: false,
    Hiking_Destinations: false,
    Sports: false
}

function handleClick(data){
    selectedDict[data] = selectedDict[data] ? false : true;
    Socket.emit('personal tab change', selectedDict);
}

export default function TabChooser(props) {
    return (
        <div className="icon-bar">
            <div className={selectedDict.News ? "selected" : "unselected"}>
                <i
                    id="News"
                    title="News" 
                    className="far fa-newspaper fa-2x"
                    onClick={() => handleClick('News')}>
                </i>
            </div>
            <i 
                id="Weather" 
                title="Weather" 
                className="fas fa-sun fa-2x"
                onClick={() => handleClick('Weather')}>
            </i>
            <i
                id="Traffic"
                title="Traffic" 
                className="fas fa-traffic-light fa-2x"
                onClick={() => handleClick('Traffic')}>
            </i>
            <i
                id="Bills"
                title="Bills" 
                className="fas fa-vote-yea fa-2x"
                onClick={() => handleClick('Bills')}>
            </i>
            <i
                id="Politician_Twitter"
                title="Politican Twitter" 
                className="fab fa-twitter fa-2x"
                onClick={() => handleClick('Politician_Twitter')}>
            </i>
            <i
                id="Hiking_Destinations"
                title="Hiking Destinations" 
                className="fas fa-mountain fa-2x"
                onClick={() => handleClick('Hiking_Destinations')}>
            </i>
            <i
                id="Sports"
                title="Sports" 
                className="fas fa-football-ball fa-2x"
                onClick={() => handleClick('Sports')}>
            </i>
        </div>
    );
}
