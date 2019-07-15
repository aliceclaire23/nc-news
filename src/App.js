import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  state = {
    topics: [],
    selectedTopic: ''
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Nav />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
