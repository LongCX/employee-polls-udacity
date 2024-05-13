import { createReducer } from '@reduxjs/toolkit';
import { setListUsers } from '../actions'

const initialState = {
    listUsers: {},
};

const users = createReducer(initialState, (builder) => {
    builder
      .addCase(setListUsers.type, (state, action) => { state.listUsers = action.payload })
  })

export default users;