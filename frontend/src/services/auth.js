import api, { setAuthToken } from '@/config/axiosConfig'

// Register a new user
export const registerUser = async (data) => {
  return await api.post('/register', data)
}

// Login user
export const loginUser = async (data) => {
  const response = await api.post('/login', data)

  if (response.data?.token) {
    setAuthToken(response.data.token)
  }

  return response
}

// Logout user
export const logoutUser = async () => {
  try {
    await api.post('/logout')
  } catch (error) {
    console.warn('Logout error:', error)
  } finally {
    setAuthToken(null)
  }
}