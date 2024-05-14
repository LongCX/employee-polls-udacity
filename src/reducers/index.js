import authUser from './authUser'
import users from './users'
import { combineReducers } from "@reduxjs/toolkit"
import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducer = combineReducers({
    authUser,
    users,
})

export default rootReducer