import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Articles extends Component {
  state = {
    articles: [],
    topic: ''
  };

  render() {
    const { articles, topic } = this.state;
    return (
      <div>
        <h2>{topic ? `Articles about ${topic}` : 'All Articles'}</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                {article.votes}
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount = () => {
    const topic = this.props.topic;
    api.fetchArticles(topic).then(articles => {
      this.setState({ articles, topic });
    });
  };
}

export default Articles;
