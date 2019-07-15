import React from 'react';
import { Link } from '@reach/router';

function Navigation(props) {
  return (
    <nav className='nav'>
      <Link to='/'>All</Link>
    </nav>
  );
}

export default Navigation;
