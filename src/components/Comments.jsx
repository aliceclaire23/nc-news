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
        {comments.map(({ comment_id, body, votes, author }) => {
          return (
            <div className='comment-card' key={comment_id}>
              <p>{body}</p>
              <section className='votes'>
                <button onClick={() => this.incVotes(-1, comment_id)}>-</button>
                <span>{votes} votes</span>
                <button onClick={() => this.incVotes(1, comment_id)}>+</button>
              </section>
              <p>{author}</p>
              <button
                className='delete-button'
                data-comment={comment_id}
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

  incVotes = (inc_votes, comment_id) => {
    api
      .patchVotesById(inc_votes, comment_id, 'comments')
      .then(patchedComment => {
        this.setState(state => {
          const comments = state.comments.map(comment => {
            if (comment.comment_id === comment_id)
              comment.votes = patchedComment.votes;
            return comment;
          });
          return { comments };
        });
      });
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
