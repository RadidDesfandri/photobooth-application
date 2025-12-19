import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_CAMERA_SERVICE || 'http://localhost:5027',
  timeout: 5000
})
