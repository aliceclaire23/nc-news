import React, { Component } from 'react';
import api from '../utils/api.utils';

class CommentForm extends Component {
  state = {
    username: 'jessjelly',
    body: ''
  };

  render() {
    return (
      <form className='comment-form' onSubmit={this.handleSubmit}>
        {/* input for custom username */}
        {/* <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' onChange={this.handleChange} />
        </div> */}
        <p>
          You are currrently logged in as <i>{this.state.username}</i>
        </p>
        <div>
          <label htmlFor='body'>New comment:</label>
          <br />
          <textarea
            type='text'
            rows='4'
            cols='50'
            id='body'
            onChange={this.handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, body } = this.state;
    const article_id = this.props.article_id;
    api.postComment({ username, body }, article_id);
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value
    });
  };
}

export default CommentForm;
