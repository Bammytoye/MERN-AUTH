import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true; // show loading indicator
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload; // Set the current user to the payload
            state.loading = false; // Set loading to false after successful login
            state.error = false; // Clear any previous error
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    // logout 
} = userSlice.actions;

export default userSlice.reducer; 