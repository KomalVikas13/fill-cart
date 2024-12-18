import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/redux/slice/productsSlice';
import userReducer from '../src/redux/slice/userSlice';
import cartReducer from '../src/redux/slice/cartSlice';
import orderReducer from '../src/redux/slice/orderSlice';
import categoryReducer from '../src/redux/slice/categorySlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        users: userReducer,
        cart: cartReducer,
        orders: orderReducer,
        cart: cartReducer,
        categories: categoryReducer
    }
})

export default store;