import axios from 'axios';

const sanctum = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

export const setupCSRF = async () => {
  try {
    await sanctum.get('/sanctum/csrf-cookie');
    console.log('CSRF cookie set successfully');
    return true;
  } catch (error) {
    console.warn('Failed to get CSRF cookie:', error);
    return false;
  }
}