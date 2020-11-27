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
            <div className={selectedDict.Weather ? "selected" : "unselected"}>
                <i 
                    id="Weather" 
                    title="Weather" 
                    className="fas fa-sun fa-2x"
                    onClick={() => handleClick('Weather')}>
                </i>
            </div>
            <div className={selectedDict.Traffic ? "selected" : "unselected"}>
                <i
                    id="Traffic"
                    title="Traffic" 
                    className="fas fa-traffic-light fa-2x"
                    onClick={() => handleClick('Traffic')}>
                </i>
            </div>
            <div className={selectedDict.Bills ? "selected" : "unselected"}>
                <i
                    id="Bills"
                    title="Bills" 
                    className="fas fa-vote-yea fa-2x"
                    onClick={() => handleClick('Bills')}>
                </i>
            </div>
            <div className={selectedDict.Politician_Twitter ? "selected" : "unselected"}>
                <i
                    id="Politician_Twitter"
                    title="Politican Twitter" 
                    className="fab fa-twitter fa-2x"
                    onClick={() => handleClick('Politician_Twitter')}>
                </i>
            </div>
            <div className={selectedDict.Hiking_Destinations ? "selected" : "unselected"}>
                <i
                    id="Hiking_Destinations"
                    title="Hiking Destinations" 
                    className="fas fa-mountain fa-2x"
                    onClick={() => handleClick('Hiking_Destinations')}>
                </i>
            </div>
            <div className={selectedDict.Sports ? "selected" : "unselected"}>
                <i
                    id="Sports"
                    title="Sports" 
                    className="fas fa-football-ball fa-2x"
                    onClick={() => handleClick('Sports')}>
                </i>
            </div>
        </div>
    );
}
