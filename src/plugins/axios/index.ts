import axios from 'axios';

axios.interceptors.request.use(
  function (config) {
    const { pathname = '', search = '' } = window.location;
    config.headers['page-location'] = pathname + search;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export function setBaseURL(url: string) {
  axios.defaults.baseURL = url;
}

export function setAccessToken(accessToken: string | null) {
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default axios;
