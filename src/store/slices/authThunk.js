import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'src/services/api'

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('token')
      api.defaults.headers.Authorization = `Bearer ${accessToken}`
      const response = await api.get('/users/1')
      return { ...response.data, accessToken }
    } catch (e) {
      localStorage.removeItem('token')
      return rejectWithValue('')
    }
  },
)

export const login = createAsyncThunk('auth/login', async payload => {
  const response = await api.post('/login', payload)
  localStorage.setItem('token', response.data.accessToken)
  return response.data
})

export const signOut = createAsyncThunk('auth/signOut', async () => {
  localStorage.removeItem('token')
})
