import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <div>
        <NavLink exact activeClassName="tab-active" className="tab" to="/">Home</NavLink>
        <NavLink activeClassName="tab-active" className="tab" to="/Commuter">Commuter</NavLink>
        <NavLink activeClassName="tab-active" className="tab" to="/Politics">Politics</NavLink>
        <NavLink activeClassName="tab-active" className="tab" to="/Recreation">Recreation</NavLink>
        <NavLink activeClassName="tab-active" className="tab" to="/Personal">Personal</NavLink>
    </div>
);

export default Navbar;
