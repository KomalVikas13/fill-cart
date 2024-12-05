import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    orders: [], // List of all orders
    status: 'idle', // Status for async actions ('idle', 'loading', 'succeeded', 'failed')
    error: null // To store error messages, if any
};

// Async thunk to fetch all orders
export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async (token, { rejectWithValue }) => {
        try {
            console.log("Fetching orders with token:", token);

            const response = await axios.get(
                'http://localhost:8080/admin/orders',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true // Ensure this is needed for your backend
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
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Change to orders
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Export reducer
export default orderSlice.reducer;