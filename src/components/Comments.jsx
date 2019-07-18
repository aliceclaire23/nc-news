import React, { Component } from 'react';
import { Link } from '@reach/router';
import api from '../utils/api.utils';

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    const { comments } = this.state;
    const article_id = this.props.article_id;
    return (
      <div>
        {comments.map(comment => {
          return (
            <div className='comment-card' key={comment.comment_id}>
              <p>{comment.body}</p>
              <section className='votes'>
                <button>-</button>
                <span>{comment.votes} votes</span>
                <button>+</button>
              </section>
              <p>{comment.author}</p>
              <button>Delete Comment</button>
            </div>
          );
        })}
        <Link to={`/articles/${article_id}/comments/new-comment`}>
          Add a Comment
        </Link>
        {this.props.children}
      </div>
    );
  }

  componentDidMount = () => {
    const article_id = this.props.article_id;
    api.fetchComments(article_id).then(comments => {
      this.setState({ comments });
    });
  };
}

export default Comments;
