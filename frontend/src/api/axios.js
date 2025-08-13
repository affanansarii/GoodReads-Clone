import axios from 'axios';

const api = axios.create({
    baseURL: "https://good-reads-clone-backend.vercel.app",
    withCredentials: true //
});

export default api;
