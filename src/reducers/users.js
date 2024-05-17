import { createReducer } from '@reduxjs/toolkit';
import { setListUsers, answerVoteOfUser, updatePollOfUser, register } from '../actions'
import { getRandomAvatarPathUrl } from '../utils/helpers'

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
    .addCase(register.type, (state, action) => {
      const newUser = {
        [action.payload.username]: {
          id: action.payload.username,
          password: action.payload.password,
          name: action.payload.fullname,
          avatarURL: getRandomAvatarPathUrl(),
          answers: {},
          questions: [],
        }
      }
      state.listUsers = Object.assign({}, state.listUsers, newUser)
    })
})

export default users;