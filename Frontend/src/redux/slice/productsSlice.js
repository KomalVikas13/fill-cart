import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    products: [],
    filteredProducts: [],
    status: 'idle',
    error: null,
};

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('http://localhost:8080/public/products');
        console.log(response.data);

        return response.data;
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
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    (product) => product.category.name === category
                );
            }
        },
        filterProductById: (state, action) => {
            const productId = action.payload;
            state.filteredProducts = state.products.filter(
                (product) => product.productId === productId
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.filteredProducts = action.payload; // Set all products to filteredProducts initially
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCategory, filterProductById } = productsSlice.actions;
export default productsSlice.reducer;
