import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getModelInfo = async () => {
  const response = await api.get('/model/info');
  return response.data;
};

export const getPresets = async () => {
  const response = await api.get('/presets');
  return response.data;
};

export const predict = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const predictBatch = async (patients) => {
  const response = await api.post('/predict/batch', { patients });
  return response.data;
};

export default api;
