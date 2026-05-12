import { login, register } from '../api/auth'

export const loginRequest    = (credentials) => login(credentials)
export const registerRequest = (userData)    => register(userData)

// JWT-only backend: logout and verify are handled client-side.
// Invalid tokens are caught by the 401 interceptor in src/api/axios.js.
export const logoutRequest      = () => Promise.resolve()
export const verifyTokenRequest = () => Promise.resolve()
