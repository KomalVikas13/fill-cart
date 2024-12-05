import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    categories: [], // List of all categories
    status: 'idle', // Status for async actions ('idle', 'loading', 'succeeded', 'failed')
    error: null // To store error messages, if any
};

// Async thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk(
    'orders/fetchAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8080/public/categories');
            console.log(response.data);

            return response.data; // Return the response data
        } catch (error) {
            // Handle errors
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Redux slice
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload; // Change to orders
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Export reducer
export default categorySlice.reducer;