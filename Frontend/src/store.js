import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/redux/slice/productsSlice';
import userReducer from '../src/redux/slice/userSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        users: userReducer
    }
})

export default store;