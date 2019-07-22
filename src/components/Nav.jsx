import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Nav extends Component {
  state = {
    topics: []
  };

  render() {
    const { topics } = this.state;
    return (
      <ul className='nav'>
        <li className='nav-item'>
          <Link to='/'>All</Link>
        </li>
        {topics.map((topic, i) => {
          return (
            <li key={i} className='nav-item'>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount = () => {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  };
}

export default Nav;
