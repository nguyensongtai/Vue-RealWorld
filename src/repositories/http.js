import axios from 'axios';

const BASE_URL = 'https://api.realworld.io';

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});