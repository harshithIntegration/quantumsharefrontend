import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    remainingDays: null,
    remainingCredits: null,
    loading: false,
    error: null,
    pageUrls: []
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchDataRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.remainingDays = action.payload.data.remainingdays;
            state.remainingCredits = action.payload.data.credit;
            state.data = action.payload;
        },
        setRemainingDays: (state, action) => {
            console.log(action.payload);
            state.remainingDays = action.payload
        },
        fetchDataFailure: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure, setRemainingDays } = dataSlice.actions;

export default dataSlice.reducer;