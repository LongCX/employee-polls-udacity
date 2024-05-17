import { createReducer } from '@reduxjs/toolkit';
import { setUsers, answerVoteOfUser, updatePollOfUser, register } from '../actions'
import { getRandomAvatarPathUrl } from '../utils/helpers'

const initialState = {
  users: {},
};

const users = createReducer(initialState, (builder) => {
  builder
    .addCase(setUsers.type, (state, action) => { state.users = action.payload })
    .addCase(answerVoteOfUser.type, (state, action) => {
      const user = action.payload.user;
      const qid = action.payload.qid;
      // Prevent change vote of user if user voted
      if (!(state.users[user].answers[qid])) {
        const voteNew = {
          [qid]: action.payload.answer
        }
        state.users[user].answers = Object.assign({}, state.users[user].answers, voteNew)
      }
    })
    .addCase(updatePollOfUser.type, (state, action) => {
      state.users[action.payload.author].questions.push(action.payload.id)
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
      state.users = Object.assign({}, state.users, newUser)
    })
})

export default users;