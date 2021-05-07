import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li><NavLink exact to="/">Astronomy</NavLink></li>
      <li><NavLink to="/Boats">Boats</NavLink></li>
      <li><NavLink to="/Experimental%20Planes">Experimental Planes</NavLink></li>
      <li><NavLink to="/Mountains">Mountains</NavLink></li>
    </ul>
  </nav>
);

export default Nav;