import React, { Component } from 'react';
import api from '../utils/api.utils';
import CommentForm from './CommentForm';

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  render() {
    const { comments } = this.state;
    const article_id = this.props.article_id;
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
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
              <button
                data-comment={comment.comment_id}
                onClick={this.destroyComment}
              >
                Delete Comment
              </button>
            </div>
          );
        })}
        <CommentForm article_id={article_id} />
      </div>
    );
  }

  componentDidMount = async () => {
    const article_id = this.props.article_id;
    const comments = await api.fetchComments(article_id);
    this.setState({ comments, isLoading: false });
  };

  destroyComment = ({
    target: {
      dataset: { comment: commentId }
    }
  }) => {
    api.deleteComment(commentId);
    this.setState(() => {
      const comments = this.state.comments.filter(
        comment => comment.comment_id !== +commentId
      );
      return { comments };
    });
  };
}

export default Comments;
