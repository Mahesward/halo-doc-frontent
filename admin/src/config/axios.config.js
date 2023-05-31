import axios from 'axios';

const ADMIN_BASE_URL = import.meta.env.VITE_ADMIN_API_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_API;

export const backendApi = axios.create({ baseURL: ADMIN_BASE_URL });
export const commonApi = axios.create({ baseURL: API_BASE_URL });

export const cloudinaryUpload = axios.create({ baseURL: CLOUDINARY_UPLOAD_URL });
