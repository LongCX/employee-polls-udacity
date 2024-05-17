import authUser from './authUser'
import users from './users'
import loading from './loading'
import questions from './questions'
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    authUser,
    users,
    questions,
    loading,
})

export default rootReducer