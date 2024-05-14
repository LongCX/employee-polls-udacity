import { createReducer } from '@reduxjs/toolkit';
import { createPoll, answerVote } from '../actions';

const initialState = {
  pollCreated: {},
  votesAnswer: { username: '', idQuestion: '', voteOption: '' }
};

const polls = createReducer(initialState, (builder) => {
  builder
    .addCase(createPoll.type, (state, action) => { state.pollCreated = action.payload })
    .addCase(answerVote.type, (state, action) => { state.votesAnswer = action.payload })
})

export default polls;