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
            state.loading = true; // Show loading indicator
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload; // Set the current user to the payload
            state.loading = false; // Set loading to false after successful login
            state.error = false; // Clear any previous error
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error from login
        },
        updateUserStart: (state) => {
            state.loading = true; // Set loading to true when updating user
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload; // Update the current user with the new data
            state.loading = false; // Set loading to false after successful update
            state.error = false; // Clear any previous error
        },
        updateUserFailure: (state, action) => {
            state.loading = false; // Set loading to false if update fails
            state.error = action.payload; // Store error from the update
        },
        deleteUserStart: (state) => {
            state.loading = true; // Set loading to true when updating user
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null; // Update the current user with the new data
            state.loading = false; // Set loading to false after successful update
            state.error = false; // Clear any previous error
        },
        deleteUserFailure: (state, action) => {
            state.loading = false; // Set loading to false if update fails
            state.error = action.payload; // Store error from the update
        },
        // Optionally, you can add a logout action here
        // logout: (state) => {
        //     state.currentUser = null; // Clear current user
        //     state.loading = false;
        //     state.error = false;
        // },
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure, 
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    // logout
} = userSlice.actions;

export default userSlice.reducer;
