import axios from 'axios';
// import config from '@/config';

axios.defaults.baseURL = 'https://api.edu-bill.co.kr';
axios.interceptors.request.use(
  function (config) {
    const { pathname = '', search = '' } = window.location;
    config.headers['page-location'] = pathname + search;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function setAccessToken(accessToken: string | null) {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function setDeviceInfo(deviceInfo: any) {
  if (deviceInfo) {
    axios.defaults.headers.common['x-device-info'] = JSON.stringify(deviceInfo);
  } else {
    delete axios.defaults.headers.common['x-device-info'];
  }
}

export default axios;

// 401 -> 로그인 페이지로
// 500 -> 서버 에러 -> 화면 내리고 오류 페이지로 -> 새로고침 버튼
