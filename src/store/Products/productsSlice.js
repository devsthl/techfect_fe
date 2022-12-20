import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import productsApi from '~/api/ProductsApi/productsApi';

export const getAllProduct = createAsyncThunk('cart/getAllCart', async () => {
    const listData = await productsApi.getAll();
    return listData;
});

export const getProductById = createAsyncThunk('product/getProductById', async (data) => {
    const listData = await productsApi.getProductById(data);
    return listData;
});

export const getProductByStore = createAsyncThunk('product/getProductByStore', async (data) => {
    const listData = await productsApi.getProductByStore(data);
    return listData;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (data, thunkAPI) => {
    const listData = await productsApi.delete(data);

    if (listData.message === 'error') {
        message.error('Có lỗi xảy ra');
    } else {
        message.success('Xóa sản phẩm thành công');
        thunkAPI.dispatch(getAllProduct());
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        listProductsOfStore: [],
        productById: [],
        productByStore: [],
    },
    reducers: {},
    extraReducers: {
        [getAllProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllProduct.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.listProductsOfStore = action.payload;
        },
        [getProductById.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductById.rejected]: (state, action) => {
            state.loading = false;
        },
        [getProductById.fulfilled]: (state, action) => {
            state.loading = false;
            state.productById = action.payload;
        },
        [getProductByStore.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductByStore.rejected]: (state, action) => {
            state.loading = false;
        },
        [getProductByStore.fulfilled]: (state, action) => {
            state.loading = false;
            state.productByStore = action.payload;
        },
    },
});

const { reducer: productsReducer } = productsSlice;
export default productsReducer;
