import axios from 'axios';

const USER_BASE_URL = `http://localhost:8080/api/user`

export const user_api = axios.create({ baseURL: `${USER_BASE_URL}` })
