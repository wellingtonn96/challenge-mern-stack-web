import axios from 'axios';

const api = axios.create({
  baseURL: 'https://customerlocation.herokuapp.com',
});

export default api;
