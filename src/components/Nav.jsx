import React from 'react';
import { Link } from '@reach/router';

const Nav = ({ topics }) => {
  return (
    <ul className='nav'>
      <li className='nav-item'>
        <Link to='/'>All</Link>
      </li>
      {topics.map((topic, i) => {
        return (
          <li key={i} className='nav-item'>
            <Link to={`/${topic.slug}`}>{topic.slug}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
