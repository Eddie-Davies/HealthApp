import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/';
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("⚠️ No token found in localStorage");
    }
    return config;
}, (error) => Promise.reject(error));

export default axios;
// axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')