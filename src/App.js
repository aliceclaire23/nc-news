import React, { Component } from 'react';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import ArticleDetails from './components/ArticleDetails';
import Footer from './components/Footer';

class App extends Component {
  state = {
    topic: '',
    article_id: ''
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Nav updateSelectedTopic={this.updateSelectedTopic} />
        <Router className='main'>
          <Articles path='/' updateArticleId={this.updateArticleId} />
          <Articles
            path='/topics/:topic'
            topic={this.state.topic}
            updateArticleId={this.updateArticleId}
          />
          <ArticleDetails
            path='/articles/:article_id'
            article_id={this.state.article_id}
          />
        </Router>
        <Footer />
      </div>
    );
  }

  updateSelectedTopic = topic => {
    this.setState({ topic });
  };

  updateArticleId = article_id => {
    this.setState({ article_id });
  };
}

export default App;
