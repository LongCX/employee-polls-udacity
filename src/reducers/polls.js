import { createReducer } from '@reduxjs/toolkit';
import { createPoll, answerVotePoll, setListQuestions } from '../actions';

const initialState = {
  listPolls: {},
};

const polls = createReducer(initialState, (builder) => {
  builder
    .addCase(createPoll.type, (state, action) => {
      const pollNew = {
        [action.payload.id]: action.payload
      }
      state.listPolls = Object.assign({}, state.listPolls, pollNew)
    })
    .addCase(setListQuestions.type, (state, action) => { state.listPolls = action.payload })
    .addCase(answerVotePoll.type, (state, action) => {
        // Prevent change vote of user if user voted
        (state.listPolls[action.payload.qid][action.payload.answer].votes).filter(u => action.payload.user !== u).map(u => u.push(action.payload.user))
    })
})

export default polls;