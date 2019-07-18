import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Articles extends Component {
  state = {
    articles: [],
    topic: '',
    isLoading: true
  };

  render() {
    const { articles, topic } = this.state;
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h2>{topic ? `Articles about ${topic}` : 'All Articles'}</h2>
        <label htmlFor='sort_by'>Sort by:</label>
        <select id='sort_by'>
          <option value='title' onClick={() => this.sortTable('title', 'asc')}>
            Title A-Z
          </option>
          <option value='title' onClick={() => this.sortTable('title', 'desc')}>
            Title Z-A
          </option>
          <option value='votes' onClick={() => this.sortTable('votes', 'asc')}>
            Votes Lowest-Highest
          </option>
          <option value='votes' onClick={() => this.sortTable('votes', 'desc')}>
            Votes Highest-Lowest
          </option>
          <option
            value='created_at'
            onClick={() => this.sortTable('created_at', 'asc')}
          >
            Oldest first
          </option>
          <option
            value='created_at'
            onClick={() => this.sortTable('created_at', 'desc')}
          >
            Most Recent first
          </option>
          <option
            value='comment_count'
            onClick={() => this.sortTable('comment_count', 'asc')}
          >
            Comment Count Lowest to Highest
          </option>
          <option
            value='comment_count'
            onClick={() => this.sortTable('comment_count', 'desc')}
          >
            Comment Count Highest to Lowest
          </option>
        </select>
        {articles.map(article => {
          return (
            <div key={article.article_id} className='article-card'>
              <Link
                to={`/articles/${article.article_id}`}
                id={article.article_id}
                onClick={this.handleClick}
              >
                {article.title}
              </Link>
              <span>{article.votes} votes</span>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount = () => {
    const topic = this.props.topic;
    api.fetchArticles(topic).then(articles => {
      this.setState({ articles, topic, isLoading: false });
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.topic !== this.props.topic) {
      const topic = this.props.topic;
      api.fetchArticles(topic).then(articles => {
        this.setState({ articles, topic });
      });
    }
  };

  sortTable = (sortBy, order) => {
    const { topic } = this.state;
    api.fetchArticles(topic, sortBy, order).then(articles => {
      this.setState({ articles, topic });
    });
  };

  handleClick = event => {
    const { updateArticleId } = this.props;
    const { article_id } = event.target.id;
    updateArticleId(article_id);
  };
}

export default Articles;
