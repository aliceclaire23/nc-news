import axios from 'axios';

const url = 'https://ecila-nc-news-api.herokuapp.com/api/';

const fetchTopics = async () => {
  const { data } = await axios.get(`${url}topics/`);
  return data.topics;
};

export default { fetchTopics };
