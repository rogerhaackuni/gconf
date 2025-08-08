import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/gconf/backend/public/api',
  timeout: 200000,
});

export default instance;