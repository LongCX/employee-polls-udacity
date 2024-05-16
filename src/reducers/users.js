import { createReducer } from '@reduxjs/toolkit';
import { setListUsers, answerVoteOfUser } from '../actions'

const initialState = {
  listUsers: {},
};

const users = createReducer(initialState, (builder) => {
  builder
    .addCase(setListUsers.type, (state, action) => { state.listUsers = action.payload })
    .addCase(answerVoteOfUser.type, (state, action) => {
      const username = action.payload.user
      // Prevent change vote of user if user voted
      if (!(state.listUsers[username].answers[action.payload.qid])) {
        const voteNew = {
          [action.payload.qid]: action.payload.answer
        }
        state.listUsers[username].answers = Object.assign({}, state.listUsers[username].answers, voteNew)
      }
    })
})

export default users;