import React, { Component } from 'react';
import axios from 'axios';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';

class App extends Component {
  state = {
    topics: [],
    selectedTopic: ''
  };

  render() {
    const { topics } = this.state;
    return (
      <div className='App'>
        <Header />
        <Nav topics={topics} />
        <Router className='main'>
          <Articles path='/' />
        </Router>
        <Footer />
      </div>
    );
  }

  componentDidMount = () => {
    this.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  };

  fetchTopics = async () => {
    const { data } = await axios.get(
      `https://ecila-nc-news-api.herokuapp.com/api/topics/`
    );
    return data.topics;
  };

  updateSelectedTopic = topic => {};
}

export default App;
