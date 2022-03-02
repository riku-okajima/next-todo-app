import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { COOKIE_NAME } from '../../constants/cookie';

const axiosClient = axios.create({
  baseURL: 'http://localhost:9080/api/',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  timeout: 5000,
});

const onRequest = (config: AxiosRequestConfig) => {
  // const authToken = store.getState().auth.authToken;
  const cookies = parseCookies();
  const authToken = cookies[COOKIE_NAME.auth] || '';
  config.headers = { Authorization: authToken ? `Bearer ${authToken}` : '' };
  return config;
};
const onFulfilled = (response: AxiosResponse) => {
  return response;
};
const onRejected = (error: any) => {
  return Promise.reject(error);
};

axiosClient.interceptors.request.use(onRequest, onRejected);
axiosClient.interceptors.response.use(onFulfilled, onRejected);

export default axiosClient;
