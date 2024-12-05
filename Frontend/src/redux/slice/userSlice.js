import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    profile: JSON.parse(localStorage.getItem("profile")) || null, // Fetch profile from localStorage
    users: [], // List of all users
    status: 'idle', // Status for async actions ('idle', 'loading', 'succeeded', 'failed')
    error: null // To store error messages, if any
};

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (token, { rejectWithValue }) => {
        try {
            console.log("Fetching users with token:", token);

            const response = await axios.post(
                'http://localhost:8080/admin/users',
                {}, // Empty request body
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            return response.data; // Return the response data
        } catch (error) {
            // Handle errors
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Redux slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Save user profile and persist in localStorage
        saveUser: (state, action) => {
            console.log("Saving user:", action.payload);
            state.profile = action.payload;
            localStorage.setItem("profile", JSON.stringify(action.payload)); // Save to localStorage
        },
        // Clear user profile and remove from localStorage
        clearUser: (state) => {
            state.profile = null;
            localStorage.removeItem("profile");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Export actions
export const { saveUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
