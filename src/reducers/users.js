import { createReducer } from '@reduxjs/toolkit';
import { setListUsers, answerVoteOfUser, updatePollOfUser } from '../actions'

const initialState = {
  listUsers: {},
};

const users = createReducer(initialState, (builder) => {
  builder
    .addCase(setListUsers.type, (state, action) => { state.listUsers = action.payload })
    .addCase(answerVoteOfUser.type, (state, action) => {
      const user = action.payload.user;
      const qid = action.payload.qid;
      // Prevent change vote of user if user voted
      if (!(state.listUsers[user].answers[qid])) {
        const voteNew = {
          [qid]: action.payload.answer
        }
        state.listUsers[user].answers = Object.assign({}, state.listUsers[user].answers, voteNew)
      }
    })
    .addCase(updatePollOfUser.type, (state, action) => { 
      state.listUsers[action.payload.author].questions.push(action.payload.id) 
    })
})

export default users;