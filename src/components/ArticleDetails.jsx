import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Articles extends Component {
  state = {
    article: {},
    isLoading: true
  };

  render() {
    const { article } = this.state;
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className='article-details'>
        <h2>{article.title}</h2>
        <h4>By {article.author}</h4>
        <p>
          <i>{article.created_at}</i>
        </p>
        <p>{article.body}</p>
        <section className='votes'>
          <button>-</button>
          <span>{article.votes} votes</span>
          <button>+</button>
        </section>
        <Link to={`/articles/${article.article_id}/comments`}>Comments</Link>
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
}

export default Articles;
