import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    instaLoggedIn: false,
    telLoggedIn: false,
    linkLoggedIn: false,
    YouLoggedIn: false
};

const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            // console.log(action.payload);
            state.isLoggedIn = action.payload;
        },
        setInstaLoggedIn: (state, action) => {
            // console.log(action.payload);
            state.instaLoggedIn = action.payload;
        },
        setTelLoggedIn: (state, action) => {
            // console.log(action.payload);
            state.telLoggedIn = action.payload;
        },
        setLinkLoggedIn: (state, action) => {
            // console.log(action.payload);
            state.linkLoggedIn = action.payload
        },
        setYouLoggedIn: (state, action) => {
            // console.log(action.payload);
            state.YouLoggedIn = action.payload
        }
    },
});

export const { setIsLoggedIn, setInstaLoggedIn, setTelLoggedIn, setLinkLoggedIn, setYouLoggedIn } = loginStatusSlice.actions;

export default loginStatusSlice.reducer;