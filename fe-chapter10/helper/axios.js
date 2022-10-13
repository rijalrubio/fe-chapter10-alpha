import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // config.headers['Authorization'] = 'Bearer' + config.headers['Authorization']
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    if (error.response.status === 401 || error.response.status === 400)
      return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    // Do something with response error
    if (
      error.response.status === 401 ||
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 500
    )
      // console.log("interceptor")
      return Promise.reject(error.response);
    else return Promise.reject(error);
  }
);

export default _axios;
