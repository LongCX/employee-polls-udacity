import { createReducer } from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../actions'

const initialState = {
    isLoading: false,
};

const loading = createReducer(initialState, (builder) => {
    builder
        .addCase(startLoading.type, (state) => { state.isLoading = true })
        .addCase(stopLoading.type, (state) => { state.isLoading = false })
})

export default loading;