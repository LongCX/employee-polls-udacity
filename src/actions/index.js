import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('LOGIN_SUCCESS')
export const logout = createAction('LOGOUT')
export const setListUsers = createAction('LIST_USERS')
export const setListQuestions = createAction('LIST_QUESTIONS')
export const createPoll = createAction('CREATE_POLL')
export const answerVotePoll = createAction('ANSWER_VOTE_POLL')
export const answerVoteOfUser = createAction('ANSWER_VOTE_OF_USER')
export const startLoading = createAction('START_LOADING')
export const stopLoading = createAction('STOP_LOADING')