import React from 'react';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import ArticleDetails from './components/ArticleDetails';
import Comments from './components/Comments';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <Nav />
      <Router className='main'>
        <Articles path='/' />
        <Articles path='/topics/:topic' />
        <ArticleDetails path='/articles/:article_id'>
          <Comments path='/comments' />
        </ArticleDetails>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
