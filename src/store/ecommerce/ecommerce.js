import { createAsyncThunk } from '@reduxjs/toolkit';
import ecommercesApi from '../../api/ecommercesApi';
import { createSlice } from '@reduxjs/toolkit';

export const getAllEcommerce = createAsyncThunk('getAllEcommerce/ecommerce', async () => {
    const getall = await ecommercesApi.getAll();
    return getall;
});
export const getAllEcommerceWithPag = createAsyncThunk('getAllEcommerceWithPag/ecommerce', async ({ index, size }) => {
    const res = await ecommercesApi.getAllwithPag(index, size);
    return res;
});
export const getDetail = createAsyncThunk('getDetail/ecommerce', async (id) => {
    const detail = await ecommercesApi.getDetail(id);
    return detail;
});
const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState: {
        listEcommerce: [],
        listEcommercePag: [],
        loading: false,
        ecommerceDetail: {},
    },
    reducers: {
        setEcommerceDetail: (state, action) => {
            state.ecommerceDetail = action.payload;
        },
    },
    extraReducers: {
        [getAllEcommerce.pending]: (state) => {
            state.loading = true;
        },
        [getAllEcommerce.rejected]: (state) => {
            state.loading = false;
        },
        [getAllEcommerce.fulfilled]: (state, action) => {
            state.loading = false;
            state.listEcommerce = action.payload;
            // state.total_page = action.payload.data.total_pages;
        },
        [getAllEcommerceWithPag.pending]: (state) => {
            state.loading = true;
        },
        [getAllEcommerceWithPag.rejected]: (state) => {
            state.loading = false;
        },
        [getAllEcommerceWithPag.fulfilled]: (state, action) => {
            state.loading = false;
            state.listEcommercePag = action.payload.data;
            state.total = action.payload.total_items;
        },
        [getDetail.pending]: (state) => {
            state.loading = true;
        },
        [getDetail.rejected]: (state) => {
            state.loading = false;
        },
        [getDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.ecommerceDetail = action.payload;
            // state.total_page = action.payload.data.total_pages;
        },
    },
});
// export const { setEcommerceDetail } = ecommerceSlice.actions;
const { reducer: ecommerReducer } = ecommerceSlice;
export default ecommerReducer;
