import axios from 'axios';

const url = 'https://ecila-nc-news-api.herokuapp.com/api/';

const fetchTopics = async () => {
  const { data } = await axios.get(`${url}topics/`);
  return data.topics;
};

const fetchArticles = async (topic, sortBy, order) => {
  let articlesUrl = `${url}articles/`;
  if (sortBy) articlesUrl += `?sort_by=${sortBy}`;
  if (order) articlesUrl += `&order=${order}`;

  const {
    data: { articles }
  } = await axios.get(articlesUrl);

  if (topic) return articles.filter(article => article.topic === 'coding');

  return articles;
};

const fetchArticleById = async article_id => {
  const {
    data: { article }
  } = await axios.get(`${url}articles/${article_id}`);
  return article;
};

const fetchComments = async article_id => {
  const {
    data: { comments }
  } = await axios.get(`${url}articles/${article_id}/comments`);
  return comments;
};

const postComment = async (comment, article_id) => {
  console.log('posting a comment');
  const { newComment } = await axios.post(
    `${url}articles/${article_id}/comments`,
    comment
  );
  return newComment;
};

export default {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchComments,
  postComment
};
