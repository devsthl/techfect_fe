import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storeApi from '~/api/StoreApi/storeApi';

export const getAllField = createAsyncThunk('store/getAllField', async () => {
    const listData = await storeApi.getAllField();
    return listData;
});

export const getMyStore = createAsyncThunk('store/getMyStore', async () => {
    const listData = await storeApi.getMyStore();
    return listData;
});

export const getStoreAllPaging = createAsyncThunk('store/getStoreAllPaging', async (data, thunkAPI) => {
    const listData = await storeApi.getStoreAllPaging(data.page, data.data);
    console.log(12312);
    return listData;
});

const storesSlice = createSlice({
    name: 'store',
    initialState: {
        loading: false,
        listField: [],
        storeById: {},
        listStoreAllPaging: [],
    },
    reducers: {},
    extraReducers: {
        [getAllField.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllField.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllField.fulfilled]: (state, action) => {
            state.loading = false;
            state.listField = action.payload;
        },
        [getMyStore.pending]: (state, action) => {
            state.loading = true;
        },
        [getMyStore.rejected]: (state, action) => {
            state.loading = false;
        },
        [getMyStore.fulfilled]: (state, action) => {
            state.loading = false;
            state.storeById = action.payload;
        },
        [getStoreAllPaging.pending]: (state, action) => {
            state.loading = true;
        },
        [getStoreAllPaging.rejected]: (state, action) => {
            state.loading = false;
        },
        [getStoreAllPaging.fulfilled]: (state, action) => {
            state.loading = false;
            state.listStoreAllPaging = action.payload;
        },
    },
});

const { reducer: storesReducer } = storesSlice;
export default storesReducer;
