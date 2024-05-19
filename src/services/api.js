import axios from 'axios';

// Endereço da API do backend
export const api = axios.create({
  baseURL: 'http://localhost:3333'
})