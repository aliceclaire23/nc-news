import React, { Component } from 'react';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';

class App extends Component {
  state = {
    topic: ''
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Nav updateSelectedTopic={this.updateSelectedTopic} />
        <Router className='main'>
          <Articles path='/' />
          <Articles path='/topics/:topic' topic={this.state.topic} />
        </Router>
        <Footer />
      </div>
    );
  }

  updateSelectedTopic = topic => {
    this.setState({ topic });
  };
}

export default App;
