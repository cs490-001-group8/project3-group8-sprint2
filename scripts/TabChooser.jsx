/* eslint react/prop-types: 0 */
// Proptype enforcement breaks the module.
import React from 'react';

export default function TabChooser(props) {
    return (
        <div className="icon_bar">
            <i className="far fa-newspaper fa-2x"></i>
            <i className="fas fa-sun fa-2x"></i>
            <i className="fas fa-traffic-light fa-2x"></i>
            <i className="fas fa-vote-yea fa-2x"></i>
            <i className="fab fa-twitter fa-2x"></i>
            <i className="fas fa-mountain fa-2x"></i>
            <i className="fas fa-football-ball fa-2x"></i>
        </div>
    );
}
