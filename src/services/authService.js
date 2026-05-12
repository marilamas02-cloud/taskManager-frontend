import axiosInstance from './axiosInstance'

export const loginRequest = (credentials) =>
  axiosInstance.post('/api/login', credentials)

export const logoutRequest = () =>
  axiosInstance.post('/api/logout')

export const verifyTokenRequest = () =>
  axiosInstance.get('/api/verify-token')
