import { createReducer } from '@reduxjs/toolkit';
import { startLoading, stopLoading, startLoadOnceInitData } from '../actions'

const initialState = {
    isLoading: false,
    isLoadOnceInitData: false,
};

const loading = createReducer(initialState, (builder) => {
    builder
        .addCase(startLoading.type, (state) => { state.isLoading = true })
        .addCase(stopLoading.type, (state) => { state.isLoading = false })
        .addCase(startLoadOnceInitData.type, (state) => { state.isLoadOnceInitData = true })
})

export default loading;