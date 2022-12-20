import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Cart/cartSlice';
import categoryReducer from './Categories/categorySlice';
import customerReducer from './CustomerProfile/customerSlice';
import userSlice from './loginAdmin/userSlice';
import productsReducer from './Products/productsSlice';
import eventReducer from './Categories/eventSlice';
import storesReducer from './Store/storeSlice';
import courseReducer from './Course/courseSlice';
import newsReducer from './News/newsSlice';
import ecommerReducer from './ecommerce/ecommerce';
import enterpriseReducer from './Enterprise/enterpriseSlice';
import documentsReducer from './Documents/documentsSlice';
import likeReducer from './Like/likeSlice';
import packageReducer from './Package/packageSlice';
const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        customerReducer: customerReducer,
        categoryReducer: categoryReducer,
        cartReducer: cartReducer,
        productsReducer: productsReducer,
        eventsReducer: eventReducer,
        ecommerReducer: ecommerReducer,
        storesReducer: storesReducer,
        courseReducer: courseReducer,
        newsReducer: newsReducer,
        enterpriseReducer: enterpriseReducer,
        documentsReducer: documentsReducer,
        likeReducer: likeReducer,
        packageReducer: packageReducer,
    },
});

export default store;
