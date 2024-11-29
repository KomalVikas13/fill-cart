import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../src/redux/slice/productsSlice';

const store = configureStore({
    reducer: {
        products: productReducer
    }
})

export default store;