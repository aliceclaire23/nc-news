import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Articles extends Component {
  state = {
    article: {},
    isLoading: true
  };

  render() {
    const {
      article: { title, author, created_at, body, article_id, votes }
    } = this.state;
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className='article-details'>
        <h2>{title}</h2>
        <h4>
          <i>By {author}</i>
        </h4>
        <p>
          <i>{created_at}</i>
        </p>
        <p>{body}</p>
        <section className='votes'>
          <button onClick={() => this.incVotes(-1)}>-</button>
          <span>{votes} votes</span>
          <button onClick={() => this.incVotes(1)}>+</button>
        </section>

        <div id='show-comments'>
          <Link to={`/articles/${article_id}/comments`}>Comments</Link>
        </div>

        {this.props.children}
      </div>
    );
  }

  componentDidMount = () => {
    const article_id = this.props.article_id;
    api.fetchArticleById(article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  };

  incVotes = inc_votes => {
    const article_id = this.props.article_id;
    api.patchVotesById(inc_votes, article_id, 'articles').then(article => {
      this.setState({ article, isLoading: false });
    });
  };
}

export default Articles;
