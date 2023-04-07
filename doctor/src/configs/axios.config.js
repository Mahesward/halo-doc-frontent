import axios from 'axios'

const DOCTOR_BASE_URL = "http://localhost:8080/api/doctor"

export const backend = axios.create({ baseURL: `${DOCTOR_BASE_URL}` });