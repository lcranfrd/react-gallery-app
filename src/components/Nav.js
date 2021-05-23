import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = (props) => {
  const {title1, title2, title3, title4} = props.titles;

  return(
  <nav className="main-nav">
    <ul>
      <li><NavLink exact to="/">{title1}</NavLink></li>
      <li><NavLink to={`/${title2}`}>{title2}</NavLink></li>
      <li><NavLink to={`/${title3}`}>{title3}</NavLink></li>
      <li><NavLink to={`/${title4}`}>{title4}</NavLink></li>
    </ul>
  </nav>
)};

export default Nav;