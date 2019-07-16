import axios from 'axios';

const url = 'https://ecila-nc-news-api.herokuapp.com/api/';

const fetchTopics = async () => {
  const { data } = await axios.get(`${url}topics/`);
  return data.topics;
};

const fetchArticles = async topic => {
  const {
    data: { articles }
  } = await axios.get(`${url}articles/`);

  if (topic) {
    return articles.filter(article => article.topic === 'coding');
  }

  return articles;
};

export default { fetchTopics, fetchArticles };
