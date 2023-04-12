import axios from 'axios'

const DOCTOR_BASE_URL = "http://localhost:8080/api/doctor"
const COMMON_URL = 'http://localhost:8080/api'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/halo-doc/image'

export const backend = axios.create({ baseURL: DOCTOR_BASE_URL });
export const common_api = axios.create({ baseURL: COMMON_URL })
export const cloudinary_upload = axios.create({ baseURL: CLOUDINARY_UPLOAD_URL })