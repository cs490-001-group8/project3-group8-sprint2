/* eslint react/prop-types: 0 */
// Proptype enforcement breaks the module.
import React from 'react';

export default function TabChooser(props) {
    return (
        <div className="icon-bar">
            <i title="News" className="far fa-newspaper fa-2x"></i>
            <i title="Weather" className="fas fa-sun fa-2x"></i>
            <i title="Traffic" className="fas fa-traffic-light fa-2x"></i>
            <i title="Bills" className="fas fa-vote-yea fa-2x"></i>
            <i title="Politican Twitter" className="fab fa-twitter fa-2x"></i>
            <i title="Hiking Destinations" className="fas fa-mountain fa-2x"></i>
            <i title="Sports" className="fas fa-football-ball fa-2x"></i>
        </div>
    );
}
