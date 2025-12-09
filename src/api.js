// src/api.js
import axios from 'axios';

// Ganti dengan URL API backend Anda yang sebenarnya
const API_BASE_URL = 'https://doujindesu.web.id/api'; 
// Jika Anda sudah deploy backend, ganti dengan URL produksi (contoh: https://your-manga-api.com/api)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;
