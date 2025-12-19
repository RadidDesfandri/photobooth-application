import axios from 'axios'

const fetchCameraService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_CAMERA_SERVICE || 'http://localhost:5027'
})

export { fetchCameraService }
