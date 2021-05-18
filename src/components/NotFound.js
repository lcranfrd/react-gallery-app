import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = (props) => {
  return(
  <li className ="not-found">
    <h2>{`Page "${props.location.pathname}" Not Found!`}</h2>
    <p>Back to <Link to="/">Home</Link></p>
  </li>
  )
}

export default NotFound;