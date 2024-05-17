import { createReducer } from '@reduxjs/toolkit';
import { createPoll, answerVotePoll, setListQuestions } from '../actions';

const initialState = {
  questions: {},
};

const questions = createReducer(initialState, (builder) => {
  builder
    .addCase(createPoll.type, (state, action) => {
      const pollNew = {
        [action.payload.id]: action.payload
      }
      state.questions = Object.assign({}, state.questions, pollNew)
    })
    .addCase(setListQuestions.type, (state, action) => { state.questions = action.payload })
    .addCase(answerVotePoll.type, (state, action) => {
      const user = action.payload.user;
      const qid = action.payload.qid;
      // Prevent change vote of user if user voted
      if (!(state.questions[qid]["optionOne"].votes[user]) && !(state.questions[qid]["optionTwo"].votes[user])) {
        state.questions[qid][action.payload.answer].votes.push(user)
      }
    })
})

export default questions;