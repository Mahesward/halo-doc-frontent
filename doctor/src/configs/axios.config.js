import axios from 'axios';

const DOCTOR_BASE_URL = import.meta.env.VITE_DOCTOR_API_URL;
const COMMON_URL = import.meta.env.VITE_API_URL;
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_API;

export const backend = axios.create({ baseURL: DOCTOR_BASE_URL });
export const commonApi = axios.create({ baseURL: COMMON_URL });
export const cloudinaryUpload = axios.create({ baseURL: CLOUDINARY_UPLOAD_URL });
