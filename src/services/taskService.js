import axiosInstance from './axiosInstance'

export const getTasks    = ()         => axiosInstance.get('/api/tasks')
export const createTask  = (data)     => axiosInstance.post('/api/tasks', data)
export const updateTask  = (id, data) => axiosInstance.put(`/api/tasks/${id}`, data)
export const deleteTask  = (id)       => axiosInstance.delete(`/api/tasks/${id}`)
