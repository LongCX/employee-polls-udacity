import authUser from './authUser'
import users from './users'
import loading from './loading'
import polls from './polls'
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    authUser,
    users,
    polls,
    loading,
})

export default rootReducer