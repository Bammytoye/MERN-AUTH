import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    token: null,
    loading: false,
    error: null,
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
            localStorage.setItem("token", action.payload.token);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false,
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload;
        }
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    // logout 
} = userSlice.actions;

export default userSlice.reducer; 