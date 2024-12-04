import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    status: 'idle', // For tracking API calls (idle, loading, succeeded, failed)
    error: null,    // For tracking errors
};

// **Async Thunks for API Integration**
export const fetchCart = createAsyncThunk('cart/fetchCart', async (data, { rejectWithValue }) => {
    console.log(data);
    try {
        const response = await axios.get(`http://localhost:8080/user/cart/${data.userId}`, {
            headers: { Authorization: `Bearer ${data.token}` },
            withCredentials: true
        });
        console.log(response);

        return response.data; // Return cart items from the database
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);

            const response = await axios.post('http://localhost:8080/user/cart', data.cart, {
                headers: { Authorization: `Bearer ${data.token}` },
                withCredentials: true
            });
            return response.data; // Return the response data (updated cart details)
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle errors
        }
    }
);

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (data, { rejectWithValue }) => {

    try {
        const response = await axios.delete(
            'http://localhost:8080/user/cart',
            {
                headers: { Authorization: `Bearer ${data.token}` },
                withCredentials: true,
                data: { cartItemIds: [data.cartId] } // Ensure this matches the backend model
            }
        );
        console.log(response);
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data); // Handle errors
    }
});


export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/user/cart', data.cart, {
            headers: { Authorization: `Bearer ${data.token}` },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// **Slice Definition**
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        isAlreadyExists(state, action) {
            const existingInCart = (state.items).find(item => {
                console.log(item);
                return item.product.productId == action.payload
            });
            console.log(existingInCart);
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // **Fetch Cart**
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';

                // Ensure action.payload has the 'cartItems' array
                const cartItems = action.payload.cartItems;

                if (Array.isArray(cartItems)) {
                    state.items = cartItems;

                    // Calculate totalQuantity and totalAmount
                    state.totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
                    state.totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
                }
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // **Add to Cart**
            .addCase(addToCart.fulfilled, (state, action) => {
                const newItem = action.payload;
                const existingItem = state.items.find(item => item.id === newItem.id);
                toast.info("Product Added to the cart!")

                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                } else {
                    state.items.push(newItem);
                }

                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            })
            // **Remove from Cart**
            .addCase(removeFromCart.fulfilled, (state, action) => {
                const itemId = action.payload;
                state.items = state.items.filter(item => item.id !== itemId);
                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

                toast.success('Item removed from the cart!');
                window.location.href = '/cart';
            })
            // **Update Quantity**
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const { id, quantity } = action.payload;
                const item = state.items.find(item => item.id === id);

                if (item) {
                    item.quantity = quantity;
                }

                // Recalculate totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            });
    },
});

// **Export Actions**
export const { isAlreadyExists } = cartSlice.actions;

// **Export Reducer**
export default cartSlice.reducer;
