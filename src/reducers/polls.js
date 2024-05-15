import { createReducer } from '@reduxjs/toolkit';
import { createPoll, answerVote, setListQuestions } from '../actions';

const initialState = {
  pollCreated: {},
  votesAnswer: { username: '', idQuestion: '', voteOption: '' },
  listQuestions: {},
};

const polls = createReducer(initialState, (builder) => {
  builder
    .addCase(createPoll.type, (state, action) => {
      const poll = {
        [action.payload.id]: action.payload
      }
      state.pollCreated = Object.assign(state.pollCreated, poll)
    })
    .addCase(answerVote.type, (state, action) => { state.votesAnswer = action.payload })
    .addCase(setListQuestions.type, (state, action) => { state.listQuestions = action.payload })
})

export default polls;