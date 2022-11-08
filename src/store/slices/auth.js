import { createSlice } from '@reduxjs/toolkit'
import { login, signOut } from './authThunk'

const initialState = {
  token: null,
  userData: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signOut.fulfilled]: state => {
      state.userData = {}
      state.token = null
    },
    [login.fulfilled]: (state, action) => {
      const { accessToken, user } = action.payload
      state.token = accessToken
      state.userData = user
    },
  },
})

export const authReducer = authSlice.reducer
