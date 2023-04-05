import axios from 'axios'

const DOCTOR_BASE_URL = `https://localhost:8080/api/doctor`

export const doctorLogin = axios.create({ baseURL: `${DOCTOR_BASE_URL}/login` })