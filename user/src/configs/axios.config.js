import axios from 'axios';

const USER_BASE_URL = import.meta.env.VITE_USER_API_URL;
const COMMON_BASE_URL = import.meta.env.VITE_API_URL;

export const userApi = axios.create({ baseURL: USER_BASE_URL });
export const commonApi = axios.create({ baseURL: COMMON_BASE_URL });
