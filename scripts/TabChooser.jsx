/* eslint react/prop-types: 0 */
// Proptype enforcement breaks the module.
import React from 'react';

const unselected = "unselected"
const selected = "selected"

function handleClick(data){
    console.log(data)
}

export default function TabChooser(props) {
    return (
        <div className="icon-bar">
            <i
                id="News"
                title="News" 
                className="far fa-newspaper fa-2x"
                onClick={() => handleClick('News')}>
            </i>
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
