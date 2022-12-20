import axios from 'axios';

// mục đích của axiosClient để gán user, token đăng khi gọi đến axiosClient
// thay vì mỗi lầnn đăng nhập hay reload lại site phải gọi đến access_token
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
        ecommerce_id: 69,
    },
    // paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
    (config) => {
        const newConfig = config;
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('access_token'));
        if (token && token !== 'undefined' && token !== 'null') {
            newConfig.headers.Authorization = `Bearer ${token}`;
        }
        if (user?.type !== 1 && user && user !== 'null') {
            newConfig.headers.ecommerce_id = `${user.ecommerce_id}`;
        }
        return newConfig;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data && response.data.data && response.data.data.rows) {
            return response.data.data.rows;
        }
        if (response && response.data && response.data.data) {
            return response.data.data;
        }
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (errors) => {
        if (errors.response?.status === 401) {
        }
        return Promise.reject(errors);
    },
);
export default axiosClient;
