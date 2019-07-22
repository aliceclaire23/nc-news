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
    const sortOptions = ['title', 'votes', 'created_at', 'comment_count'];
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h2>{topic ? `Articles about ${topic}` : 'All Articles'}</h2>
        <div id='sort-by'>
          <label htmlFor='sort_by'>Sort by: </label>
          <select id='sort_by'>
            {sortOptions.map(option => {
              return (
                <div>
                  <option
                    value={option}
                    onClick={() => this.sortTable({ option }, 'asc')}
                  >
                    Title A-Z
                  </option>
                  <option
                    value={option}
                    onClick={() => this.sortTable({ option }, 'desc')}
                  >
                    Title Z-A
                  </option>
                </div>
              );
            })}
          </select>
        </div>
        <div className='articles'>
          {articles.map(
            ({ article_id, title, votes, comment_count, author }) => {
              return (
                <div key={article_id} className='article-card'>
                  <Link to={`/articles/${article_id}`} id={article_id}>
                    <h3>{title}</h3>
                    <p>
                      By <i>{author}</i>
                    </p>
                    <p>{comment_count} comments</p>
                    <p>{votes} votes</p>
                  </Link>
                </div>
              );
            }
          )}
        </div>
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
}

export default Articles;
