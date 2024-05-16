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
      const user = action.payload.user;
      const qid = action.payload.qid;
      // Prevent change vote of user if user voted
      if (!(state.listPolls[qid]["optionOne"].votes[user]) && !(state.listPolls[qid]["optionTwo"].votes[user])) {
        state.listPolls[qid][action.payload.answer].votes.push(user)
      }
    })
})

export default polls;