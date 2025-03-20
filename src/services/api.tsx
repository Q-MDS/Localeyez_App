import axios from 'axios';

// const baseUrl = 'https://localeyez.net/ap';
// const baseUrl = 'http://192.168.1.28/localeyez_backend';
const baseUrl = 'http://192.168.1.124/localeyez_backend';

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
