import axios from 'axios'


const envIP = import.meta.env.VITE_IP;
const allowedOrigin = envIP ? `http://${envIP}:8000` : 'http://localhost:8000';
axios.defaults.baseURL = allowedOrigin;

console.log('Axios baseURL:', axios.defaults.baseURL);
if (!envIP) {
    console.error('WARNING: Add IP Address to .env for mobile testing support.');
}

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