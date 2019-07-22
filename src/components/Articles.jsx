import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  render() {
    const { articles } = this.state;
    const { topic } = this.props || null;
    const sortOptions = [
      { label: 'Title A-Z', sortBy: 'title', order: 'asc' },
      { label: 'Title Z-A', sortBy: 'title', order: 'desc' },
      { label: 'Votes Low-High', sortBy: 'votes', order: 'asc' },
      { label: 'Votes High-Low', sortBy: 'votes', order: 'desc' },
      { label: 'Date Oldest First', sortBy: 'created_at', order: 'asc' },
      { label: 'Date Most Recent', sortBy: 'created_at', order: 'desc' },
      { label: 'Comments Low-High', sortBy: 'comment_count', order: 'asc' },
      { label: 'Comments High-Low', sortBy: 'comment_count', order: 'desc' }
    ];
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h2>{topic ? `Articles about ${topic}` : 'All Articles'}</h2>
        <div id='sort-by'>
          <label htmlFor='sort_by'>Sort by: </label>
          <select id='sort_by'>
            {sortOptions.map(({ sortBy, order, label }, i) => {
              return (
                <option
                  value={sortBy}
                  onClick={() => this.sortTable(topic, sortBy, order)}
                  key={i}
                >
                  {label}
                </option>
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
    const { topic } = this.props || null;
    api.fetchArticles(topic).then(articles => {
      this.setState({ articles, isLoading: false });
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { topic } = this.props || null;
    if (prevProps.topic !== topic) {
      api.fetchArticles(topic).then(articles => {
        this.setState({ articles });
      });
    }
  };

  sortTable = (topic, sortBy, order) => {
    api.fetchArticles(topic, sortBy, order).then(articles => {
      this.setState({ articles });
    });
  };
}

export default Articles;
