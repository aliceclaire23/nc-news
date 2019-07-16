import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Nav extends Component {
  state = {
    topics: []
    // topic: ''
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
              <Link to={`/topics/${topic.slug}`} onClick={this.handleClick}>
                {topic.slug}
              </Link>
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

  handleClick = event => {
    const { updateSelectedTopic } = this.props;
    const { topic } = event.target.innerText;
    // this.setState({ topic });
    updateSelectedTopic(topic);
  };
}

export default Nav;
