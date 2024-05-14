import { createReducer } from '@reduxjs/toolkit';
import { setListUsers, setListQuestions } from '../actions'

const initialState = {
    listUsers: {},
    listQuestions: {},
};

const users = createReducer(initialState, (builder) => {
    builder
      .addCase(setListUsers.type, (state, action) => { state.listUsers = action.payload })
      .addCase(setListQuestions.type, (state, action) => { state.listQuestions = action.payload })
  })

export default users;