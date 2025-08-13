import axios from 'axios';

const api = axios.create({
    baseURL: "https://good-reads-clone-backend.vercel.app/api",
    withCredentials: true //
});

export default api;
