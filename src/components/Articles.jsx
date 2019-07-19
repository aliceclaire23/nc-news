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
        <div id='sort-by'>
          <label htmlFor='sort_by'>Sort by: </label>
          <select id='sort_by'>
            <option
              value='title'
              onClick={() => this.sortTable('title', 'asc')}
            >
              Title A-Z
            </option>
            <option
              value='title'
              onClick={() => this.sortTable('title', 'desc')}
            >
              Title Z-A
            </option>
            <option
              value='votes'
              onClick={() => this.sortTable('votes', 'asc')}
            >
              Votes Asc
            </option>
            <option
              value='votes'
              onClick={() => this.sortTable('votes', 'desc')}
            >
              Votes Desc
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
              Comments Asc
            </option>
            <option
              value='comment_count'
              onClick={() => this.sortTable('comment_count', 'desc')}
            >
              Comments Desc
            </option>
          </select>
        </div>
        <div className='articles'>
          {articles.map(
            ({ article_id, title, votes, comment_count, author }) => {
              return (
                <div key={article_id} className='article-card'>
                  <Link
                    to={`/articles/${article_id}`}
                    id={article_id}
                    onClick={this.handleClick}
                  >
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

  handleClick = event => {
    const { updateArticleId } = this.props;
    const { article_id } = event.target.id;
    updateArticleId(article_id);
  };
}

export default Articles;
