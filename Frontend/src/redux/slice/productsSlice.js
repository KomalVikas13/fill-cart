import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    products: [], // This will store all products
    filteredProducts: [], // This will store the filtered products based on the selected category
    status: 'idle',
    error: null,
};

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.post('http://localhost:8080/public/products', { page: 0, size: 8 });
        return response.data.content; // Assuming this contains all products
    }
);

// Redux slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            const category = action.payload;
            if (category === 'All') {
                state.filteredProducts = state.products; // Show all products if category is 'All'
            } else {
                state.filteredProducts = state.products.filter(
                    (product) => product.category === category
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Store all products
                state.filteredProducts = state.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;
