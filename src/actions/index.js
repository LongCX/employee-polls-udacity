import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('LOGIN_SUCCESS')
export const logout = createAction('LOGOUT')
export const setListUsers = createAction('LIST_USERS')