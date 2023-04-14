import axios from 'axios';

const USER_BASE_URL = 'http://localhost:8080/api/user';
const COMMON_BASE_URL = 'http://localhost:8080/api';

export const userApi = axios.create({ baseURL: USER_BASE_URL });
export const commonApi = axios.create({ baseURL: COMMON_BASE_URL });
