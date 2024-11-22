import axios from "axios";

// 요청을 보낼 서버를 지정
export const instance = axios.create({
  baseURL: 'http://localhost:5000', // 백엔드 서버 주소
  withCredentials: true,  // 쿠키 및 자격 증명 포함 요청
});

// request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken) {
      config.headers['Access_token'] = accessToken;
      config.headers['Refresh_token'] = refreshToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
