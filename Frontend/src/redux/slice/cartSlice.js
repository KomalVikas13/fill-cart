import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                // Update quantity if item already exists in the cart
                existingItem.quantity += newItem.quantity;
            } else {
                // Add new item to the cart
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity,
                });
            }

            // Recalculate total quantity and total amount
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        removeFromCart(state, action) {
            const itemId = action.payload;

            // Remove item from cart
            state.items = state.items.filter(item => item.id !== itemId);

            // Recalculate total quantity and total amount
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = quantity;
            }

            // Recalculate total quantity and total amount
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
});

// Export actions to dispatch
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
