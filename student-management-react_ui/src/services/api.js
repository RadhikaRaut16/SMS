// JavaScript source code
import axios from 'axios'

const BASE_URL = 'https://localhost:7100/api'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const authService = {
    login: (data) => api.post('/auth/login', data),
}

export const studentService = {
    getAll: () => api.get('/students'),
    getById: (id) => api.get(`/students/${id}`),
    create: (data) => api.post('/students', data),
    update: (id, data) => api.put(`/students/${id}`, data),
    delete: (id) => api.delete(`/students/${id}`),
}
