import React, { Component } from 'react';

class Articles extends Component {
  state = {};

  render() {
    const { topic } = this.props;
    console.log(topic);
    return (
      <div>
        <h2>{topic ? `Articles about ${topic}` : 'All Articles'}</h2>
      </div>
    );
  }
}

export default Articles;
