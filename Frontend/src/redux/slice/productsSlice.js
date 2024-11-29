import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('/api/products'); // Replace with your API endpoint
        return response.data;
    }
);

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category) => {
        const response = await axios.get(`/api/products?category=${category}`); // Replace with your API endpoint
        return response.data;
    }
);
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        currentCategory: 'All',
        status: 'idle',
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload
            );
        },
        updateProduct: (state, action) => {
            const index = state.products.indexOf(product => product.id == action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        setCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            // For fetching products by category
        }).addCase(fetchProductsByCategory.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            }).addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });


    },

},

)

export const { addProduct, removeProduct, updateProduct, setCategory } = productsSlice.actions;
export default productsSlice.reducer;