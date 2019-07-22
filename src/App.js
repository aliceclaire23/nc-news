import React, { Component } from 'react';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import ArticleDetails from './components/ArticleDetails';
import Comments from './components/Comments';
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
          <ArticleDetails path='/articles/:article_id'>
            <Comments path='/comments' />
          </ArticleDetails>
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
