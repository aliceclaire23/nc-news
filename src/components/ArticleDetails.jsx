import React, { Component } from 'react';
import api from '../utils/api.utils';

class Articles extends Component {
  state = {
    article: {}
  };

  render() {
    const { article } = this.state;
    return (
      <div>
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
      </div>
    );
  }

  componentDidMount = () => {
    const article_id = this.props.article_id;
    api.fetchArticleById(article_id).then(article => {
      this.setState({ article });
    });
  };
}

export default Articles;
