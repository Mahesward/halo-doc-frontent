import axios from "axios";

const ADMIN_BASE_URL = 'http://localhost:8080/api/admin'
const API_BASE_URL = 'http://localhost:8080/api'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/halo-doc/image'

export const backend_api = axios.create({ baseURL: ADMIN_BASE_URL })
export const common_api = axios.create({ baseURL: API_BASE_URL })

export const cloudinary_upload = axios.create({ baseURL: CLOUDINARY_UPLOAD_URL })