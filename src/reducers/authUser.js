import { createReducer } from '@reduxjs/toolkit';
import { loginSuccess, logout } from '../actions'

const initialState = {
  isLoggedIn: false,
  username: '',
};

const authUser = createReducer(initialState, (builder) => {
  builder
    .addCase(loginSuccess.type, (state, action) => {
      state.isLoggedIn = true
      state.username = action.payload
    })
    .addCase(logout.type, (state) => {
      state.isLoggedIn = false
      state.username = ''
    })
})

export default authUser;